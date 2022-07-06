frappe.ui.form.on('Delivery Note', {
	onload: function(frm) {
		frm.set_query('batch_no', 'items', function(doc, cdt, cdn) {
			var item = locals[cdt][cdn];
			if(!item.item_code) {
				frappe.throw(__("Please enter Item Code to get Batch Number"));
			} else {
				var filters = {
						'item_code': item.item_code
					}
				return {
					query : "erpnext.controllers.queries.get_batch_no",
					filters: filters
				}
			}
		});
	}
})

// frappe.ui.form.on('Delivery Note Item', {
// 	batch_no: function(frm, cdt, cdn) {
// 	    var row = locals[cdt][cdn];
// 		if(row.batch_no != undefined){
//             frappe.db.get_value("Batch", {'name': row.batch_no}, "mrp",(c)=>{
//     		    if(c.mrp != undefined){
//         		    frappe.model.set_value(cdt, cdn, 'price_list_rate', c.mrp);
//     		        frm.refresh_field('price_list_rate');
//     		    }
//     	    })
//         }
// 	}
// })



frappe.ui.form.on("Delivery Note", "validate", function(frm, cdt, cdn) {
        
            $.each(frm.doc.items || [], function(i, d) {
            if (d.rate>0.1){
                d.is_free_item=0;
                // d.rate=((d.price_list_rate)-(d.price_list_rate*d.discount_percentage/100));
                // refresh_field("items")
            }
            else {
              d.is_free_item=1;  
            }
            
            });
            
             });


// frappe.ui.form.on("Delivery Note", "on_submit", function(frm, cdt, cdn) {
        
//             $.each(frm.doc.items || [], function(i, d) {
//             if (d.rate>0.1){
//                 d.discount_amount=d.price_list_rate*d.discount_percentage/100;
//                  d.base_rate=((d.price_list_rate)-(d.price_list_rate*d.discount_percentage/100));
//                  d.rate=((d.price_list_rate)-(d.price_list_rate*d.discount_percentage/100));
//                  d.net_rate=((d.price_list_rate)-(d.price_list_rate*d.discount_percentage/100));
//                  d.base_net_rate=((d.price_list_rate)-(d.price_list_rate*d.discount_percentage/100));
//                  d.amount=d.qty*d.rate;
//                   d.base_amount=d.qty*d.base_rate;
//                   d.net_amount=d.qty*d.net_rate;
//                     d.base_net_amount=d.qty*d.base_net_rate;
                    
//                 refresh_field("items")
//             }
            
//             });
            
//              });


frappe.ui.form.on("Delivery Note", "validate", function(frm, cdt, cdn) {
        
        $.each(frm.doc.items || [], function(i, d) {
            if (d.is_free_item==1){
            d.discount_percentage=100;
    
        }
        });
        refresh_field("items");
         });
 frappe.ui.form.on("Delivery Note", {
                setup: function(frm) {
                    frm.add_fetch("batch_no", "mrp", "price_list_rate")
                }
            });
frappe.ui.form.on("Delivery Note", "onload", function(frm, cdt, cdn) {
                $.each(frm.doc.items || [], function(i, d) {
                    d.discount_amount=0;    
                 if (d.is_free_item!=1){
                  d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
          
               }
              });
              refresh_field("items");
               });  
          
frappe.ui.form.on("Delivery Note", "validate", function(frm, cdt, cdn) {
            $.each(frm.doc.items || [], function(i, d) {
                d.discount_amount=0;    
             if (d.is_free_item!=1){
              d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
      
           }
          });
          refresh_field("items");
           });  
      

// frappe.ui.form.on('Delivery Note', {
//           validate(frm,cdt,cdn){
//                var d = frappe.model.get_doc(cdt, cdn);
//                if(d.batch_no){
//               frappe.call({
//                       method: "qubix_custom.batch_valuation_overrides.batch_price",
//                       args: {"batch_no":d.batch_no},
//                       callback: function(r) {
//                           console.log(r.message);
//                           var price = r.message[0].batch_price
//                         //   frappe.model.set_value(cdt, cdn, d.price_list_rate, price);
//                           frappe.model.set_value(cdt, cdn, "price_list_rate", price);
//                         //   d.price_list_rate=price
//                            }
//                   });	
//                   // refresh_field("batch_no");
//               }
//               // refresh_field("batch_no");
//           },
          
//           });    
// frappe.ui.form.on("Delivery Note", {
//     setup: function(frm) {
//         frm.add_fetch("batch_no", "mrp", "price_list_rate")
//     }
// });
// frappe.ui.form.on("Delivery Note", "validate", function(frm){
//     var dt, items = (frm.doc.items || []).map(function(row){
//          if (dt === undefined) dt = row.items;
//          return row.batch_no;
//     });
//     frappe.call({
//         'async': false,
//         'method': 'frappe.client.get_list',
//         'args': {
//             'doctype': "Batch",
//            'fields': ['name','mrp'],
//            'filters': {'name': ['in', items]}
//         },
//        callback: function(res){
//            (res.message || []).forEach(function(row){
//                var ref = frappe.utils.filter_dict(frm.doc.items, {'batch_no': row.name})[0];
//                frappe.model.set_value(ref.doctype, ref.name, "mrp", row.price_list_rate);
//            })
//        }
//     })
// });
