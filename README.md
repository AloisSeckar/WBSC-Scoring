# WBSC Scoring Creator
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
