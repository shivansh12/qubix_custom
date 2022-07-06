//Filter batches for finished goods
frappe.ui.form.on("QR Code Master", {
	setup: function(frm) {
		frm.set_query("batch", function() {
			return {
				filters: [
				//	["Item","item_group", "like", "%Qubix -%",
					["Batch","batch_type", "=", "Finished Goods"]
				]
			};
		});
	}
});

//Bring batch & item details to child table
frappe.ui.form.on("QR Code Master Details", {
	qr_code_details_add: function(frm,dt,dn){
		for(var i=0; i<cur_frm.doc.qr_code_details.length;i++){
			cur_frm.doc.qr_code_details[i].batch_no=cur_frm.doc.batch;
			cur_frm.doc.qr_code_details[i].item_code=cur_frm.doc.item;
			cur_frm.doc.qr_code_details[i].activation_date=cur_frm.doc.start_date;
			cur_frm.doc.qr_code_details[i].expiry_date=cur_frm.doc.expiry;
		}
		cur_frm.refresh_fields("qr_code_details");
	}
});