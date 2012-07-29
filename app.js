// app.js
//

	(function(app, $) {

	    var version = '0.1';

	    var loc, map;
	    var markers = [];

	    var currentFriendId;

	    app.showMap = function() {
	        var self = this;

	        navigator.geolocation.getCurrentPosition(
				function success(p) {
				    var lat = p.coords.latitude;
				    var lng = p.coords.longitude;
				    $('#latInfo').text(lat);
				    $('#lngInfo').text(lng);
				    loc = new google.maps.LatLng(lat, lng);

				    map = new google.maps.Map(
						$('#mapCanvas')[0],
						{
						    zoom: 15,
						    center: loc,
						    mapTypeId: google.maps.MapTypeId.ROADMAP
						}
					);

				    self.addMarker(lat, lng);
				    //self.addMarker(lat+0.001, lng+0.001);

				    self.showMarker();
				},

				function fail() {
				    alert('No GPS!');
				},

				{ enableHighAccuracy: true }
			);
	    };

	    app.addMarker = function(lat, lng) {
	        var self = this;

	        var markerLocation = new google.maps.LatLng(lat, lng);

	        var newMarker = new google.maps.Marker({
	            position: markerLocation,
	            icon: 'github.png'
	        });

	        markers.push(newMarker);

	    };

	    app.addMarker2 = function(lat, lng, name) {
	        var self = this;

	        var markerLocation = new google.maps.LatLng(lat, lng);

	        var newMarker = new google.maps.Marker({
	            position: markerLocation,
	            title: name
	        });

	        google.maps.event.addListener(newMarker, 'click', function() {
	            $('#markerInfo').html(name);
	        });

	        markers.push(newMarker);

	    };

	    app.showMarker = function() {
	        var self = this;

	        for(var i in markers) {
	            markers[i].setMap(map);
	        }

	    };

	    app.makeFriendsList = function() {
	        $.get('friends.json', {}, function(res, code) {
	            var ul = $('#friendsList');
	            ul.empty();

	            for(var i in res) {
	                var url = 'friend.html?id=' + i;
	                var a = $('<a>').attr('href', url).append(res[i].name);
	                var li = $('<li>').append(a);
	                ul.append(li);
	            }
	            ul.listview('refresh');

	        }, 'json');
	    };

	    app.showFriendMap = function(page) {
	        var url = page.data('url');
	        var id = url.split('=')[1];

	        $.get('friends.json', {}, function(res, code) {

	            var name = res[id].name;
	            var lat = res[id].lat;
	            var lng = res[id].lng;

	            $('#friendName', page).html(name);

	            var markerName = name.toUpperCase();
	            var markerUrl = '&markers=color:green%7Clabel:' + markerName[0] + '%7C';
	            markerUrl += lat + ',' + lng;

	            var mapUrl = 'http://maps.googleapis.com/maps/api/staticmap?';
	            mapUrl += '&center=' + lat + ',' + lng;
	            mapUrl += '&zoom=' + '15';
	            mapUrl += '&size=290x320';
	            mapUrl += '&maptype=roadmap';
	            mapUrl += '&sensor=false';
	            mapUrl += markerUrl;


	            $('#mapImage', page).attr('src', mapUrl);
	        }, 'json');
	    };

	    app.search = function() {
	        var self = this;

	        map = new google.maps.Map($('#resultMap')[0], {
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            center: loc,
	            zoom: 15
	        });

	        var request = {
	            location: loc,
	            radius: '500',
	            query: $('#qryField').val()
	        };


	        function callback(results, status) {
	            if(status == google.maps.places.PlacesServiceStatus.OK) {
	                markers = [];
	                for(var i = 0; i < results.length; i++) {
	                    var place = results[i];
	                    var lat = place.geometry.location.lat();
	                    var lng = place.geometry.location.lng()
	                    var name = place.name;
	                    self.addMarker2(lat, lng, name);
	                    //createMarker(results[i]);
	                }

	                self.showMarker();

	            }
	        }

	        service = new google.maps.places.PlacesService(map);
	        service.textSearch(request, callback);

	    }

	})(window.imGeo = window.imGeo || {}, jQuery);



	
	$('#mePage').bind('pageshow', function() {
		imGeo.showMap();
	});

	$('#friendsPage').live('pagebeforecreate', function() {
		imGeo.makeFriendsList();
	});

	$('#friendMap').live('pagebeforeshow', function() {
	    imGeo.showFriendMap($(this));
	    $(this).page();
	});

	$('#searchNow').live('click', function() {
	    imGeo.search()
	});

	
