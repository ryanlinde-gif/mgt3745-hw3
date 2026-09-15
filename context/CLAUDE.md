# Canonical agent instructions

Status: ACTIVE in Module 3.

Read `context/STANDARDS.md` and the selected HW3 scope in `context/FEATURES.md`
before editing. **STANDARDS.md is normative**; if this file conflicts with it,
report the conflict and repair it rather than choosing between them.

## Project

This is a contact log for a high school soccer player tracking which college
coaches she has emailed, at which school, on what date, and where each one stands.
Read `PROJECT.md` for the problem, `USERS.md` for who it is for, `FEATURES.md` for
the spec and its EARS statements, and `ARCHITECTURE.md` for why it is built this
way. Build to the EARS statements. When a request conflicts with one, say so
before writing code.

## Naming

Use descriptive camelCase for JavaScript variables and functions, and kebab-case
for CSS class names and file names. Name a thing for what it holds or does, not
for its type: write `contactEntries`, not `contactArray`; write
`renderContactLog()`, not `doStuff()`. Name booleans as questions: `isOverdue`,
`hasParentEmail`. Short conventional names for events and loop indexes are
acceptable where the role is obvious.

## File structure (browser-only, expires in Module 4)

Put structure in `index.html`, presentation in `styles.css`, and behavior and data
in `app.js`. Do not write `style` attributes in the HTML. Do not write JavaScript
in the HTML beyond the single tag that loads `app.js`. Use lexical scope and do
not create accidental globals; keep the starter's IIFE wrapper.

**This section expires.** It assumes a browser-only page with no server, and stops
being correct once a database and server-side code arrive in Module 4. If you are
reading this and the repository contains server code, this section is out of date:
say so instead of following it.

## Comments

When writing comments, explain why the code exists. Do not restate what the line
does. Delete any comment that paraphrases the line beneath it. Reserve comments for
reasons invisible in the code itself: a rule from the spec, a workaround, or a
choice that looks arbitrary and is not. Remove temporary debug output before
submission.

## Never use innerHTML for user-supplied text

Put any text that came from a person into the page with `textContent`. Do not use
`innerHTML` for a coach name, a school name, a note, or any other field a user
typed. Treat this as a hard constraint, not a preference.

## Make feedback perceivable and never discard typed input

Associate every form control with a label. Keep error messages in a `role="alert"`
region and status messages in an `aria-live` region so they are announced rather
than only displayed. When a save fails, leave the user's typed text in the field.
The athlete logs contacts between practice and homework; silently discarding her
input is the exact failure this feature exists to prevent.

## No external dependencies

Write plain HTML, CSS, and JavaScript. Do not add frameworks, CDN script tags, npm
packages, or build steps. If a task appears to require one, stop and explain what
it would require and why, rather than adding it.

## Verification and honesty

Verify expected behavior before claiming completion. Never invent interview
evidence, test results, or verification outcomes. Record what actually happened,
including failures. Leave the five preview files in `/context` as previews; do not
fill them with invented content.

## When you are unsure

The person maintaining this repository cannot yet read JavaScript well enough to
audit it. Prefer the obvious construction over the clever one. When you make a
choice a reader might not follow, explain it in plain language in your response
rather than burying it in a comment. If a request is ambiguous, ask instead of
guessing.

---

## One rule is deliberately not in this file

`STANDARDS.md` rule 4 governs commit message format. It is **intentionally absent
here** and lives in the prompt for tasks that actually commit. The reasoning is
recorded under Split Test in `STANDARDS.md`: the rule is stable but rarely
relevant, and a rule that applies to one task in ten while loading on all ten is
distraction. This note exists so the difference between the two files is visible
rather than silent, which `STANDARDS.md` requires.

## Entry points

Root `CLAUDE.md` imports this file for Claude Code. VS Code Copilot uses the
separate `.github/copilot-instructions.md` adapter. A location under `/context`
alone does not guarantee automatic discovery.
