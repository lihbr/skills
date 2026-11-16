# Global rules

My defaults for every project. A repo's own AGENTS.md or CLAUDE.md wins on repo facts: commands, layout, deploys, conventions.

## PRs

- PR body: the problem in plain words, then what changed, in about 120 words. Trailer lines (proof, review, byline) don't count. Add a before/after table when behavior changes. No "How to QA" section, no file list.
- If a repo's AGENTS.md says to keep PRs as drafts or never merge, follow it, unless I said "full send" (merge allowed) or "full stop" (ready PR, no merge).
- Changes asked for in one thread go in one PR, unless I ask for more.
- When a PR on a `github.com/prismicio` or `github.com/prismicio-community` repo is waiting only for human approval, post the review request to `#pull-requests` with `luciebot` if there isn't one yet, unless your brief says not to post.

## Tests

- Prefer a few strong end-to-end or route-level tests to new unit tests. When a skill says to add one focused test, extend an e2e test if the repo has e2e set up.
- A test must fail when the behavior breaks and still pass after a refactor. Assert behavior (requests sent, state, stored rows), not copy or layout. Mock external services only, never our own code.
- If I ask for e2e and the package has none, set up the repo's existing e2e tool for it. Don't simulate e2e in unit tests.

## Code

- Before writing a helper, search the repo and its support packages for one that exists.
- Keep logic that has one caller inside that caller. No new module for it.
- Write comments only for a non-obvious "why". Match the comment density of the code around it.

## Writing to me

- Start with a plain summary of a few sentences. Put details after it, or give them on request.
- The first time a mechanism comes up (an Auth0 Action version, a device code, an SSM parameter), explain it in one plain sentence.
- Run `10x-simpler-prose` and `unslop` on anything long I will read: reports, plans, Notion pages, PR bodies.

## Facts and autonomy

- Say how you know each claim about prod or another system. If you inferred it, label it unverified and say how to check. Never hand me a check you can run yourself.
- A question or musing from me ("can't we…", "I guess we could…") is a discussion, not a go-ahead to launch, push, or merge.
- Do safe, reversible follow-ups without asking: rerun a workflow, update a plan or status doc you own, restart a failed thread.
- Ask first before anything irreversible or outside the repo: prod changes, deleting data, posting as me.
- Never rewrite or push someone else's commits under my name. Use the `takeover` or `modernize` skill, which keeps authors.

## Secrets and machines

- Ask for secrets with `request_secret` (`delivery: "file"` for commands). Never ask me to paste keys, tokens, or passwords in chat.
- Never touch my real macOS keychain. Tests use a temp keychain file.
- I work on two machines: this MacBook and a Windows workstation over ssh. When you check data or usage, include both.
