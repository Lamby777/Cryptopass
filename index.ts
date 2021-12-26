// Password manager
"use strict";

// Imports
import baseX		from "base-x";
import {createHash}	from "crypto";
import * as prompt	from "prompt";

// Length of final output
const len = 20;

// Superset of Base58
const ALPHA80 = "123456789" +
				"ABCDEFGHJKLMNPQRSTUVWXYZ" +
				"abcdefghijkmnopqrstuvwxyz" +
				"!@#$%^&*()_+-=\[]/?<>.~";

// Not as special chars: !^&\[]/<>~

// Things to check for later
const specialChars = "!@#$%^&*()_+-=\[]/?<>.~".split("");
const verySpecialChars = "@#$%*()_+-=?.".split("");
const lowerBase58 = "abcdefghijkmnopqrstuvwxyz".split("");
const upperBase58 = "ABCDEFGHJKLMNPQRSTUVWXYZ".split("");
const numsBase58 = "123456789".split("");

const base80 = baseX(ALPHA80);



// I MEANT TEXT PROMPT, NOT GUI LOL
prompt.start();
prompt.get(["pass", "app"], (err: any, result: any) => {
	if (err) return err;
	console.log(makePass(result.pass, result.app));
});









// Functions

function makePass(master: string, loginfor: string): string {
	// Some people just can't decide naming conventions...
	loginfor = normalizeLoginfor(loginfor);
	let pass: string;
	
	do {
		pass = makePassHash(master, loginfor).substring(0, len-1);
	} while (!fitsCriteria(pass)) 
	
	return pass;
}

function normalizeLoginfor(loginfor: string): string {
	loginfor = loginfor.toLowerCase().trim().replaceAll(" ", "");
	return loginfor;
}

function fitsCriteria(pass: string): boolean {
	return (
		//specialChars.some(val => pass.includes(val)) &&
		verySpecialChars.some(val => pass.includes(val)) &&
		lowerBase58.some(val => pass.includes(val)) &&
		upperBase58.some(val => pass.includes(val)) &&
		numsBase58.some(val => pass.includes(val))
	);
}

function makePassHash(master: string, loginfor: string): string {
	return	base80.encode(
				Buffer.from(
					hash(master + loginfor)));
}

// "Borrowed" from... myself?
// Seriously, this code is from Carbonado.js
function hash(input: any, format?: string): string {
	return createHash("sha256")
		.update(input).digest(<any>(format ? format : "hex"));
}
