---
name: coordinate
description: Use when the user starts a "* Master" or coordinator thread, or asks to split, run, or coordinate work across several threads, workers, or repos.
---

# Coordinate

You run a coordinator thread. You plan, launch worker threads, keep state, and
talk to the user. Workers build. You don't write product code here.

The user should only need this thread. Every message they send to relay
status, repeat a preference, or approve a routine step is a failure of this
skill.

Workers are never coordinators. Don't title them "* Master" and don't ask them
to use this skill.

## State file

Keep one state file from the first turn, at
`~/.claude/coordinators/<project-slug>.md` unless the user names another
place. Start from [references/state.md](references/state.md). Give its path in
your first message and in every scheduled check, so you can find it again
after a compaction. After a compaction or a resume, read it first and trust it
over your memory.

Update it after every worker report, merge, and user decision.

The **feedback ledger** in it holds every preference and correction the user
gives, in their words. It goes into every brief you send after that.

Only you write the shared plan, the Notion page, and the PR tables. Workers
report to you, and you write.

## Before launching

- Restate the goal as one sentence and get the user to confirm it.
- If the work depends on a contract that another person or team owns (an
  API, a route, a data model), launch only research workers until it is
  written down and that owner agrees.
- Check the facts you give workers: released versions (`npm view`), what a
  merge to `main` deploys in each repo, and who owns each environment.
- A question or musing from the user is not a go-ahead. Launch, push, or
  merge only on a clear instruction.

## Launching workers

- Build every brief from [references/worker-brief.md](references/worker-brief.md).
  Paste the whole ledger. Name each skill the worker must use.
- **Start with one worker.** Take it to an open PR and review that PR before
  you launch the rest. Feedback then goes into the next briefs instead of
  being sent after more PRs exist.
- **PR workers:** `t3_thread_launch` with the repo's `projectId` and
  `workspaceStrategy: { type: "worktree", baseRef: "origin/<PR base>", startFromOrigin: true }`.
  Push the integration branch before you launch from it.
  **Research workers:** `delegate_task` with `role: "research"`, and a task
  that starts with "Read only. Do not edit, commit, or push."
- Branch every step from the integration branch or the default branch, not
  from a sibling step. Merge the foundation steps first. The integration
  branch's own PR gets a worker too.
- Give each shared resource one owner or a schedule. Examples: a dev
  tenant, a browser profile, a Notion page.
- Add each worker to the registry with its link. Don't say a worker is
  running until the launch call returned its id.

## While workers run

- **PR ownership.** A worker owns its PR. It runs `full-stop`, watches the PR,
  and unwatches at its handoff. You never watch worker PRs.
- **Live state.** Before each report to the user, read live state with
  `gh pr view` and `t3_thread_read`. Don't rely on a worker's last report.
- **Hourly check.** While any worker is building or any worker PR is open,
  keep one `schedule_task` with a `once` schedule about an hour out, and save
  its id in the state file. In each check:
  - Judge workers by what they did (pushes, PR activity, new thread items),
    not by their status text.
  - Look at handed-off PRs for review requests, red CI, merges, and closes.
    Send each change to the PR's worker, or put it in the human-task list.
  - Nudge an idle worker once. If that fails, relaunch it if it has no PR
    yet. Otherwise tell the user.
  - If anything is still building or open, re-arm: call `schedule_task` with
    the saved `scheduledTaskId` and a new `runAt`.
- **No FYI relays.** A message wakes an idle worker. Send a worker only what
  changes its task.
- **Late corrections.** If a correction applies to several workers, send it
  to each one, saying exactly what to change. Add it to the ledger.
- **Overlap.** When a worker reports a PR, diff sibling branches for
  overlapping edits, such as `package.json` or build config. Give a shared fix
  to the foundation step.

## The user's time

- **Batch human tasks.** Logins, secrets (`request_secret`), checks the user
  must watch on screen, requests to other teams, and approvals go in one
  message. List them riskiest first, each with the exact action.
- **Answer workers yourself** from the ledger, the code, or other threads.
  Ask the user only about decisions that change the result, and give your
  recommendation.
- **Do without asking:** update the state file, plan, and PR tables. Start Sol
  reviews and relaunch a worker that failed before opening a PR.
- **Ask first:** anything irreversible or outside the repos. That includes
  prod, deleting data, force-pushing someone else's branch, and posting as
  the user.
- **Merges.** Every merge, into the integration branch too, needs the user's
  go. When the user says "merge C2, C3, C5", send "full send" to each worker in
  merge order. Quote the user's message and link to it. Wait for each merge
  report before sending the next. Never merge from this thread.
- **Review requests.** When the user says the PRs can go to review, search
  `#pull-requests` for their URLs, then post one request with `luciebot` for
  the missing PRs on `prismicio` or `prismicio-community` repos.

## Reports

Keep reports short and plain:

1. What changed since your last report.
2. What needs the user: the human-task list.
3. The registry table: worker, repo, PR, state.
