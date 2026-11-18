# Caselevel

**Master the art of business problem-solving.**

Caselevel is a planned learning and practice platform for students preparing for consulting interviews. The idea is simple. Learn a skill in a short interactive lesson, apply it to a realistic business problem, and use the feedback to improve.

The landing page introduces two learning tracks, Strategy Consulting and Operations Consulting. The first planned learning path focuses on profitability, with validated exercises and an interactive case solver.

## Documentation

| Document | What it covers |
| --- | --- |
| [Product overview](docs/product.md) | Who Caselevel is for, the learning loop, and how feedback and mastery should work |
| [Profitability MVP](docs/mvp.md) | The first learning path, the case-solving experience, and how to validate it |
| [Roadmap](docs/roadmap.md) | How the product could grow from its first learning path to a broader launch |
| [Proposed architecture](docs/architecture.md) | The proposed stack, content versioning, and grading boundaries |

## Run the landing page

Run `npm install` and then `npm run dev`. Open [localhost:3000](http://localhost:3000) and select **Explore tracks** to browse the curriculum.

Run `npm run build` to generate a static site in `out/`. Set `CASELEVEL_SITE_URL` to the final site URL before building to generate the canonical URL and an absolute social preview image URL.

The curriculum in the product documents is planned.
