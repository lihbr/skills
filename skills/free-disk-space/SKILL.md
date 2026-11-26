---
name: free-disk-space
description: Use when the Mac's disk is full or nearly full, a command fails with ENOSPC or "no space left on device", or the user asks to free disk space or clean up storage.
---

# Free Disk Space

Delete the approved items below without asking. List everything else for the
user. Never `sudo` on the Mac, kill a process, or empty the Trash.

- Run `df -h /System/Volumes/Data` before and after each step. `du` overcounts
  APFS clones and hard links. Run it with `-x` and a time limit, and skip
  folders macOS protects.
- Right before each delete, skip the target if another agent may be using it:
  `find <path> -mmin -180 -print -quit` prints a file, or a process has its
  working directory inside it (`lsof -a -d cwd`).
- If shell commands fail to start (under about 1 GB free), ask the user to
  empty the Trash or delete one large folder they know, then continue.

## Delete without asking

1. **Xcode test simulator clones** in `~/Library/Developer/XCTestDevices`.
   If `pgrep -fl xcodebuild` prints nothing, delete the ones that are shut
   down with `xcrun simctl --set testing delete <udid>`. Never delete a normal
   simulator.
2. **Build output** in git repos, outside `node_modules`: Xcode `DerivedData`
   and `build` folders, and Android `build` and `.gradle` folders. Each must
   be ignored (`git check-ignore`) and hold no tracked files (`git ls-files
   <folder>` prints nothing). Also entries in
   `~/Library/Developer/Xcode/DerivedData`.
3. **T3 worktrees** under `~/.t3/worktrees`, when all of these are true. If a
   lookup fails or is incomplete, keep the worktree.
   - No unsettled thread uses it. Get unsettled threads with `t3_thread_list`
     (`allProjects`, `settled: false`, `includeSubagents`, every page). Map
     thread ids to paths with
     `sqlite3 -readonly "file:$HOME/.t3/userdata/statev2.sqlite?mode=ro" "SELECT thread_id, json_extract(payload_json,'$.worktreePath') FROM orchestration_v2_projection_threads"`.
   - Every PR for its branch is merged, or it has none
     (`gh pr list --head <branch> --state all`).
   - `git status --porcelain --ignored` lists only ignored files that an
     install or build recreates, or that the main checkout holds unchanged.
     An edited `.env` or a saved login is neither.
   - `git branch -a --contains HEAD` lists a branch.

   Remove it with `git worktree remove <path>`, which keeps its branch. If it
   has submodules, check that each is clean, then add `--force`.

## Ask first

- Worktrees that fail only the `git status` check. Say what the files are.
- Package caches (pnpm, yarn, npm, Gradle, `~/Library/Caches`).
- `iOS DeviceSupport` folders. Keep the versions of attached phones
  (`xcrun devicectl list devices`).
- Docker images and volumes. After a prune, `colima ssh -- sudo fstrim -av`
  gives the space back to the Mac.
- Chrome copies in `/var/folders/*/*/X/com.google.Chrome.code_sign_clone`.
  Chrome must be closed.
- Swap and a staged macOS update (Preboot over 15 GB). A restart frees both.
- Simulator runtimes, apps, old Node versions, media, and personal files.

## Report

Free space before and after, each deletion with path and size, and each
ask-first item with size and your recommendation.
