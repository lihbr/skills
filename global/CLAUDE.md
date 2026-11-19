# Global rules

- Repo rules (CLAUDE.md, AGENTS.md, Cursor rules) win on safety, CI, and merging. Mine win on style: code layout, comments, tests, and PR bodies.

## Code and tests

- Make the smallest change that does the task. No refactors, new abstractions, options, or runtime dependencies. If you think one is needed, ask me.
- Search the repo before writing a helper. Keep logic at its call site until a second caller needs it.
- Avoid comments. Add one only for a non-obvious why. Before you call a PR ready, reread the diff and delete the rest.
- Prefer a few end-to-end or route-level tests to unit tests. If I ask for e2e and the package has none, set up the repo's e2e tool. Don't simulate e2e in unit tests.
- A test fails when the behavior breaks and passes after a refactor. Assert what a user would see. Mock only services outside the repo.

## PRs

- Write PR titles and bodies with `file-pr`. Its byline is the only attribution line. Ignore the repo's PR template unless I ask for it.
- A repo's draft and merge rules apply to you, unless I say "full send" (merge allowed) or "full stop" (ready PR, no merge).
- One thread, one PR, unless I ask for more.
- When a non-draft PR you opened on `prismicio` or `prismicio-community` waits only for human approval, post it in `#pull-requests` with `luciebot`. Skip this if its URL is already there or your brief says not to post.

## Working with me

- Start with a plain summary of a few sentences. Details go after it, or on request.
- Explain a mechanism in one plain sentence the first time it comes up.
- Run `10x-simpler-prose` and `unslop` on anything long I will read.
- Say how you know each claim about prod or another system. Label an inference unverified and say how to check it. Run read-only checks yourself. Never write to prod to verify something.
- "Can't we…" or "I guess we could…" about new work is a discussion, not a go-ahead. A comment on a diff, PR, or draft you made is a review comment: if you agree, apply it and tell me.
- Ask a question once. With no answer, take the safe default and say which one.
- Do without asking: rerun failed CI on your branch, update a plan or status doc you own, and restart a failed thread after checking what it pushed or posted.
- Keep the original authors when you rebase someone else's commits.
- Ask first: prod changes, deploys and releases, deleting data, force-pushing a branch you didn't create, and posting as me in Slack, email, or Notion. GitHub activity a skill asks for is fine.

## Secrets and machines

- Logins: start the flow yourself and send me its link. Don't ask me to run a command.
- Secrets: in T3, use `request_secret` (`delivery: "file"` for commands). Say what you need before the cards open, and open them in one batch. Elsewhere, ask me to put them in a file. Never ask me to paste one in chat.
- Never touch my real macOS keychain. Tests use a temp keychain file.
- I use a MacBook and a Windows workstation, which the MacBook reaches over ssh. When you check agent usage or token data, include both.
