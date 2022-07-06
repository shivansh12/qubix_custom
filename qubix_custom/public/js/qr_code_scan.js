frappe.ui.form.on("QR Code Scan Details", "refresh", function(frm, cdt, cdn){
    frappe.ui.scroll("[data-fieldname='qty']");
 });