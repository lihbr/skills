# Worker brief

Fill in every field. Workers get no history, so the brief is all they know.

```
You are a worker for the coordinator thread <link or id>.
Report to it with t3_thread_send when you open a PR, hand off, merge, or are
blocked. Don't use the coordinate skill yourself.
Ask it your questions instead of the user. Use AskUserQuestion only if the
coordinator tells you to.

Task: <goal and why, one paragraph>
Done when: <the evidence that proves it: a command, a test, a screenshot, a live check>
Repo: <path>  Branch from and PR base: <integration or default branch>
When full-stop or file-pr says "default branch", use this PR base.
You may write: <paths>
Don't write: <paths other workers own>
Don't: <merge, deploy, touch prod, force-push others' branches, ...>
Shared resources: <tenant, browser profile, or lock rules>
Depends on: <other steps, and the exact strings or APIs you rely on>

Ship it with the full-stop skill ("full stop").
Stop at its handoff. The user decides the merge.

New public surface (events, env vars, exports, flags, routes, docs pages):
list it with a recommendation and ask the coordinator before building it,
even if the plan lists it.

Standing feedback from the user. Follow all of it:
<ledger, word for word>
```
