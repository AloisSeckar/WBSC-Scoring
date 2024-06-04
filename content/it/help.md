## USO DEL PROGRAMMA

L'idea di base è piuttosto semplice: componi il tuo input e quando premi "Score play", il risultato sarà visualizzato nella sezione "Output". È progettato per assomigliare al foglio segnapunti (blu) della WBSC, per offrire l'esperienza più precisa di come un'azione simile dovrebbe essere annotata durante la visione di una partita sul campo. Sono eseguite alcune validazioni sull'input per evitare giocate impossibili o almeno renderle meno probabili.

Ci sono alcuni presupposti da tenere a mente:

- Il programma visualizza sempre UNA SOLA GIOCATA ALLA VOLTA. Può consistere in più situazioni (teoricamente fino a 10 azioni separate), ma tutte devono accadere durante lo stesso lancio (o nello stesso intervallo di tempo tra i lanci). Non è possibile seguire il flusso di una partita.
- A causa di quanto sopra, il corridore posizionato in base è indicato con un <span style="color: red">asterisco rosso</span>. Questa non è un'abbreviazione ufficiale di punteggio, serve solo a indicare che c'è stata UNA giocata, ma non la sappiamo e non ce ne preoccupiamo. L'unica eccezione è un corridore di tiebreak (TIE), poiché si tratta di un'azione arbitraria.
- L'ordine di battuta inizia sempre dal 1. A seconda del numero di giocatori coinvolti, l'output può mostrare i giocatori da 1 a 4. Non è possibile selezionare un ordine iniziale diverso, né saltare alcuni giocatori

## CONTROLLI

### Basi

Quando entri nel sito, vedrai un input di base pronto per inserire l'azione del battitore:

<div>
<article-image src="/01-basic-input.png" alt="" sizes="100% sm:640px" />
</div>

Sotto c'è una forma di output di base che consiste in un elemento di foglio segnapunti vuoto e il pulsante "Scarica immagine":

<div>
<article-image src="/02-basic-output.png" alt=""  :width="200" />
</div>

### Inserisci la prima azione

Nota che non puoi selezionare l'opzione **Punto** dalla casella combinata di default, perché richiede una giocata che finisca con il corridore salvo a casa base. Questa opzione sarà trattata più avanti in argomenti più avanzati.

Inizi scegliendo un'opzione dalla prima casella combinata Azione contenente gruppi di situazioni possibili. Internamente questa è chiamata una "azione di base":

<div>
<article-image src="/03-base-action.png" alt="" :width="200" />
</div>

In base alla selezione, la seconda casella combinata diventa attiva e viene riempita con azioni concrete. Questa è chiamata "azione specifica". Le opzioni sono raggruppate in situazioni "savlo" e "out":

<div>
<article-image src="/04-specific-action.png" alt="" class="w400" :width="400" />
</div>

Il terzo elemento di ogni azione è chiamato **Coinvolto**. Questo significa la posizione del giocatore difensivo(i) o le posizioni sul campo (in certi casi). La disponibilità di quegli elementi UI dipende dalla selezione dell'azione specifica. Per alcune giocate non è consentita alcuna informazione aggiuntiva, per altre c'è esattamente una o esattamente due opzioni. Per il resto puoi selezionare da 1 a 4. Aggiungi nuovi input con il pulsante verde "+P" e rimuovili con il pulsante rosso "-P". Quando non è possibile aggiungere/rimuovere input, i pulsanti non sono abilitati.

<div>
<article-image src="/05-involved.png" alt="" :height="40" />
</div>

Quando sei pronto per visualizzare il risultato della tua giocata, premi il pulsante blu "Classifica azione":

<div>
<article-image src="/06-generate.png" alt="" :height="40" />
</div>

L'esito verrà stampato:

<div>
<article-image src="/07-result.png" alt="" />
</div>

Puoi scaricare il risultato per conservarlo sia facendo clic destro e scegliendo dal menu contestuale, sia premendo il pulsante verde "Scarica immagine":

<div>
<article-image src="/08-download.png" alt="" :height="40" />
</div>

### Avanzato - Corridori

Le azioni non solo limitate al solo battitore. È presente un set di pulsanti per selezionare i giocatori coinvolti:

<div>
<article-image src="/09-pick-players.png" alt="" :height="40" />
</div>

I pulsati conetengono "B" per il battitore e "R1-R3" per i corridori delle rispettive basi. Quando uno qualsiasi di questi è selezionato il pulsante è colorato di rosse e un simbolo "-" compare prima della sigla. I gruppi di inserimenti sono visualizzati di conseguenza. I bottono con un "+" verde prima dell'etichetta significano che quella posizione non sta venendo usata. Cliccando un qualisasi pulsante lo stato di questo cambierà. Es. se si clicca su "+R1" questo sarà il risultato:

