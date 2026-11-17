# Proposed architecture

The initial technical design should support the [profitability MVP](mvp.md) from lesson through case feedback. The stack and boundaries below are proposals.

| Area | Proposed approach |
| --- | --- |
| Web app | Next.js and TypeScript with Tailwind CSS and a shared component system |
| Content | Structured, versioned lessons, exercises, case exhibits, answer keys, and rubrics |
| Grading | Server-side rules for objective answers, with explicit rubrics for open-ended responses |
| Persistence | PostgreSQL for accounts, problems, progress, and submissions as those features are introduced |
| Analytics | Record enough information to measure path completion, where learners stop, and whether they return |

## Content and attempts

A lesson teaches a skill and links to exercises. An exercise defines the prompt, response format, grading criteria, and explanation. A full case adds a client objective, exhibits, staged questions, and a recommendation rubric.

When attempts are stored, record the content version used for each one so its result can still be explained after a problem or rubric changes. Keep grading criteria and solution explanations on the server until the learner is eligible to see them.

## Grading and feedback

- **Objective responses.** Apply the accepted answer, units, and tolerance defined by the content. Return feedback that explains the calculation or interpretation.
- **Written responses.** Evaluate against criteria such as diagnosis, use of evidence, and recommendation. Start with rubrics and reviewed walkthroughs. If AI-assisted feedback is introduced, tie it to those same criteria and the supplied case evidence.
- **Progress and competition.** Award XP for activity and update mastery from demonstrated performance when those systems are introduced. Compute competitive results on the server and rank accuracy ahead of speed.

[Back to the documentation index](../README.md)
