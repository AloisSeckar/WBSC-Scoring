## USING THE PROGRAM

The basic idea is pretty simple - you build up your input and when you hit "Score play", the outcome will be displayed in the "Output" section. It is designed to look like (blue) WBSC paper scoresheet to give the most precise experience of how similar action should be written down watching the game on the field. A couple of validations run above the input to avoid impossible plays or at least make them less probable.

There are a few premises to have in mind:

- The program always renders only ONE PLAY AT ONCE. It may consist of more situations (theoretically up to 10 separate actions), but all of them are meant to happen during the same pitch (or the same time between pitches). You cannot follow the flow of a game.
- Due to the above runner being placed on base is indicated with a <span style="color: red">red asterisk</span> mark. This is no official scoring abbreviation, it is just to indicate there was SOME play, but we don't cover it and don't care about it. The only exception from this is a potential tiebreaker (TIE) run because this is an arbitrary action.
- Batting order always starts from 1. Depending on the number of players involved, the output can show players 1-4. It is neither possible to select different initial order, nor skip some players in between.
        
## CONTROLS

### Basics

When you enter the site, you'll see a basic input prepared to put in batter's action:

<div>
<article-image src="/01-basic-input.png" alt="" class="w600" :width="600" />
</div>

Underneath there is basic output form consisting of empty scoresheet element and the "Download image" button:

<div>
<article-image src="/02-basic-output.png" alt=""  class="w200" :width="200" />
</div>

### Entering first play

Note you cannot select from **Run** combo-box by default, because it requires a play that ends up safe at home base. This option will be covered later in more advanced topics.

You start by picking an option from the first **Action** combo-box containing groups of possible situations. Internally this is called a "base action":

<div>
<article-image src="/03-base-action.png" alt="" class="w200" :width="200" />
</div>

Based on the selection the second combo-box becomes active and being filled with concrete plays. This is called a "specific action". The options are grouped into "safe" and "out" situations:

<div>
<article-image src="/04-specific-action.png" alt="" class="w400" :width="400" />
</div>

The third element of every action is called **Involved**. This means defensive player position(s) or locations on the field (in certain cases). The availability of those UI elements depends on specific action selection. For some plays there is no additional information allowed, for some there is exactly one or exactly two options. For the rest you can select 1-4. You add new inputs with green "+P" button and remove them with red "-P" button. When it is not possible to add/remove inputs, the buttons are not enabled.

<div>
<article-image src="/05-involved.png" alt="" class="h40" :height="40" />
</div>

Once you are ready to render the output of your play, hit the blue "Score play" button:

<div>
<article-image src="/06-generate.png" alt="" class="h40" :height="40" />
</div>

The outcome will be printed into the scoresheet:

<div>
<article-image src="/07-result.png" alt="" class="w200" />
</div>

You can download the result to preserve it either by right clicking it and pick up from the context menu or by the green "Download image" button:

<div>
<article-image src="/08-download.png" alt="" class="h40" :height="40" />
</div>

### Advanced - Runners

Actions are not limited to batter only. There is a toolbar that allows you picking up which players were involved:

<div>
<article-image src="/09-pick-players.png" alt="" class="h40" :height="40" />
</div>

The buttons are labeled "B" for the batter and "R1-R3" for the runners starting at respective base. When any of the buttons is selected, it has red color and "-" before the label. Corresponding set of inputs is rendered. Buttons that are green with "+" before the label mean that position is currently not used. Clicking on any of the buttons will alter its state. E.g. clicking on "+R1" will result into:

<div>
<article-image src="/10-runner-input.png" alt="" class="w600" :width="600" />
</div>

Another click will hide it again. You can choose any combination with or without the batter and with or without the runners. The only requirement is to have at least one player selected.

Runner's input is slightly different from the batter's and there are also minor differences between the bases. The selection of base and specific actions is adjusted to show relevant plays.

For 1st and 2nd base. There is a "Tiebreak" checkbox. If it is checked, runner doesn't appear on base with generic red asterisk, but instead the symbol TIE is used (which is how WBSC scores tiebreaker runners).

From the "Base" combo-box you pick the base that runner gains with current action. Obviously, the options are adjusted depending on which base we are currently on. If you need a runner to stay on the current base, you don't do it here, but instead you pick "No advance" from the "Action" menu.

If a play resulting in a safe situation at home plate is selected, combo-box "Run" becomes active. Then you pick from "Earned" / "Unearned" / "Team unearned" options. This feature is here mainly to show differences between each variant. There are some basic validations, but during the game it depends on a broader context of previous plays, while here we always score just one separate action. "Run" is also possible directly for the batter, but only for "Hit - Home run" plays.

<div>
<article-image src="/11-type-of-run.png" alt="" class="h150" :height="150" />
</div>

### Advanced - Extra inputs

If needed, there can be more than one situation chained together with the initial action. You can use green "+" button under "Involved" section to render new group of inputs:

<div>
<article-image src="/12-plus-action.png" alt="" class="h40" :height="40" />
</div>

The box with new inputs renders directly below:

<div>
<article-image src="/13-extra-input.png" alt="" class="w600" :width="600" />
</div>

If you change your mind, you hide and thus disable extra inputs with red "-" button:

<div>
<article-image src="/14-minus-action.png" alt="" class="h40" :height="40" />
</div>

For the batter there can be up to 3 extra inputs (one situation at each base). If you decide to remove them again, you have to start from the last (only the last "-" button is enabled). For the runners, the number of possible extra inputs logically decreases as the home plate is getting closer (0-2 for 1st base, 0-1 for 2nd base and none for 3rd base, as the first action already moved that runner home). The selection of actions is naturally different for the batter (becoming batter runner) and the other runners. The other functions are the same.

### Advanced - Reset form

You can use the yellow "Clear" button to quickly reset inputs into initial state with simple batter's action input only and everything cleared.

<div>
<article-image src="/15-clear.png" alt="" class="h40" :height="40" />
</div>

### Advanced - Import/Export input selection

You can use purple "Export selection" button to save the current selection and store it for later re-use. The file will be exported in `.json` format. Inputs can be exported anytime regardless of the validity.

<div>
<article-image src="/16-export.png" alt="" class="h40" :height="40" />
</div>

Using the purple "Import selection" button you can upload a previously exported `.json` file. Providing it is a valid file, it will be parsed and transferred into corresponding input selection and the situation will be re-generated. Validation error may be triggered.

<div>
<article-image src="/17-import.png" alt="" class="h40" :height="40" />
</div>

With the last purple "Import from library" button you can pick from our ever-growing collection of prepared situations. They are stored `.json` files, like the custom user inputs/outputs. Upon selection it will be parsed and transferred into corresponding input selection and the situation will be re-generated. This feature is meant to speed up the process of generating new images, if needed, and to help new users to better understand what is possible to achieve.

<div>
<article-image src="/18-import-lib.png" alt="" class="h40" :height="40" />
</div>
