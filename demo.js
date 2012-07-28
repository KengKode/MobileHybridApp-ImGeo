	
	(function(app, $) {
	
		
		var map;
		var marker;
		var location;
		
		app.showPosition = function() {
			var self = this;
		
			var successGPS = function(p) {

				var lat = p.coords.latitude;
				var lng = p.coords.longitude;

				$('#latVal').val(lat);
				$('#lngVal').val(lng);

				self.location = new google.maps.LatLng(lat, lng);
			};
			
			var failGPS = function(){
				alert('GPS failed');
			};
			
			navigator.geolocation.getCurrentPosition(successGPS, failGPS, {enableHighAccuracy: true});
		};		
		
		
		app.showMap = function(atLocation) {
			var self = this;
		
			if (atLocation) {
				self.location = atLocation;
			}

			if (self.location) {
				var myOptions = {       
					zoom: 15,       
					center: self.location,       
					mapTypeId: google.maps.MapTypeId.ROADMAP    
					};     
					
				self.map = new google.maps.Map($('#mapCanvas')[0],         
					myOptions);				
			}			
				
		};
		
		
		app.showMarker = function(marker) {
			var self = this;
		
			if (!marker) {
				marker = new google.maps.Marker({
					position: self.location
				});
			}

			if (self.map) {
				self.marker = marker;
				self.marker.setMap(self.map);
			}
			
		};

		app.showInfo = function() {
			var self = this;

			if (self.map) {
				$('#mapLat').text(self.map.center.lat());
				$('#mapLng').text(self.map.center.lng());
				$('#mapZoom').text(self.map.zoom);
				$('#markerLat').text(self.marker.getPosition().lat());
				$('#markerLng').text(self.marker.getPosition().lng());			
			}
			
		};
		
	
	})(window.imGeo = window.imGeo || {}, jQuery);	
	

	$('#showPosition').bind('click', function(e) {
		imGeo.showPosition();
	});
	
	$('#showMap').bind('click', function(e) {
		var lat = $('#latVal').val();
		var lng = $('#lngVal').val();
		var loc = new google.maps.LatLng(lat, lng);

		imGeo.showMap(loc);
		imGeo.showMarker();

	});

	$('#infoPage').bind('pagebeforeshow', function() {
		imGeo.showInfo();
	})

