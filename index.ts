// Password manager
"use strict";

// Imports
import baseX		from "base-x";
import {createHash}	from "crypto";

// Length of final output
const len = 20;

const ALPHA80 = "123456789" +
				"ABCDEFGHJKLMNPQRSTUVWXYZ" +
				"abcdefghijkmnopqrstuvwxyz" +
				"!@#$%^&*()_+-=\[]/?<>.~";

const base80 = baseX(ALPHA80);

console.log(makePass("yo", "noob.com"));

function makePass(master: string, loginfor: string): string {
	let pass: string;
	
	do {
		pass = makePassHash(master, loginfor).substring(0, len-1);
	} while (!fitsCriteria(pass)) 
	
	return "";
}

function fitsCriteria(pass: string): boolean {
	return false;
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
