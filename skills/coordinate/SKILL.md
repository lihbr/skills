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

## State file

Keep one state file from the first turn. Start from
[references/state.md](references/state.md). Put it in the project folder or
where the user says. Never put it only in the scratchpad, which can be wiped.

Update it after every worker report, merge, and user decision. After a
compaction or a resume, read it first and trust it over your memory.

The **feedback ledger** in it holds every preference and correction the user
gives, in their words. It goes into every brief you send after that.

Only you write the shared plan, the Notion page, and the PR tables. Workers
report to you, and you write.

## Before launching

- Restate the goal as one sentence and get the user to confirm it.
- If the work depends on a contract that another person or team owns (an
  API, a route, a data model), launch only research threads until it is
  written down and that owner agrees.
- Check the facts you give workers: released versions (`npm view`), what a
  merge to `main` deploys in each repo, and who owns each environment.
- A question or musing from the user is not a go-ahead. Launch, push, or
  merge only on a clear instruction.

## Launching workers

- Build every brief from [references/worker-brief.md](references/worker-brief.md).
  Paste the whole ledger. Give the absolute path of each skill the worker must
  load.
- **Start with one worker.** Take it to an open PR and review that PR before
  you launch the rest. Feedback then goes into the next briefs instead of
  being sent after more PRs exist.
- A worker that will open a PR gets its own worktree (`t3_thread_launch` with
  a `workspaceStrategy`). Research workers may share the checkout.
- Branch every step from the integration branch or the default branch, not
  from a sibling step. Merge the foundation steps first.
- Give each shared resource one owner or a schedule. Examples: a dev
  tenant, a browser profile, a Notion page.
- Add each worker to the registry with its link. Don't say a worker is
  running until the launch call returned its id.

## While workers run

- **PR ownership.** A worker owns its PR. It runs `full-stop` and watches the
  PR until its handoff, then unwatches. Don't watch a PR a worker still owns.
  After the handoff, you own it: watch it with `watch_pull_request` until it
  merges or closes.
- **Live state.** At the start of each turn, read live state with
  `gh pr view`, `list_thread_pull_requests`, and `t3_thread_read`. Don't rely
  on a worker's last report.
- **Stall check.** While workers run, use `schedule_task` to check them every
  hour. Judge each worker by what it did (pushes, PR activity, new thread
  items), not by its status text. If a worker has been idle longer than its
  task should take, nudge or relaunch it, and log that.
- **No FYI relays.** A message wakes an idle worker. Send a worker only what
  changes its task.
- **Late corrections.** If a correction applies to several workers, send it
  to each one, saying exactly what to change. Add it to the ledger.
- **Overlap.** After pushes, diff sibling branches for overlapping edits, such
  as `package.json` or build config. Give a shared fix to the foundation step.

## The user's time

- **Batch human tasks.** Logins, secrets (`request_secret`), checks the user
  must watch on screen, requests to other teams, and approvals go in one
  message. List them riskiest first, each with the exact action.
- **Answer workers yourself** from the ledger, the code, or other threads.
  Ask the user only about decisions that change the result, and give your
  recommendation.
- **Do without asking:** update the state file, plan, and PR tables. Start Sol
  reviews, relaunch a failed worker, and rerun a flaky check.
- **Ask first:** anything irreversible or outside the repos. That includes
  prod, deleting data, force-pushing someone else's branch, and posting as
  the user.
- **Batched approvals.** When the user says "merge C2, C3, C5", send
  "full send" to each of those workers, so each one runs its own merge
  checks. Never merge from this thread.
- **Review requests.** When worker PRs wait for human review, post one
  `#pull-requests` request with `luciebot` that lists them all.

## Reports

Keep reports short and plain:

1. What changed since your last report.
2. What needs the user: the human-task list.
3. The registry table: worker, repo, PR, state.
