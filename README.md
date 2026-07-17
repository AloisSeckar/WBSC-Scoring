# WBSC-like Scoring Creator
JavaScript-based visualisation tool for WBSC scoring system. The app is powered by [Nuxt](https://nuxtjs.org/).

Project is available at [https://wbsc-scoring.netlify.app/](https://wbsc-scoring.netlify.app/). Refer to [manual](https://wbsc-scoring.netlify.app/help.html) for usage instructions.

This software is distributed under [http://unlicense.org/](UNLICENSE) (free to use without any terms). Mentions and endorsements appreciated, but not requested.

## Contributors
- [Alois Seckar [CZE]](https://github.com/AloisSeckar) - maintainer
- [Luca Facchini [ITA]](https://github.com/lucafano04) - Italian translations

Suggestions, bug reports and pull requests are welcome!

## nuxt-ignis
This project uses [Nuxt Ignis](https://github.com/AloisSeckar/nuxt-ignis) to simplify dependency management.

To make it run locally, you need to provide `.env` file with following settings:

```
# enable Tailwind CSS
NUXT_PUBLIC_IGNIS_PRESET_UI=tailwind

# enable i18n translations
NUXT_PUBLIC_IGNIS_I18N_ENABLED=true

# enable working with Nuxt Content
NUXT_PUBLIC_IGNIS_CONTENT=true

# special setting to improve formatting
# this should help preventing single-letter words at the end of the line
NUXT_PUBLIC_IGNIS_PSLO_ENABLED=true
NUXT_PUBLIC_IGNIS_PSLO_CONTENT=true
```

## Testing
The test suite is built on [Vitest](https://vitest.dev/) and split into three projects:

- `validations` – pure unit tests for input-validation logic (environment-independent)
- `actions` – visual regression: renders every action from the library and compares the canvas against a stored baseline
- `screenshots` – visual regression: compares whole pages against stored baselines in several viewports

Run everything locally with:

```
pnpm test
```

or a single project with `pnpm test-validations`, `pnpm test-actions`, `pnpm test-screenshots`.

### Visual regression baselines
The `actions` and `screenshots` projects compare rendered PNGs against committed baselines
(`test/actions/__baseline__/` and `test/screenshots/__baseline__/`). Rendering differs slightly
between operating systems, so these baselines **cannot be reliably verified on a local machine** –
they are owned by CI, which runs the tests in a pinned Playwright container for reproducible pixels.

Two GitHub Actions workflows manage this:

- **Visual Regression (verify)** – runs automatically on pull requests to `main` (and can be
  triggered manually). It runs the full suite read-only and never writes back. When any test
  fails, it uploads the `ci-test-report` artifact containing a JUnit report per suite plus the
  current screenshots and a self-contained HTML diff report to inspect.
- **Visual Regression (update baselines)** – triggered manually (`workflow_dispatch`) from the
  Actions tab. It regenerates the baselines in the same container (`pnpm test-update`) and commits
  them back to the branch it was dispatched on.

Typical workflow when a change affects rendering:

1. Make the UI changes on a feature branch and open a pull request.
2. **verify** runs and reports pass/fail, with downloadable diffs for any mismatch.
3. If the differences are intentional, run **update baselines** on the feature branch. It commits
   fresh baselines, which re-triggers **verify** on the pull request – it should now pass.
4. Merge.

> First-time setup: because the initial baselines were generated on a different OS, run
> **update baselines** once to re-generate them on CI before relying on **verify**.

The Playwright container image is pinned to the installed `playwright` version in both workflow
files – keep it in sync when upgrading the dependency.

## TO-DO list (to be implemented in next few releases)
- More input validations
- Deeper refactoring after switching to Nuxt 3
- Bug-fixing and output corrections

## Limitations (not planned to be implemented soon)
- It is not possible to specify actions leading to runners appearing on bases (except TIE)
- It is not possible to specify batting order of the batter and previous runners
- Actions are limited to up to 3 assists (followed by an out or an error)
- No 10th player (additional outfielder) for slowpitch
- Not covering possible Baseball5 features
- Not covering substitutions and statistic outputs

## History

See [CHANGELOG](/CHANGELOG.md)
