// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:

// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">
let map, heatmap;
let data;

const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 41.57763876275615, lng: -0.8014688959252666 },
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapId: "208a576a99fde47",
    zoomControl: true,
    scaleControl: true,

  });

  map.addListener("zoom_changed", () => {
    console.log("zoom_changed");
    const zoom = map.getZoom();

    console.log(zoom);
    if (zoom) {
      // Only show each marker above a certain zoom level.
      markers.forEach(marker => {
        marker.map = zoom > 12 ? map : null;
      });
    }
  });

  // Boundary place ID: ChIJ-W5lP-4UWQ0RWP14-ZVCICA
/*  featureLayer = map.getFeatureLayer("LOCALITY");
  const featureStyleOptions = {
    strokeColor: "#810FCB",
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: "#810FCB",
    fillOpacity: 0.5,
  };*/
  
  // Apply the style to a single boundary.
  //@ts-ignore
/*  featureLayer.style = (options) => {
    if (options.feature.placeId == "ChIJ-W5lP-4UWQ0RWP14-ZVCICA") {
      // Hana, HI
      return featureStyleOptions;
    }
  };*/

  document
    .getElementById("toggle-totales")
    .addEventListener("click", toggleTotales);

  document
    .getElementById("toggle-infantil")
    .addEventListener("click", toggleInfantil);
  document
    .getElementById("toggle-primaria")
    .addEventListener("click", togglePrimaria);
  document
    .getElementById("toggle-bachillerato")
    .addEventListener("click", toggleBachillerato);
  document
    .getElementById("toggle-eso")
    .addEventListener("click", toggleESO);
}

function toggleTotales() {
  if(heatmap) {
    heatmap.setMap(null);ç
  }
  let points = [];
    for(let i = 0; i < data.length; i++) {
        // Strip the localizacion string
        let localizacion = data[i].localizacion;
        let lat = parseFloat(localizacion.split(",")[0]);
        let lng = parseFloat(localizacion.split(",")[1]);
        points.push({ location: new google.maps.LatLng(lat, lng), weight: data[i].Total });
    }

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: points,
        map: map,
        gradient: gradient,
        radius: 25,
        opacity: 1,
    });
    heatmap.setMap(map);
}

function toggleInfantil() {
    heatmap.setMap(null);
    let points = [];
    for(let i = 0; i < data.length; i++) {
        let localizacion = data[i].localizacion;
        let lat = parseFloat(localizacion.split(",")[0]);
        let lng = parseFloat(localizacion.split(",")[1]);
        if(data[i].Infantil > 0) {
            points.push({ location: new google.maps.LatLng(lat, lng), weight: data[i].Infantil });
        }
    }
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: points,
      map: map,
      gradient: gradient,
      radius: 25,
        opacity: 1,
    });
    heatmap.setMap(map);

}

function togglePrimaria() {
    heatmap.setMap(null);
    let points = [];
    for(let i = 0; i < data.length; i++) {
        let localizacion = data[i].localizacion;
        let lat = parseFloat(localizacion.split(",")[0]);
        let lng = parseFloat(localizacion.split(",")[1]);
        if(data[i].Primaria > 0) {
            points.push({ location: new google.maps.LatLng(lat, lng), weight: data[i].Primaria });
        }
    }
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: points,
      map: map,
      gradient: gradient,
      radius: 25,
      opacity: 1,
  });
    heatmap.setMap(map);
}

function toggleBachillerato() {
    heatmap.setMap(null);
    let points = [];
    for(let i = 0; i < data.length; i++) {
        let localizacion = data[i].localizacion;
        let lat = parseFloat(localizacion.split(",")[0]);
        let lng = parseFloat(localizacion.split(",")[1]);
        if(data[i].Bachillerato > 0) {
            points.push({ location: new google.maps.LatLng(lat, lng), weight: data[i].Bachillerato });
        }
    }

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: points,
      map: map,
      gradient: gradient,
      radius: 25,
      opacity: 1,
    });
    heatmap.setMap(map);
}

function toggleESO() {
    heatmap.setMap(null);
    let points = [];
    for(let i = 0; i < data.length; i++) {
        let localizacion = data[i].localizacion;
        let lat = parseFloat(localizacion.split(",")[0]);
        let lng = parseFloat(localizacion.split(",")[1]);
        if(data[i].ESO > 0) {
            points.push({ location: new google.maps.LatLng(lat, lng), weight: data[i].ESO });
        }
    }

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: points,
      map: map,
      gradient: gradient,
      radius: 25,
      opacity: 1,
    });
    heatmap.setMap(map);
}


window.initMap = initMap;

let markers = [];

$(document).ready(function() {
  $.getJSON("./data.json", function (response) {
    data = response;
  });

  setTimeout(async function() {
    toggleTotales();
    for(let i = 0; i < data.length; i++) {
        let localizacion = data[i].localizacion;
        let lat = parseFloat(localizacion.split(",")[0]);
        let lng = parseFloat(localizacion.split(",")[1]);
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

        const pin = new PinElement({
            scale: 0.8,
        });

        let marker = new AdvancedMarkerElement({
            position: new google.maps.LatLng(lat, lng),
            map: null,
            content: pin.element,
        });

        marker.addListener("click", () => {
            let content = document.createElement("div");
            // Add all data to content by lines
            for(let key in data[i]) { 
              if(key != "localizacion") {
                if(key == "Colegio" || data[i][key] > 0) {
                  content.innerHTML += `<b>${key}:</b> ${data[i][key]}<br>`;
                }
              }
            }
            toastr.success(content.innerHTML, null, {
                closeButton: true
            });
        });
        markers.push(marker);
    }
    }, 1000);

});

