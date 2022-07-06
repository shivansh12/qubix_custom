/*frappe.ui.form.on('Batch', {
	item: function(frm) {
	    fetch_mrp(frm);
	},
	
	manufacturing_date: function(frm){
	    fetch_mrp(frm);
	}
})

function fetch_mrp(frm){
    if(frm.doc.item != undefined){
        frappe.db.get_value("Item Price", {'item_code': frm.doc.item, 'selling': 1, 'valid_from': ['<', frm.doc.manufacturing_date], 'valid_upto': ['>=', frm.doc.manufacturing_date]}, "price_list_rate",(c)=>{
		    if(c.price_list_rate != undefined){
    		    frm.set_value('mrp', c.price_list_rate);
		        frm.refresh_field('mrp');
		    }else{
		        frm.set_value('mrp', 0);
		        frm.refresh_field('mrp');
		    }
	    })
    }
}*/

/*
//to calculate pcs per box-- 
frappe.ui.form.on("Batch", "refresh", function(frm) { 	
    frm.set_value("mrp_per_pcs", (frm.doc.mrp / frm.doc.pcs_per_box)); }); 
*/

// mrp custom code

// frappe.ui.form.on('Batch', {
// 	item: (frm) => {
	

						
			
// 			}
			
// })


// function mrp(frm){
// if(frm.doc.item != undefined ){
// 	frappe.db.get_value("Item Price", {'item_code': frm.doc.item,'selling': 1, 'valid_from': ['<=', frm.doc.manufacturing_date], 'valid_upto': ['>=', frm.doc.manufacturing_date]}, "price_list_rate",(c)=>{
// 		if(c.price_list_rate != undefined){
// 			frm.set_value('mrp', c.price_list_rate);
// 			frm.refresh_field('mrp');
// 		}else{
// 			frm.set_value('mrp', 0);
// 			frm.refresh_field('mrp');
// 		}
// 	})
// }
// }
// mrp custom code end start from if
//to calculate pcs per box-- 
cur_frm.cscript.item = function(doc){
cur_frm.set_value("mrp_per_pcs", (doc.mrp / doc.pcs_per_box));
};

//to get batch and item in one field 
frappe.ui.form.on("Batch", "validate", function(frm) { 
frm.doc.batch_item = frm.doc.batch_id + " - " + frm.doc.item; }); 

//Get Manufacturing month and year-- 
frappe.ui.form.on("Batch", "validate", function(frm) { 
const md = new Date(frm.doc.manufacturing_date); 
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; 
frm.doc.mfg_month_year = ("0"+(md.getMonth()+1)).slice(-2) + "-"+md.getFullYear()+" -- "+ months[md.getMonth()] +"-"+ md.getFullYear(); }); 

//Get Expiry month and year-- 
frappe.ui.form.on("Batch", "validate", function(frm) { 
const ed = new Date(frm.doc.expiry_date); 
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; 
frm.doc.exp_month_year = ("0"+(ed.getMonth()+1)).slice(-2) +"-"+ ed.getFullYear()+" -- "+ months[ed.getMonth()] +"-"+ ed.getFullYear(); }); 

//Get Expiry Month
frappe.ui.form.on("Batch", "validate", function(frm) { 
const ed = new Date(frm.doc.expiry_date); 
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; 
frm.doc.exp_month = months[ed.getMonth()] +"-"+ ed.getFullYear(); });

//Get Manufactring Day
// frappe.ui.form.on("Batch", "validate", function(frm) { 
// 	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); 
// 	cur_frm.set_value("manufacturing_date", (var firstDay)); });
    