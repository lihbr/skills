---
name: luciebot
description: 'Use when the user mentions luciebot or "lucie bot", asks to post, submit, or send something to Slack, such as a PR for review in #pull-requests, or asks for their team update.'
---

# luciebot

luciebot is Lucie's bot in the Prismic Slack workspace. Its MCP server posts as
@luciebot, and the Slack connector acts as Lucie.

## Tools

- Search and read Slack with the Slack connector: channels, threads, users,
  and recent posts. Use it freely for investigation and context.
- Post, edit, and react only with luciebot's tools: `send_message`,
  `update_message`, and `react`. Never post with the Slack connector.
- Do not use luciebot's `read_thread`. It fails outside the few channels
  luciebot joined. Read with the Slack connector instead.
- To fix a post, use luciebot's `update_message` on the same `ts`. Do not
  delete and repost.
- Only post when the user asks, or when the user's CLAUDE.md says to post a
  review request. Reply with the permalink that `send_message` returns.

## Known IDs

- Lucie: `<@U014KACFM6K>`
- `#pull-requests`: `C0BFJ1YF61J`
- `#sre-requests`: `C06UQRLAQF3`
- `#team-devx`: `C014VAACCQL`

Find anyone else with the Slack connector's user search. Do not guess IDs.

## PR review request

Post to `#pull-requests` with this template:

```
:building_construction: A new PR has been submitted for review by <@U014KACFM6K>: [github.com/<org>/<repo>/pull/<n>](<url>)

:information_source: _What is the goal of this PR?_
[<repo>] <goal>
```

For several PRs, list them under the first line, in merge order for a stack:

```
:building_construction: New PRs have been submitted for review by <@U014KACFM6K>:
- [github.com/<org>/<repo>/pull/<a>](<url>): <what this PR does>
- [github.com/<org>/<repo>/pull/<b>](<url>): <what this PR does>

:information_source: _What is the goal of these PRs?_
[<repo>] <goal>
```

Rules:

- **Always mention Lucie as the author (`<@U014KACFM6K>`).** This is the
  channel's format, and it links the request to her. "Don't tag anyone" means
  do not tag a reviewer. It never means to write "Lucie" as plain text.
- Tag a reviewer only when the user names one. Post the tag as a thread reply
  under the request, not in the request itself:
  `<@reviewer> could you have a look? <one-line reason, if any>`.
- If the user says they will tag someone, post only the request.
- The goal is one to three sentences on what the change does and why it
  matters. Write it for a reviewer who has not seen the PR. Leave out stacking
  notes, merge or deploy effects, test lists, and file inventories.
- Link Slack context the user gives you, such as a failure report, inline in
  the goal.
- Do not add a "Sent using Claude" line. luciebot is already a bot.
- Run the goal and list items through the `10x-simpler-prose` and `unslop`
  skills before posting.

## Other messages

For a request in another channel, such as a deploy in `#sre-requests`:

- Read the channel's purpose and a few recent posts with the Slack connector
  first, and match how people write there.
- Ask only for what the user asked for. Do not add side questions.
- Keep it short: a greeting, why you need it in one sentence, the ask, and
  the one detail readers need to act, such as a commit, a PR link, or a risk.
- Run the draft through the `10x-simpler-prose` and `unslop` skills before
  posting.

## Team update

A short post in `#team-devx` on what Lucie shipped, about every two weeks.

- Read her last update there and match its shape: a greeting line, three to
  five groups with an emoji and a title, a few bullets each, and her closing
  line.
- Cover the time since that update. Sources: her merged PRs
  (`gh search prs --author @me --merged --merged-at ">=<date>"`), the
  coordinator state files in `~/.claude/coordinators/`, and the status line of
  each plan they link.
- Group by project, not by repo or PR. Each bullet says what changed for
  users or the team, with one link at most.
- Leave out dependency updates, chores, her personal repos, and how the work
  was done.
- Show her the draft before posting.
