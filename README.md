# skills

lihbr agent skills

- `10x-simpler-code`: make code radically simpler
- `10x-simpler-prose`: make writing radically shorter
- `babysit-pr`: watch a PR through CI and review[^tstack]
- `file-pr`: open a concise PR[^tstack]
- `full-send`: take a change to a merged PR, unattended[^tstack]
- `full-stop`: same as `full-send`, but stop before merging[^tstack]
- `keep-working`: keep working until a set time
- `leaving-pr-comments`: write GitHub comments[^tstack]
- `luciebot`: post to Slack
- `simple-english`: write docs in Simplified Technical English
- `sol-loop`: review a change with GPT Sol in a loop[^tstack]
- `unslop`: remove AI tells from writing[^unslop]

```sh
# macOS / Linux
git clone git@github.com:lihbr/skills.git ~/projects/lihbr/skills
mkdir -p ~/.claude/skills
for s in ~/projects/lihbr/skills/skills/*/; do ln -sfn "${s%/}" ~/.claude/skills/; done

# Windows (PowerShell)
git clone git@github.com:lihbr/skills.git $HOME\projects\lihbr\skills
New-Item -ItemType Directory -Force $HOME\.claude\skills | Out-Null
Get-ChildItem $HOME\projects\lihbr\skills\skills -Directory | % { $l = "$HOME\.claude\skills\$($_.Name)"; if (!(Test-Path $l)) { New-Item -ItemType Junction -Path $l -Target $_.FullName | Out-Null } }

# WSL (links to the Windows clone)
mkdir -p ~/.claude/skills
for s in /mnt/c/Users/<you>/projects/lihbr/skills/skills/*/; do ln -sfn "${s%/}" ~/.claude/skills/; done

# Update (any OS), then rerun the link line above to pick up new skills
git -C $HOME/projects/lihbr/skills pull

# Stop claude.ai skills from syncing into Claude Code as duplicates
# add "syncClaudeAiSkills": false to ~/.claude/settings.json

# Build .skill zips to upload on claude.ai (macOS / Linux / WSL)
(cd ~/projects/lihbr/skills/skills && for s in */; do rm -f "../${s%/}.skill"; zip -qr "../${s%/}.skill" "$s" -x '*.DS_Store'; done)
```

code is [mit](./LICENSE)

[^tstack]: from [t3dotgg/tstack](https://github.com/t3dotgg/tstack) at `1085050` (mit, copyright (c) 2026 Theo Browne), with `full-send` and `file-pr` edited to call `10x-simpler-code` and `10x-simpler-prose`
[^unslop]: from [cursor/plugins](https://github.com/cursor/plugins) (`pstack/skills/unslop`)
