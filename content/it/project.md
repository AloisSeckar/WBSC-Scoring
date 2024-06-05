## DESCRIZIONE PROGETTO

**WBSC Scoring Creator** è un programma basato su JavaScript che permette di selezionare combinazioni di azioni che possono verificarsi in una partita di baseball/softball per visualizzare il modo di segnare tale azione nel sistema di punteggio [WBSC](https://www.wbsc.org/). È pensato sia per i segnapunti individuali per l'apprendimento e la revisione, sia per i tutor per aiutarli a costruire materiali educativi per le riunioni/clinics.

Per maggiori informazioni su come utilizzare il programma, consulta il [Manuale utente](/help).

Il progetto è mantenuto e sviluppato volontariamente da uno scorer dedicato che sa anche qualcosa di programmazione. Tuttavia, ci vorrà molto tempo prima che raggiunga la forma ideale, se mai la raggiungerà. Se dovessi incontrare un comportamento non corretto o qualcosa che manca e dovrebbe essere incluso, non esitare a contattare l'autore - direttamente tramite [la mia email](mailto:alois.seckar{'@'}gmail.com) o puoi utilizzare le [GitHub Issues](https://github.com/AloisSeckar/WBSC-Scoring/issues) per creare nuovi report/domande/suggerimenti direttamente  da lì. Se lo fai, cerca di descrivere il tuo problema in modo che possa essere affrontato. Gli screenshot sono utili per vedere cosa sta succedendo. Potresti voler controllare la nostra [guida alla segnalazione dei bug](/help).

Questo programma è ancora in evoluzione. Visita la sezione ["TODO"](/project#todo) nella panoramica del progetto per verificare cosa è ancora previsto di essere implementato. Fai riferimento alla lista delle ["Limitazioni"](/project#limitations) per vedere cosa non è attualmente possibile.

Il progetto è rilasciato sotto la licenza [UNLICENSE](https://unlicense.org/) e il codice sorgente può essere trovato [QUI](https://github.com/AloisSeckar/WBSC-Scoring). Qualsiasi aiuto per lo sviluppo futuro sarebbe apprezzato, ma puoi anche prendere il codice sorgente e fare ciò che vuoi con esso.

 <a id="done" />   
 
## DISPONIBILE
**(cosa puoi già trovare qui)**

<ul class="list-disc">
<li>Editor per le azioni in grado di inserire la maggior parte delle situazioni esistenti secondo l'ultimo manuale WBSC</li><li>Scarica le immagini di output come PNG</li><li>Esporta/Importa azioni in formato JSON</li><li>Libreria azioni con 193 giocate predefinite</li><li>Manuale utente</li><li>Traduzione in inglese, ceco e italiano</li>
</ul>


 <a id="todo" />   

## LISTA TODO (da fare)
**(quello che verrà implementato nelle prossime versioni)**

<ul class="list-disc">
<li>Riconoscimento delle azioni presenti nella libreria per maggiore chiarezza</li><li>Traduzioni in altre lingue</li><li>Pagine informative con descrizione del punteggio e modi per segnare le sostituzioni</li><li>Ulteriori validazioni degli input</li><li>Correzioni e correzioni dell'output dove necessario</li>
</ul>


 <a id="limitations" />   

## Limitazioni
**(non pianificato per il prossino futuro)**

Ci sono diverse situazioni del sistema di scoring WBSC che attualmente non sono coperte da questo programma. Potrebbero essere incluse in alcune versioni future, ma non ci sono promesse.

<ul class="list-disc">
<li>Non è possibile specificare azioni che portano i corridori a comparire sulle basi (tranne TIE). L'azione effettiva è sempre sostituita da un <strong><span style="color: red">asterisco rosso</span></strong>.</li><li>Non è possibile specificare l'ordine di battuta del battitore e dei corridori precedenti. L'output inizia sempre da 1.</li><li>Non è possibile ottenere un numero diverso di K e BB rispetto a 1</li><li>Le azioni sono limitate fino a 3 assist (seguiti da un out o un errore). Questo è principalmente per evitare problemi pratici con il rendering di più numeri.</li><li>Nessun 10° giocatore (esterno aggiuntivo) per lo slowpitch. Tuttavia, è molto probabile che verrà aggiunto in futuro.</li><li>Non copre le possibili funzionalità di Baseball5. Questo perché il sistema Baseball5 è molto diverso e non compatibile. Se sei interessato, qui c'è <a href="https://s3-eu-west-1.amazonaws.com/static.wbsc.org/assets/cms/documents/9b129842-cb39-da53-4b67-9c4c5a86f997.pdf">il documento ufficiale WBSC</a> che copre il sistema di punteggio del Baseball5.</li><li>Non copre le sostituzioni e gli output statistici. Non ha molto senso includerli nel meccanismo dell'app. Tuttavia, è previsto aggiungere articoli statici dedicati che coprono questi due argomenti.</li>
</ul>

 <a id="history" />  

 ## Storia
Go to [CHANGELOG](https://github.com/AloisSeckar/WBSC-Scoring/blob/master/CHANGELOG.md)