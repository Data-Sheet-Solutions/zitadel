# Login Fork Agent Guide (apps/login)

## Purpose
This fork exists to customize the ZITADEL Login app UI and behavior under `apps/login`.

## Scope And Safety
- Default edit scope is **only** `apps/login/**`.
- Do not change files outside `apps/login` unless the user explicitly approves it for the current task.
- If a fix appears to require cross-package edits (for example `packages/*`, `proto/*`, root config), stop and ask first.
- Prefer solutions that stay local to this app (component-level overrides, local utilities, app-scoped styles).

## Tech Baseline For This Fork
- Framework: Next.js (App Router) + React + TypeScript.
- UI framework preference: TailwindCSS.
- Icon preference: Font Awesome.
- Tailwind is the primary styling system for this app.

## UI Implementation Rules
- For new UI work, prefer existing Tailwind patterns and utilities.
- Do not introduce or expand Bootstrap usage unless explicitly requested by the user.
- For iconography, prefer Font Awesome over introducing new icon packs.
- Reuse existing app styling patterns when editing old screens; avoid mixed patterns within the same component when practical.
- Keep accessibility intact (`aria-*`, labels, focus order, keyboard behavior).

## Dependency Conventions
- Keep UI dependency changes local to `apps/login/package.json`.
- Prefer existing Tailwind-related dependencies already used by this app.
- Preferred Font Awesome dependencies:
  - `@fortawesome/fontawesome-svg-core`
  - `@fortawesome/free-solid-svg-icons`
  - `@fortawesome/free-regular-svg-icons`
  - `@fortawesome/free-brands-svg-icons`
  - `@fortawesome/react-fontawesome`

## File Ownership In This Repo
Treat these as owned by this fork and safe to edit without extra approval:
- `apps/login/src/**`
- `apps/login/public/**`
- `apps/login/package.json`
- `apps/login/next.config.*`
- `apps/login/postcss.config.*`
- `apps/login/tailwind.config.*`
- `apps/login/*.config.*`
- `apps/login/AGENTS.md`
- `apps/login/AGENT_MEMORY.md`

## Commands
Run commands from repo root.

Verified Nx targets for this app:
- `pnpm nx run @zitadel/login:dev`
- `pnpm nx run @zitadel/login:build`
- `pnpm nx run @zitadel/login:lint`
- `pnpm nx run @zitadel/login:test`
- `pnpm nx run @zitadel/login:test-unit`
- `pnpm nx run @zitadel/login:test-integration`

## Long-Term Memory (Self-Updating)
Use `apps/login/AGENT_MEMORY.md` as persistent project memory for this fork.

After each meaningful task, update `AGENT_MEMORY.md` with:
1. Date (`YYYY-MM-DD`).
2. What changed (1-3 bullets).
3. Exact files touched.
4. Any new conventions/decisions.
5. Follow-ups or known constraints.

Memory writing rules:
- Keep entries factual and short.
- Prefer newest entries first.
- Never store secrets, credentials, tokens, private keys, or personal data.
- If no code/config files changed, skip memory update.
- If a pattern appears 2+ times or becomes policy, also update `apps/login/AGENTS.md` in the same task.

## PR And Commit Guidance
- Keep commit scope focused on `apps/login` unless user approved broader changes.
- If scope expanded with approval, note the reason in commit/PR description.
- Follow semantic commit/PR title format from root rules.
