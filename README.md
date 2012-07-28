MobileHybridApp-ImGeo
=====================

### Step 1
* Make `mePage` works like so:
 	- Show Location under Page Title
	- Show Map at Your Current Location with one Customized Marker
   
* Add Toolbar with Two Buttons in Footer
	- First is `Me` activates `#mePage`
	- Second is `Friends` activates `#friendsPage`
   
### Step 2
* Make `friendsPage` works like this:
	- Show list of Friends in `listview`
	- Each row in the list comes from your own defined `JSON`
	- Click on their names open page `friendMap`
   
### Step 3
* When `friendMap` is on event `pagebeforeshow`, displays the followings:
	- Your friend's name in Header
	- Your friend's static map with a marker labeled with first letter of their names
   
### Hints
* See `demo.html` and `demo.js` for code samples
* Make `listview` by using `JSON` and `$.get()` as did in previous labs
* Either use of static tags or Tag Builder to build page `friendMap`

### References
* [Google Map API - JavaScript Reference](https://developers.google.com/maps/documentation/javascript/reference)
* [jQuery Mobile Demo & Docs](http://jquerymobile.com/test/)

   