# Module 2 and 3 submission contract

HW2 remains two files at the repository root: USERS.md and FEATURES.md. Keep its Sep 10, 11:59 PM ET deadline, 100 points, two interviews, six candidate features, and six-section specification. v6.17 clarifies evidence labels and EARS syntax; it adds no HW2 submission.

For HW3 (due Sep 17, 11:59 PM ET), move the two files into /context and use this manifest. Eleven canonical context files contain six active documents and five previews. README.md and two tool adapters are separate: fourteen physical governance/entry files in total. Application files, manifests, setup files, evidence media, and optional curiosity files are not included in that count.

| Path | First substantive module | HW3 status | Purpose |
|---|---:|---|---|
| `context/PROJECT.md` | 3 | active | Problem framing and bounded project scope |
| `context/USERS.md` | 2 | active | Copy HW2 research; label reported, observed, inferred evidence |
| `context/FEATURES.md` | 2 | active | Copy HW2 spec and Kano hypotheses; record chosen scope and verification |
| `context/STANDARDS.md` | 3 | active | At least five normative rules for code and documentation |
| `context/ARCHITECTURE.md` | 3 | active | Weighted Gate, ADR, sensitivity, and revisit trigger |
| `context/CLAUDE.md` | 3 | active | Same standards as agent instructions; canonical course document |
| `context/STYLE.md` | 4 | preview | Visual and voice standards and design rationale |
| `context/TOOLS.md` | 4 | preview | External services, data crossings, and trust boundaries |
| `context/SKILLS.md` | 5 | preview | Capabilities you can attest to and evaluated dependencies |
| `context/EVALS.md` | 5 | preview | RAT, success criteria, error analysis, code and judgment evals |
| `context/AGENTS.md` | 6 | preview | Role-specific agent responsibilities and review constraints |

## What is graded now

Write substantive content in the six active context files and README. Keep the five provided previews with their status lines; do not invent content. Adapters are setup files, not extra essays. The criterion weights remain Specification 10, Architecture 25, Implementation 20, Delegation 10, Verification 10, Communication 15, Craft 10.

FEATURES.md holds HW3 verification until EVALS.md activates in Module 5. Use the exact filenames above; ARCHITECTURE.md is the course architecture document, not DESIGN.md.

## Entry files and authority

VS Code Copilot: `.github/copilot-instructions.md` is the repository-wide entry. It carries a concise baseline and asks the tool to read context/STANDARDS.md and FEATURES.md. Claude Code: root `CLAUDE.md` imports `@context/CLAUDE.md`. `/context/CLAUDE.md` is canonical course content, not a universally discovered entry point. `/context/AGENTS.md` is a preview until Module 6.

context/STANDARDS.md is normative for the rules. Keep the canonical agent wording and adapters consistent. A discovered instruction can still be violated. Inspect both discovery evidence (references or diagnostics in the actual tool) and output behavior. If a tool is unavailable, record “not run” and do a manual standards check. This package validates the paths; it does not claim to have run Copilot in your account.

## Submission checklist

- Choose one feature and identify its acceptance criterion. Use peer feedback if instructor HW2 feedback is pending; say which feedback you used.
- Reject options that fail hard constraints, anchor favorable scores, and complete the weighted Gate, ADR, and one sensitivity check.
- Adapt the runnable application to your own feature. Explain one function, make a meaningful change, and verify its effect in a short README paragraph.
- Record normal-action, invalid-input, and persistence/failure checks with expected and observed results. Classify unselected product requirements as outside the chosen HW3 scope.
- Add a screenshot/GIF with alt text, run instructions, status, context links, and the actual AI-use record. Do not publish identifying interview notes, secrets, or sensitive business data.
- Run `node scripts/check-scaffold.mjs` for file presence. This check cannot judge the quality or truth of your work.
- Submit the repository URL in Canvas. Public is the default; private with instructor access remains available. For private peer work, share an anonymized criterion and feedback in Canvas or grant only the needed reviewer access.

## AI use and test statuses

Before HW5, record tool/task, why, how checked, and result. A statement of no AI use is valid. Full DDRs start at HW5. Reporting hours is optional calibration and never changes points. Students remain responsible for the individual explain/change/verify evidence.

PASS = observed behavior met the expected result. FAIL = it did not. CANNOT TEST = evidence is unavailable, with reason and next step. DEFERRED = explicit scope decision with linked ADR and requirement update. A self-authored deferral cannot waive required HW3 functionality. All-PASS results are valid with appropriate evidence. Honest unresolved work can earn reasoning credit while remaining incomplete for implementation credit.

## When instructions differ

Use the revised Canvas assignment for deadlines, weights, and task scope, and this versioned manifest for the supplied template inventory. The syllabus governs course-wide policy. Report a conflict before assuming a new requirement. HW2 clarification does not retroactively add requirements. Sources: code.visualstudio.com/docs/agent-customization/custom-instructions and code.claude.com/docs/en/memory (checked September 7, 2026).
