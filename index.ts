// Password manager
"use strict";

// Imports
import baseX		from "base-x";
import {createHash}	from "crypto";

const ALPHA79 = "123456789" +
				"ABCDEFGHJKLMNPQRSTUVWXYZ" +
				"abcdefghijkmnopqrstuvwxyz" +
				"!@#$%^&*()_+-=\[]/?<>.";

const base79 = baseX(ALPHA79);

console.log(makePass("yo", "noob.com"));

function makePass(master: string, loginfor: string): string {
	return	base79.encode(
				Buffer.from(
					hash(master + loginfor)));
}

// "Borrowed" from... myself?
// Seriously, this code is from Carbonado.js
function hash(input: any, format?: string): string {
	return createHash("sha256")
		.update(input).digest(<any>(format ? format : "hex"));
}
