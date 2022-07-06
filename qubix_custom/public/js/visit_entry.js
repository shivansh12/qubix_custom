//concat employee customer and visit date
frappe.ui.form.on("Visit Entry", "validate", function(frm) {
    frm.doc.employee_lead_date = (frm.doc.employee_name +" - "+ frm.doc.lead_name+" - "+frm.doc.visit_date+" - "+frm.doc.purpose_of_visit);
});


//get latitude, longitude and accuracy
frappe.ui.form.on('Visit Entry', {
  refresh(frm) {
    navigator.geolocation.getCurrentPosition(function(position){
    frm.doc.latitude=(position.coords.latitude);
    frm.doc.longitude=(position.coords.longitude);
    frm.doc.accuracy=(position.coords.accuracy);
    })}
});


//validate the accuracy of lat and lng
frappe.ui.form.on('Visit Entry',  'validate',  function(frm) {
if (frm.doc.latitude>0 && frm.doc.longitude>0 && frm.doc.accuracy > 10000) {
    msgprint('Please reload form & try OR Check-In after some time');
    validated = false;
}
});

//get address values to fields
//get address values to fields based on latlng
frappe.ui.form.on('Visit Entry', {
  refresh(frm) {
  let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ frm.doc.latitude + "," + frm.doc.longitude +"&key=AIzaSyCEfPrvfGHGCH0PCbIRCuhd53oeWrBigpU";
 fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let parts = data.results[0].address_components;
      frm.doc.daddress= data.results[0].formatted_address;
        parts.forEach(part => {
      if (part.types.includes("street_number")) {frm.doc.door_street_no= part.long_name;}
      if (part.types.includes("premise")) {frm.doc.premise= part.long_name;}
      if (part.types.includes("neighborhood")) {frm.doc.neighbor= part.long_name;}
      if (part.types.includes("route")) {frm.doc.road_no= part.long_name;}
      if (part.types.includes("sublocality_level_2")) {frm.doc.sub_locality2= part.long_name;}
      if (part.types.includes("sublocality_level_1")) {frm.doc.sub_locality1= part.long_name;}
      if (part.types.includes("locality")) {frm.doc.city= part.long_name;}
      if (part.types.includes("administrative_area_level_2")) {frm.doc.district= part.long_name;}
      if (part.types.includes("administrative_area_level_1")) {frm.doc.state= part.long_name;}
      if (part.types.includes("postal_code")) { frm.doc.pincode= part.long_name;}
      if (part.types.includes("country")) { frm.doc.country= part.long_name;}
        });
    })
      .catch(err => console.warn(err.message));              
  }});

//to get distance and map
frappe.ui.form.on("Visit Entry", "refresh", function(frm){

var originAddress = frm.doc.oaddress; 
var destAddress = frm.doc.daddress;
initMap(originAddress, destAddress);
});

function initMap(originAddress, destAddress) {
// Initiate map with the origin address

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var map = new google.maps.Map(document.getElementById('map'), {
zoom: 15,
center: originAddress,
});
directionsDisplay.setMap(map);

calculateAndDisplayRoute(directionsService, directionsDisplay, originAddress, destAddress);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, originAddress, destAddress) {
// For more customization on the route and distanceMatrix, please refer to the API
// API Link: https://developers.google.com/maps/documentation/javascript/distancematrix

var service = new google.maps.DistanceMatrixService();
directionsService.route({
origin: originAddress,
destination: destAddress,
travelMode: google.maps.TravelMode.DRIVING
}, function(response, status) {
if (status === google.maps.DirectionsStatus.OK) {
  directionsDisplay.setDirections(response);
} else {
  window.alert('Directions request failed due to ' + status); // Customize your own error here
}
});


service.getDistanceMatrix({
    origins: [originAddress],
    destinations: [destAddress],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    durationInTraffic: true,
    avoidHighways: false,
    avoidTolls: false
}, function (response, status) {
    if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
        var distance = response.rows[0].elements[0].distance.value;
        var distancekms = response.rows[0].elements[0].distance.text;
        //var duration = response.rows[0].elements[0].duration.text;

        // Display the distance in relevant fields
        cur_frm.set_value("distance_in_mtrs", distance);
        cur_frm.set_value("distance", distancekms);
        //cur_frm.set_value("duration_of_travel", duration);

     
    } else {
        alert("Unable To Find Distance Via Road.");
    }
});
}

//Convert Google Distance in Mtrs into Kms
frappe.ui.form.on("Visit Entry", "refresh", function(frm) {
frm.set_value("distance_in_kms", (frm.doc.distance_in_mtrs/1000)); 
});


/*frappe.ui.form.on("Contact Visit Details", {
setup: function(frm,cdt,cdn) {
frm.set_query("contact_visited", function(frm,cdt,cdn){
        if(frm.doc.lead) {
            return {
                filters: { link_doctype: "Lead", link_name: frm.doc.lead }
            };
       }
    });
}});
*/

/*frappe.ui.form.on("Visit Entry", "lead", function (frm, cdt, cdn) {
if(frm.doc.__islocal) {
    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Contact Visit Details",
            filters: {
                "lead": frm.doc.lead
            },
            fields:["contact_visited"]
        },
        
    });
}
});

*/

//Filter contacts based on lead selected
frappe.ui.form.on('Visit Entry', {
    refresh(frm) {
        frm.set_query('contact_visited', 'contact_visit_details', function(doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                "filters": { link_doctype: "Lead", link_name: frm.doc.lead}
            };
        });
    }
});