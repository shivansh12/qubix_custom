
//Concat Prefix field
frappe.ui.form.on("Customer", "validate", function(frm) {    
    frm.doc.prefix = frm.doc.customer_prefix + "-.####"});


//make a customer prefix field read-only after saving 
frappe.ui.form.on('Customer',  {
    refresh: function(frm) {
        // use the __islocal value of doc,  to check if the doc is saved or not
        frm.set_df_property('customer_prefix',  'read_only',  frm.doc.__islocal ? 0 : 1);
    } 
});