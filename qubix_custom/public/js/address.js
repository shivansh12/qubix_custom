//Filter Territory of child level
frappe.ui.form.on("Address", {
	setup: function(frm) {
		frm.set_query("territory", function() {
			return {
				filters: [
				//	["Item","item_group", "like", "%Qubix -%",
					["Territory","is_group", "=", "0"]
				]
			};
		});
	}
});