/* Menu Show/Hide */
$(function () {
	$("#draggable-JS-03").draggable({
		containment: ".pages-stack",
		scroll: false,
		grid: [20, 20],
	});
	$("#draggable-JS-04").draggable({
		containment: ".pages-stack",
		scroll: false,
		grid: [20, 20],
	});
	$("#draggable-JS-05").draggable({
		containment: ".pages-stack",
		scroll: false,
		grid: [20, 20],
	});
	$("#draggable-JS-06").draggable({
		containment: ".pages-stack",
		scroll: false,
		grid: [20, 20],
	});
	//CoreCLI
	$("#draggable-JS-07").draggable({
		containment: ".pages-stack",
		scroll: false,
		grid: [20, 20],
	});
	//CoreCLI
	$("#draggable-JS-08").draggable({
		containment: ".folder1",
		scroll: false,
		grid: [20, 20],
	});
	//CoreCLI
	$("#draggable-JS-09").draggable({
		containment: ".folder1",
		scroll: false,
		grid: [20, 20],
	});
});

$(document).ready(function () {
	$("#draggable-JS-01").show();
	$("#draggable-JS-03").show();
	$("#draggable-JS-04").show();
	$("#draggable-JS-05").show();
	$("#draggable-JS-06").show();
	$("#draggable-JS-07").show();
	$("#draggable-JS-08").show();
	$("#draggable-JS-09").show();
});
/**/
/* Window -Discord */
$(document).ready(function () {
	$("#draggable-JS-03").on("dblclick", function () {
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
	$("#draggable-JS-07").on("dblclick", function () {
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
	$("#draggable-JS-05").on("dblclick", function () {
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
