window.addEventListener("beforeunload", () => {
    var scrollPositionNav = document.querySelector("#sidenav").scrollTop;
    localStorage.setItem("scrollPositionNav", scrollPositionNav);

    var scrollPositionWindow = window.scrollY;
    localStorage.setItem("scrollPositionWindow", scrollPositionWindow);

	//console.log("unload: nav = " + scrollPositionNav + ", window = " + scrollPositionWindow);
});
document.addEventListener("DOMContentLoaded", () => {
	$("#sidenav").load("../../nav.html", function() {
		var scrollPositionWindow = localStorage.getItem("scrollPositionWindow");
		var scrollPositionNav = localStorage.getItem("scrollPositionNav");
		//console.log("load: nav = " + scrollPositionNav + ", window = " + scrollPositionWindow);
		document.querySelector("#sidenav").scrollTop = scrollPositionNav;
	});
});

function doSearch(argument) {
  var input = document.getElementById('inputSearchBar');
  var filter = input.value.toUpperCase();
  var 
}