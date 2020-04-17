class Application {
	constructor(id, name, events, iconOpts) {
		this.id = id;
		this.name = name;
		this.onOpen = events.onOpen;
		this.onClose = events.onClose;
		this.iconOpts = iconOpts;
		this.elm = document.getElementById(id);
	}
}
class AppController {
	constructor() {
		this.apps = [];
		this.icons = [];
		this.iconSpawnX = 10;
		this.iconSpawnY = 10;
	}
	add(id, name, events, iconOpts) {
		const app = new Application(id, name, events, iconOpts);
		const dropDown = $("#dropDownMenu");
		const self = this;
		//Setup bring to front on click
		app.elm.onmousedown = () => {
			self.apps.forEach((otherApp) => {
				otherApp.elm.style.zIndex = 1;
			});
			app.elm.style.zIndex = 2;
		};
		//Make app draggable
		$("#" + app.id).draggable({
			snap: ".application",
			containment: ".pages-stack",
			scroll: false,
		});
		//Make app closable
		const closeButton = app.elm.getElementsByClassName("btn close")[0];
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
		
		//Figure out positioning
		var savedPos = localStorage.getItem("iconPos");
		if (!savedPos) {
			savedPos = "{}";
			localStorage.setItem("iconPos", savedPos);
		}
		savedPos = JSON.parse(savedPos);
		if (savedPos[iconOpts.name]) {
			container.style.left = savedPos[iconOpts.name].left;
			container.style.top = savedPos[iconOpts.name].top;
		} else {
			container.style.left = this.iconSpawnX + "px";
			container.style.top = this.iconSpawnY + "px";
			this.iconSpawnY += 100;
		}
		this.icons.push({
			id: container.id,
			name: iconOpts.name,
		});
		container.ondblclick = () => {
			self.open(app.name);
		};
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
		$("#" + app.id)
			.removeClass("application-non-drag")
			.addClass("application");
		$("#" + app.id).show();
		app.onOpen();
	}
	close(appName) {
		const app = this.apps.find((ap) => ap.name == appName);
		$("#" + app.id)
			.removeClass("application")
			.addClass("application-non-drag");
		$("#" + app.id).hide();
		app.onClose();
	}
	saveIcons() {
		var toSave = {};
		this.icons.forEach((icon) => {
			var elm = document.getElementById(icon.id);
			toSave[icon.name] = {
				left: elm.style.left,
				top: elm.style.top,
			};
		});
		localStorage.setItem("iconPos", JSON.stringify(toSave));
	}
}
var appController = new AppController();

$(document).ready(initAppController);

function initAppController() {
	//Discord application
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
	//Command line app
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
	//Branch folder
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
	//Loadstar icon
	appController.add(
		"draggable-JS-blankApp",
		"lodestar",
		{
			onOpen: () => {},
			onClose: () => {},
		},
		{
			path: "/img/images/vector-img/desktop/Lodestar.gif",
			name: "LODESTAR",
		}
	);

	appController.open("corecli");
}

function saveIcons() {
	appController.saveIcons();
}

setInterval(saveIcons, 1000);
