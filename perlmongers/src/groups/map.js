var usa = new GPoint(-95.677068, 37.0625);
var world = new GPoint(0.0, 18.0);
var na = new GPoint(-102.832031, 52.268157);
var europe = new GPoint(15.029297, 49.61071);
var australia = new GPoint(134.296875, -25.641526);
var asia = new GPoint(95, 45);
var africa = new GPoint(20, 0);
var sa = new GPoint(-63.63, -25.00);

    var map;
    function onLoad() {
      // Center the map
      map = new GMap(document.getElementById("map"));
      map.addControl(new GLargeMapControl());
      map.addControl(new GMapTypeControl());
      //map.centerAndZoom(new GPoint(-78.6588, 35.8219), 16);
      map.centerAndZoom(new GPoint(0.0, 18.0), 15);
      var spamicon = new GIcon();
      spamicon.image = "http://labs.google.com/ridefinder/images/mm_20_red.png";
      spamicon.shadow = "http://labs.google.com/ridefinder/images/mm_20_shadow.png";
      spamicon.iconSize = new GSize(12, 20);
      spamicon.shadowSize = new GSize(22, 20);
      spamicon.iconAnchor = new GPoint(6, 20);
      spamicon.infoWindowAnchor = new GPoint(5, 1);

        // Creates a marker whose info window displays the given number
            function createMarkerJay(point, spamicon, name, web, lat, lng) {
              var marker = new GMarker(point, spamicon);

              // Show this marker's index in the info window when it is clicked
              var msg = "<small>";
              msg = msg+"<a href='" + web + "'>" + name + "</a><br/>";
              msg = msg+"<nobr>" + lat + ", " + lng + "</nobr>";
              msg = msg+"</small>";

              GEvent.addListener(marker, "click", function() {
                marker.openInfoWindowHtml(msg);
              });

              return marker;
            }

      // Download the data in map.xml and load it on the map.
      var request = GXmlHttp.create();
      request.open("GET", "map.xml", true);
      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          var xmlDoc = request.responseXML;
          var markers = xmlDoc.documentElement.getElementsByTagName("marker");
          for (var i = 0; i < markers.length; i++) {
            var point = new GPoint(parseFloat(markers[i].getAttribute("lng")),
                                   parseFloat(markers[i].getAttribute("lat")));
            //var marker = new GMarker(point);
              var marker = createMarkerJay(point, spamicon,
                    markers[i].getAttribute("name"), markers[i].getAttribute("web"),
                    markers[i].getAttribute("lat"),  markers[i].getAttribute("lng"));
              map.addOverlay(marker);
          }
        }
      }
      request.send(null);
    }

    function cz(p, z) {
        map.centerAndZoom(p, z);
    }
