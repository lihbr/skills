---
name: free-disk-space
description: Use when the Mac's disk is full or nearly full, a command fails with ENOSPC or "no space left on device", or the user asks to free disk space or clean up storage.
---

# Free Disk Space

Free space on the Mac fast, without losing work. Delete the approved items
below without asking. List everything else for the user.

## Measure

- Run `df -h /System/Volumes/Data` before and after each step. `du`
  overcounts APFS clones (simulators, Chrome copies) and pnpm hard links, so
  only `df` shows what a deletion freed.
- Run `du` with `-x` and a time limit. Skip folders macOS protects.
- Below about 1 GB, shell commands can fail to start. Only if they do, ask the
  user to empty the Trash or delete one large folder they know, then continue.

## Don't disturb running work

Other agents build and test in worktrees while you clean.

- Run `pgrep -fl 'xcodebuild|gradle|simctl'` to see what builds or tests.
- Skip anything modified in the last 3 hours, and any folder a running process
  has as its working directory (`lsof -a -d cwd`).
- Never `sudo` on the Mac, never kill processes, never empty the Trash.

## Delete without asking

1. **Xcode test simulator clones** in `~/Library/Developer/XCTestDevices`.
   If no `xcodebuild` runs, delete the ones that are shut down with
   `xcrun simctl --set testing delete <udid>`. Never delete a normal
   simulator.
2. **Build output in idle worktrees and clones:** Xcode `DerivedData` and
   `build` folders, and Android `build` and `.gradle` folders. Each must be
   ignored (`git check-ignore`) and hold no tracked files (`git ls-files`
   prints nothing for it). Also entries in
   `~/Library/Developer/Xcode/DerivedData` older than 3 hours.
3. **T3 worktrees** under `~/.t3/worktrees`, when all of these are true:
   - No unsettled thread uses it. Get unsettled threads with `t3_thread_list`
     (`allProjects`, `settled: false`, `includeSubagents`, every page). Map
     thread ids to paths with
     `sqlite3 -readonly "file:$HOME/.t3/userdata/statev2.sqlite?mode=ro" "SELECT thread_id, json_extract(payload_json,'$.worktreePath') FROM orchestration_v2_projection_threads"`.
   - Every PR for its branch is merged, or it has none
     (`gh pr list --head <branch> --state all`).
   - `git status --porcelain` is empty.

   If any of these lookups fails or is incomplete, keep the worktree.

   Remove it with `git worktree remove <path>` so its branch stays. If it has
   submodules, check that each is clean, then add `--force`.

## Ask first

List each with its size, what it holds, and your recommendation:

- Worktrees that meet the rule above except for uncommitted changes. Say what
  the changes are.
- Package caches (pnpm, yarn, npm, Gradle, `~/Library/Caches`). Other
  projects often use them.
- `iOS DeviceSupport` folders. Keep the versions of attached phones
  (`xcrun devicectl list devices`).
- Docker images and volumes. After a prune, `colima ssh -- sudo fstrim -av`
  gives the space back to the Mac.
- Chrome copies in `/var/folders/*/*/X/com.google.Chrome.code_sign_clone`.
  Chrome must be closed.
- Swap and a staged macOS update (Preboot over 15 GB). A restart frees both.
- Simulator runtimes, apps, old Node versions, media, and personal files.

## Report

Free space before and after from `df`, what you deleted with path and size,
and the ask-first list.
