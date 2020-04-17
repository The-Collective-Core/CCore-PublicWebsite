class Application {
	constructor(id, name, events, iconOpts) {
		this.id = id;
		this.name = name;
		this.onOpen = events.onOpen;
		this.onClose = events.onClose;
		this.iconOpts = iconOpts;
	}
}
class AppController {
	constructor() {
		this.apps = [];
		this.iconSpawnX = 10;
		this.iconSpawnY = 10;
	}
	add(id, name, events, iconOpts) {
		const app = new Application(id, name, events, iconOpts);
		const dropDown = $("#dropDownMenu");
		const self = this;
		//Make app dragable
		$("#" + app.id).draggable({
			snap: ".application",
			containment: ".pages-stack",
			scroll: false,
		});
		//Make app closable
		const closeButton = document
			.getElementById(id)
			.getElementsByClassName("btn close")[0];
		closeButton.onclick = () => {
			self.close(app.name);
		};
		//Create top right drop down element
		var btn = document.createElement("button");
		btn.id = "app-button-" + app.name;
		btn.classList.add("dropdown-item");
		btn.type = "button";
		btn.innerText = app.name.toUpperCase();
		btn.onclick = () => {
			self.open(app.name);
		};
		dropDown.append(btn);
		//Create desktop icon
		const container = document.createElement("div");
		container.id = "app-icon-" + app.name;
		container.classList.add("desk-prop");
		const cardContainer = document.createElement("div");
		cardContainer.classList.add("card");
		container.appendChild(cardContainer);
		const img = document.createElement("img");
		img.classList.add("card-img-top");
		img.classList.add("mx-auto");
		img.classList.add("d-block");
		img.src = iconOpts.path;
		img.alt = "Card image cap";
		cardContainer.appendChild(img);
		const cardBody = document.createElement("div");
		cardBody.classList.add("card-body");
		const cardText = document.createElement("p");
		cardText.classList.add("card-text");
		cardText.innerText = iconOpts.name;
		cardBody.appendChild(cardText);
		cardContainer.appendChild(cardBody);
		document.getElementById("desktop-icons").appendChild(container);
		container.style.left = this.iconSpawnX + "px";
		container.style.top = this.iconSpawnY + "px";
		container.ondblclick = () => {
			self.open(app.name);
		};
		this.iconSpawnY += 100;
		$("#app-icon-" + app.name).draggable({
			containment: ".pages-stack",
			scroll: false,
			grid: [20, 20],
		});
		this.apps.push(app);
		this.close(app.name);
	}
	open(appName) {
		const app = this.apps.find((ap) => ap.name == appName);
		if (!app) {
			console.log("Unknown app %s", appName);
			return;
		}
		$("#" + app.id).show();
		app.onOpen();
	}
	close(appName) {
		const app = this.apps.find((ap) => ap.name == appName);
		$("#" + app.id).hide();
		app.onClose();
	}
	init() {
		this.apps.forEach((app) => {});
		this.open("corecli");
	}
}
var appController = new AppController();

$(document).ready(initAppController);

function initAppController() {
	// appController.init();
	appController.add(
		"draggable-JS-00",
		"discord",
		{
			onOpen: () => {},
			onClose: () => {},
		},
		{
			path: "/img/images/vector-img/desktop/icon-discord.svg",
			name: "DISCORD",
		}
	);
	appController.add(
		"draggable-JS-01",
		"corecli",
		{
			onOpen: () => {},
			onClose: () => {
				// view.clearTerminal();
				out = "Type 'help' for more information.";
			},
		},
		{
			path: "/img/images/vector-img/desktop/centralmind.png",
			name: "Cental Mind",
		}
	);
	appController.add(
		"draggable-JS-02",
		"unnamed",
		{
			onOpen: () => {},
			onClose: () => {},
		},
		{
			path: "/img/images/vector-img/desktop/icon-branches.svg",
			name: "BRANCHES",
		}
	);
	appController.add(
		"draggable-JS-blankApp",
		"empty",
		{
			onOpen: () => {},
			onClose: () => {},
		},
		{
			path: "/img/images/vector-img/desktop/Lodestar.gif",
			name: "LODESTAR",
		}
	);
	appController.add(
		"draggable-JS-blankApp",
		"empty",
		{
			onOpen: () => {},
			onClose: () => {},
		},
		{
			path: "/img/images/vector-img/desktop/chip.gif",
			name: "CHIP.exe",
		}
	);
	appController.open("corecli");
}
