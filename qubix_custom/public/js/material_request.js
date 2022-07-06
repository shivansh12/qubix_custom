frappe.ui.form.on('Material Request Item', {
    pcs: function (frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        //var row1 = doc.pcs_per_box;
        if(row.pcs){
            frappe.model.set_value(cdt, cdn, 'qty', row.pcs/row.pcs_per_box);
        }
    }
});


///Filter Material request type
/*frappe.ui.form.on('Material Request', "refresh", function(frm) {
                if (frappe.user_roles.indexOf("Purchase Request")!=-1)
                set_field_options("material_request_type", ["Purchase"]);
            else
                set_field_options("material_request_type", ["Purchase","Manufacture"]);
    });

*/