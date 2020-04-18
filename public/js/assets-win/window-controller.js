class Application {
	constructor(opts) {
		this.id = opts.id;
		this.name = opts.name;
		this.onOpen = opts.onOpen;
		this.onClose = opts.onClose;
		this.appDesc = opts.appDesc;
		this.iconOpts = {
			name: opts.iconName,
			path: opts.iconPath,
		};
		this.elm = document.getElementById(this.id);
	}
}
class AppController {
	constructor() {
		this.apps = [];
		this.icons = [];
		this.iconSpawn = {};
	}
	add(opts) {
		const iconOpts = {
			name: opts.iconName,
			path: opts.iconPath,
		};
		const app = new Application(opts);
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
		const parentElm = document.getElementById(opts.iconParent);
		if (!parentElm) {
			debugger;
		}
		parentElm.appendChild(container);

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
			if (!this.iconSpawn[opts.iconParent]) {
				this.iconSpawn[opts.iconParent] = {
					x: 20,
					y: 35,
				};
			}
			const currentPos = this.iconSpawn[opts.iconParent];
			container.style.left = currentPos.x + "px";
			container.style.top = currentPos.y + "px";
			currentPos.x += opts.iconXDelta || 0;
			currentPos.y += opts.iconYDelta || 0;
		}
		this.icons.push({
			id: container.id,
			name: iconOpts.name,
		});
		container.ondblclick = () => {
			self.open(app.name);
		};
		$("#app-icon-" + app.name).draggable({
			containment: "#" + opts.iconParent,
			scroll: false,
			grid: [20, 20],
		});
		this.apps.push(app);
		const dropDownBtn = document.createElement("p");
		dropDownBtn.innerText = app.name;
		dropDownBtn.classList.add("dropdown-item");
		dropDownBtn.onclick = () => {
			self.open(app.name);
		};
		document.getElementById("context-menu").appendChild(dropDownBtn);
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
		if (!app) {
			console.log("Unknown app %s", appName);
			return;
		}
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
	getAppDesc(appName) {
		const app = this.apps.find((ap) => ap.name == appName);
		if (!app) {
			return 'Unknown application "' + appName + '"';
		}
		return app.appDesc;
	}
	listApps() {
		return this.apps.map((app) => app.name).join("\n");
	}
}
var appController = new AppController();

$(document).ready(initAppController);

function initAppController() {
	//Discord application
	appController.add({
		id: "draggable-JS-00",
		name: "discord",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/icon-discord.svg",
		iconName: "DISCORD",
		iconParent: "desktop-icons",
		iconYDelta: 100,
		appDesc: "A cool app description",
	});
	//Command line app
	appController.add({
		id: "draggable-JS-01",
		name: "corecli",
		onOpen: () => {},
		onClose: () => {
			// view.clearTerminal();
			out = "Type 'help' for more information.";
		},
		iconPath: "/img/images/vector-img/desktop/centralmind.png",
		iconName: "Cental Mind",
		iconParent: "desktop-icons",
		iconYDelta: 100,
		appDesc: "An EVEN cooler app description!!!",
	});
	//Branch folder
	appController.add({
		id: "draggable-JS-02",
		name: "branches",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/icon-branches.svg",
		iconName: "BRANCHES",
		iconParent: "desktop-icons",
		iconYDelta: 100,
		appDesc: "A cool app description",
	});
	//Loadstar icon
	appController.add({
		id: "draggable-JS-blankApp",
		name: "lodestar",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/Lodestar.gif",
		iconName: "LODESTAR",
		iconParent: "desktop-icons",
		iconYDelta: 100,
		appDesc: "A cool app description",
	});
	appController.add({
		id: "draggable-JS-blankApp",
		name: "chip",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/branches/RenderRD.png",
		iconName: "Chip",
		iconParent: "desktop-icons",
		iconYDelta: 100,
		appDesc: "A cool app description",
	});
	appController.add({
		id: "draggable-JS-blankApp",
		name: "science0",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/navBranchRD.svg",
		iconName: "Science0",
		iconParent: "sub-folder-0",
		iconXDelta: 75,
		appDesc: "A cool app description",
	});
	appController.add({
		id: "draggable-JS-blankApp",
		name: "science1",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/navBranchTact.svg",
		iconName: "Science1",
		iconParent: "sub-folder-0",
		iconXDelta: 75,
		appDesc: "A cool app description",
	});

	appController.open("corecli");
}

function saveIcons() {
	appController.saveIcons();
}

setInterval(saveIcons, 1000);
