$(document).ready(function(){
	console.log("Started app");
});

$("#simulator-start").on("click", function(){
	resetMarkers();
	var parkers = $("#input-parkers").val();
	var customers = $("#input-customers").val();
	markerGenerator("parker", parkers);
	markerGenerator("customer", customers);
	$(this).addClass("disabled");
	$(".control").removeClass("disabled");
});

$("#simulator-pause").on("click", function(){
	$(this).toggleClass("blue");
});

$("#simulator-stop").on("click", function(){
	$("#simulator-start").removeClass("disabled");
	$(".control").addClass("disabled");
});

