<template>
  <div>
    <h2>{{ $t('help.title') }}</h2>

    <div class="mb-2">
      <p v-html="$t('help.dscr')" />
      <p v-html="$t('help.premises')" />
      <ul class="list-disc">
        <li v-html="$t('help.premise1')" />
        <li v-html="$t('help.premise2')" />
        <li v-html="$t('help.premise3')" />
      </ul>
    </div>

    <h2>CONTROLS</h2>

    <h3>Basics</h3>
    <div class="mb-2">
      <p>When you enter the site, you'll see a basic input prepared to put in batter's action:</p>
      <img src="/01-basic-input.png" width="800" height="auto">

      <p>
        Underneath there is basic output form consisting of empty scoresheet element and the "Download
        image" button:
      </p>
      <img src="/02-basic-output.png" width="300" height="auto">
    </div>

    <h3>Entering first play</h3>
    <div class="mb-2">
      <p>
        Note you cannot select from <strong>Run</strong> combo-box by default, because it requires a play
        that ends up safe at home base. This option will be covered later in more advanced topics.
      </p>
      <p>
        You start by picking an option from the first <strong>Action</strong> combo-box containing groups of
        possible situations. Internally this is called a "base action":
      </p>
      <img src="/03-base-action.png" width="200" height="auto">

      <p>
        Based on the selection the second combo-box becomes active and being filled with concrete plays.
        This is called a "specific action". The options are grouped into "safe" and "out" situations:
      </p>
      <img src="/04-specific-action.png" width="400" height="auto">

      <p>
        Third element of every action is called <strong>Involved</strong>. This means defensive player
        position(s) or locations on the field (in certain cases). The availability of those UI elements
        depends on specific action selection. For some plays there is no additional information allowed,
        for some there is exactly one or exactly two options. For the rest you can select 1-4. You add
        new inputs with green "+P" button and remove them with red "-P" button. When it is not possible
        to add/remove inputs, the buttons are not enabled.
      </p>
      <img src="/05-involved.png" width="auto" height="50">

      <p>Once you are ready to render the output of your play, hit the blue "Generate action" button:</p>
      <img src="/06-generate.png" width="auto" height="50">

      <p>The outcome will be printed into the scoresheet:</p>
      <img src="/07-result.png" width="300" height="auto">

      <p>
        You can download the result to preserve it either by right clicking it and pick up from the
        context menu or by the green "Download image" button:
      </p>
      <img src="/08-download.png" width="auto" height="50">
    </div>

    <h3>Advanced - Runners</h3>

    <div class="mb-2">
      <p>
        Actions are not limited to batter only. There is a toolbar that allows you picking up which
        players were involved:
      </p>
      <img src="/09-pick-players.png" width="auto" height="50">

      <p>
        The buttons are labeled "B" for the batter and "R1-R3" for the runners starting at respective
        base. When any of the buttons is selected, it has red color and "-" before the label.
        Corresponding set of inputs is rendered. Buttons that are green with "+" before the label mean
        that position is currently not used. Clicking on any of the buttons will alter its state. E.g.
        clicking on "+R1" will result into:
      </p>
      <img src="/10-runner-input.png" width="800" height="auto">

      <p>
        Another click will hide it again. You can choose any combination with or without the batter and
        with or without the runners. The only requirement is to have at least one player selected.
      </p>
      <p>
        Runner's input is slightly different from the batter's and there are also minor differences
        between the bases. The selection of base and specific actions is adjusted to show relevant
        plays.
      </p>
      <p>
        For 1st and 2nd base. There is a "Tiebreak" checkbox. If it is checked, runner doesn't appear on
        base with generic red asterisk, but instead the symbol TIE is used (which is how WBSC scores
        tiebreaker runners).
      </p>
      <p>
        From the "Base" combo-box you pick the base that runner gains with current action. Obviously, the
        options are adjusted depending on which base we are currently on. If you need a runner to stay on
        the current base, you don't do it here, but instead you pick "No advance" from the "Action" menu.
      </p>
      <p>
        If a play resulting into a safe situation at home plate is selected, combo-box "Run" becomes
        active. Then you pick from "Earned" / "Unearned" / "Team unearned" options. This feature is
        here just to show differences between each variant. During the game it depends on a broader
        context, but here we always score just one separate action. "Run" is also possible directly for
        the batter, but only for "Hit - Home run" plays.
      </p>
      <img src="/11-type-of-run.png" width="auto" height="100">
    </div>

    <h3>Advanced - Extra inputs</h3>

    <div class="mb-2">
      <p>
        If needed, there can be more than one situation chained together with the initial action. You can
        use green "+" button under "Involved" section to render new group of inputs:
      </p>
      <img src="/12-plus-action.png" width="auto" height="50">

      <p>The box with new inputs renders directly below:</p>
      <img src="/13-extra-input.png" width="800" height="auto">

      <p>If you change your mind, you hide and thus disable extra inputs with red "-" button:</p>
      <img src="/14-minus-action.png" width="auto" height="50">

      <p>
        For the batter there can be up to 3 extra inputs (one situation at each base). If you decide to
        remove them again, you have to start from the last (only the last "-" button is enabled). For
        the runners, the number of possible extra inputs logically decreases as the home plate is getting
        closer (0-2 for 1st base, 0-1 for 2nd base and none for 3rd base, as the first action already
        moved that runner home). The selection of actions is naturally different for the batter
        (becoming batter runner) and the other runners. The other functions are the same.
      </p>
    </div>

    <h3>Advanced - Reset form</h3>

    <div class="mb-2">
      <p>
        You can use the yellow "Clear" button to quickly reset inputs into initial state with simple batter's
        action input only and everything cleared.
      </p>
      <img src="/15-clear.png" width="auto" height="50">
    </div>

    <h3>Advanced - Import/Export input selection</h3>

    <div class="mb-2">
      <p>
        You can use purple "Export selection" button to save the current selection and store it for later re-use.
        The file will be exported in <strong>.json</strong> format. Inputs can be exported anytime regardless of
        the validity.
      </p>
      <img src="/16-export.png" width="auto" height="50">
    </div>
    <div class="mb-2">
      <p>
        Using the purple "Import selection" button you can upload a previously exported <strong>.json</strong> file.
        Providing it is a valid file, it will be parsed and transferred into corresponding input selection and
        the situation will be re-generated. Validation error may be triggered.
      </p>
      <img src="/17-import.png" width="auto" height="50">
    </div>
    <div class="mb-2">
      <p>
        With the last purple "Import from library" button you can pick from our ever-growing collection of prepared
        situations. They are stored <strong>.json</strong> files, like the custom user inputs/outputs. Upon selection
        it will be parsed and transferred into corresponding input selection and the situation will be re-generated.
        This feature is meant to speed up the process of generating new images, if needed, and to help new users
        to better understand what is possible to achieve.
      </p>
      <img src="/18-import-lib.png" width="auto" height="50">
    </div>

    <NavButtons />
  </div>
</template>
