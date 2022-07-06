frappe.ui.form.on('Stock Entry', {
	before_save(frm) {    
        frappe.db.get_value("Warehouse",frm.doc.to_warehouse,"warehouse_manager",(a)=>{
            frm.set_value("warehouse_manager",a.warehouse_manager)
        });
	}
})

frappe.ui.form.on('Stock Entry', {
	setup: function(frm){
	    frm.set_query('batch_no', 'items', function(doc, cdt, cdn) {
			var item = locals[cdt][cdn];
			if(!item.item_code) {
				frappe.throw(__("Please enter Item Code to get Batch Number"));
			} else {
				if (in_list(["Material Transfer for Manufacture", "Manufacture", "Repack", "Send to Subcontractor"], doc.purpose)) {
					var filters = {
						'item_code': item.item_code
				// 		'posting_date': ['<=', frm.doc.posting_date]
					}
				} else {
					var filters = {
						'item_code': item.item_code
					}
				}


				return {
					query : "erpnext.controllers.queries.get_batch_no",
					filters: filters
				}
			}
		});
		
        frm.set_query('batch', () => {
			return {
				filters: {
					workflow_state: 'Approved'
				}
			}
		});
		 
	
	}
})