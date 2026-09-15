# Features and specification

Status: ACTIVE. Copied and revised from my own HW2 `FEATURES.md`.

**Ryan Linde — MGT 3745**
**Kano classification dated 2026-09-08. Revised 2026-09-15 for HW3.**

> **Revision note.** The Kano table, specification, and handoff test are unchanged
> from HW2. Added for HW3: acceptance statements E10 to E13, which scope the
> contact log at the level it is actually implemented; a scope clarification under
> Constraints; and the Verification section. The original nine statements specify
> the Reality Check service and were never written to be testable against a single
> page. Instructor HW2 feedback was pending, so the scope choice was checked
> against peer feedback instead, recorded under Colleague Test in `STANDARDS.md`.

## Kano Hypotheses

Classified **2026-09-08**. Classifications expire; the Attractive item becomes
Must-be once competitors ship it.

| # | Feature | Kano | Reason from research |
|---|---|---|---|
| 1 | Verified coach addresses for her level | Must-be | Finding addresses is what capped my sister at six emails |
| 2 | Honest level assessment | Must-be | Mom asked for exactly this; sister cannot tell if she is aiming too high or low |
| 3 | **Contact log with follow-up status** | Performance | The thing sister named to hand off first; she forgets who to re-email |
| 4 | Coach emails drafted for the athlete | Performance | Personalizing is why she planned more and sent six |
| 5 | Reply activity visible to the parent | Performance | Mom's definition of going well is coaches responding |
| 6 | Signal of program interest before paying for its camp | Attractive | Mom declined a camp for exactly this reason |
| 7 | Follower, view, and like counts | Indifferent | "Just getting views or likes doesn't really mean that much to me" |
| 8 | Emails sent without the athlete seeing who was contacted | **Reverse** | Sister hands off writing but insists on knowing who is contacted |

**HW3 implementation scope: row 3 only, the contact log.** Chosen because it is the
item the athlete named as the first thing she would hand off, and the smallest item
on the list that still carries a real acceptance surface. Rows 1, 2, 4, 5, 6 remain
product scope and are **not** implemented this week; they are classified in the
Verification section rather than left ambiguous.

## Context

A club soccer family cannot get evidence of interest before spending. The mother
already pays for camps, showcases, travel, and film, and declined the last camp
because she could not tell whether the program was interested. The athlete sends
small personalized batches, loses track of follow-ups, and cannot judge her own
level. The Reality Check supplies that evidence free, before money is discussed.

## Users

Profile A (The Parent) and Profile B (The Athlete) in `USERS.md`. The athlete does
the outreach; the parent decides what gets paid for. Both must be present by the
end. The contact log serves Profile B directly.

## Scope and Non-Goals

**Product does:** one intake form; a written Reality Check with a level assessment
and stated confidence, a fit-ranked list of at least 15 verified coach addresses,
and a named next step; delivered in 48 hours; followed by a 15-minute call with a
parent present.

**Product does not:** guarantee placement, offers, or replies. Does not email any
coach during the Reality Check. Does not send a coach email the athlete cannot see.
Does not report views, likes, or follower counts. Does not edit film. Does not
present a price before the call.

**HW3 build does:** record a coach contact (coach, school, date, status), persist it
in this browser, list saved contacts, reject incomplete entries by naming the
missing field, and flag entries awaiting a reply for seven or more days.

**HW3 build does not:** send email, verify addresses, assess level, sync between
devices, or show anything to the parent. Those are product scope, not this week.

## Behavior

1. Intake submitted: grad year, position, club, GPA, film link, parent email, target regions.
2. Receipt confirmed, delivery deadline named.
3. Level assessed against the club's competitive tier and the film; confidence recorded.
4. Coach list built, each address verified against the current staff directory.
5. Reality Check emailed to athlete and parent with a booking link, then up to two follow-ups.
6. The call reviews the document and ends with an explicit next step.

**Contact log behavior (HW3).** The athlete enters a coach name, school, and contact
date, and picks a status. On submit the entry is validated, written to localStorage,
and rendered into the list. On load the stored entries are read and rendered. Any
entry still awaiting a reply seven or more days after its contact date is marked due
for follow-up.

## Constraints

Email only; no app or login. Under-18 athletes require a parent email before
delivery. The athlete must be able to see every coach contacted on her behalf. No
athlete data is published or shared between families. Addresses re-verified within
90 days of use. The 48 hours runs from a **complete** intake.

> **Scope clarification added 2026-09-15.** "Email only; no app or login" governs
> **delivery of the Reality Check**, which remains email. The contact log is the
> athlete's own working tool on her own device, not a portal a family logs into to
> receive a deliverable. See ADR-001 in `ARCHITECTURE.md`.

## Acceptance

**Service-level statements, carried from HW2. Product scope.**

