# WBSC Scoring
Visualisation tool for WBSC scoring system

Live demo (currently v0.8) available at [http://alois-seckar.cz/wbsc/](http://alois-seckar.cz/wbsc/)

This software is distributed under [http://unlicense.org/](UNLICENSE) (free to use without any terms)

## TO-DO list (to be implemented in next few releases)
- More input validations
- Obstruction and interference
- Double and Triple plays
- Concurrent plays
- Help section on website

## Limitations (not planned to be implemented soon)
- It is not possible to specify actions leading to runners appearing on bases (except TIE)
- It is not possible to specify batting order of the batter and previous runners
- Actions are limited to up to 3 assists (followed by an out or an error)
- No 10th player (additional outfielder) for slowpitch
- Not covering possible Baseball5 features
- Not covering substitutions and statistic outputs

## History

### Version 0.8 (2021-04-01)
- Same error advances
- "No advance" situations
- Earned/Unearned runs
- Extra bases with more runners (GitHub issue #10)
- Refactoring (files and functions comments + optimized organization)
- Enhanced HTML structure
- Bugfixing - GitHub issues #23, #24, #25, #26, #27, #28 + various minor and unreported

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
- Strikouts and base-on-balls are numbered according to the manual
- Added option groups to help user determine if safe our out will occcur
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
- Inputs reworked using dynamic JavaScript for displaying and hidding input fields
- With broadened options it is now possible to set up situations ranging from 0 to 4 assists (followed by an out or an error) and to set up some consecutive actions for runners on 1st, 2nd and/or 3rd base

### Version 0.3 (2020-03-15)
- Fixed error in displaying "Inside-the-park homerun"
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
- Ground rule doubles and inside the park homeruns
- BB, IBB and HP