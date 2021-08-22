const program = require("commander");

program.version("1.0.0").description("Simple Password Generator");

program
	.option("-l, --length <number>", "length of the password")
	.option("-s, --save", "save password to password.txt")
	.option("-nn, --no-numbers", "no numbers")
	.option("-ns, --no-symbols", "no numbers")
	.parse();

const options = program.opts();

console.log(options);
