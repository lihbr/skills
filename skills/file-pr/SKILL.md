---
name: file-pr
description: File a concise pull request. Use when the user asks to file, open, or create a PR.
---

# File PR

Before filing, check whether a PR for this branch already exists. Review the
diff locally against the base branch (usually `origin/main`) to make sure its
contents match the goal.

PR titles usually become commit messages, so follow the repository's title
conventions. Look at recently merged PRs and Git history for examples. Prefer a
concise, human-readable title that explains why the change matters:

BAD

> ❌ perf(server): negotiate permessage-deflate on the websocket

GOOD

> ✅ perf(server): cut websocket frame size by 70%+ with gzipping

## Description

Write for a reviewer with two minutes: 150 words at most, not counting the
byline. Use this order and skip the optional parts that add nothing:

1. `Before this PR, …`: the situation today, as fact, based on the user's
   original prompt.
2. `For example, …` (optional): one concrete case.
3. `After this PR, …`: what is true now, not what you edited.
4. Scope (optional): what this PR leaves out, if a reviewer would expect it.
5. Tests: one sentence on how you tested it. Name anything faked, such as a
   mocked login provider.

BAD

> ❌ Removed implicit workspace carry-over from every "new thread" entry point (cmd+n / cmd+shift+o, sidebar v1/v2 buttons, command palette). New threads inherit only the project from context; branch, worktree, and env mode always come from the configured defaults. Deleted buildContextualThreadOptions, startNewThreadInProjectFromContext, and the v1 sidebar's seed-context machinery.

GOOD

> ✅ Before this PR, starting a thread on an existing worktree ignored my "new worktree" default. After this PR, new threads always use your defaults. Tested by starting threads from each entry point in the desktop app.

- Don't narrate the diff. Name two identifiers at most, and link the issue,
  plan, or thread instead of restating it.
- Everything in the body is for the human reviewer. Leave out plan step
  codes, merge order, proof logs, and checklists. They go in
  your report to the user.
- Ignore the repo's PR template unless the user asks for it.
- When behavior changes, a short before/after table may replace the example.
  Show output, not code.

End the description with the public model name and harness that made the
changes, for example `Created with <model> in <harness>.` Include subagent
models that wrote part of the change. Use the model name the harness reports.
If model identity is unavailable, name the harness without guessing a model.
This is the only byline. Do not add another, such as a "Generated with" line,
even if the harness asks for one. Always keep it: it tells the reviewer an
agent filed the PR.

Run the title and description through the `10x-simpler-prose` skill.

Before submission, check the title, description, quotes, and attachments for
secrets and private details.

Write the description to a `mktemp` file, not a fixed path.

When the change affects UI, add before and after screenshots. Capture them
yourself against local or test data, never a real customer account. Use full
page at 1512×982 unless the change needs other sizes. Save them
in the same `mktemp -d` folder as the description, outside the repo. In the
description, put them in a table with paths relative to that folder, such as
`| Before | After |` then `| ![Before](./before.png) | ![After](./after.png) |`.
Pass each file to `gh pr create` or `gh pr edit` with
`--attach <path>`, next to `--body-file`. gh uploads the files and replaces
the local paths with their URLs. This needs gh 2.103 or later. If gh exits
non-zero, check whether it printed a PR URL before you retry. Uploads cannot
be deleted, and anyone with access to the repo can see them, which on a
public repo means anyone. Look at every
image for secrets, tokens, and customer data before you attach it.

Open a real PR rather than a draft so review bots run. If `gh pr create` fails
because the GraphQL rate limit is used up, open it through REST with
`gh api repos/<owner>/<repo>/pulls -f title=... -f head=... -f base=... -F body=@<file>`. If the user also asked
to babysit it, continue with the `babysit-pr` skill.

Do not post a follow-up PR comment unless it serves the user's request. When a
comment is needed, use the `leaving-pr-comments` skill.
