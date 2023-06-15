# WBSC Scoring Creator
JavaScript-based visualisation tool for WBSC scoring system. The app is powered by [Nuxt](https://nuxtjs.org/).
Live demo (currently v0.11) available at [https://wbsc-scoring.netlify.app/](https://wbsc-scoring.netlify.app/). Refer to [manual](https://wbsc-scoring.netlify.app/help.html) to get usage instructions.
This software is distributed under [http://unlicense.org/](UNLICENSE) (free to use without any terms).

## TO-DO list (to be implemented in next few releases)
- Actions from updated version of WBSC scoring manual
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

### Version 0.12 (2023-06-15)
- New actions supported: new set of OBRs according to 2019 manual, KS + FC, KL + FC
- New feature - 'Clear' button clears current output too
- New feature - import/export inputs in JSON format + a library of prepared actions
- New feature - when action results into an out, further actions cannot be rendered
- Validations - GitHub issues #54, #57, #62, #70, #72, #77, #86, #87
- Bug-fixing - GitHub issues #73, #78, #79, #88
- Refactoring- GitHub issues #75

### Version 0.11 (2023-04-08)
- Source converted into Nuxt 3 project with TypeScript
- Validation modal window
- New validations - empty action, empty pos select (#59)
- Bug-fixing - e.t displaying + GitHub issues #53, #55, #61, #67, #68, #71

### Version 0.10 (2022-11-08)
- Errors with extra base advances (#30)
- Grounded into double-play situation (#31)
- extra WP/PB for batter after BB/KS play (#46)
- Bug-fixing - GitHub issues #10, #39, #41, #43, #47, #48, #49

### Version 0.9.4 (2022-11-08)
- Bug-fixing - GitHub issue #50 finally fixed

### Version 0.9.3 (2022-11-04)
- Demo auto-deployment to [Netlify](https://app.netlify.com/)

### Version 0.9.2 (2022-10-10)
- Bug-fixing - GitHub issue #50 (unsuccessful attempt to fix)

### Version 0.9.1 (2021-12-27)
- Bug-fixing - GitHub issues #42
- GitHub Actions auto-deployment

### Version 0.9 (2021-12-27)
- New actions supported: OB/ob - obstruction, INT - interference, F.B/FF.B - flyout with bunt, explicit 'no-advance' of runner
- Double and triple play connectors
- Concurrent plays (e.g. double-steal) connectors
- Help section on website
- Validations (refactoring + couple of new input validations)
- Bug-fixing - GitHub issues #35, #38

### Version 0.8 (2021-04-01)
- Same error advances
- "No advance" situations
- Earned/Unearned runs
- Extra bases with more runners (GitHub issue #10)
- Refactoring (files and functions comments + optimized organization)
- Enhanced HTML structure
- Bug-fixing - GitHub issues #23, #24, #25, #26, #27, #28 + various minor and unreported

### Version 0.7 (2020-12-08)
- New actions supported: PO - pick off, LT - lost turn, A - appeal play, OBR - out by rule, SH with throwing/dropped fly error, CS with throwing error
- Fixed actions: "Muffled throws" removed (not official WBSC scoring term), Batter indicator for CS, PO and O/ situations added
- Improved player selection inputs rendering and handling
- Improved consecutive actions handling
- Improved GUI and CSS form design
- Download button to save outcome as PNG
- Unlicense was officially included to declare this SW free of use
- Various bugfixes and corrections

### Version 0.6 (2020-10-11)
- New actions supported: Sacrifice hit/fly, Infield fly, Bunt hit/out, Strikeout with occupied ball, TIE
- Strikeouts and base-on-balls are numbered according to the manual
- Added option groups to help user determine if safe our out will occur
- GUI inputs now render in correct order
- Advances to 3rd and HP now render correctly
- CSP implemented in order to increase web security
- Various bugfixes and corrections

### Version 0.5 (2020-06-13)
- Batting order (1-4) is now considered
- New actions supported - Numerous strike out variants, Extra base advances - BB, IBB, HP, WP, PB, O/, SB and CS situations, Various plays with errors
- Rendering improved and corrected for currently supported actions
- Due to rendering issues situations are now allowed only with 0-3 assists (followed by an out or an error)
- Various bugfixes and corrections

### Version 0.4 (2020-06-09)
- Inputs reworked using dynamic JavaScript for displaying and hiding input fields
- With broadened options it is now possible to set up situations ranging from 0 to 4 assists (followed by an out or an error) and to set up some consecutive actions for runners on 1st, 2nd and/or 3rd base

### Version 0.3 (2020-03-15)
- Fixed error in displaying "Inside-the-park home run"
- Code for rendering action inputs moved from HTML to JavaScript
- Introduced possibility to add consecutive action after batter reaches first. Available are: Safe advance on the throw, Safe advance on error (either decisive or extra-base) and Out after defensive play

### Version 0.2 (2020-01-13)
Newly supported batter's actions:
- Fielder's choice and occupied ball
- Errors

### Version 0.1 (2019-12-23)
First version recorded and launched. Basic website with inputs to generate situation for one batter. Output can be saved as an image. Supported batter's actions:
- Strikeout looking and swinging
- Simple ground outs with 1 or 2 fielders involved
- Full spectrum of fly outs
- Full spectrum of hits including named locations
- Ground rule doubles and inside the park home runs
- BB, IBB and HP