# Worker brief

Fill in every field. Workers get no history, so the brief is all they know.

```
You are a worker for the master thread <link or id>.
Report to it with t3_thread_send only when you are blocked, hand off, or
change something another repo relies on. It reads your PR and your thread
itself, so send no progress updates, even after the user works with you
directly. Don't use the master-thread skill yourself.
Ask it your questions instead of the user. Use AskUserQuestion only if the
master thread tells you to.

Task: <goal and why, one paragraph>
Done when: <a behavior you ran and how to prove it; if proof needs another deploy, who runs it. Never "PR open and green">
Repo: <path>  Branch from and PR base: <default branch>
PRs: <one PR; or "before" then "after", naming the step that must happen in between>
Don't: <merge, deploy, touch prod, post for review, force-push others' branches, ...>
Shared resources: <tenant, browser profile, or lock rules>
Depends on: <other repos' PRs, and the exact strings or APIs you rely on>

Ship each PR with the full-stop skill ("full stop"). The user decides the
merge. Wait on your PR with the babysit-pr skill, never a shell sleep. The PR
body follows file-pr. Merge gates and risks go in your report.

New public surface (events, env vars, exports, flags, routes, docs pages) and
new folders or modules: don't build them. Ask the master thread, and say which
smaller change you ruled out and why. If you can't do a step the way this
brief says, ask the master thread before you build it another way.

Corrections from the user on this project:
<quotes, or "none">
```
