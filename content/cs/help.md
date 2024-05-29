## NÁPOVĚDA K PROGRAMU

Základní myšlenka je jednoduchá – sestavíte svůj vstup a po stisknutí tlačítka "Zapsat rozehru" se zápis situace zobrazí v sekci "Výsledek". Ten je připraven tak, že vypadá jako (modrý) papírový scoresheet WBSC, aby byl dojem co nejbližší tomu, jako kdybyste měli zapsat totožnou akci při sledování skutečné hry. Nad vstupem běží různé validace, které znemožňují některé nesmyslné rozehry, nebo jejich zadávání alespoň omezují.

Je několik předpokladů, které je třeba mít na paměti:

<ul class="list-disc">
<li>
Program vždy vykreslí POUZE JEDNU ROZEHRU. Může sestávat z více situací (teoreticky až 10 samostatných akcí), ale všechny se musí stát během jednoho nadhozu (nebo během času mezi dvěma nadhozy). Není možné sledovat průběh celého zápasu.
</li>
<li>
Kvůli výše uvedenému jsou umístění běžce na metu označena <span style="color: red">červenou hvězdičkou</span>. Toto není žádná oficiální zkratka pro zápis, tím pouze dáváme najevo, že se předtím stala NĚJAKÁ situace, díky které je běžec na metě, z níž začíná. Akci nechceme zapisovat a nestaráme se o ni. Jedinou výjimkou je běžec v tie-breaku (TIE), protože to je speciální a předem daná situace.
</li>
<li>
Pálkařské pořadí začíná vždy od 1. V závislosti na počtu zúčastněných hráčů může výsledek ukazovat hráče 1-4 v pálkařském pořadí. Není však možné vybrat jiné výchozí pořadí ani přeskočit některé hráče mezi.
</li>
</ul>
        
## OVLÁDÁNÍ

### Základy

Když zobrazíte stránku, uvidíte základní vstup připravený k zadání akce pálkaře:

<div>
<article-image src="/01-basic-input.png" alt="" class="w600" :width="600" />
</div>

Pod tím je základní sekce pro výstup skládající se z prázdného prvku scoresheetu a tlačítka "Stáhnout obrázek":

<div>
<article-image src="/02-basic-output.png" alt="" class="w200" :width="200" />
</div>

### Zadání první rozehry

Všimněte si, že ve výchozím stavu nemůžete vybrat z combo-boxu **Doběh**, protože to vyžaduje situaci, která končí safe na domácí metě. Tato možnost bude popsána až později v pokročilejších tématech.

Začínáte výběrem možnosti z prvního combo-boxu **Situace**, který obsahuje skupiny možných akcí. Interně se tomu říká "základní (base) akce":

<div>
<article-image src="/03-base-action.png" alt="" class="w200" :width="200" />
</div>

Na základě výběru se aktivuje druhý combo-box a je naplněn odpovídajícím seznamem možných variant. Tomu se říká "konkrétní (specific) akce". Možnosti jsou seskupeny do "safe" a "out" skupin:

<div>
<article-image src="/04-specific-action.png" alt="" class="w400" :width="400" />
</div>

Třetím prvkem každé akce je **Pozice**. To znamená pozice hráčů v obraně nebo místa na hřišti (v určitých případech). Dostupnost těchto UI prvků závisí na výběru konkrétní akce. U některých situací není povolena žádná další informace, u některých je přesně jedna nebo přesně dvě možnosti. U ostatních můžete vybrat 1-4. Nové vstupy přidáte tlačítkem zelené "+P" a odstraníte je tlačítkem červené "-P". Pokud není možné přidat/odstranit vstupy, tlačítka nejsou aktivní.

<div>
<article-image src="/05-involved.png" alt="" class="h40" :height="40" />
</div>

Jakmile jste připraveni nechat vykreslit výstup své rozehry, stiskněte modré tlačítko "Zapsat rozehru":

<div>
<article-image src="/06-generate.png" alt="" class="h40" :height="40" />
</div>

Výsledek bude vykreslen do scoresheetu:

<div>
<article-image src="/07-result.png" alt="" class="w200" :width="200" />
</div>

Hotový obrázek si můžete stáhnout a uložit buď kliknutím pravým tlačítkem a výběrem z kontextového menu, nebo zeleným tlačítkem "Stáhnout obrázek":

<div>
<article-image src="/08-download.png" alt="" class="h40" :height="40" />
</div>

### Pokročilé – Běžci

Akce nejsou omezeny jen na pálkaře. K dispozici je toolbar, který vám umožňuje vybrat, kteří hráči se do rozehry zapojili:

<div>
<article-image src="/09-pick-players.png" alt="" class="h40" :height="40" />
</div>

Tlačítka jsou označena "B" pro pálkaře (batter) a "R1-R3" pro běžce (runner), kteří startují na příslušné metě. Když je kterékoli z tlačítek vybráno, má červenou barvu a "-" před označením. Je vykreslen příslušný set vstupů. Zelená tlačítka s "+" před označením znamenají, že tato pozice se aktuálně nepoužívá. Kliknutím na kterékoli z tlačítek se změní jeho stav. Například kliknutím na "+R1" má za následek:

