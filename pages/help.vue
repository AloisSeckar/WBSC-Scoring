<template>
    <div>

        <div class="container wbsc-paragraph"></div>

        <div class="container wbsc-paragraph">

            <h2>WORKING WITH WBSC SCORING CREATOR</h2>

            <div class="row">
                <div class="col-12">
                    <p>The basic idea is pretty simple - you build up your input and when you hit "Generate action", the
                        outcome will be displayed in "Output" section. It is designed to look like (blue) WBSC paper
                        scoresheet to give the most precise experience of how similar action should be written down
                        watching the game on the field. Couple of validations run above the input to avoid impossible
                        plays or at least make them less probable.</p>
                    <p>There are a few premises to have in mind:</p>
                    <ul class="list-disc">
                        <li>The program always renders only ONE PLAY AT ONCE. It may consist of more situations
                            (theoretically up to 10 separate actions), but all of them are meant to happen during the
                            same pitch (or the same time between pitches). You cannot follow the flow of a game.</li>
                        <li>Due to the above runner being placed on base is indicated with red astrisk mark. This is no
                            offical scoring abbreviation, it is just to indicate there was SOME play, but we don't cover
                            it and don't care about it. The only exception from this is a potentional tiebreaker (TIE)
                            run.</li>
                        <li>Batting order always starts from 1. Depending on number of players involved, the output can
                            show players 1-4. It is neither possible to select different initial order, nor skip some
                            players in between.</li>
                    </ul>
                </div>
            </div>

            <h2>CONTROLS</h2>

            <h3>Basics</h3>
            <div class="row">
                <div class="col-12">
                    <p>When you enter the site, you'll see a basic input prepared to put in batter's action:</p>
                    <img src="@/01-basic-input.png" width="800" height="auto" />
                    <p>Underneath there is basic output form consisting of empty scoresheet element and a "Download
                        image" button:</p>
                    <img src="@/02-basic-output.png" width="300" height="auto" />
                </div>
            </div>

            <h3>Entering first play</h3>
            <div class="row">
                <div class="col-12">
                    <p>Note you cannot select from <strong>Run</strong> combobox by default, because it requires a play
                        that ends up safe at home base. This option will be covered later in more advanced topics.</p>
                    <p>You start by picking an option from first <strong>Action</strong> combobox containing groups of
                        possible situations. Internally this is called a "base action":</p>
                    <img src="@/03-base-action.png" width="200" height="auto" />
                    <p>Based on the selection the second combobox become active and being filled with concrete plays.
                        This is called a "specific action". The options are grouped into "safe" and "out" situations:
                    </p>
                    <img src="@/04-specific-action.png" width="400" height="auto" />
                    <p>Third element of every action is called <strong>Involved</strong>. This means defensive player
                        position(s) or locations on the field (in certain cases). The availability of those UI elements
                        depends on specific action selection. For some plays there is no additional information allowed,
                        for some there is exactly one or exactly two options. For the rest you can select 1-4. You add
                        new inputs with green "+P" button and remove them with red "-P" button. When it is not possible
                        to add/remove inputs, the buttons are not enabled.</p>
                    <img src="@/05-involved.png" width="auto" height="50" />
                    <p>Once you are ready to render the output of your play, hit blue "Generate action" button:</p>
                    <img src="@/06-generate.png" width="auto" height="50" />
                    <p>Outcome will be printed into scoresheet:</p>
                    <img src="@/07-result.png" width="300" height="auto" />
                    <p>You can download the result to preserve it either by right clicking it and pick up from the
                        context menu or by green "Download image" button:</p>
                    <img src="@/08-download.png" width="auto" height="50" />
                </div>
            </div>

            <h3>Advanced - Runners</h3>

            <div class="row">
                <div class="col-12">
                    <p>Actions are not limited to batter only. There is a toolbar that allows you picking up which
                        players were involved:</p>
                    <img src="@/09-pick-players.png" width="auto" height="50" />
                    <p>The buttons are labeled "B" for the batter and "R1-R3" for the runners starting at respective
                        base. When any of the buttons is selected, it has red color and "-" before the label.
                        Corresponding set of inputs is rendered. Buttons that are green with "+" before the label mean
                        that position is currently not used. Clicking on any of the buttons will alter its state. Eg.
                        clicking on "+R1" will result into:</p>
                    <img src="@/10-runner-input.png" width="800" height="auto" />
                    <p>Another click will hide it again. You can choose any combination with or without the batter and
                        with or without the runners. The only requirement is to have at least one player selected.</p>
                    <p>Runner's input is slightly different from the batter's and there are also minor differencies
                        between the bases. The selection of base and specific actions is adjusted to show relevant
                        plays.</p>
                    <p>For 1st and 2nd base. There is a "Tiebreak" checkbox. If it is checked, runner doesn't appear on
                        base with generic red asterisk, but instead the symbol TIE is used (which is how WBSC scores
                        tiebreaker runners).</p>
                    <p>From the "Base" combobox you pick the base, that runner gains with current action. Obviously, the
                        options are adjusted depending on which base we are currently on. If you need runner to stay on
                        current base, you don't do it here, but instead you pick "No advance" from "Action" menu.</p>
                    <p>If play that results into safe situation at home plate is selected, combobox "Run" becomes
                        active. Then you pick from "Earned" / "Unearned" / "Team unearned" options. This featuere is
                        here just to show differencies between each variant. During the game it depends on broader
                        context, but here we always score just one separate action. "Run" is also possible for the
                        batter, but only for "Hit - Homerun" plays.</p>
                    <img src="@/11-type-of-run.png" width="auto" height="100" />
                </div>
            </div>

            <h3>Advanced - Extra inputs</h3>

            <div class="row">
                <div class="col-12">
                    <p>If needed, there can be more than one situation chained together with the initial action. You can
                        use green "+" button under "Involved" section to render new group of inputs:</p>
                    <img src="@/12-plus-action.png" width="auto" height="50" />
                    <p>The box with new inputs renders directy below:</p>
                    <img src="@/13-extra-input.png" width="800" height="auto" />
                    <p>If you change your mind, you hide and thus disable extra inputs with red "-" button:</p>
                    <img src="@/14-minus-action.png" width="auto" height="50" />
                    <p>For the batter there can be up to 3 extra inputs (one situation at each base). If you decide to
                        remove them again, you have to start from the last (only the last "-" button is enabled). For
                        the runners, the number of possible extra inputs logically decreases as the home plate getting
                        near (0-2 for 1st base, 0-1 for 2nd base and none for 3rd base, as the first action already
                        moved that runner home). The selection of actions is naturally different for the batter
                        (becoming batter runner) and the other runners. The other functions are the same.</p>
                </div>
            </div>

            <h3>Advanced - Reset form</h3>

            <div class="row">
                <div class="col-12">
                    <p>You can use yellow "Clear" button to quickly reset inputs into initial state with simple batter's
                        action input only and everything cleared.</p>
                    <img src="@/15-clear.png" width="auto" height="50" />
                </div>
            </div>

        </div>

        <a class="btn btn-secondary" href="#" role="button">Back to top</a>
        <a class="btn btn-primary" href="index.html" role="button">Back to homepage</a>
        
    </div>
</template>