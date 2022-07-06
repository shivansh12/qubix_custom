    /*
    frappe.ui.form.on('Job Card', {
        onload:function(frm){
    	    var products_list;
    	    frappe.call({
    	        type: 'GET',
    	        url: '/api/method/get_items_under_products',
    	        async: false,
    	        callback: function(r){
    	            products_list = r.message;
    	        }
    	    })
            frm.set_query('batch_no', () => {
    			return {
    				filters: {
    					item: ['in', products_list],
    					workflow_state: 'Approved'
    				}
    			}
    		});
        },
        
    	start_job: function(frm) {
    		let row = frappe.model.add_child(frm.doc, 'Job Card Time Log', 'time_logs');
    		frappe.db.get_value("Employee",frm.doc.employee,"employee_name",(c)=>{
    		row.employee=c.employee_name;
    		row.completed_qty = 0;
    		})
    		row.from_time = frappe.datetime.now_datetime();
    		frm.set_value('job_started', 1);
    		frm.set_value('started_time' , row.from_time);
    		frm.set_value("status", "Work In Progress");
    
    		if (!frappe.flags.resume_job) {
    			frm.set_value('current_time' , 0);
    		}
    		frm.save();
    	}
    });
    
    frappe.ui.form.on('Job Card Time Log', {
    	pcs_completed: function(frm, cdt, cdn){
    	    var row = locals[cdt][cdn];
    	    if(row.pcs_completed != undefined){
    	        var completed_qty = row.pcs_completed / 12;
    	        frappe.model.set_value(cdt, cdn, "completed_qty", completed_qty);
    	    }
    	    frm.refresh_field('completed_qty');
    	}
    })
    */
    
    frappe.ui.form.on('Job Card Time Log', {
        pcs_completed: function (frm, cdt, cdn) {
            var row = locals[cdt][cdn];
            //var row1 = doc.pcs_per_box;
            if(row.pcs_completed){
                frappe.model.set_value(cdt, cdn, 'completed_qty', row.pcs_completed/frm.doc.pcs_per_box);
            }
        }
    });