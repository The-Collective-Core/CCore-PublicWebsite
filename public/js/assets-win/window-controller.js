class Application {
	constructor(id, name, opts) {
		this.id = id;
		this.name = name;
		this.onOpen = opts.onOpen;
		this.onClose = opts.onClose;
	}
}
class AppController {
	constructor() {
		this.apps = [];
	}
	add(id, name, opts) {
		this.apps.push(new Application(id, name, opts));
	}
	open(appName) {
		const app = this.apps.find((ap) => ap.name == appName);
		$("#" + app.id).show();
		app.onOpen();
	}
	close(appName) {
		const app = this.apps.find((ap) => ap.name == appName);
		$("#" + app.id).hide();
		app.onClose();
	}
	init() {
		const dropDown = $("#dropDownMenu");
		this.apps.forEach((app) => {
			$("#" + app.id).draggable({
				snap: ".application",
				containment: ".pages-stack",
				scroll: false,
			});
			var btn = document.createElement("button");
			btn.id = "app-button-" + app.name;
			btn.classList.add("dropdown-item");
			btn.type = "button";
			btn.innerText = app.name.toUpperCase();
			$("#" + btn.id).on("click", app.open);
			dropDown.append(btn);
			this.close(app.name);
		});
		this.open("corecli");
	}
}
var appController = new AppController();
appController.add("draggable-JS-00", "discord", {
	onOpen: () => {},
	onClose: () => {},
});
appController.add("draggable-JS-01", "corecli", {
	onOpen: () => {},
	onClose: () => {
		// view.clearTerminal();
		out = "Type 'help' for more information.";
	},
});
appController.add("draggable-JS-02", "unnamed", {
	onOpen: () => {},
	onClose: () => {},
});

$(document).ready(initAppController);

function initAppController() {
	appController.init();
}
