const purge2 =
	"-------------------▒▒▌-------------<br>------------------▒░▒▒▌-------------<br>-----------------▒░░▒▒▒▌------------<br>----------------▒░░░▒▒▒▒▌-----------<br>---------------▒░░░░▒▒▒▒▒▌----------<br>--------------▒░░░░▒▒▒▒▒▒▒▌---------<br>-------------▒░░░░░▒▒▒▒▒▒▒▒▌--------<br>------------▒░░░░░░▒▒▒▒▒▒▒▒▒▌-------<br>-----------▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▌------<br>----------▒▒░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▓-----<br>----░▒---▒▒░░░░░░░░░░░░░░░░░░░░▒----<br>-----▒▒▒▒░░░░░░░░▐▁▐█▁░▒▒▐▁▐█▁░▒---<br>------▒▒▒▒░░░░░░░░░░░░▒▙░░░░░░░▒▒--<br>-------▒▒▒▒░░░░░░░░░░░▒▀▀░░░░░░▒▒---<br>--------▒▒▒▒░░░░░◀██████████▶░░░▒--<br>---------▒▒▒░░░░░░░░░░░░░░░░░░▒▒----<br>----------▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒-----<br>-----------░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒------<br>-----------░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒-------<br>-----------▒░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▌-----<br>---------▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▌----<br>--------▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌---<br>--------▒█▀▀█-█░░█-█▀▀█-█▀▀▀-█▀▀▒---<br>--------▒█░░█-█░░█-█▄▄▀-█░▀█-█▀▀▒---<br>--------▒█▀▀▀-░▀▀▀-▀░▀▀-▀▀▀▀-▀▀▀▒---";

