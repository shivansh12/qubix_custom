//Change Font Color & Backround color of Rounded amount and Delivery Priority
frappe.ui.form.on("Sales Order", "refresh", function(frm) {
    $('input[data-fieldname="rounded_amount"]').css("color","red");
    //$('input[data-fieldname="rounded_amount"]').css("background-color","#FFE4C4");
    $('select[data-fieldname="delivery_priority"]').css("color","red");
    $('select[data-fieldname="delivery_priority"]').css("background-color","#FFE4C4");
    frm.doc.rounded_amount = frm.doc.rounded_total;
    frm.doc.outstanding_balance = frm.doc.party_balance;
    frm.doc.net_payable = frm.doc.rounded_total + frm.doc.party_balance;
    $('input[data-fieldname="net_payable"]').css("color","red");
    $('input[data-fieldname="net_payable"]').css("background-color","#FFE4C4");
    });
    
    
    //Validate Stock Available Vs Order Qty
    frappe.ui.form.on("Sales Order Item", "qty", function(frm, cdt, cdn){
    var d = locals[cdt][cdn];
    if(frm.doc.ecommerce == "1") {
    frappe.model.set_value(d.doctype, d.name, "diff_qty", d.actual_qty - d.qty);
    }});
    
    ///Filter items of A-Grade & B-Grade or publish in hub enabled
    frappe.ui.form.on('Sales Order', {
            refresh(frm) {
                frm.set_query('item_code', 'items', function(doc, cdt, cdn) {
                    var d = locals[cdt][cdn];
                    if(frm.doc.ecommerce == "1")
                    return {
                        "filters": [
                            /*["Item","item_grade", "in", ["A-Grade","B-Grade"]],*/
                            ["Item", "publish_in_hub", "=", "1"]
                    ]};
                });
            }
        });
        
    //Display Free Goods Scheme Button 
    frappe.ui.form.on('Sales Order', {
            refresh(frm) {
          cur_frm.add_custom_button(__("Free Goods Scheme"), function() {
                frappe.route_options = {
                    order_no: me.frm.doc.name,
                };
                frappe.set_route("query-report", "Free Goods Scheme");
            }, __("View")); 
        }});
        
        
        
        
        
    //Display Free Goods Trail Button 
    // frappe.ui.form.on('Sales Order', {
    //     	refresh(frm) {
    //       cur_frm.add_custom_button(__("free goods Trail"), function() {
    // 			frappe.route_options = {
    // 				order_no: me.frm.doc.name,
    // 			};
    // 			frappe.set_route("query-report", "free goods Trail");
    // 		}, __("View")); 
    //     }});
            
    
    //Hide Update Items button to stockists
    // frappe.ui.form.on('Sales Order', {
    // refresh(frm) {
    // if (frappe.user_roles.indexOf("Stockist")!=-1) {
    // setTimeout(() => {
    // frm.remove_custom_button('Update Items');
    // }, 10);
    // }
    // }
    // });
    
    
    
    /*
    //Hide Create Sales Invoice button if invoice is already generated    
    frappe.ui.form.on('Sales Order', {
        refresh(frm) {
    if(frm.doc.sales_invoice_no != null)
        setTimeout(() => {
            frm.remove_custom_button('Sales Invoice', 'Create');
            }, 3);
        }
    });
    }
    });
    */
    
    //Stock Statement Button Created for Report Access 
    frappe.ui.form.on('Sales Order', {
            refresh(frm) {
          cur_frm.add_custom_button(__("Stock Balance"), function() {
                frappe.route_options = {
                    warehouse: me.frm.doc.set_warehouse,
                };
                frappe.set_route("query-report", "Stock Statement");
            }, __("View")); 
        }});
        
        
    //Bring sales order no to transfer the same to Picklist 
     frappe.ui.form.on("Sales Order", {
        validate: function(frm) {
            frm.doc.sales_order_no =  frm.doc.name;
        }
    });
    
    
    frappe.ui.form.on('Sales Order', {
        refresh(frm) {
        if(frm.doc.sales_invoice_no != null)
            frm.disable_Create();
        }
    });
    
    
    
    //Hide Few buttons for mso & stockist
    frappe.ui.form.on('Sales Order', {
        refresh(frm) {
            if(frm.doc.sales_invoice_no != null)
            frm.disable_Create();
            frm.remove_custom_button('Update Items');
            if(frappe.user.roles.indexOf("Stockist")!=-1)
            frm.disable_Create();
            frm.remove_custom_button('Update Items');
        }
        });
    
    
    
    //Display Customer Outstanding Balance
    cur_frm.cscript.qty = function(doc) {
    return frappe.call({
        method: "erpnext.accounts.utils.get_balance_on",
        args: {date: frappe.datetime.nowdate(), party_type: 'Customer', party: doc.customer},
        callback: function(r) {
            doc.outstanding_balance = r.message;
            refresh_field('outstanding_balance');
                }
    });
    };
    
    //Display Party Balance
    cur_frm.cscript.qty = function(doc) {
    return frappe.call({
        method: "erpnext.accounts.utils.get_balance_on",
        args: {date: frappe.datetime.nowdate(), party_type: 'Customer', party: doc.customer},
        callback: function(r) {
            doc.party_balance = r.message;
            refresh_field('party_balance');
                }
    });
    };
    
    
    frappe.ui.form.on("Sales Order Item", "item_code", function(frm, cdt, cdn){
        frappe.after_ajax(function() { 
            var d = locals[cdt][cdn];
            if(d.item_code=="QN 2359") {
                msgprint("Buy 2 Box of QN 2359 & Get 1 Box Free..!");
            }		
        });
    });
    
    
    frappe.ui.form.on("Sales Order", "before_save", function(frm){
    if(frm.doc.total < 25000 && frm.doc.additional_discount_percentage > 0 ) {
    frappe.throw('Sales Order Amount Less than 25000 not eligible for cash discount..!');
    }});
    
    
    
    
    
    frappe.ui.form.on("Sales Order", "validate", function(frm, cdt, cdn) {
    if (cur_frm.doc.state!="Karnataka"){	
    cur_frm.doc.taxes_and_charges= "IGST Output Tax 12% - QMPL";
    }    
    else {
    cur_frm.doc.taxes_and_charges= "GST Output Tax 12% - QMPL";  
    }
    });
    
    frappe.ui.form.on("Sales Order", "validate", function(frm, cdt, cdn) {
            
                $.each(frm.doc.items || [], function(i, d) {
                if (d.rate>0.1){
                    d.is_free_item=0;
            
                }
                });
                
                 });
    