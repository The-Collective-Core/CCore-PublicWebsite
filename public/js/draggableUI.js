/* Menu Show/Hide */
$(function () {
	$("#draggable-JS-00").draggable({
		snap: ".application",
		containment: "body",
		scroll: false,
	});
	$("#draggable-JS-01").draggable({
		snap: ".application",
		containment: "body",
		scroll: false,
	});
	$("#draggable-JS-02").draggable({
		snap: ".application",
		containment: "body",
		scroll: false,
	});
	$("#draggable-JS-03").draggable({
		containment: "body",
		scroll: false,
		grid: [20, 20],
	});
	$("#draggable-JS-04").draggable({
		containment: "body",
		scroll: false,
		grid: [20, 20],
	});
	$("#draggable-JS-05").draggable({
		containment: "body",
		scroll: false,
		grid: [20, 20],
	});
});

$(document).ready(function () {
	$("#draggable-JS-00").hide();
	$("#draggable-JS-01").show();
	$("#draggable-JS-02").hide();
	$("#draggable-JS-03").show();
	$("#draggable-JS-04").show();
	$("#draggable-JS-04").show();
});
/**/
/* Window -Discord */
$(document).ready(function () {
	$("#button00").on("click", function () {
		$("#draggable-JS-00").show();
	});
});
$(document).ready(function () {
	$("#close00").on("click", function () {
		$("#draggable-JS-00").hide();
	});
});
/* Window -CoreCLI */
$(document).ready(function () {
	$("#button01").on("click", function () {
		$("#draggable-JS-01").show();
	});
});
$(document).ready(function () {
	$("#close01").on("click", function () {
		$("#draggable-JS-01").hide();
	});
});
/* Window -Blank */
$(document).ready(function () {
	$("#button02").on("click", function () {
		$("#draggable-JS-02").show();
	});
});
$(document).ready(function () {
	$("#close02").on("click", function () {
		$("#draggable-JS-02").hide();
	});
});
/* Error Messages */
$(document).ready(function () {
	$("#success").hide();
	$("#warning").hide();
	$("#danger").hide();
});
