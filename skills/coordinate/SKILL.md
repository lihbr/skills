---
name: coordinate
description: Use when the user starts a "* Master" or coordinator thread, or asks to split, run, or coordinate work across several threads, workers, or repos.
---

# Coordinate

You run a coordinator thread. You plan, launch worker threads, keep state, and
talk to the user. Workers build. You don't write product code here.

The user should only need this thread, and should rarely need to read it.
Workers are never coordinators. Don't title them "* Master" and don't ask them
to use this skill.

## Plan

- **Few PRs.** At most two PRs per repo: one before and one after whatever
  must happen in between, such as a deploy, a migration, or another team's
  change. One worker per repo owns both. Split further only when the user
  asks.
- **Consumers.** Before the plan changes a token, cookie, endpoint, or schema,
  list everything that reads it. Search every local clone and the org's code
  (`gh search code --owner <org>`), not only the repos in the plan.
- **Contracts.** If the work depends on a contract another team owns, launch
  only research workers until it is written down and that team agrees.
- **Facts.** Check what you tell workers: released versions (`npm view`), what
  a merge to the default branch deploys, and who owns each environment.

## State file

Keep one state file from the first turn, at
`~/.claude/coordinators/<project-slug>.md` unless the user names another
place. Start from [references/state.md](references/state.md). Give its path in
your first message and in every scheduled check. After a compaction or a
resume, read it first and trust it over your memory.

Edit it in place after every worker report, merge, and user decision. It
describes now, so replace a stale line and don't append under it.

## Workers

- Launch only on the user's go. Build every brief from
  [references/worker-brief.md](references/worker-brief.md). Workers already
  load the user's global rules, so add only what the user corrected in this
  project.
- **PR workers:** `t3_thread_launch` with the repo's `projectId` and
  `workspaceStrategy: { type: "worktree", baseRef: "origin/<PR base>", startFromOrigin: true }`.
  **Research workers:** `delegate_task` with `role: "research"`, and a task
  that starts with "Read only. Do not edit, commit, or push."
- Give each shared resource one owner or a schedule: a dev tenant, a browser
  profile, a status page. Only you write the plan and the PR table.
- **Answer workers yourself** from the plan, the code, the user's rules, or
  other threads. The exception is new surface: a flag, env var, route, export,
  folder, or module. Answer no and find the smaller change. If it is really
  needed, put it in the human tasks with your recommendation.
- **Send little.** A message wakes an idle worker. Send only what changes its
  task. When a correction applies to several workers, go down the registry row
  by row.
- **Hourly check.** While a worker is building, keep one `schedule_task`
  with a `once` schedule about an hour out, and save its id in the state
  file. In each check, judge workers by pushes and PR activity, not status
  text. Nudge an idle worker once, then relaunch it if it has no PR, or tell
  the user. Re-arm with the saved `scheduledTaskId`. Stop once every worker
  has handed off. A PR that only waits for review or merge needs no check.
  If the user asks for quiet, send fewer messages and keep the check.
- **Review before "ready".** A worker ships with `full-stop` and owns its PR
  until handoff. Before you call a PR ready, check that CI is green on its
  head, then read its diff and body against the user's rules. Look for
  comments that describe the code, new flags or modules, tests that mock what
  they should run, and a body that doesn't follow `file-pr`. Send fixes to the
  worker first.

## The user's time

- **Stay quiet.** Each worker message starts a turn here. End those turns in
  one short line. Write to the user only when something needs them, or when
  every worker is idle or done.
- **Batch human tasks.** Logins, secrets, on-screen checks, requests to other
  teams, and approvals go in one message, riskiest first, each with the exact
  action. Say what is coming before you open secret or login cards. Ask for
  everything you need from prod in one round.
- **Merges.** Every merge needs the user's go. Send "full send" to each worker
  in merge order, quoting the user's message. Wait for each merge report
  before sending the next. Never merge from this thread.
- **Reports.** Read live state first with `gh pr view` and `t3_thread_read`,
  not a worker's last report. Then give the human tasks and the registry
  table, nothing else.
