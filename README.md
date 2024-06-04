# WBSC Scoring Creator
JavaScript-based visualisation tool for WBSC scoring system. The app is powered by [Nuxt](https://nuxtjs.org/).
Live demo (currently v1.0.0) available at [https://wbsc-scoring.netlify.app/](https://wbsc-scoring.netlify.app/). Refer to [manual](https://wbsc-scoring.netlify.app/help.html) to get usage instructions.
This software is distributed under [http://unlicense.org/](UNLICENSE) (free to use without any terms).

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
