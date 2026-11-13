# skills

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
npx skills add lihbr/skills

# Update
npx skills update

# Stop claude.ai skills from syncing into Claude Code as duplicates
# add "syncClaudeAiSkills": false to ~/.claude/settings.json

# Build .skill zips to upload on claude.ai, from a clone of this repo
(cd skills && for s in */; do rm -f "../${s%/}.skill"; zip -qr "../${s%/}.skill" "$s" -x '*.DS_Store'; done)
```

code is [mit](./LICENSE)

[^tstack]: from [t3dotgg/tstack](https://github.com/t3dotgg/tstack) at `1085050` (mit, copyright (c) 2026 Theo Browne), with edits to `full-send` and `file-pr`
[^unslop]: from [cursor/plugins](https://github.com/cursor/plugins) (`pstack/skills/unslop`)
