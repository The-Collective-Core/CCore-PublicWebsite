/* Menu Show/Hide */
$(function () {
	//CoreCLI
	$("#draggable-JS-08").draggable({
		containment: ".sub-folder",
		scroll: false,
		grid: [20, 20],
	});
	//CoreCLI
	$("#draggable-JS-09").draggable({
		containment: ".sub-folder",
		scroll: false,
		grid: [20, 20],
	});
});

/* Error Messages */
$(document).ready(function () {
	$("#success").hide();
	$("#warning").hide();
	$("#danger").hide();
});
