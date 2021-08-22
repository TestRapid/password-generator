const program = require("commander");
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const fs = require("fs");
const path = require("path");
const os = require("os");

const log = console.log;

// setting the version and descrition
program.version("1.0.0").description("Simple Password Generator");

// setting arg variables
program
	.option("-l, --length <number>", "length of the password", 8)
	.option("-s, --save", "save password to password.txt")
	.option("-nn, --no-numbers", "no numbers")
	.option("-ns, --no-symbols", "no numbers")
	.parse();

// getting the variables
const { length, save, numbers, symbols } = program.opts();

// generating password
const generatedPassword = createPassword(length, numbers, symbols);

// saving password
if (save) {
	savePassword(generatedPassword);
}

// copy to clipboard
clipboardy.writeSync(generatedPassword);

// logging the password
log(chalk.blue(`Generated Password : `) + chalk.bold(generatedPassword));
log(chalk.yellow(`Password is copied to clipboard`));

// functions
function createPassword(length = 8, hasNumbers = true, hasSymbols = true) {
	const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*_-+=";

	let chars = alpha;
	hasNumbers ? (chars += numbers) : "";
	hasSymbols ? (chars += symbols) : "";

	let password = "";
	for (let i = 0; i < length; i++) {
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return password;
}
function savePassword(password) {
	fs.open(path.join(__dirname, "passwords.txt"), "a", 666, (e, id) => {
		fs.write(id, password + os.EOL, null, "utf-8", () => {
			fs.close(id, () => {
				console.log(chalk.green(`Password has saved to passwords.txt`));
			});
		});
	});
}
