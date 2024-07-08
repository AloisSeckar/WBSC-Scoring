## PROJECT DESCRIPTION

**WBSC Scoring Creator** is a JavaScript-based program that allows selecting combination of plays that may occur in baseball/softball game to visualize the way of scoring such play in [WBSC](https://www.wbsc.org/) scoring system. It is meant both for individual scorers for learning and revising and for tutors to help them build up educational materials for clinics.

For more information about how to use the program, see [User manual](/help).

The project is maintained and developed voluntarily by a dedicated scorer who happens to know a thing or two about programming as well. However, it will take long before it reaches ideal shape, if ever. Shall you encounter any incorrect or odd behavior or something that is missing and should be also included, don't hesitate to contact the author - either directly via [my email](mailto:alois.seckar{'@'}gmail.com) or you can use [GitHub Issues](https://github.com/AloisSeckar/WBSC-Scoring/issues) for creating new report/question/suggestion directly there. If you do so, try to describe your issue, so it can be addressed. Screenshots are useful to see what is happening. You may want to check our [reporting bugs guide](/help).

This program is still evolving. Visit the ["TODO" section](/project#todo) in Project overview to check what is yet planned to be implemented. Refer to the ["Limitations" list](/project#limitations) to see what is certainly not possible atm.

This is an [UNLICENSE](https://unlicense.org/) open source that can be found [HERE](https://github.com/AloisSeckar/WBSC-Scoring). Any help with further development would be appreciated, but you can as well take the source code and do whatever you want with it yourself.

<a id="done"></a>
 
## DONE
_(what you can find here)_

<ul class="list-disc">
<li>Action editor capable of inserting most of existing situations according to latest version of WBSC manual</li><li>Download output images as PNG</li><li>Export/Import actions in JSON format</li><li>Actions library with more than 200 predefined plays</li><li>User manual</li><li>English, Italian and Czech translation</li>
</ul>

<a id="todo"></a>

## TO-DO list
_(hopefully will be implemented in next few releases)_

<ul class="list-disc">
<li>Reorganizing actions library for greater clarity</li><li>Translations to other languages</li><li>Info pages with scoresheet description and ways of marking substitutions</li><li>More input validations</li><li>Output corrections and fixes where necessary</li>
</ul>


<a id="limitations"></a>

## Limitations
_(not planned to be implemented soon)_

There are several features of WBSC scoring system that are currently not covered by this program. They may be included in some future releases, but no promises.

<ul class="list-disc">
<li>It is not possible to specify actions leading to runners appearing on bases (except TIE). The actual action is always replaced with a <strong><span style="color: red">red asterisk</span></strong>.</li><li>It is not possible to specify the batting order of the batter and previous runners. Output always starts from 1.</li><li>It is not possible to get different number of Ks and BBs than 1</li><li>Actions are limited to up to 3 assists (followed by an out or an error). This is mainly to avoid practical problems with rendering more numbers.</li><li>No 10th player (additional outfielder) for slowpitch. However, it is quite probable this will be eventually added.</li><li>Not covering possible Baseball5 features. This is because Baseball5 system is very different and non-compatible. If you're interested, here is <a href="https://s3-eu-west-1.amazonaws.com/static.wbsc.org/assets/cms/documents/9b129842-cb39-da53-4b67-9c4c5a86f997.pdf">the official WBSC document</a> covering the Baseball5 scoring system.</li><li>Not covering substitutions and statistical outputs. It doesn't quite make sense to include them into the app mechanic. However, it is planned to add dedicated static articles covering these two topics.</li>
</ul>

<a id="history"></a>

## History
See [CHANGELOG](https://github.com/AloisSeckar/WBSC-Scoring/blob/master/CHANGELOG.md)