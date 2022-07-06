frappe.ui.form.on("Stock Reconciliation", {
	onload: function(frm) {
		frm.set_query("batch_no", "items", function(doc, cdt, cdn) {
			var item = locals[cdt][cdn];
			return {
				filters: {
					'item': item.item_code
				}
			};
		});
}});