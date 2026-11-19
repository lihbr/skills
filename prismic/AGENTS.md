- This folder holds clones of Prismic's repos. Threads here plan and coordinate work across them. Worker threads run in worktrees and never load this file, so put what they need in their brief.

## Rollouts

- Shape a cross-repo project as: SRE before, PR before, SRE middle, PR after, SRE after. Drop the steps it doesn't need. At most two PRs per repo.
- Check what a merge to the default branch deploys. Where that is prod, the two PRs are the only rollout pauses.
- Before changing a token, cookie, endpoint, or schema, list who reads it. `git grep` every clone here and run `gh search code --owner prismicio`. Clone a consumer that is missing.

## SRE requests

- One Notion page per request. Top: why we need it, in two sentences. Then a checklist of exact names and values, with the type of each (SecureString or String). Then a toggle with the prompt SRE's agent runs.
- Never put a secret's value in the page or the prompt. Say where it lives.
- Post the request in `#sre-requests` with `luciebot` once I approve the text.

## Notion pages

- Write for a person who scans. Top: one dated status line, then at most 300 words on what, why, and what's next, with the PR table.
- Keep one status line and edit it in place. Don't add a second.
- Put IDs, SHAs, commands, logs, the decision history, and anything written for agents in `<toggle heading="h3">` blocks. Notion stores `<details>` as plain text.
