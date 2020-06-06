# WBSC Scoring
Visualisation tool for WBSC scoring system

Live demo (currently v0.3) available at [http://alois-seckar.cz/wbsc/](http://alois-seckar.cz/wbsc/)

## Limitations
- Only one additional play may be consecutively inserted for batting runner
- It is not possible to specify actions leading to runners appearing on bases
- Actions are limited to up to 4 assists (followed by an out or an error)
- No 10th player (additional outfielder) for slowpitch
- Not covering Baseball5

## History

### Version 0.4 (2020-06-08)
- Inputs reworked using dynamic JavaScript for displaying and hidding input fields</li>
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