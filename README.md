# skills

lihbr agent skills

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

`babysit-pr`, `file-pr`, `full-send`, `full-stop`, `leaving-pr-comments`, and `sol-loop` come from [t3dotgg/tstack](https://github.com/t3dotgg/tstack) at `1085050` (mit, copyright (c) 2026 Theo Browne)
