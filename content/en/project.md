## PROJECT DESCRIPTION

**WBSC Scoring Creator** is a JavaScript-based program allows selecting combination of plays that may occur in baseball/softball game to visualize the way of scoring such play in [WBSC](https://www.wbsc.org/) scoring system. It is meant both for individual scorers for learning and revising and for tutors to help them build up educational materials for clinics.

For more information about how to use the program, see [User manual](/help).

The project is maintained and developed voluntarily by a dedicated scorer who happens to know a thing or two about programming as well. However, it will take long before it reaches ideal shape, if ever. Shall you encounter any incorrect or odd behavior or something that is missing and should be also included, don't hesitate to contact the author - either directly via [my email](mailto:alois.seckar{'@'}gmail.com) or you can use [GitHub Issues](https://github.com/AloisSeckar/WBSC-Scoring/issues) for creating new report/question/suggestion directly there. If you do so, try to describe your issue, so it can be addressed. Screenshots are useful to see what is happening. You may want to check our [reporting bugs guide](/help).

This program is still evolving. Visit the ["TODO" section](/project#todo) in Project overview to check what is yet planned to be implemented. Refer to the ["Limitations" list](/project#limitations) to see what is certainly not possible atm.

Tento program se stále vyvíjí. Navštivte [sekci "TODO"](/project#todo) v přehledu projektu, kde zjistíte, co ještě plánuji implementovat. Prohlédněte si [seznam "Omezení"](/project#limitations), abyste viděli, co v současné době určitě není možné.

This is an [UNLICENSE](https://unlicense.org/) open-source that can be found [HERE](https://github.com/AloisSeckar/WBSC-Scoring). Any help with further development would be appreciated, but you can as well take the source code and do whatever you want with it yourself.

 <a id="done" />   
 
## HOTOVO
_(what you can find here)_

<ul class="list-disc">
<li>Action editor capable of inserting most of existing situations according to latest version of WBSC manual</li><li>Download output images as PNG</li><li>Export/Import actions in JSON format</li><li>Actions library with 193 predefined plays</li><li>User manual</li><li>English and Czech translation</li>
</ul>

 <a id="todo" />   

## Seznam TO-DO
_(hopefully will be implemented in next few releases)_

<ul class="list-disc">
<li>Reorganizing actions library for greater clarity</li><li>Translations to other languages</li><li>Info pages with scoresheet description and ways of marking substitutions</li><li>More input validations</li><li>Output corrections and fixes where necessary</li>
</ul>


 <a id="limitations" />   

## Omezení
_(not planned to be implemented soon)_

There are several features of WBSC scoring system that are currently not covered by this program. They may be included in some future releases, but no promises.

<ul class="list-disc">
<li>It is not possible to specify actions leading to runners appearing on bases (except TIE). The actual action is always replaced with a <strong><span style="color: red">red asterisk</span></strong>.</li><li>It is not possible to specify the batting order of the batter and previous runners. Output always starts from 1.</li><li>It is not possible to get different number of Ks and BBs than 1</li><li>Actions are limited to up to 3 assists (followed by an out or an error). This is mainly to avoid practical problems with rendering more numbers.</li><li>No 10th player (additional outfielder) for slowpitch. However, it is quite probable this will be eventually added.</li><li>Not covering possible Baseball5 features. This is because Baseball5 system is very different and non-compatible. If you're interested, here is <a href="https://s3-eu-west-1.amazonaws.com/static.wbsc.org/assets/cms/documents/9b129842-cb39-da53-4b67-9c4c5a86f997.pdf">the official WBSC document</a> covering the Baseball5 scoring system.</li><li>Not covering substitutions and statistical outputs. It doesn't quite make sense to include them into the app mechanic. However, it is planned to add dedicated static articles covering these two topics.</li>
</ul>

 <a id="history" />  

 ## Historie
_(release notes on each version)_

### Version 1.0.0 (2024-02-19)
<ul class="list-disc">
<li>Stabilized feature set listed in "Project overview"</li>
</ul>

### Version 1.0.0-RC2 (2024-02-17)
<ul class="list-disc">
<li>New actions - FC+B & E+B, GDP+O</li><li>Added special symbols for advances on GDP/INT/OB</li><li>Actions library - 47 new situations</li><li>Adjustments in rendering</li><li>Various bugfixes and corrections (21)</li>
</ul>

### Version 1.0.0-RC1 (2023-11-12)
<ul class="list-disc">
<li>Versioning change with same features as in <strong>v0.14</strong></li>
</ul>

### <strong>Verze 0.14</strong> (2023-11-12)
<ul class="list-disc">
<li>New actions - GLL, GRL, SB PO, POA + error, BOO -> BOT</li><li>Actions library - 31 new situations</li><li>Browser should remember language selection (CZ/EN)</li><li>Adjustments in rendering</li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.13</strong> (2023-07-28)
<ul class="list-disc">
<li>Actions library - SB/CS situations</li><li>New "Report bug" page</li><li>Translation between EN/CS using <a href="https://v8.i18n.nuxtjs.org/">nuxt/i18n</a> module</li><li>Improved visual testing</li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.12</strong> (2023-06-15)
<ul class="list-disc">
<li>New set of OBRs - according to 2019 manual</li><li>New actions - KS+FC and KL+FC</li><li>New feature - import/export inputs in JSON format + a library of prepared actions</li><li>Improved old + added many new input validations</li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.11</strong> (2023-04-08)
<ul class="list-disc">
<li>Source converted into <a href="https://nuxt.com/">Nuxt 3</a> project with TypeScript, since it become hard, if not impossible, to maintain and change plain JavaScript code.</li><li>Validation info - plain alerts replaced with nice-looking modal window</li><li>New validations - empty action, empty position select</li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.10</strong> (2022-11-08)
<ul class="list-disc">
<li>New actions supported:<ul class="list-disc"><li>Grounded into double play</li><li>Extra WP/PB for batter after BB/KS play</li><li>Errors with extra base advances</li></ul></li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.9.4</strong> (2022-11-08)
<ul class="list-disc">
<li>Finally fixed the bug preventing from selecting specific action on mobile screens</li>
</ul>

### <strong>Verze 0.9.3</strong> (2022-11-04)
<ul class="list-disc">
<li>Demo auto-deployment to <a href="https://app.netlify.com/">Netlify</a></li>
</ul>

### <strong>Verze 0.9.2</strong> (2022-10-10)
<ul class="list-disc">
<li>Trying to fix severe bug preventing from select from GUI element on mobile screens</li>
</ul>

### <strong>Verze 0.9.1</strong> (2021-12-27)
<ul class="list-disc">
<li>Fixed severe bug with validations</li><li>Auto-deployment to website included</li>
</ul>

### <strong>Verze 0.9</strong> (2021-12-27)
<ul class="list-disc">
<li>New actions supported:<ul class="list-disc"><li>Obstruction and interference</li><li>Flyout with bunt</li><li>Explicit 'no-advance'</li></ul></li><li>Output improvements:<ul class="list-disc"><li>Double and triple play connectors</li><li>Concurrent plays (e.g. double-steal) connectors</li></ul></li><li>Help section (manual) was added on website</li><li>Input validations refactored and enhanced</li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.8</strong> (2021-04-01)
<ul class="list-disc">
<li>New actions supported:<ul class="list-disc"><li>Same error advances</li><li>No-advance plays</li><li>Earned/unearned runs selection</li></ul></li><li>Fixed actions:<ul class="list-disc"><li>Extra bases with more runners (uppercase/lowercase fixed))</li></ul></li><li>Enhanced HTML structure</li><li>Significant code refactoring</li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.7</strong> (2020-12-08)
<ul class="list-disc">
<li>New actions supported:<ul class="list-disc"><li>PO - pick off</li><li>LT - lost turn</li><li>A - appeal play</li><li>OBR - out by rule</li><li>SH with throwing/dropped fly error</li><li>CS with throwing error</li></ul></li><li>Fixed actions:<ul class="list-disc"><li>"Muffled throws" removed (not official WBSC scoring term)</li><li>Batter indicator for CS, PO and O/ situations added</li></ul></li><li>Improved player selection inputs rendering and handling</li><li>Improved consecutive actions handling</li><li>Improved GUI and CSS form design</li><li>Download button to save outcome as PNG</li><li>Unlicense was officially included to declare this SW free of use</li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.6</strong> (2020-10-11)
<ul class="list-disc">
<li>New actions supported:<ul class="list-disc"><li>Sacrifice hit/fly</li><li>Infield fly</li><li>Bunt hit/out</li><li>Strikeout with occupied ball</li><li>TIE</li></ul></li><li>Strikeouts and base-on-balls are numbered according to the manual</li><li>Added option groups to help user determine if safe our out will occur</li><li>GUI inputs now render in correct order</li><li>Advances to 3rd and HP now render correctly</li><li>CSP implemented in order to increase web security</li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.5</strong> (2020-06-13)
<ul class="list-disc">
<li>Batting order (1-4) is now considered</li><li>New actions supported:<ul class="list-disc"><li>Numerous strike out variants</li><li>Extra base advances - BB, IBB, HP, WP, PB, O/</li><li>SB and CS situations</li><li>Various plays with errors</li></ul></li><li>Rendering improved and corrected for currently supported actions</li><li>Due to rendering issues situations are now allowed only with 0-3 assists (followed by an out or an error)</li><li>Various bugfixes and corrections</li>
</ul>

### <strong>Verze 0.4</strong> (2020-06-09)
<ul class="list-disc">
<li>Inputs reworked using dynamic JavaScript for displaying and hiding input fields</li><li>With broadened options it is now possible to:<ul class="list-disc"><li>Set up situations ranging from 0 to 4 assists (followed by an out or an error)</li><li>Set up some consecutive actions for runners on 1st, 2nd and/or 3rd base</li></ul></li>
</ul>

### <strong>Verze 0.3</strong> (2020-03-15)
<ul class="list-disc">
<li>Fixed error in displaying "Inside-the-park home run"</li><li>Code for rendering action inputs moved from HTML to JavaScript</li><li>Introduced possibility to add consecutive action after batter reaches first. Available are:<ul class="list-disc"><li>Safe advance on the throw</li><li>Safe advance on error (either decisive or extra-base)</li><li>Out after defensive play</li></ul></li>
</ul>

### <strong>Verze 0.2</strong> (2020-01-13)
<ul class="list-disc">
<li>Newly supported batter's actions:<ul class="list-disc"><li>Fielder's choice and occupied ball</li><li>Errors</li></ul></li>
</ul>

### <strong>Verze 0.1</strong> (2019-12-23)
<ul class="list-disc">
<li>First version recorded and launched. Basic website with inputs to generate situation for one batter. Output can be saved as an image.</li><li>Supported batter's actions:<ul class="list-disc"><li>Strikeout looking and swinging</li><li>Simple ground outs with 1 or 2 fielders involved</li><li>Full spectrum of fly outs</li><li>Full spectrum of hits including named locations</li><li>Ground rule doubles and inside the park home runs</li><li>BB, IBB and HP</li></ul></li>
</ul>