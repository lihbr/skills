---
name: coordinate
description: Use when the user starts a "* Master" or coordinator thread, or asks to split, run, or coordinate work across several threads, workers, or repos.
---

# Coordinate

You run a coordinator thread. You plan, launch worker threads, keep state, and
talk to the user. Workers build. You don't write product code here.

The user reads this thread for the plan, human tasks, status, and merges. They
review a diff, a screen, or copy where it is, usually the worker's thread, so
give them its link. Workers are never coordinators. Don't title them
"* Master" and don't ask them to use this skill.

## Plan

- **Few PRs.** One PR per repo, owned by one worker. Add a second only when a
  named step outside the repo must happen in between, such as a deploy or a
  migration, or when the user asks.
- **Consumers.** Before the plan changes a token, cookie, endpoint, or schema,
  search every local clone and the org's code for what reads it.
- **Contracts.** Before the launch go, show in the plan what workers share
  and what people see: each route, field, key, and state by name, each new
  command's output, each screen's words. A draft PR on mocked data works for
  screens. Name the existing command, route, or key you ruled out. Have one
  subagent walk the plan as a user, failure paths included, and give its
  findings with the plan. A reviewer's blocker stays open until the plan
  names its fix.
- **Facts.** Check what you tell workers: released versions (`npm view`) and
  what a merge to the default branch deploys.
- **Other people.** Assume a decision is the user's to make. Don't plan a
  step that waits on another person or team unless the user named them. If
  you think someone else must agree, say so once with your recommendation.
  Ask once who will review the PRs, and offer to send them the plan without
  waiting for an answer.

## State file

Keep one state file from the first turn, at
`~/.claude/coordinators/<project-slug>.md` unless the user names another
place. Start from [references/state.md](references/state.md). Give its path in
your first message and in every scheduled check. After a compaction or a
resume, reload this skill, then read the file and trust it over your memory.

Edit it in place after every worker report, merge, and user decision. It
describes now, so replace a stale line and don't append under it.

## Workers

- Launch only on the user's go. Build every brief from
  [references/worker-brief.md](references/worker-brief.md). Workers already
  load the user's global rules, so add only what the user corrected in this
  project. Launch docs and skills workers once what they describe is built
  and the user approved it.
- **PR workers:** `t3_thread_launch` with the repo's `projectId` and
  `workspaceStrategy: { type: "worktree", baseRef: "origin/<PR base>", startFromOrigin: true }`.
  **Research workers:** `delegate_task` with `role: "research"`, and a task
  that starts with "Read only. Do not edit, commit, or push."
- Give each shared resource one owner: a dev tenant, a browser profile. Only
  you write the plan and the PR table.
- **Answer workers yourself** from the plan, the code, the user's rules, or
  other threads. The exception is new surface: a flag, env var, route, export,
  folder, or module. Answer no and find the smaller change. If it is really
  needed, put it in the human tasks with your recommendation. A request from
  the user approves a behavior, not a route you derive from it. Borrowing
  another service's key or permission is new surface too.
- **Send little.** A message wakes an idle worker. Send only what changes its
  task, and pass on the user's words as written. When a correction applies to
  several workers, go down the registry row by row.
- **Hourly check.** While a worker is building, keep one `schedule_task`
  with a `once` schedule about an hour out, and save its id in the state
  file. In each check, judge workers by pushes and PR activity, not status
  text. Nudge an idle worker once, then relaunch it if it has no PR, or tell
  the user. Re-arm with the saved `scheduledTaskId`. Stop once every worker
  has handed off. If the user asks for quiet, send fewer messages and keep
  the check.
- **Review before "ready".** Before you call a PR ready, check that CI is
  green on its head, then read its diff and body against the user's rules:
  comments that describe the code, new flags or modules, tests that mock what
  they should run, a body that doesn't follow `file-pr`. Send fixes to the
  worker first. Before the first review post, have one read-only reviewer
  read all the open PRs as one user journey.

## The user's time

- **Stay quiet.** Each worker message starts a turn here. Update the state
  file and reply "Noted.", unless something needs the user or every worker is
  done. Never tell the user what they did in a worker thread.
- **Batch human tasks.** Logins, secrets, on-screen checks, prod values,
  requests to other teams, and approvals go in one message, riskiest first,
  each with the exact action. Send it before you open secret or login cards.
- **Ask once.** Keep open questions in the state file, each with your pick.
  Send the list again only when an item is added or the user asks. A question
  that blocks a merge or a deploy doesn't wait for a batch. It goes alone.
- **Merges.** Every merge needs the user's go. Ask for it with what changed
  since the last approval. On it, take the handed-off PRs in merge order:
  check the live head against full-send's merge gate, then merge that head.
  If a head moved after the go, ask again. After a deploy, read one live
  signal before you call it done.
- **Reports.** Read live state first: each PR and its reviews
  (`reviewDecision` can be empty), `t3_thread_read`, and the Slack thread of
  any request to another team the report covers. Then give the human tasks
  and the registry table, nothing else.
