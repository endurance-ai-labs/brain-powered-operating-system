# Brain powered operating system

## Doctrine

Shared engineering doctrine lives in `endurance-ai-labs/endurance-commons`, not
here, so there is one copy to fix rather than one per repository. Clone it
beside this one:

    git clone git@github.com:endurance-ai-labs/endurance-commons.git

- `doctrine/principles.md` — the four principles every repository inherits:
  think before coding, simplicity first, surgical changes, goal-driven execution.
- `templates/` — the shapes a new project starts from.
- `skills/` — run `scripts/link-skills.sh` once and they load from any repo.

source: endurance-commons/doctrine/principles.md

## Next.js agent rules

Do not hand-write a Next.js warning into this repository. `next dev` generates
one and re-adds it — see `node_modules/next/dist/server/lib/generate-agent-files.js`
— into `AGENTS.md` when that file exists, and into this file otherwise. The
generated text tracks the version actually installed; a hand copy goes stale
silently and we have already made that mistake once.

This project is on **Next 16.2.9**. It has breaking changes from what a model
is likely to assume, so read the guide in `node_modules/next/dist/docs/` before
writing code.

## Project notes

- Small and current: 26 files on a recent Next. A good place to try a pattern
  before it goes near a client repository.
- A `.claude/` directory already exists here; keep configuration in it rather
  than adding a second home for it.
- No `vercel.json`, so there is no deploy configuration in the tree.
- **This repository is public.** Nothing client-identifying belongs in it.

## Project memory

Open work and landmines live in this checkout's memory index, at
`~/.claude/projects/<slug-of-this-checkout-path>/memory/MEMORY.md`. Read it when
a session starts; add a note when you leave something unfinished. Name the
environment variable, never paste its value.
