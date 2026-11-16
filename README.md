# skills

- `10x-simpler-code`: make code radically simpler
- `10x-simpler-prose`: make writing radically shorter
- `babysit-pr`: watch a PR through CI and review[^tstack]
- `coordinate`: run a coordinator thread that launches and tracks workers
- `file-pr`: open a concise PR[^tstack]
- `full-send`: take a change to a merged PR, unattended[^tstack]
- `full-stop`: same as `full-send`, but stop before merging[^tstack]
- `keep-working`: keep working until a set time
- `leaving-pr-comments`: write GitHub comments[^tstack]
- `luciebot`: post to Slack
- `modernize`: bring an old PR up to date[^tstack]
- `simple-english`: write docs in Simplified Technical English
- `sol-loop`: review a change with GPT Sol in a loop[^tstack]
- `takeover`: finish someone else's PR, branch, or thread[^tstack]
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

## Global rules

`global/CLAUDE.md` holds the rules for every project. Link it once per machine from a clone of this repo:

```sh
ln -s "$PWD/global/CLAUDE.md" ~/.claude/CLAUDE.md
```

code is [mit](./LICENSE)

[^tstack]: from [t3dotgg/tstack](https://github.com/t3dotgg/tstack) at `1085050` (`modernize` and `takeover` at `11e37a7`) (mit, copyright (c) 2026 Theo Browne), with edits to `full-send`, `full-stop`, `file-pr`, and `sol-loop`
[^unslop]: from [cursor/plugins](https://github.com/cursor/plugins) (`pstack/skills/unslop`) at `ec56937`, with our own description
