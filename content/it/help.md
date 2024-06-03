## USO DEL PROGRAMMA

L'idea di base è piuttosto semplice: componi il tuo input e quando premi "Score play", il risultato sarà visualizzato nella sezione "Output". È progettato per assomigliare al foglio segnapunti (blu) della WBSC, per offrire l'esperienza più precisa di come un'azione simile dovrebbe essere annotata durante la visione di una partita sul campo. Sono eseguite alcune validazioni sull'input per evitare giocate impossibili o almeno renderle meno probabili.

Ci sono alcuni presupposti da tenere a mente:

- Il programma visualizza sempre UNA SOLA GIOCATA ALLA VOLTA. Può consistere in più situazioni (teoricamente fino a 10 azioni separate), ma tutte devono accadere durante lo stesso lancio (o nello stesso intervallo di tempo tra i lanci). Non è possibile seguire il flusso di una partita.
- A causa di quanto sopra, il corridore posizionato in base è indicato con un <span style="color: red">asterisco rosso</span>. Questa non è un'abbreviazione ufficiale di punteggio, serve solo a indicare che c'è stata UNA giocata, ma non la copriamo e non ce ne preoccupiamo. L'unica eccezione è una potenziale corsa di spareggio (TIE), poiché si tratta di un'azione arbitraria.
- L'ordine di battuta inizia sempre dal 1. A seconda del numero di giocatori coinvolti, l'output può mostrare i giocatori da 1 a 4. Non è possibile selezionare un ordine iniziale diverso, né saltare alcuni giocatori

## CONTROLLI

### Basi

Quando entri nel sito, vedrai un input di base pronto per inserire l'azione del battitore:

<div>
<article-image src="/01-basic-input.png" alt="" class="w600" :width="600" />
</div>

Sotto c'è una forma di output di base che consiste in un elemento di foglio segnapunti vuoto e il pulsante "Scarica immagine":

<div>
<article-image src="/02-basic-output.png" alt=""  class="w200" :width="200" />
</div>

### Inserisci la prima azione

Nota che non puoi selezionare l'opzione **Punto** dalla casella combinata di default, perché richiede una giocata che finisca con il corridore salvo a casa base. Questa opzione sarà trattata più avanti in argomenti più avanzati.

Inizi scegliendo un'opzione dalla prima casella combinata Action contenente gruppi di situazioni possibili. Internamente questa è chiamata una "base action":

<div>
<article-image src="/03-base-action.png" alt="" class="w200" :width="200" />
</div>

In base alla selezione, la seconda casella combinata diventa attiva e viene riempita con azioni concrete. Questo è chiamato "specific action". Le opzioni sono raggruppate in situazioni "safe" (sicure) e "out" (eliminate):

<div>
<article-image src="/04-specific-action.png" alt="" class="w400" :width="400" />
</div>

Il terzo elemento di ogni azione è chiamato **Coinvolto**. Questo significa la posizione del giocatore difensivo(o) o le posizioni sul campo (in certi casi). La disponibilità di quegli elementi UI dipende dalla selezione dell'azione specifica. Per alcune giocate non è consentita alcuna informazione aggiuntiva, per altre c'è esattamente una o esattamente due opzioni. Per il resto puoi selezionare da 1 a 4. Aggiungi nuovi input con il pulsante verde "+P" e rimuovili con il pulsante rosso "-P". Quando non è possibile aggiungere/rimuovere input, i pulsanti non sono abilitati.

<div>
<article-image src="/05-involved.png" alt="" class="h40" :height="40" />
</div>

Quando sei pronto per visualizzare il risultato della tua giocata, premi il pulsante blu "Classifica azione":

<div>
<article-image src="/06-generate.png" alt="" class="h40" :height="40" />
</div>

L'esito verrà stampato sul ruolino:

<div>
<article-image src="/07-result.png" alt="" class="w200" />
</div>

Puoi scaricare il risultato per conservarlo sia facendo clic destro e scegliendo dal menu contestuale, sia premendo il pulsante verde "Scarica immagine":

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

### Avanzamenti - Extra input

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
