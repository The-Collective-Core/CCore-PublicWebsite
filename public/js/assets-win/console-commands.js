const purge2 =
	"-------------------▒▒▌-------------<br>------------------▒░▒▒▌-------------<br>-----------------▒░░▒▒▒▌------------<br>----------------▒░░░▒▒▒▒▌-----------<br>---------------▒░░░░▒▒▒▒▒▌----------<br>--------------▒░░░░▒▒▒▒▒▒▒▌---------<br>-------------▒░░░░░▒▒▒▒▒▒▒▒▌--------<br>------------▒░░░░░░▒▒▒▒▒▒▒▒▒▌-------<br>-----------▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▌------<br>----------▒▒░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▓-----<br>----░▒---▒▒░░░░░░░░░░░░░░░░░░░░▒----<br>-----▒▒▒▒░░░░░░░░▐▁▐█▁░▒▒▐▁▐█▁░▒---<br>------▒▒▒▒░░░░░░░░░░░░▒▙░░░░░░░▒▒--<br>-------▒▒▒▒░░░░░░░░░░░▒▀▀░░░░░░▒▒---<br>--------▒▒▒▒░░░░░◀██████████▶░░░▒--<br>---------▒▒▒░░░░░░░░░░░░░░░░░░▒▒----<br>----------▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒-----<br>-----------░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒------<br>-----------░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒-------<br>-----------▒░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▌-----<br>---------▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▌----<br>--------▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌---<br>--------▒█▀▀█-█░░█-█▀▀█-█▀▀▀-█▀▀▒---<br>--------▒█░░█-█░░█-█▄▄▀-█░▀█-█▀▀▒---<br>--------▒█▀▀▀-░▀▀▀-▀░▀▀-▀▀▀▀-▀▀▀▒---";

class ConsoleHandler {
	constructor(unknownCommand) {
		this.commands = [];
		this.unknownCommand = unknownCommand;
	}
	add({ name, helpMsg, extendedHelp, run }) {
		this.commands.push({
			name: name,
			helpMsg: helpMsg,
			run: run,
			extendedHelp: extendedHelp,
		});
	}
	run(cmd) {
		const command = this.commands.find((c) => c.name == cmd.command);
		if (!command) {
			return this.unknownCommand;
		}
		return command.run(...cmd.arguments);
	}
	getHelp() {
		return this.commands
			.map((cmd) => {
				return cmd.name + ": " + cmd.helpMsg;
			})
			.join("<br>");
	}
}
const commandHandler = new ConsoleHandler("Unknown command");
commandHandler.add({
	name: "test",
	helpMsg: "This is a test command",
	extendedHelp: "This is a test command. <br> Usage: test",
	run: () => "You ran the test command!",
});
commandHandler.add({
	name: "test2",
	helpMsg: "This is a test2 command",
	extendedHelp: "This is a test2 command. <br> Usage: test",
	run: () => "You ran the test2 command!",
});
commandHandler.add({
	name: "help",
	helpMsg: "Its help lmao",
	extendedHelp: "This is the help. <br> Usage: help OR help [commandName]",
	run: (cmdName) => {
		if (!cmdName) {
			return commandHandler.getHelp();
		} else {
			const cmd = commandHandler.commands.find((c) => c.name == cmdName);
			if (!cmd) {
				return 'Unknown command "' + cmdName + "'";
			}
			return cmd.name + ": " + cmd.extendedHelp;
		}
	},
});
