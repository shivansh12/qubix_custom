//get latitude, longitude and accuracy on click of load map button
frappe.ui.form.on("Lead", "load_map", function(frm){
    navigator.geolocation.getCurrentPosition(function(position){
    frm.doc.latitude=(position.coords.latitude);
    frm.doc.longitude=(position.coords.longitude);
    frm.doc.accuracy=(position.coords.accuracy);
    })}
);

//clear latitude, longitude and accuracy on click of clear map button
frappe.ui.form.on("Lead", "clear_map", function(frm){
    frm.doc.latitude=0;
    frm.doc.longitude=0;
    frm.doc.accuracy=0;
    frm.doc.address=null;
    frm.doc.door_street_no=null;
    frm.doc.premise=null;
    frm.doc.neighbor=null;
    frm.doc.road_no=null;
    frm.doc.sub_locality2=null;
    frm.doc.sub_locality1=null;
    frm.doc.city=null;
    frm.doc.district=null;
    frm.doc.state=null;
    frm.doc.pincode=null;
    frm.doc.country=null;
});

//Accuracy check for latlng
/*frappe.ui.form.on('Lead',  'validate',  function(frm) {
if (frm.doc.accuracy > 50) {
    msgprint('Please try Load Map after some time');
    validated = false;
} 
});
*/

//global variable for lat & lng
let myLat = 0;
let myLng = 0;
frappe.ui.form.on('Lead', {refresh: function(frm) {
myLat = frm.doc.latitude;
myLng = frm.doc.longitude;
}});

//initiate google map
frappe.ui.form.on('Lead', {refresh: function(frm){
   initMap();

}});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
zoom: 15,
center: {lat: myLat, lng: myLng},
    });

//Add Marker in the google map
var marker = new google.maps.Marker({
position:  {lat: myLat, lng: myLng},
animation: google.maps.Animation.DROP,
map:map});
}


//get address values to fields based on latlng
frappe.ui.form.on('Lead', {
  refresh(frm) {
  let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ frm.doc.latitude + "," + frm.doc.longitude +"&key=AIzaSyCEfPrvfGHGCH0PCbIRCuhd53oeWrBigpU";
 fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let parts = data.results[0].address_components;
      frm.doc.address= data.results[0].formatted_address;
      frm.doc.google_address= data.results[0].formatted_address;
        parts.forEach(part => {
      if (part.types.includes("street_number")) {frm.doc.door_street_no= part.long_name;}
      if (part.types.includes("premise")) {frm.doc.premise= part.long_name;}
      if (part.types.includes("neighborhood")) {frm.doc.neighbor= part.long_name;}
      if (part.types.includes("route")) {frm.doc.road_no= part.long_name;}
      if (part.types.includes("sublocality_level_2")) {frm.doc.sub_locality2= part.long_name;}
      if (part.types.includes("sublocality_level_1")) {frm.doc.sub_locality1= part.long_name;}
      if (part.types.includes("locality")) {frm.doc.google_city= part.long_name;}
      if (part.types.includes("administrative_area_level_2")) {frm.doc.google_district= part.long_name;}
      if (part.types.includes("administrative_area_level_1")) {frm.doc.google_state= part.long_name;}
      if (part.types.includes("postal_code")) { frm.doc.google_pincode= part.long_name;}
      if (part.types.includes("country")) { frm.doc.google_country= part.long_name;}
        });
    })
      .catch(err => console.warn(err.message));              
  }});
  