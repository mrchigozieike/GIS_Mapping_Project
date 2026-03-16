/*
-----------------------------------------------------
GLOBAL VARIABLES
-----------------------------------------------------
*/

// Variable to store the Leaflet map object
let map;

// Array to store all marker objects
// This allows us to remove markers when filtering
let markers = [];


/*
-----------------------------------------------------
LOCATION DATA
-----------------------------------------------------

Array containing all location objects.
Each object represents one marker on the map.

Properties:
name → location name
lat  → latitude coordinate
lng  → longitude coordinate
type → category used for filtering
*/

const locations = [
{ name:"University of Lagos", lat:6.5158, lng:3.3896, type:"university"},
{ name:"National Museum Lagos", lat:6.4442, lng:3.4033, type:"museum"},
{ name:"Freedom Park", lat:6.4474, lng:3.4036, type:"park"},
{ name:"Lekki Conservation Centre", lat:6.4429, lng:3.5355, type:"park"},
{ name:"Nike Art Gallery", lat:6.4356, lng:3.4721, type:"museum"},
{ name:"University of Ibadan", lat:7.4435, lng:3.9000, type:"university"},
{ name:"Ahmadu Bello University", lat:11.1510, lng:7.6544, type:"university"},
{ name:"Obudu Mountain Resort", lat:6.3735, lng:9.3181, type:"park"},
{ name:"Yankari National Park", lat:9.7592, lng:10.5105, type:"park"},
{ name:"Jos Museum", lat:9.8965, lng:8.8583, type:"museum"},
{ name:"University of Nigeria Nsukka", lat:6.8644, lng:7.4085, type:"university"},
{ name:"Aso Rock", lat:9.0765, lng:7.3986, type:"park"},
{ name:"Abuja National Mosque", lat:9.0579, lng:7.4951, type:"museum"},
{ name:"Millennium Park Abuja", lat:9.0722, lng:7.4896, type:"park"},
{ name:"University of Benin", lat:6.3965, lng:5.6145, type:"university"},
{ name:"Benin National Museum", lat:6.3350, lng:5.6037, type:"museum"},
{ name:"Olumo Rock", lat:7.1608, lng:3.3498, type:"park"},
{ name:"Cocoa House Ibadan", lat:7.3775, lng:3.9470, type:"museum"},
{ name:"Lagos Business School", lat:6.6147, lng:3.5081, type:"university"},
{ name:"Tinapa Resort", lat:4.9517, lng:8.3200, type:"park"}
];


/*
-----------------------------------------------------
FUNCTION: initMap()
-----------------------------------------------------

Purpose:
Initializes the Leaflet map when the page loads.

Tasks performed:
1. Create the map centered on Nigeria
2. Load the OpenStreetMap tile layer
3. Display all markers initially
4. Add dropdown filter event listener
*/

function initMap(){

    // Create the Leaflet map centered on Nigeria
    map = L.map('map').setView([9.0820, 8.6753], 6);


    /*
    Add map tiles using OpenStreetMap.
    This provides the visual map background.
    */

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

        maxZoom: 18,

        attribution: '&copy; OpenStreetMap contributors'

    }).addTo(map);


    // Create markers for all locations initially
    createMarkers("all");


    /*
    Event listener for dropdown filter.

    When user selects a filter:
    1. Remove existing markers
    2. Display markers matching selected type
    */

    document.getElementById("filter").addEventListener("change", function(){

        let value = this.value;

        // Remove existing markers
        clearMarkers();

        // Create markers based on selected category
        createMarkers(value);

    });

}


/*
-----------------------------------------------------
FUNCTION: createMarkers(type)
-----------------------------------------------------

Purpose:
Creates map markers based on selected filter.

Parameter:
type → category selected in dropdown
*/

function createMarkers(type){

    // Loop through each location in the array
    locations.forEach(location => {

        // Display marker if type matches filter
        if(type === "all" || location.type === type){

            /*
            Create a Leaflet marker
            */

            let marker = L.marker([location.lat, location.lng]).addTo(map);


            /*
            Bind popup information to marker
            This popup appears when marker is clicked
            */

            marker.bindPopup(

                `<h3>${location.name}</h3>
                 <p>Type: ${location.type}</p>`

            );


            // Store marker so it can be removed later
            markers.push(marker);
        }

    });

}


/*
-----------------------------------------------------
FUNCTION: clearMarkers()
-----------------------------------------------------

Purpose:
Removes all markers from the map.

This is required when applying a filter
so that old markers do not remain visible.
*/

function clearMarkers(){

    // Loop through all stored markers
    markers.forEach(marker => {

        // Remove marker from map
        map.removeLayer(marker);

    });

    // Reset marker array
    markers = [];

}