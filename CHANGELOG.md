# Changelog

This file keeps track of changes, updates and fixes in "WBSC Scoring" project.

## Version 1.2.0 (2024-07-18)
- Features:
  - "No DP" option for runners (#180)
  - GDP + bunt (#219)
- Tech updates:
  - GUI rewritten from vanilla JavaScript to Vue components (#217)
  - Vitest unit tests for validation methods (#218 + #243)
  - Logging with unjs/consola (#215)
  - Switched to pnpm package manager
  - Some refactoring - component names, code revision
- Bugfixes - GitHub issues #193, #230, #231, #233, #234, #235, #240, #242, #244 + several others

## Version 1.1.1 (2024-06-05)
- Hotfixed error with displaying images (#227)
- dropped [Nuxt Image](https://nuxt.com/modules/image) due to Netlify-related issues

## Version 1.1.0 (2024-06-05)
- Features:
  - new action: FC - occupied for runners
  - 2 new library actions + tests
  - Italian translation added (#221)
- Tech updates:
  - Change from vsharp plugin to [Nuxt Image](https://nuxt.com/modules/image)
  - [Nuxt Content](https://nuxt.com/modules/content) for documentation/overview pages (#153)
  - Project history now tracked in CHANGELOG.md (#223)
- Enhancements - GitHub issues #164, #197, #207, #224
- Bugfixes - GitHub issues #130, #179, #209, #210, #220, #226

## Version 1.0.1 (2024-03-02)
- Hotfixed error in evaluating "Same error (R2)" (#209)

## Version 1.0.0 (2024-02-19)
- Stabilized feature set listed in "Project overview"

## Version 1.0.0-RC2 (2024-02-17)
- Features:
  - new actions: FC+B & E+B, GDP+O
  - adjusted symbols for "advance on GDP" and "advance on INT/OB"
  - corrections for batter indicators + play connectors
  - 47 new library actions + tests
- Font size adjustments
- Redefined SEO meta tags
- Enhancements - GitHub issues #151, #160, #165, #173, #177, #189, #191, #200, #204, #206
- Bug-fixes - GitHub issues #149, #150, #154, #160, #161, #162, #163, #166, #171, #176, #178, #181, #182, #183, #188, #189, #192, #195, #201, #202, #205

## Version 1.0.0-RC1 (2023-11-12)
- Switched to semantic versioning, no changes

## Version 0.14 (2023-11-12)
- Features:
  - new hit locations (GLL + GRL)
  - new action (SB PO)
  - action BOO renamed to BOT
  - 31 new library actions + tests
  - RLE corrected - batter's indicator (#122)
  - POA + error - pick off attempt resulting into an error (#123)
  - adjustments in concurrent plays connectors
- Language selection should be remembered in browser
- Validations - GitHub issues #119, #120
- Bug-fixes - GitHub issues #115, #116, #131
- Refactoring - GitHub issues  #74, #76

## Version 0.13 (2023-07-28)
- Actions library - SB/CS situations
- New "Report bug" page
- Translation between EN/CS using [nuxt/i18n](https://v8.i18n.nuxtjs.org/) module
- [BackstopJS](https://github.com/garris/BackstopJS) visual testing
- Validations - GitHub issues #102, #103, #109, #110, #113
- Bug-fixes - GitHub issues #100, #104, #108, #111, #112, #114 + various others unreported

## Version 0.12 (2023-06-15)
- New actions supported: new set of OBRs according to 2019 manual, KS + FC, KL + FC
- New feature - 'Clear' button clears current output too
- New feature - import/export inputs in JSON format + a library of prepared actions
- New feature - when action results into an out, further actions cannot be rendered
- Validations - GitHub issues #54, #57, #62, #70, #72, #77, #86, #87
- Bug-fixes - GitHub issues #73, #78, #79, #88
- Refactoring- GitHub issues #75

## Version 0.11 (2023-04-08)
- Source converted into Nuxt 3 project with TypeScript
- Validation modal window
- New validations - empty action, empty pos select (#59)
- Bug-fixes - e.t displaying + GitHub issues #53, #55, #61, #67, #68, #71

## Version 0.10 (2022-11-08)
- Errors with extra base advances (#30)
- Grounded into double-play situation (#31)
- extra WP/PB for batter after BB/KS play (#46)
- Bug-fixes - GitHub issues #10, #39, #41, #43, #47, #48, #49

## Version 0.9.4 (2022-11-08)
- Bug-fixes - GitHub issue #50 finally fixed

## Version 0.9.3 (2022-11-04)
- Demo auto-deployment to [Netlify](https://app.netlify.com/)

## Version 0.9.2 (2022-10-10)
- Bug-fixes - GitHub issue #50 (unsuccessful attempt to fix)

## Version 0.9.1 (2021-12-27)
- Bug-fixes - GitHub issues #42
- GitHub Actions auto-deployment

## Version 0.9 (2021-12-27)
- New actions supported: OB/ob - obstruction, INT - interference, F.B/FF.B - flyout with bunt, explicit 'no-advance' of runner
- Double and triple play connectors
- Concurrent plays (e.g. double-steal) connectors
- Help section on website
- Validations (refactoring + couple of new input validations)
- Bug-fixes - GitHub issues #35, #38

## Version 0.8 (2021-04-01)
- Same error advances
- "No advance" situations
- Earned/Unearned runs
- Extra bases with more runners (GitHub issue #10)
- Refactoring (files and functions comments + optimized organization)
- Enhanced HTML structure
- Bug-fixes - GitHub issues #23, #24, #25, #26, #27, #28 + various minor and unreported

## Version 0.7 (2020-12-08)
- New actions supported: PO - pick off, LT - lost turn, A - appeal play, OBR - out by rule, SH with throwing/dropped fly error, CS with throwing error
- Fixed actions: "Muffled throws" removed (not official WBSC scoring term), Batter indicator for CS, PO and O/ situations added
- Improved player selection inputs rendering and handling
- Improved consecutive actions handling
- Improved GUI and CSS form design
- Download button to save outcome as PNG
- Unlicense was officially included to declare this SW free of use
- Various bugfixes and corrections

## Version 0.6 (2020-10-11)
- New actions supported: Sacrifice hit/fly, Infield fly, Bunt hit/out, Strikeout with occupied ball, TIE
- Strikeouts and base-on-balls are numbered according to the manual
- Added option groups to help user determine if safe our out will occur
- GUI inputs now render in correct order
- Advances to 3rd and HP now render correctly
- CSP implemented in order to increase web security
- Various bugfixes and corrections

## Version 0.5 (2020-06-13)
- Batting order (1-4) is now considered
- New actions supported - Numerous strike out variants, Extra base advances - BB, IBB, HP, WP, PB, O/, SB and CS situations, Various plays with errors
- Rendering improved and corrected for currently supported actions
- Due to rendering issues situations are now allowed only with 0-3 assists (followed by an out or an error)
- Various bugfixes and corrections

## Version 0.4 (2020-06-09)
- Inputs reworked using dynamic JavaScript for displaying and hiding input fields
- With broadened options it is now possible to set up situations ranging from 0 to 4 assists (followed by an out or an error) and to set up some consecutive actions for runners on 1st, 2nd and/or 3rd base

## Version 0.3 (2020-03-15)
- Fixed error in displaying "Inside-the-park home run"
- Code for rendering action inputs moved from HTML to JavaScript
- Introduced possibility to add consecutive action after batter reaches first. Available are: Safe advance on the throw, Safe advance on error (either decisive or extra-base) and Out after defensive play

## Version 0.2 (2020-01-13)
Newly supported batter's actions:
- Fielder's choice and occupied ball
- Errors

## Version 0.1 (2019-12-23)
First version recorded and launched. Basic website with inputs to generate situation for one batter. Output can be saved as an image. Supported batter's actions:
- Strikeout looking and swinging
- Simple ground outs with 1 or 2 fielders involved
- Full spectrum of fly outs
- Full spectrum of hits including named locations
- Ground rule doubles and inside the park home runs
- BB, IBB and HP