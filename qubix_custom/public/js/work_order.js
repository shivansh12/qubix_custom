
/*frappe.ui.form.on('Work Order', {
	onload:function(frm){
	    var products_list;
	    frappe.call({
	        type: 'GET',
	        url: '/api/method/get_items_under_products',
	        async: false,
	        callback: function(r){
	            products_list = r.message;
	        }
	    })
        frm.set_query('batch_no', () => {
			return {
				filters: {
					item: ['in', products_list],
					workflow_state: 'Approved'
				}
			}
		});
    }
})
*/

//to concat batch and item code-- 
frappe.ui.form.on("Work Order", "validate", 
function(frm) { 
    frm.doc.batch_item = frm.doc.batch_no + " - " + frm.doc.production_item; 
});

//filter FG Items
frappe.ui.form.on("Work Order", {
	setup: function(frm) {
		frm.set_query("production_item", function() {
			return {
				filters: [
				//	["Item","item_group", "like", "%Qubix -%",
                    ["Item","mrp", ">", "0"],				
					["Item","is_sales_item", "=", "1"]
				]
			};
		});
	}
});

//filter Batches belongs to FG Item
frappe.ui.form.on("Work Order", {
	setup: function(frm) {
		frm.set_query("batch_no", function() {
			return {
				filters: [
					["Batch","item", "in", frm.doc.production_item],
					[ "Batch", "batch_status", "=","Open"]
				]
			};
		});
	}
});

