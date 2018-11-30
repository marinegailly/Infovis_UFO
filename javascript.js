
	// An API access token is required to use the API. Replace with your own (see how to get an API token in the slides). You can request your own on the Mapbox website
	mapboxgl.accessToken = "pk.eyJ1IjoiYWNsYXJpbnZhbCIsImEiOiJjam1wY25sNGsxOXZqM2twa2hyaG0wbDF6In0.40Fo_wy_iUZGNL5j_CIXdA";

    function getGeoJSON(points){

        var features = Array();

        for(var i = 0; i < points.length; i++){

            // For every point, a feature is created and added to the array features

            var point = {type : "Feature",
                            geometry : {   // The geometry for a point contains the type (which is Point) and the coordinates
                                type : "Point",
                                coordinates : [points[i].longitude, points[i].latitude]   // The longitude and latitude must be specified longitude first, which is a little confusing as latitude usually comes first
                            },
                            properties : { // The properties contain any other information on the point
							date : points[i].datetime ,
							country : points[i].country="us",
							
							
							

                            
                            }
                        }

            features.push(point);
    
  
        }

        return features;
	}

    

	// A new map is created

	var map = new mapboxgl.Map({
				container: "map",   // ID of the element that contains the map
				style: "mapbox://styles/mapbox/dark-v9",   // Type of map (other styles include basic-v9, streets-v9, light-v9, satellite-v9 and bright-v9, try them out to see which one is best for your map)
				center: [-99, 39],   // Coordinates of the center of the map [longitude, latitude]
				zoom: 3 // Initial zoom level (1 is the furthest zoom, it shows the whole world)
	})

	// Add zoom and rotation controls to the map
	
	map.addControl(new mapboxgl.NavigationControl({
		position: "top-left"}   // The controls appear at the top left
	));	
	

    d3.json("ufo_500.json", function(data){   // The code in the function is executed only when the data is loaded. All code requiring that the data is fully loaded shoud come here

        console.log(data);
        map.on("load", function(){

            var featurecollection = {type : "FeatureCollection", features : getGeoJSON(data)};

            // A layer holding the visual elements is added to the map

            map.addLayer({
                id: "ufo_500.json",   // Layer id
                type: "circle",   // Type of the visual elements representing the museums
                source: {   // Data
                    type: "geojson",   // Type of data
                    data: featurecollection 
					  // Variable holding the feature collection
                },
                paint: {   // Style of the visual elements (circles)
                    "circle-radius": 3,   // Radius
                    "circle-color": "#6ac70b",   // Fill color
                    "circle-opacity": 0.6,   // Opacity (0 is transparent, 1 is opaque)
                    "circle-stroke-width": 1,   // Width of the circles border
                    "circle-stroke-color": "#004d60"   // Color of the circles border
                }

            });

        });

    });

	var first, second, result;

first  = prompt('Entrez la premier date : ');
second = prompt('Entrez la seconde date: ');
result =  'Voici les données de ' + first + ' à '+ second;

alert(result );


	 

//pour retourner des données 
d3.json("ufo_500.json", function(data) {
    d3.select("body")
        .selectAll("us")
        .data(data)
        .enter()
        .append("p")
        .text(function(d) {
            //return d.datetime;
        });

});
