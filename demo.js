	
	(function(app, $) {
	
		
		var map;
		var marker;
		var location;
		
		app.showPosition = function() {
			var self = this;
		
			var successGPS = function(p) {

				var lat = p.coords.latitude;
				var lng = p.coords.longitude;
				
				location = new google.maps.LatLng(lat, lng);
				
				$('#latVal').val(location.lat());
				$('#lngVal').val(location.lng());

			};
			
			var failGPS = function(){
				alert('GPS failed');
			};
			
			navigator.geolocation.getCurrentPosition(successGPS, failGPS, {enableHighAccuracy: true});
		};		
		
		
		app.showMap = function(atLocation) {
			var self = this;
		
			if (atLocation) {
				location = atLocation;
			}

			if (location) {
				var myOptions = {       
					zoom: 15,       
					center: location,       
					mapTypeId: google.maps.MapTypeId.ROADMAP    
					};     
					
				map = new google.maps.Map($('#mapCanvas')[0],         
					myOptions);				
			}			
				
		};
		
		
		app.showMarker = function(newMarker) {
			var self = this;
		
			if (!newMarker) {
				newMarker = new google.maps.Marker({
					position: location,
					icon : 'github.png'
				});
			}
			
			marker = newMarker;
			
			if (map && marker) {
				marker.setMap(map);
			}
			
		};

		app.showInfo = function() {
			var self = this;

			if (map && marker) {
				$('#mapLat').text(map.center.lat());
				$('#mapLng').text(map.center.lng());
				$('#mapZoom').text(map.zoom);
				$('#markerLat').text(marker.getPosition().lat());
				$('#markerLng').text(marker.getPosition().lng());
				
				var markerName = 'zarazi'.toUpperCase();
				var markerUrl = '&markers=color:yellow%7Clabel:' + markerName[0]+ '%7C';
				markerUrl += marker.getPosition().lat() + ',' + marker.getPosition().lng(); 
				
				var mapUrl = 'http://maps.googleapis.com/maps/api/staticmap?';
				mapUrl += '&center=' + map.center.lat() + ',' + map.center.lng();
				mapUrl += '&zoom=' + map.zoom;
				mapUrl += '&size=290x240';
				mapUrl += '&maptype=roadmap';
				mapUrl += '&sensor=false';
				mapUrl += markerUrl;
				
				$('#mapImage').attr('src', mapUrl); 	
			}
			
		};
		
	
	})(window.imDemo = window.imDemo || {}, jQuery);	
	

	$('#showPosition').bind('click', function(e) {
		imDemo.showPosition();
	});
	
	$('#showMap').bind('click', function(e) {
		var lat = $('#latVal').val();
		var lng = $('#lngVal').val();
		var loc = new google.maps.LatLng(lat, lng);

		imDemo.showMap(loc);
		imDemo.showMarker();

	});

	$('#infoPage').live('pagebeforeshow', function() {
		imDemo.showInfo();
	})

