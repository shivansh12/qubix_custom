///Filter items of A-Grade & B-Grade or publish in hub enabled
frappe.ui.form.on('Secondary Sales', {
    refresh(frm) {
        frm.set_query('item_code', 'sales_item', function(doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            //if(frm.doc.ecommerce == "1")
            return {
                "filters": [
                    /*["Item","item_grade", "in", ["A-Grade","B-Grade"]],*/
                    ["Item", "publish_in_hub", "=", "1"]
            ]};
        });
    }
});