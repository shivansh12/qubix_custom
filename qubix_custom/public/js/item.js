//filter only Needle Codes
frappe.ui.form.on("Item", {
	setup: function(frm) {
		frm.set_query("needle", function() {
			return {
				filters: [
					["Item","item_group", "in", ["Needles - 300 Series","Needles - 400 Series"]]
				]
			};
		});
	}
});

//filter only Needle Codes
frappe.ui.form.on("Item", {
	setup: function(frm) {
		frm.set_query("needle1", function() {
			return {
				filters: [
					["Item","item_group", "in", ["Needles - 300 Series","Needles - 400 Series"]]
				]
			};
		});
	}
});