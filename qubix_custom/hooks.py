from . import __version__ as app_version

app_name = "qubix_custom"
app_title = "Qubix Custom"
app_publisher = "Shivansh"
app_description = "Custom"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "shivansh.kashyap@qubixmedicare.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/qubix_custom/css/qubix_custom.css"
# app_include_js = "/assets/qubix_custom/js/qubix_custom.js"

# include js, css files in header of web template
# web_include_css = "/assets/qubix_custom/css/qubix_custom.css"
# web_include_js = "/assets/qubix_custom/js/qubix_custom.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "qubix_custom/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
	"Purchase Order" : [
		"public/js/purchase_order.js",
		],
	"Stock Entry" : [
		"public/js/stock_entry.js",
		],
	"Delivery Note" :[
		"public/js/delivery_note.js",
	],
#	"doctype" : "public/js/stock_entry.js",
	"Sales Order" : [
		"public/js/sales_order.js",
	],
	"Job Card" :[
		"public/js/job_card.js",
	],
	"Work Order" : [
		"public/js/work_order.js",
	],
	"Sales Invoice" : [
		"public/js/sales_invoice.js",
	],
	"Material Request" : [
		"public/js/material_request.js",
	],
	"Doctor Registration" : [
		"public/js/doctor_registration.js",
	],
	"Survey Form" :[
		"public/js/survey_form.js",
	],
	"Stock Reconciliation" : [
		"public/js/stock_reconciliation.js",
	],
	"Batch" : [
		"public/js/batch.js",
		],

	"Gate Entry" : [
		"public/js/gate_entry.js",
	],
	"Lead" : [
		"public/js/lead.js",
	],
	"Secondary Sales" : [
		"public/js/secondary_sales.js",
	],
	"Visit Entry" : [
		"public/js/visit_entry.js",
	],
	"Free Schemes" : [
		"public/js/free_schemes.js",
	],
	"Customer" : [
		"public/js/customer.js",
	],
	"Item" : [
	
		"public/js/item.js",
	],
	"Address" : [
		"public/js/address.js",
	],
	"QR Code Scan" : [
		"public/js/qr_code_scan.js",
	],
	"QR Code Master" : [
		"public/js/qr_code_master.js",
	],

	}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "qubix_custom.install.before_install"
# after_install = "qubix_custom.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "qubix_custom.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"qubix_custom.tasks.all"
# 	],
# 	"daily": [
# 		"qubix_custom.tasks.daily"
# 	],
# 	"hourly": [
# 		"qubix_custom.tasks.hourly"
# 	],
# 	"weekly": [
# 		"qubix_custom.tasks.weekly"
# 	]
# 	"monthly": [
# 		"qubix_custom.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "qubix_custom.install.before_tests"

# Overriding Methods
# ------------------------------
#
# Overriding Methods
# ------------------------------
override_doctype_class = {
	"Stock Entry": "qubix_custom.overrides.CustomStockEntry"
}
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "qubix_custom.event.get_events"
# }


from qubix_custom.batch_valuation_overrides import get_supplied_items_cost as _get_supplied_items_cost,set_incoming_rate_buying as _set_incoming_rate_buying,set_incoming_rate_selling as _set_incoming_rate_selling,get_rate_for_return as _get_rate_for_return,get_incoming_rate as _get_incoming_rate,process_sle as _process_sle,get_args_for_incoming_rate as _get_args_for_incoming_rate,get_price_list_rate_for as _get_price_list_rate_for
#import erpnext as _erpnext
# Selling controllers
from erpnext.controllers.selling_controller import SellingController as _SellingController
_SellingController.set_incoming_rate = _set_incoming_rate_selling

# stock_ledger
from erpnext.stock.stock_ledger import update_entries_after as _update_entries_after
_update_entries_after.process_sle =  _process_sle
# stock entry
from erpnext.stock.doctype.stock_entry.stock_entry import StockEntry as _StockEntry
_StockEntry.get_args_for_incoming_rate = _get_args_for_incoming_rate

import erpnext 
erpnext.stock.utils.get_incoming_rate = _get_incoming_rate
# #Batch_price
# from erpnext.stock import get_item_details as _get_item_details
# _get_item_details.get_price_list_rate_for = _get_price_list_rate_for
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "qubix_custom.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# User Data Protection
# --------------------

user_data_fields = [
	{
		"doctype": "{doctype_1}",
		"filter_by": "{filter_by}",
		"redact_fields": ["{field_1}", "{field_2}"],
		"partial": 1,
	},
	{
		"doctype": "{doctype_2}",
		"filter_by": "{filter_by}",
		"partial": 1,
	},
	{
		"doctype": "{doctype_3}",
		"strict": False,
	},
	{
		"doctype": "{doctype_4}"
	}
]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"qubix_custom.auth.validate"
# ]

