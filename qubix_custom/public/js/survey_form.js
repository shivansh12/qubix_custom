frappe.ui.form.on('Survey Form', {
	refresh(frm) {
		$('select[data-fieldname="survey1"]').css("color","red");
        $('select[data-fieldname="survey2"]').css("color","red");
  	}
});


//route to survey form on saving doctor registration
frappe.ui.form.on("Survey Form", "after_save", function(frm) {
  frappe.set_route("List","Doctor Registration","List");
  });
  