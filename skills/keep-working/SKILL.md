---
name: keep-working
description: Use when the user says "keep working until <time>", "keep going until", or "for the next N hours", or leaves for the night or the day and wants work to continue.
---

# keep-working

The user is away until a deadline. Keep working alone until then, and report
when they come back.

The deadline is a time ("until 7am") or a duration ("for 6 hours"). If there is
none, ask once. Run `date` to turn it into a local time. Stop when weekly usage
left falls to 5%, unless the user names another number.

## Start

1. Run `scripts/usage-left` from this skill's directory, with `python` on
   Windows. It prints the weekly percent left, like `19`. At or below the
   stop value, tell the user and do not start. If it fails, find out why and
   get the number another way. Never work without knowing it.
2. Write a plan file in a gitignored folder or the scratchpad. It has the
   deadline, the stop value, the watchdog id, a work queue, a log, and a
   **For the user** list.
3. Start the watchdog.
4. Tell the user the local deadline, the stop value, and the first items. Say
   that the watchdog dies if the session closes.

## Watchdog

Sessions stall when a turn ends and nothing wakes it. Use `CronCreate` to
fire every 30 minutes until the deadline, for example `"13,43 23,0-6 * * *"`
until 07:00. Jobs fire only while the session is idle. The next turn
remembers nothing, so the prompt must stand alone:

```
keep-working watchdog. Deadline <time>, stop at <n>%.
Read <plan file>. Run <abs path>/usage-left.
At or below <n>, or within 30 min of the deadline, stop (keep-working skill).
Else check agents silent for 30+ min and restart stuck ones. Start the next
item if a slot is free. Commit. Log one line. Reply in one line.
```

If `CronCreate` is missing, tell the user and keep working.

## Work

- Run work in agents. When one finishes, check its result and start the next
  item.
- Put questions under **For the user** and move on. Never wait.
- An empty queue is not a reason to stop. Add work that serves the user's
  goal, and log why.
- Commit. Push, merge, or deploy only if the user said so.
- Background commands die after 2 hours. Start servers the user will need
  with `nohup` or `Start-Process`, and log the PID and URL.
- If Sol or Codex hit their limits, use Claude agents only.
- Check usage at each watchdog run.

## Stop

Stop when usage reaches the stop value, 30 minutes before the deadline, or
when the user says so. Going 1% past the stop value is fine. Never stop
because the work looks done.

Cancel agents that will not finish in time, commit, and delete the watchdog.

Then brief the user. They will not read the messages from the run, so the
brief must stand alone. Build it as an HTML page next to the plan and publish
it with the `Artifact` tool. Without that tool, give the file path. The page
has:

- the main result, commits, and whether you pushed
- what changed, by item, with before and after images for visual work,
  published with the page
- **Needs you**: the parked questions, each with your recommendation
- next steps
- usage left, and why you stopped

Reply with the link and the main result in two or three lines.
