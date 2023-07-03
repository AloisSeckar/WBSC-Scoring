<template>
  <div>
    <h2>REPORTING BUGS</h2>

    <div class="pt-2 text-justify">
      <p>
        <em>"In every computer program there is at least one bug."</em>
      </p>
      <p>
        This saying might be a little exaggerated, but generally it is quite hard to keep any application error prone.
        I am doing my best developing "WBSC Scoring", also having quite solid bunch of automated tests with dozens of
        situations to test every time before I add/update/fix something, but basically I am sure there are still mistakes
        hidden around and waiting to be discovered. And if not mistakes, then you'll probably come up with some
        "nice to have" new features I haven't thought about yet.
      </p>
      <p>
        I am ready for all your input. Here on this page, you can find details about the reporting process.
      </p>
    </div>

    <h2>GitHub issues</h2>
    <div class="mb-2">
      <p>
        GitHub provides a simple, yet sufficient bug/feature tracking system, which is being used for this project.
      </p>
      <p>
        You can find all the issues related to "WBSC Scoring" <a href="https://github.com/AloisSeckar/WBSC-Scoring/issues">HERE</a>.
        The default filter shows opened issues, that are known to me, but are about to be dealt with yet.
      </p>
      <p>
        If you are familiar with GitHub, feel free to open a new issue on your own. I will try to address it ASAP.
      </p>
    </div>

    <h2>Manual reporting</h2>
    <div class="mb-2">
      <p>If you're not sure how to deal with GitHub, you are of course welcome traditional ways of communication.</p>
      <p>The best option is to write me an email to <a href="mailto:alois.seckar@gmail.com">alois.seckar@gmail.com</a>.</p>
      <p>Alternative ways of contacting me via social media are listed <a href="http://alois-seckar.cz/">HERE</a>.</p>
    </div>

    <h2>What to include in the report?</h2>
    <div class="mb-2">
      <p>
        To be able to track down the issue I urge you to keep some basic structure of the reports with all the necessary
        details attached. Please always try to include following points:
      </p>
    </div>

    <h3>What is wrong?</h3>
    <div class="mb-2">
      <p>
        A brief, yet meaningful explanation of what seems to be broken/malfunctioning.
      </p>
    </div>
    <h3>Reproduction</h3>
    <div class="mb-2">
      <p>
        A sequence of user steps and interactions leading to the situation. This is important, because some things
        depend on the exact order of things, and I might not be able to do it the same way unless you tell me how.
      </p>
    </div>
    <h3>Screenshots</h3>
    <div class="mb-2">
      <p>
        A visualization of the problem often speaks for itself. Actually, good screenshots may be worth more than
        the text explanation alone.
      </p>
      <p>
        I would be interested in the picture of the output (to see what is wrong), but also (and MAINLY)
        of the inputs, because the cause may often be hidden right there. Please always try to attach them.
      </p>
    </div>
    <h3>Console output</h3>
    <div class="mb-2">
      <p>
        This is an advanced topic, but it can also help me a lot. If you press <strong>F12</strong> in most of the
        browsers (on desktop), you gain access to a thing called "Console". As you visit any website, the actions
        your browser is performing during rendering the content may manifest here. Especially when some error occurs,
        a red text may appear here giving hints to developers about the cause.
      </p>
      <p>
        Here is an example of console output (after I picked wrong file type during importing input):
      </p>
      <img src="/report-console.png" class="w-full h-auto max-w-4xl">
    </div>

    <NavButtons />
  </div>
</template>
