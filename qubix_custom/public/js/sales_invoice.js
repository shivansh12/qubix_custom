/*
//Disable Create Button
frappe.ui.form.on('Sales Invoice', {
    refresh(frm) {
        frm.disable_Create();
    }
});
*/

//Validate LR Date against Invoice Date
frappe.ui.form.on('Sales Invoice', 'validate', function(frm) {
    if (frm.doc.lr_date < frm.doc.posting_date) {
        msgprint('LR Date caanot be prior to Invoice Date');
         frappe.validated = false;
    }
});


//update invoice due date
// cur_frm.cscript.posting_date = function(doc){
//     if(doc.total>49999 && doc.outstanding_amount>0) {
//         cur_frm.set_value("due_date", frappe.datetime.add_days(doc.posting_date,15));
//                 } else cur_frm.set_value("due_date", doc.posting_date);
//     };