(function app() {
	var event = {
		init: function init() {
			view.$document.ready(this.onDomReady);
			view.$body
				.on("keyup", this.onKeyUp)
				.on("keydown", this.onKeyDown)
				.on("keypress", this.onKeyPress);
			this.initPrompt();
			view.$window.on("scroll touchmove mousewheel", this.onScroll);
		},
		onDomReady: function onDomReady() {
			view.initCursor();
		},
		initPrompt: function initPrompt() {
			view.$prompt
				.on("ctrlChar", this.onCtrlChar)
				.on("command", this.onCommand)
				.on("async", this.onAsync);
		},
		onCommand: function onCommand(e, c) {
			e.preventDefault();
			view.outputCommandResult(controller.executeCommand(c));
		},
		onAsync: function onAsync(e, d) {
			e.preventDefault();
			view.outputCommandResult(controller.getFeedArticles(d));
		},
		onCtrlChar: function onCtrlChar(e, t) {
			e.preventDefault();
			//console.log(`codename: ${t}`);
			switch (t.toLowerCase()) {
				case "backspace":
					view.deleteChar();
					break;
				case "delete":
					view.moveCursorForward();
					view.deleteChar();
					break;
				case "arrowleft":
					view.moveCursorBack();
					break;
				case "arrowright":
					view.moveCursorForward();
					break;
				case "arrowup":
					view.promptHistory(true);
					break;
				case "arrowdown":
					view.promptHistory(false);
					break;
				case "end":
					view.removeCursor();
					view.moveCursor(view.$prompt.text().length);
					break;
				case "home":
					view.moveCursor(0);
					break;
				case "pagedown":
					view.scrollPage(1);
					break;
				case "pageup":
					view.scrollPage(-1);
					break;
				case "enter":
					view.enterCommandLine();
					break;
			}
		},
		onKeyUp: function onKeyUp(e) {
			e.preventDefault();
		},
		onKeyDown: function onKeyDown(e) {
			e.preventDefault();
			view.typeChar(e.key);
		},
		onKeyPress: function onKeyPress(e) {
			e.preventDefault();
		},
		onScroll: function onScroll(e) {
			if (view.isScrolling === true) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
	};

	var view = {
		init: function init() {
			this.$document = $(document);
			this.$window = $(window);
			this.$scroll = $("html, body");
			this.$body = $("body");
			this.$terminal = $("#terminal");
			if (this.$terminal.length === 0) {
				this.$body.append('<div id="terminal"></div>');
				this.$terminal = $("#terminal");
			}
			this.initTerminal();
		},
		initTerminal: function initTerminal() {
			this.$cli = $("#cli");
			if (this.$cli.length === 0) {
				this.clearTerminal();
			}
			this.$prompt = $("#cli .prompt");
			this.$history = false;
			this.curPos = 0;
			this.isScrolling = false;
			this.scrollSpeed = 1000;
		},
		clearTerminal: function clearTerminal() {
			this.$terminal.html(
				'<div class="print"></div><div id="cli"><span class="label"></span><span class="prompt"></span></div>'
			);
			this.initTerminal();
			event.initPrompt();
		},
		typeChar: function typeChar(c) {
			var realChr = controller.triggerCtrlCodes(c);
			if (realChr != "") {
				this.removeCursor();
				var _p = this.$prompt.html();
				var pright =
					this.curPos == _p.length
						? this.getCursor()
						: this.getCursor(_p.substring(this.curPos, this.curPos + 1)) +
						  _p.substring(this.curPos + 1);
				this.$prompt.html(_p.substring(0, this.curPos) + realChr + pright);
				this.curPos = this.curPos + 1;
			}
		},
		deleteChar: function deleteChar() {
			if (this.curPos > 0) {
				this.removeCursor();
				var _p2 = this.$prompt.html();
				this.$prompt.html(
					_p2.substring(0, this.curPos - 1) + _p2.substring(this.curPos)
				);
				this.curPos = this.curPos - 1;
				this.setCursor();
			}
		},
		moveCursorBack: function moveCursorBack() {
			if (this.curPos > 0) {
				this.removeCursor();
				this.curPos = this.curPos - 1;
				this.setCursor();
			}
		},
		moveCursorForward: function moveCursorForward() {
			this.removeCursor();
			if (this.curPos < this.$prompt.text().length) {
				this.curPos = this.curPos + 1;
			}
			this.setCursor();
		},
		moveCursor: function moveCursor() {
			var pos =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: 0;
			this.curPos = pos;
			this.setCursor();
		},
		initCursor: function initCursor() {
			var char =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: "&nbsp;";
			this.removeCursor();
			this.curPos = 0;
			this.$history = false;
			this.$prompt.html(this.getCursor(char));
		},
		setCursor: function setCursor() {
			if (this.curPos >= 0) {
				this.removeCursor();
				var _p3 = this.$prompt.html();
				this.$prompt.html(
					_p3.substring(0, this.curPos) +
						(this.curPos == _p3.length
							? this.getCursor()
							: this.getCursor(
									_p3.substring(this.curPos, this.curPos + 1)
							  )) +
						_p3.substring(this.curPos + 1)
				);
			} else {
				if (p.length === 0) {
					this.initCursor();
				}
			}
		},
		getCursor: function getCursor() {
			var char =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: "&nbsp;";
			return '<span class="cursor">' + char + "</span>";
		},
		removeCursor: function removeCursor() {
			var $cur = this.$prompt.children(".cursor");
			var chr = $cur.html();
			if (chr == "&nbsp;") {
				$cur.remove();
			} else {
				this.$prompt.html(this.$prompt.text());
			}
		},
		printTerminal: function printTerminal(txt) {
			var cssClasses =
				arguments.length > 1 && arguments[1] !== undefined
					? arguments[1]
					: "command";
			this.$cli
				.prev()
				.append('<div class="' + cssClasses + '">' + txt + "</div>");
			this.$terminal.scrollTop(this.$terminal[0].scrollHeight);
		},
		enterCommandLine: function enterCommandLine() {
			var p = $.trim(this.$prompt.text());
			this.printTerminal(p, "command label");
			controller.triggerCommand(p);
			this.initCursor();
		},
		outputCommandResult: function outputCommandResult(out) {
			this.printTerminal(out, "command output");
		},
		promptHistory: function promptHistory() {
			var prev =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: true;
			if (this.$history === false) {
				this.$history = prev
					? $("#terminal .print .command.label").last()
					: $("#terminal .print .command.label").first();
			} else {
				this.$history = prev
					? this.$history.prevAll(".command.label").first()
					: this.$history.nextAll(".command.label").first();
			}
			if (this.$history.length) {
				var h = this.$history.text();
				this.$prompt.html(h);
				this.moveCursor(h.length);
			} else {
				this.initCursor();
			}
		},
		scrollPage: function scrollPage(direction) {
			var _this = this;
			if (this.isScrolling === false) {
				this.isScrolling = true;
				direction =
					$.isNumeric(direction) && Math.abs(direction) === 1
						? direction
						: 1;
				var dh = this.$document.height(),
					wh = this.$window.height(),
					offset = this.$window.scrollTop() + wh * direction,
					adjusted = offset < 0 ? 0 : offset + wh > dh ? dh - wh : offset;
				view.$scroll.animate(
					{
						scrollTop: adjusted,
					},

					offset !== adjusted
						? Math.floor(this.scrollSpeed / 6.6666)
						: this.scrollSpeed,
					function () {
						_this.isScrolling = false;
					}
				);

				console.log(
					"'scrolling' (" +
						this.isScrolling +
						") speed: " +
						this.scrollSpeed +
						"; " +
						offset
				);
			}
		},
	};

	var controller = {
		triggerCtrlCodes: function triggerCtrlCodes(codename) {
			var r = "";
			if (codename.length > 1) {
				view.$prompt.trigger("ctrlChar", [codename]);
			} else {
				r = codename;
			}
			return r;
		},
		triggerCommand: function triggerCommand() {
			var prompt =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: "";
			view.$prompt.trigger("command", this.getCommand(prompt));
		},
		executeCommand: function executeCommand() {
			var cmd =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: {};
			var out = "";
			// out = commandHandler.run(cmd);
			// return out;
			switch (cmd.command) {
				/* CMD- Null */
				case "":
					view.clearTerminal();
					out = "Type 'help' for more information.";
					break;
				default:
					out = "'" + cmd.command + "' command not found";
					break;
				/* CMD- Clear */
				case "cls":
				case "clear":
					view.clearTerminal();
					out = "Type 'help' for more information.";
					break;
				/* CMD- Exit 
		  case "remove":
			view.$terminal.remove();
			break;*/
				/* CMD- Clear */
				case "about-devs":
					out =
						'Made by Timothy Howard (<a href="https://codepen.io/timhow38" target="_blank">about.me</a>)<br>Copyright (c) 2018 Timothy Howard';
					break;
				/* CMD- Help */
				case "?":
				case "h":
				case "help":
					out =
						'<table id="tablePreview" class="table table-hover table-sm"> <thead> <tr> <th>Description</th> <th>Command Examples</th> </tr></thead> <tbody> <tr> <td>Find Commands</td><td>[help] - [?] - [h]</td></tr> <tr> <td>Reload Site</td><td>[refresh]</td></tr><tr> <td>Clear Terminal</td><td>[cls] - [clear]</td></tr><tr> <td>Open/Close App</td><td>[open/close app]</td></tr><tr> <td>Application List</td><td>[app-list]</td></tr><tr> <td>About DEVTeam</td><td>[about-devs]</td></tr><tr> <td>About Collective</td><td>[about-core]</td></tr><tr> <td>About Branches</td><td>[about-branches]</td></tr><tr> <td>Calculate</td><td>[calc 1+2]</td></tr><tr> <td>Google Search</td><td>[google/search Item]</td></tr></tbody> </table>';
					break;
				/* CMD- Calc */
				case "calc":
					out = "" + eval(cmd.arguments.join(" "));
					break;
				/* CMD- Google Search */
				case "search":
				case "google":
					window.location.href = encodeURI(
						"https://www.google.com/search?q=" + cmd.arguments.join(" ")
					);
					break;
				/* CMD- Refresh Site */
				case "refresh":
					window.location = window.location.href + "?eraseCache=true";
					break;
				/* CMD- Google Search */
				case "goto":
				case "web":
					window.location.href = encodeURI("" + cmd.arguments[0]);
					break;
				//App-AppList
				case "app-list":
					out =
						'<table id="tablePreview" class="table table-hover table-sm"> <thead> <tr> <th>App Name</th> <th>Description</th> </tr></thead> <tbody> <tr> <td>CoreCli</td><td>Terminal Interface</td></tr><tr> <td>Discord</td><td>Collective Discord</td></tr></tbody> </table><table id="tablePreview" class="table table-hover table-sm"> <thead> <tr> <th>Branch Apps</th> <th>Description</th> </tr></thead> <tbody> <tr> <td>Diplomacy</td><td>HARMONIC -Branch</td></tr><tr> <td>Tactical</td><td>SWARM -Branch</td></tr><tr> <td>Logistics</td><td>LOGISTICS -Branch</td></tr><tr> <td>Science</td><td>R&amp;D -Branch</td></tr></tbody> </table>';
					break;
				//Handle app open commands
				case "open":
					appController.open(cmd.arguments[0]);
					break;
				//Handle app close commands
				case "close":
					appController.close(cmd.arguments[0]);
					break;
				//App Memes
				case "purge2":
					out = purgeTest;
					// '<div class="language-ascii-art"><br class="zaff1";/> ▒▒▌<br class="zaff2";/> ▒░▒▒▌<br class="zaff3";/> ▒░░▒▒▒▌<br class="zaff4";/> ▒░░░▒▒▒▒▌<br class="zaff5";/> ▒░░░░▒▒▒▒▒▌<br class="zaff6";/> ▒░░░░▒▒▒▒▒▒▒▌<br class="zaff7";/> ▒░░░░░▒▒▒▒▒▒▒▒▌<br class="zaff8";/> ▒░░░░░░▒▒▒▒▒▒▒▒▒▌<br class="zaff9";/> ▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▌<br class="zaff10";/> ▒▒░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▓<br class="zaff11";/> ░▒ ▒▒░░░░░░░░░░░░░░░░░░░░▒<br class="zaff12";/> ▒▒▒▒░░░░░░░░▐▁▐█▁░▒▒▐▁▐█▁░▒ <br class="zaff13";/> ▒▒▒▒░░░░░░░░░░░░▒▙░░░░░░░▒▒<br class="zaff14";/> ▒▒▒▒░░░░░░░░░░░▒▀▀░░░░░░▒▒<br class="zaff15";/> ▒▒▒▒░░░░░◀██████████▶░░░▒<br class="zaff16";/> ▒▒▒░░░░░░░░░░░░░░░░░░▒▒<br class="zaff17";/> ▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒<br class="zaff18";/> ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒<br class="zaff19";/> ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒<br class="zaff20";/> ▒░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▌<br class="zaff21";/> ▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▌<br class="zaff22";/> ▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌<br class="zaff23";/> ▒█▀▀█ █░░█ █▀▀█ █▀▀▀ █▀▀▒ <br class="zaff24";/> ▒█░░█ █░░█ █▄▄▀ █░▀█ █▀▀▒ <br class="zaff25";/> ▒█▀▀▀ ░▀▀▀ ▀░▀▀ ▀▀▀▀ ▀▀▀▒ </div>';
					break;
				case "honk":
					out =
						'<img style="width:6em;" src="../../img/images/commands/honk.png"></img>';
					break;
				case "purge":
					out =
						'<img style="width:2em;margin-left: -9px;transform: rotate(90deg);" src="../../img/images/commands/purge.png"></img>';
					break;
				case "app-desc":
					out = appController.getAppDesc(cmd.arguments[0]);
					break;
				case "app-list-all":
					out = appController.listApps();
					break;
			}
			return out;
		},
		getCommand: function getCommand() {
			var prompt =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: "";
			var arrPrompt = prompt.split(" ");
			return {
				command: arrPrompt.shift().toLowerCase(),
				arguments: arrPrompt.filter(function (arg) {
					return arg.length > 0;
				}),
			};
		},
		getFeedArticles: function getFeedArticles(json) {
			var _this2 = this;
			var out = "";
			try {
				if ($.isArray(json.query.results.item)) {
					$.each(json.query.results.item, function (i, item) {
						out =
							out +
							'<a href="' +
							item.link +
							'" title="' +
							_this2.encodeHtmlEntity(item.description) +
							'">' +
							item.title +
							"</a><br>";
					});
				} else {
					out = "Error: No feed articles found.";
				}
			} catch (e) {
				out =
					"Error: Invalid feed. Please use a valid url.<br><i>(" +
					e +
					")</i>";
			}
			return out;
		},
		getFeedYQL: function getFeedYQL(url) {
			var yql =
				"https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22" +
				encodeURI(url) +
				"%3Fformat%3Dxml%22&format=json&diagnostics=true&callback=";
			$.getJSON(
				yql,
				function (data) {
					view.$prompt.trigger("async", data);
				},
				"jsonp"
			);
		},
		decodeHtmlEntity: function decodeHtmlEntity(str) {
			return str.replace(/&#(\d+);/g, function (match, dec) {
				return String.fromCharCode(dec);
			});
		},
		encodeHtmlEntity: function encodeHtmlEntity(str) {
			var buf = [];
			for (var i = str.length - 1; i >= 0; i--) {
				buf.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
			}
			return buf.join("");
		},
	};

	(function init() {
		view.init();
		event.init();
	})();
})();
