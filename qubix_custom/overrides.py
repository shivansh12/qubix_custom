from frappe.utils import flt
from erpnext.stock.doctype.stock_entry.stock_entry import StockEntry
from erpnext.stock.utils import get_incoming_rate
from erpnext.stock.stock_ledger import update_entries_after,get_valuation_rate
import frappe
import erpnext
from frappe.utils import cint, comma_or, cstr, flt

class CustomStockEntry(StockEntry):
    # def set_rate_for_outgoing_items(self, reset_outgoing_rate=True, raise_error_if_no_rate=True):
    # 	outgoing_items_cost = 0.0
    # 	for d in self.get("items"):
    # 		# if d.s_warehouse:
    # 		if self.stock_entry_type == "Manufacture":
    # 			if not d.set_basic_rate_manually and reset_outgoing_rate:
    # 				args = self.get_args_for_incoming_rate(d)
    # 				rate = get_incoming_rate(args, raise_error_if_no_rate)
    # 				price = frappe.db.get_value("Item",d.item_code,"standard_cost")
    # 				if price > 0:
    # 					d.basic_rate = 25
    # 				else:
    # 					d.basic_rate = 25	

    # 			# d.basic_amount = flt(flt(d.transfer_qty) * flt(d.basic_rate), d.precision("basic_amount"))
    # 			d.basic_amount = 55
    # 			# if not d.t_warehouse:
    # 			outgoing_items_cost += flt(d.basic_amount)

    # 	return outgoing_items_cost
    @frappe.whitelist()
    def set_basic_rate(self, reset_outgoing_rate=True, raise_error_if_no_rate=True):
        """
        Set rate for outgoing, scrapped and finished items
        """
        # Set rate for outgoing items
        outgoing_items_cost = self.set_rate_for_outgoing_items(
            reset_outgoing_rate, raise_error_if_no_rate
        )
        finished_item_qty = sum(
            # d.transfer_qty for d in self.items if d.is_finished_item or d.is_process_loss
            d.transfer_qty for d in self.items if d.is_finished_item
        )

        # Set basic rate for incoming items
        for d in self.get("items"):
            if d.s_warehouse or d.set_basic_rate_manually:
                continue

            if d.allow_zero_valuation_rate:
                d.basic_rate = 0.0
            elif d.is_finished_item:
                if self.purpose == "Manufacture":
                    # d.basic_rate = self.get_basic_rate_for_manufactured_item(
                    # 	finished_item_qty, outgoing_items_cost
                    # )
                    d.basic_rate=flt(frappe.db.get_value("Item",d.item_code,"standard_cost"))
                elif self.purpose == "Repack":
                    d.basic_rate = self.get_basic_rate_for_repacked_items(d.transfer_qty, outgoing_items_cost)

            if not d.basic_rate and not d.allow_zero_valuation_rate:
                d.basic_rate = get_valuation_rate(
                    d.item_code,
                    d.t_warehouse,
                    self.doctype,
                    self.name,
                    d.allow_zero_valuation_rate,
                    currency=erpnext.get_company_currency(self.company),
                    company=self.company,
                    raise_error_if_no_rate=raise_error_if_no_rate,
                    # batch_no=d.batch_no,
                )

            # do not round off basic rate to avoid precision loss
            d.basic_rate = flt(d.basic_rate)
            # if d.is_process_loss:
            #     d.basic_rate = flt(0.0)
            d.basic_amount = flt(flt(d.transfer_qty) * flt(d.basic_rate), d.precision("basic_amount"))

    def get_sle_for_target_warehouse(self, sl_entries, finished_item_row):
        for d in self.get("items"):
            if cstr(d.t_warehouse):
                sle = self.get_sl_entries(
                    d,
                    {
                        "warehouse": cstr(d.t_warehouse),
                        "actual_qty": flt(d.transfer_qty),
                        "incoming_rate": flt(d.valuation_rate),
                        "valuation_rate": flt(d.valuation_rate),
                    },
                )
                if cstr(d.s_warehouse) or (finished_item_row and d.name == finished_item_row.name):
                    sle.recalculate_rate = 1

                sl_entries.append(sle)