- **E1.** WHEN a complete intake is submitted, THE SYSTEM SHALL confirm by email within 15 minutes, stating the 48-hour deadline.
- **E2.** WHEN 48 hours have elapsed since a complete intake, THE SYSTEM SHALL have delivered the Reality Check or sent a delay notice naming a new date.
- **E3.** THE SYSTEM SHALL include at least 15 coach addresses, each verified against the program's staff page within 90 days.
- **E4.** THE SYSTEM SHALL state one level assessment and one confidence value from {high, medium, low}.
- **E5.** WHERE a coach has been contacted for an athlete, THE SYSTEM SHALL show her the coach, the date, and the follow-up status.
- **E6.** IF the athlete is under 18 and no parent email is on file, THEN THE SYSTEM SHALL withhold delivery and request one.
- **E7.** IF a listed address bounces, THEN THE SYSTEM SHALL replace it within 5 business days.
- **E8.** WHILE a delivered Reality Check has no booked call, THE SYSTEM SHALL send at most two follow-ups, on day 3 and day 7.
- **E9.** IF no parent is present at the scheduled call, THEN THE SYSTEM SHALL reschedule rather than present pricing.

**Feature-level statements for the contact log. HW3 implementation scope.**

- **E10.** WHEN the athlete submits a contact entry containing a coach name, a school, and a contact date, THE SYSTEM SHALL save the entry and display it in the contact log.
- **E11.** WHEN the page is reloaded, THE SYSTEM SHALL display every entry saved in previous sessions.
- **E12.** IF a required field is empty when the entry is submitted, THEN THE SYSTEM SHALL reject the entry and name the field that is missing.
- **E13.** WHILE an entry's status is "awaiting reply" and 7 or more days have passed since its contact date, THE SYSTEM SHALL mark that entry as due for follow-up.
- **E14.** IF the write to storage fails, THEN THE SYSTEM SHALL report the failure and leave the athlete's typed input in the form.

E5 is the one service-level statement the contact log implements directly, so it is
tested below. E14 was added because `STANDARDS.md` rule 6 requires it and the
starter application already supports testing it through the `?failSave` switch.

## Handoff Test

Four questions block a stranger. **What makes an assessment "high confidence"?** I
never defined the evidence threshold, so two people would grade the same athlete
differently. Largest gap here. **What does this cost, and would a parent pay?** My
mother said she does not mind spending when there is a reason, but I never asked
what she would pay, so Kano row 6 is a hypothesis about willingness, not a
measurement. **Who re-verifies the coach data?** The databases exist; the refresh
process is only in my head. And **both interviews were one household** — a mother
and daughter agree with each other more than two unrelated families would.

---

## Verification

> **NOT YET RUN.** Steps and expected results are written **before** testing, which
> is the point of filling them first. Observed result, Status, and Evidence stay
> empty until the page is actually exercised in the Codespace. Do not pre-fill them.

**Environment:** GitHub Codespace, Live Server, *(browser and version)*
**Tested on:** *(date)*
**Commit under test:** *(short SHA)*

### Selected scope (HW3 implementation)

| Criterion | Steps and input | Expected result | Observed result | Status | Evidence / commit |
|---|---|---|---|---|---|
| E10 — normal action | Enter coach "A. Rivera", school "Elon University", date = today, status "awaiting reply". Submit. | Entry appears in the list showing all four values. Form clears. Success message announced. | | | |
| E12 — invalid input, empty field | Leave coach name blank, fill school and date. Submit. | Entry is rejected, nothing is added to the list, and the error names the coach name field specifically. | | | |
| E12 — invalid input, boundary | Enter a coach name of 201 characters. Submit. | Entry is rejected with a length error naming the limit. | | | |
| E11 — persistence | With at least two entries saved, reload the page. | Both entries render from storage, in the same order, with the same values. | | | |
| E14 — write failure | Append `?failSave` to the URL, type a complete entry, submit. | Save fails, an error is shown, the list is unchanged, and the typed text remains in the form fields. | | | |
| E13 — overdue flag | Save an entry with status "awaiting reply" and a contact date 8 days in the past. | Entry is marked due for follow-up. | | | |
| E13 — boundary, not yet due | Save an entry with status "awaiting reply" and a contact date 6 days in the past. | Entry is **not** marked due for follow-up. | | | |
| E5 — service statement met by this build | Inspect any saved entry in the list. | Coach, contact date, and follow-up status are all visible without further interaction. | | | |

### Unselected product requirements

These are **outside HW3 implementation scope** by the scope decision recorded above
and in ADR-001. They are not failures, and they are not self-authored deferrals of
required HW3 functionality; they are product-level requirements for a service this
week's build does not attempt.

| Criterion | Why it is outside HW3 scope | Status |
|---|---|---|
| E1, E2 | Require sending email and a server-side clock. The build has neither. | CANNOT TEST |
| E3 | Requires the coach address databases and a verification process, not a page. | CANNOT TEST |
| E4 | Requires human assessment of film and competitive tier. | CANNOT TEST |
| E6 | Requires an intake flow and a delivery gate; the contact log has no intake. | CANNOT TEST |
| E7 | Requires bounce detection from a mail system. | CANNOT TEST |
| E8 | Requires scheduled outbound email. Note the day 3 / day 7 cadence is the source of E13's seven-day threshold, which **is** tested. | CANNOT TEST |
| E9 | Describes conduct on a human sales call. | CANNOT TEST |

Each row names the missing evidence and what would be needed to obtain it, per the
CANNOT TEST definition in `SCAFFOLD_MANIFEST.md`.