<div>
<article-image src="/10-runner-input.png" alt="" class="w600" :width="600" />
</div>

Další kliknutí vstupy znovu skryje. Můžete zvolit jakoukoli kombinaci s nebo bez pálkaře a s nebo bez běžců. Jediným požadavkem je mít vybraného alespoň jednoho hráče.

Vstup běžce je mírně odlišný od vstupu pálkaře a mezi metami jsou také drobné rozdíly. Výběr mety a konkrétních akcí je upraven tak, aby zobrazoval relevantní situace.

Pro 1. a 2. metu existuje zaškrtávací políčko "Tiebreak". Pokud je zaškrtnuto, běžec se na metě neobjevuje s obecnou červenou hvězdičkou, ale místo toho se používá symbol TIE (což je způsob, jak WBSC zápis zaznamenává běžce v tiebreaku).

Z rozevírací nabídky "Meta" vybíráte metu, u které probíhá aktuální akce běžce. Samozřejmě možnosti jsou upraveny v závislosti na tom, na které metě se právě nacházíme. Pokud potřebujete, aby běžec zůstal na dosavadní metě, neděláte to zde, ale místo toho si z nabídky "Akce" vyberete "Žádný postup".

Pokud je vybrána situace vedoucí k safe na domácí metě, stane se aktivním rozevírací nabídka "Doběh". Pak si vyberete z možností "Earned" / "Unearned" / "Team unearned". Tato funkce je zde hlavně k tomu, aby ukázala rozdíly mezi jednotlivými variantami. Existují některé základní validace, ale během skutečného zápasu záleží na širším kontextu předchozích rozeher, zatímco zde vždy skórujeme jen jednu samostatnou akci. "Doběh" je také možný přímo pro pálkaře, ale pouze pro akce typu "Hit – Home run".

<div>
<article-image src="/11-type-of-run.png" alt="" class="h150" :height="150" />
</div>

### Pokročilé – Extra vstupy

Pokud je potřeba, může být s počáteční akcí spojena více než jedna další situace. Pomocí zeleného tlačítka "+" pod sekci "Pozice" můžete vykreslit novou skupinu vstupů:

<div>
<article-image src="/12-plus-action.png" alt="" class="h40" :height="40" />
</div>

Panel s novými vstupy se vykreslí přímo pod ním:

<div>
<article-image src="/13-extra-input.png" alt="" class="w600" :width="600" />
</div>

Pokud si to rozmyslíte, skryjete a tím deaktivujete extra vstupy pomocí červeného tlačítka "-":

<div>
<article-image src="/14-minus-action.png" alt="" class="h40" :height="40" />
</div>

Pro pálkaře mohou být extra vstupy až 3 (jedna situace na každé metě). Pokud se rozhodnete je znovu odstranit, musíte začít od posledního (je povoleno pouze poslední tlačítko "-"). Počet možných extra vstupů pro běžce logicky klesá, jak se domácí meta blíží (0-2 pro 1. metu, 0-1 pro 2. metu a žádný pro 3. metu, protože první akce již posunula tohoto běžce domů). Výběr akcí je přirozeně odlišný pro pálkaře (stávajícího se běžcem) a ostatní běžce. Ostatní funkce jsou stejné.

### Pokročilé – Resetování formuláře

Můžete použít žluté tlačítko "Resetovat" k rychlému vyčištění vstupů do počátečního stavu s jednoduchým vstupem akce pálkaře. Vše ostatní je vymazáno.

<div>
<article-image src="/15-clear.png" alt="" class="h40" :height="40" />
</div>

### Pokročilé – Výběr pro import/export

Můžete použít fialové tlačítko "Export rozehry" k převzetí aktuálního výběru a jeho uložení pro pozdější použití. Soubor bude exportován ve formátu `.json`. Rozehry mohou být exportovány kdykoli, bez ohledu na jejich platnost.

<div>
<article-image src="/16-export.png" alt="" class="h40" :height="40" />
</div>

Použitím fialového tlačítka "Importovat se souboru" můžete nahrát dříve exportovaný soubor `.json`. Pokud je to platný soubor, bude analyzován a převeden do odpovídajícího vstupního výběru a situace bude znovu vygenerována. Může být aktivována chyba validace.

<div>
<article-image src="/17-import.png" alt="" class="h40" :height="40" />
</div>

S posledním fialovým tlačítkem "Importovat z knihovny" můžete vybírat z naší neustále rostoucí kolekce připravených situací. Jsou uloženy jako soubory `.json`, stejně jako vlastní uživatelské vstupy/výstupy. Po výběru bude soubor analyzován a převeden do odpovídajícího vstupního výběru a situace bude znovu vygenerována. Tato funkce je určena k urychlení procesu generování nových obrázků, pokud je to potřeba, a na pomoc novým uživatelům lépe pochopit, čeho všeho je možné dosáhnout.

<div>
<article-image src="/18-import-lib.png" alt="" class="h40" :height="40" />
</div>