<div>
<article-image src="/10-runner-input.png" alt="" sizes="100% sm:640px" />
</div>

Un altro click lo nasconderà. Puoi scegliere una qualisasi combinazione con o senza il battitore e con o senza i corridori, l'unico requisito è che almeno un giocatore è selezionato.

GLi input dei corridori sono leggermente diversi dagli input del battotore e ci sono anche delle leggere differenze tra le diverse basi. Le possibilità delle azioni di una base specifica sono congrue alle possibilità di quella base.

Per la 1° e la 2° base. C'è una casella di spunta "Tiebreak". Se è selezionata, il corridore non apparirà con il generico asterico rosso, invece comparirà con il simbolo TIE (che è il simbolo per i corridori piazati al tiebreak).

Dal menù "Base" puoi scegliere la base che guadagna quel corridore su questa azione. Ovviamente le possibilità sono specifiche per la base attuale. Se necessiti che quel corridore rimagna sulla sua attuale base, non lo devi inserire da questo menù, ma devi selezionare "Nessun avanzameto" dal menù "Azione".

Se l'azione risulta con un salvo a casa base, il menù "Punto" diventerà attivo. Ora puoi selezionare se il punto è: "ER" _(Guadagnato)_  / "UE" _(Non guadagnato)_ / "TU" _(Non guadagnato di squadra)_. Questa opzione è presente per mostrare le diverse varietà. Ci sono dei controlli di base, ma durante la partita il punto dipende dalle azioni precedenti, mentre qui classifichiamo solo una azione separata. Il menù "Punto" è usabile anche dalla sezione del battitore ma solo sulle giocate di tipo "Valida - Fuori campo".

<div>
<article-image src="/11-type-of-run.png" alt="" :height="150" />
</div>

### Avanzato - Extra input

Se necessario, possono essere concatenate più situazioni con l'azione iniziale. Puoi usare il pulsante verde "+" sotto la sezione "Coinvolto" per visualizzare i nuovi gruppi di input:

<div>
<article-image src="/12-plus-action.png" alt="" :height="40" />
</div>

La casella con i nuovi input verrà visualizzata direttamente sotto:

<div>
<article-image src="/13-extra-input.png" alt="" :width="600" />
</div>

Se cambi idea, puoi nascondere e disabilitare gli input extra con il pulsante rosso "-":

<div>
<article-image src="/14-minus-action.png" alt="" :height="40" />
</div>

Per il battitore ci possono essere fino a 3 input extra (una situazione per ogni base). Se decidi di rimuoverli di nuovo, devi ricominciare dall'ultimo (solo il pulsante "-" è abilitato). Per i corridori, il numero di possibili input extra diminusce logicamente in base a quanto si avvicinano a casa base (0-2 per la 1° base, 0-1 per la 2° base e nessuno per la 3° base, poiché la prima azione ha già spostato quel corridore a casa). La selezione delle azioni è naturalmente diversa per il battitore (diventando battitore-corridore) e gli altri corridori. Le altre funzioni sono le stesse.

### Avanzato - Pulisci input

Puoi usare il pulsante giallo "Pulisci" per ripristinare rapidamente gli input allo stato iniziale con solo l'input dell'azione del battitore e tutto pulito.

<div>
<article-image src="/15-clear.png" alt="" :height="40" />
</div>

### Avanzato - Selezione input Import/Export

Puoi usare il pulsante viola "Esporta selezione" per salvare la selezione corrente e conservarla per un utilizzo successivo. Il file verrà esportato in formato `.json`. Gli input possono essere esportati in qualsiasi momento, indipendentemente dalla validità.

<div>
<article-image src="/16-export.png" alt="" :height="40" />
</div>

Usando il pulsante viola "Importa selezione" puoi caricare un file `.json` esportato in precedenza. Se è un file valido, verrà analizzato e trasferito nella selezione di input corrispondente e la situazione verrà rigenerata. Potrebbe essere attivato un errore di validazione.

<div>
<article-image src="/17-import.png" alt="" :height="40" />
</div>

Con l'ultimo pulsante viola "Importa dalla libreria" puoi scegliere dalla nostra sempre crescente collezione di situazioni preparate. Sono memorizzati file `.json`, come gli input/output personalizzati. Alla selezione verrà analizzato e trasferito nella selezione di input corrispondente e la situazione verrà rigenerata. Questa funzione è pensata per velocizzare il processo di generazione di nuove immagini, se necessario, e per aiutare i nuovi utenti a capire meglio cosa è possibile ottenere.

<div>
<article-image src="/18-import-lib.png" alt="" :height="40" />
</div>
