frappe.ui.form.on("Gate Entry", "generate_otp", function(frm) {
    frm.doc.otp = Math.floor((100000 + Math.random() * 900000) + 1);
  });
  
  
  frappe.ui.form.on("Gate Entry", "refresh", function(frm) {
   if(frm.doc.entry_code > 0 )
         cur_frm.set_df_property('generate_otp', 'hidden', true);
  });
  
  
  frappe.ui.form.on("Gate Entry", "refresh", function(frm) {
  /*$('[data-fieldname="generate_otp"]').css("background-color","#FFE4C4");*/
  $('[data-fieldname="generate_otp"]').css("color","red");
  $('input[data-fieldname="otp"]').css("color","red");
  $('input[data-fieldname="otp"]').css("background-color","#FFE4C4");
  //$('input[data-fieldname="exit_code"]').css("color","red");
  //$('input[data-fieldname="exit_code"]').css("background-color","#FFE4C4");
  $('input[data-fieldname="in_time"]').css("background-color","#FFE4C4");
  $('input[data-fieldname="in_time"]').css("color","red");
  $('input[data-fieldname="out_time"]').css("background-color","#FFE4C4");
  $('input[data-fieldname="out_time"]').css("color","red");
  $('input[data-fieldname="contact_person"]').css("background-color","#FFE4C4");
  $('input[data-fieldname="contact_person"]').css("color","red");
  $('input[data-fieldname="mobile"]').css("background-color","#FFE4C4");
  $('input[data-fieldname="mobile"]').css("color","red");
  });
  
  
  
  //filter FG Items
  frappe.ui.form.on("Gate Entry", {
      setup: function(frm) {
          frm.set_query("employee", function() {
              return {
                  filters: [
                      ["Employee","branch", "=", "Staff"]
                  ]
              };
          });
      }
  });
  