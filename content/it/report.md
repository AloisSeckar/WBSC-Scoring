## SEGNALARE BUGS

_In ogni programma c'è almeno un bug._

Questo detto potrebbe essere un po' esagerato, ma in generale è abbastanza difficile mantenere qualsiasi applicazione priva di errori. Sto facendo del mio meglio per sviluppare "WBSC Scoring", avendo anche un bel po' di test automatizzati con decine di situazioni da testare ogni volta prima di aggiungere/aggiornare/risolvere qualcosa, ma in generale, sono sicuro che ci siano ancora errori nascosti in giro e in attesa di essere scoperti. E se non errori, allora probabilmente verrai con alcune nuove funzionalità "belle da avere" che non ho ancora pensato.

Sono pronto per tutti i tuoi input. Qui su questa pagina, puoi trovare dettagli sul processo di segnalazione.

## GitHub issues

GitHub fornisce un sistema di tracciamento dei bug/feature semplice, ma sufficiente, che viene utilizzato per questo progetto.

Puoi trovare tutte le segnalazioni relativi a "WBSC Scoring" [QUI](https://github.com/AloisSeckar/WBSC-Scoring/issues). Il filtro predefinito mostra i problemi aperti, che sono noti a me, ma che devono ancora essere affrontati.

Se sei familiare con GitHub, sentiti libero di aprire una nuova segnalazione da solo. Cercherò di affontarla il prima possibile

## Report manuale

Se non sei sicuro di come gestire GitHub, sei naturalmente il benvenuto usanto i modi tradizionali di comunicazione.

La migliore opzione è scrivermi una email a [alois.seckar{'@'}gmail.com](mailto:alois.seckar{'@'}gmail.com).

Altre modalità di contatto tramite social media sono elencate [QUI](http://alois-seckar.cz/).

## Cosa includere nella segnalazione?

Per poter individuare il problema, ti consiglio di mantenere una struttura di base dei report con tutti i dettagli necessari allegati. Ti prego di cercare sempre di includere i seguenti punti:

### Cosa è sbagliato?

Una spiegazione breve, ma significativa di ciò che sembra essere rotto/malfunzionante.

### Come riprodurlo?

Una sequenza di passaggi e interazioni dell'utente che portano alla situazione. Questo è importante, perché alcune cose dipendono dall'ordine esatto delle cose, e potrei non essere in grado di farlo allo stesso modo a meno che tu non mi dica come.

### Screenshots

Uno screenshot del problema spesso parla da solo. In realtà, buoni screenshot possono valere più della sola spiegazione testuale.

Sarei interessato alla foto dell'output (per vedere cosa non va), ma anche (e SOPRATTUTTO) degli input, perché la causa può spesso essere nascosta proprio lì. Ti prego di provare ad allegarli sempre.

### Console output

Questo è un argomento avanzato ma può anche aiutarmi molto. Se premi **F12** nella maggior parte dei browser (su desktop), ottieni accesso a una cosa chiamata "Console". Mentre visiti qualsiasi sito web, le azioni che il tuo browser sta eseguendo durante il rendering del contenuto possono manifestarsi qui. Specialmente quando si verifica un errore, un testo rosso può apparire qui dando suggerimenti agli sviluppatori sulla causa.

Ecco un esempio di output della console (dopo aver scelto il tipo di file sbagliato durante l'importazione dell'input):

<div>
<article-image src="report-console.png" alt="" css="w-full md:w-[768px]" />
</div>
