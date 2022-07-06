//change the color of mandatory fields
frappe.ui.form.on('Doctor Registration', {
    refresh(frm) {
$('input[data-fieldname="doctor_name"]').css("color","blue");
$('input[data-fieldname="doctor_name"]').css("background-color","#FFE4C4");
$('input[data-fieldname="gender"]').css("color","blue");
$('input[data-fieldname="gender"]').css("background-color","#FFE4C4");
$('input[data-fieldname="mobile"]').css("color","blue");
$('input[data-fieldname="mobile"]').css("background-color","#FFE4C4");
$('input[data-fieldname="speciality"]').css("color","blue");
$('input[data-fieldname="speciality"]').css("background-color","#FFE4C4");
$('input[data-fieldname="hospital_name"]').css("color","blue");
$('input[data-fieldname="hospital_name"]').css("background-color","#FFE4C4");
$('input[data-fieldname="city"]').css("color","blue");
$('input[data-fieldname="city"]').css("background-color","#FFE4C4");
}
    });


//Filter only sales items in item details
frappe.ui.form.on('Doctor Registration', {
    refresh(frm) {
        frm.set_query('item_code', 'order_item_details', function(doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                "filters": [
                    /*["Item","item_grade", "in", ["A-Grade","B-Grade"]],*/
                    ["Item", "is_sales_item", "=", "1"]
            ]};
        });
    }
});

//Filter only sales items in sample details  
frappe.ui.form.on('Doctor Registration', {
    refresh(frm) {
        frm.set_query('item_code', 'sample_item_details', function(doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                "filters": [
                    /*["Item","item_grade", "in", ["A-Grade","B-Grade"]],*/
                    ["Item", "is_sales_item", "=", "1"]
            ]};
        });
    }
});

//Calculate rate and amount in child table
frappe.ui.form.on('Campaign Order Items', {
qty: function (frm, cdt, cdn) {
    var row = locals[cdt][cdn];
    if(row.qty){
        frappe.model.set_value(cdt, cdn, 'rate', (row.mrp/112*100));
     frappe.model.set_value(cdt, cdn, 'amount', row.qty*(row.mrp/112*100));
     frappe.model.set_value(cdt, cdn, 'free_qty', row.qty);
    }
}
});


//calculate gross & net amount in footer
frappe.ui.form.on("Campaign Order Items", {
amount:function(frm, cdt, cdn){
var d = locals[cdt][cdn];
var total = 0;
frm.doc.order_item_details.forEach(function(d) { total += d.amount; });
frm.set_value("gross_amount", total);
refresh_field("gross_amount");
},
order_item_details_remove:function(frm, cdt, cdn){
var d = locals[cdt][cdn];
var total = 0;
frm.doc.order_item_details.forEach(function(d) { total += d.amount; });
frm.set_value("gross_amount", total);
refresh_field("gross_amount");
      }
});

//calculate total qty in footer
frappe.ui.form.on("Campaign Order Items", {
amount:function(frm, cdt, cdn){
var d = locals[cdt][cdn];
var total = 0;
frm.doc.order_item_details.forEach(function(d) { total += (d.qty+d.free_qty); });
frm.set_value("total_qty", total);
refresh_field("total_qty");
},
order_item_details_remove:function(frm, cdt, cdn){
var d = locals[cdt][cdn];
var total = 0;
frm.doc.order_item_details.forEach(function(d) { total += (d.qty+d.free_qty); });
frm.set_value("total_qty", total);
refresh_field("total_qty");
      }
});   

/*
//calculate gst and net amount in footer
frappe.ui.form.on("Conference Visitor Details", "refresh", function(frm) {
  frm.set_value("gst_amount", frm.doc.gross_amount*12/100);
  refresh_field("gst_amount");
  frm.set_value("net_amount", (frm.doc.gross_amount + frm.doc.gst_amount));
  refresh_field("net_amount");
      });
      
//Change Font Color & Backround color of Rounded amount
frappe.ui.form.on("Conference Visitor Details", "refresh", function(frm) {
$('input[data-fieldname="rounded_amount"]').css("color","red");
$('input[data-fieldname="rounded_amount"]').css("background-color","#FFE4C4");
frm.doc.rounded_amount = Math.round(frm.doc.net_amount);
});
*/

//Calculate GST, Net Amount & Rounded amount
cur_frm.cscript.gross_amount = function(doc){
        cur_frm.set_value("gst_amount", doc.gross_amount*12/100);
        cur_frm.set_value("net_amount", doc.gross_amount+doc.gst_amount);
        cur_frm.set_value("rounded_amount", Math.round(doc.net_amount));
       // cur_frm.set_value("balance_due", doc.rounded_amount-doc.advance_received);
        $('input[data-fieldname="rounded_amount"]').css("color","red");
        $('input[data-fieldname="rounded_amount"]').css("background-color","#FFE4C4");
                };

//to get balance due 
cur_frm.cscript.advance_received = function(doc){
       cur_frm.set_value("balance_due", doc.rounded_amount-doc.advance_received);};


//route to survey form on saving doctor registration
frappe.ui.form.on("Doctor Registration", "after_save", function(frm) {
if(frm.doc.__islocal==1) {
frappe.set_route("Form","Survey Form","new-survey-form-1",{"name": frm.doc.visitor_id});
}
});


/*
//add take a survey button
frappe.ui.form.on("Doctor Registration", "refresh", function(frm) {
frm.add_custom_button("Take a Survey").addClass("btn-warning").css({'color':'blue','font-weight': 'bold'},function()
{frappe.set_route("Form","Survey Form","new-survey-form-1",{"name": frm.doc.visitor_id})});
 });

//add action to survey button
frappe.ui.form.on("Doctor Registration", "take_a_survey", function(frm) {
  frappe.set_route("Form","Survey Form","new-survey-form-1");
 });
 
 */