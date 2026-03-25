// Fetch university locations in Nigeria from the Overpass API
fetch("https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=university](Nigeria);out;")
  .then(function(response) {
    // Convert the response to JSON
    return response.json();
  })
  .then(function(data) {

    // Create a group to store markers
    const markers = L.featureGroup();

    // Loop through all returned locations
    data.elements.forEach(function(place) {

      // Check that coordinates exist
      if (place.lat && place.lon) {

        // Get the name or use a default
        const name = place.tags.name || "University";

        // Create marker
        const marker = L.marker([place.lat, place.lon]);

        // Add popup information
        marker.bindPopup(`<b>${name}</b><br>University in Nigeria`);

        // Add marker to the group
        markers.addLayer(marker);
      }

    });

    // Add all markers to the map
    markers.addTo(map);

    // Adjust map view to show all markers
    map.fitBounds(markers.getBounds());

  })
  .catch(function(error) {

    // Handle errors if the API fails
    console.error("Error loading university data:", error);

  });