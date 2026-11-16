#!/usr/bin/env node
// Claude Code PreToolUse hook for Bash. Blocks two mistakes that kept coming
// back even with written rules:
// 1. A second "Generated with [Claude Code](...)" byline in a PR body.
// 2. Reading or writing the real macOS keychain with `security`.
// Exit 2 blocks the call and shows stderr to the agent. Anything else passes.
import { readFileSync } from "node:fs";

let command = "";
try {
	command = JSON.parse(readFileSync(0, "utf8")).tool_input?.command ?? "";
} catch {
	process.exit(0);
}

const block = (reason) => {
	process.stderr.write(`Blocked by guard-bash hook: ${reason}\n`);
	process.exit(2);
};

if (/\bgh\s+(pr\s+(create|edit|comment)|api)\b/.test(command)) {
	let text = command;
	for (const [, path] of command.matchAll(/(?:--body-file|--field|-F)[=\s]+["']?(?:body=@)?["']?([^\s"']+)/g)) {
		try {
			text += readFileSync(path, "utf8");
		} catch {}
	}
	if (/Generated with \[Claude Code\]\(/.test(text)) {
		block(
			"the PR text has a 'Generated with Claude Code' line. file-pr's 'Created with <model> in <harness>.' line is the only byline. Remove the other one and retry.",
		);
	}
}

const keychain =
	/(^|[;&|(]\s*|sudo\s+|\/)security\s+(add-|delete-|find-(generic|internet)-password|import|export|unlock-keychain|default-keychain|set-keychain)/m;
const tempKeychain = /(\/tmp\/|\/var\/folders\/|\$\{?TMPDIR|mktemp)/;
if (keychain.test(command) && !(tempKeychain.test(command) && /\.keychain/.test(command))) {
	block(
		"this touches the real macOS keychain. Use a temp keychain file (security create-keychain -p \"\" \"$TMPDIR/test.keychain\") and pass its path to every security call.",
	);
}
