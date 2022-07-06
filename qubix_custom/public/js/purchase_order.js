frappe.ui.form.on('Purchase Order', {
	supplier(frm){
	    frappe.db.get_value("Supplier",{"name":frm.doc.supplier},["terms","tc_name"],(t)=>{
	        frm.set_value("tc_name",t.tc_name)
	        frm.set_value("terms",t.terms)
	    })
	}
})