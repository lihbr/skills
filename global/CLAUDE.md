# Global rules

My defaults for every project. A repo's own rules win: its CLAUDE.md, AGENTS.md, Cursor rules, and PR template. When they conflict on safety, the stricter rule wins.

## PRs

- Before opening a PR, read the repo's AGENTS.md. Its draft and merge rules apply to you, even when they are written for Cursor. Override them only when I said "full send" (merge allowed) or "full stop" (ready PR, no merge).
- PR body: the problem in plain words, then what changed, in about 120 words. Trailer lines (proof, review, byline) don't count. Add a before/after table when behavior changes. No "How to QA" section and no file list, unless the repo's PR template asks for them.
- Changes asked for in one thread go in one PR, unless I ask for more. Coordinator threads are the exception.
- When a non-draft PR you opened on a `github.com/prismicio` or `github.com/prismicio-community` repo waits only for human approval, search `#pull-requests` for its URL. If it isn't there, post the review request with `luciebot`. Skip this when your brief says not to post.

## Tests

- Prefer a few strong end-to-end or route-level tests to new unit tests. When a skill says to add one focused test, extend an e2e test if the package has e2e set up and you can run it locally.
- A test must fail when the behavior breaks and still pass after a refactor. Assert behavior (requests sent, state, stored rows), not copy or layout. Mock only services outside this repo.
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

- Say how you know each claim about prod or another system. If you inferred it, label it unverified and say how to check. If a read-only check needs only access you already have, run it instead of handing it to me. Never write to prod to verify something.
- A question or musing from me ("can't we…", "I guess we could…") is a discussion, not a go-ahead to launch, push, or merge.
- Do these without asking: rerun a failed CI check on your own PR branch, update a plan or status doc you own, and restart a failed thread after checking what it already pushed or posted.
- Ask first before anything irreversible or outside the repo: prod changes, deploy or release workflows, deleting data, and posting as me in Slack, email, or Notion. GitHub activity that a skill asks for is fine.
- Keep the original authors when you rebase someone else's commits (`takeover`, `modernize`). Ask before force-pushing a branch you didn't create, unless I asked you to modernize or take over that PR.

## Secrets and machines

- In T3, ask for secrets with `request_secret` (`delivery: "file"` for commands). Elsewhere, ask me to put them in a file. Never ask me to paste keys, tokens, or passwords in chat.
- Never touch my real macOS keychain. Tests use a temp keychain file.
- I use two machines: this MacBook and a Windows workstation over ssh. When you check agent usage or token data, include both.
