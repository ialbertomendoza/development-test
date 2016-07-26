$(document).ready(function(){
	console.log("Started app");
});

$("#simulator-start").on("click", function(){
	if ($(this).hasClass("disabled")){
		Materialize.toast('¡Ejecución en curso!', 2000);
	} else {
		var parkers = $("#input-parkers").val();
		var customers = $("#input-customers").val();
		if (parkers && parkers > 0 && customers && customers > 0) {
			markerGenerator("parker", parkers);
			markerGenerator("customer", customers);
			$(this).addClass("disabled");
			$(".control").removeClass("disabled");
			calcAmount();
		} else {
			Materialize.toast('¡No hay datos para realizar la prueba!', 2000);
		}
	}
});

$("#simulator-pause").on("click", function(){
	$(this).toggleClass("blue");
});

$("#simulator-stop").on("click", function(){
	$("#simulator-start").removeClass("disabled");
	$(".control").addClass("disabled");
	$("#input-customers").val("");
	$("#input-parkers").val("");
	parkersData = new Array(0);
	customersData = new Array(0);
	parkersAsigned = new Array(0);
	resetMarkers();
});

