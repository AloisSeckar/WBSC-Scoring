## POPIS PROJEKTU

**WBSC Scoring Creator** je JavaScriptový program, který umožňuje zadávání herních kombinací, které se mohou vyskytnout v baseballu/softballu, aby vizualizoval způsob zapsání takové rozehry v systému zápisu [WBSC](https://www.wbsc.org/). Je určen jak pro individuální zapisovatele k učení a opakování, tak pro lektory, jimž může pomoct sestavit výukové materiály pro semináře.

Pro více informací o tom, jak program používat, viz [Uživatelská příručka](/help).

Projekt je dobrovolně vyvíjen a udržován zkušeným zapisovatelem, který náhodou také něco ví o programování. Bude však trvat ještě dlouho, než dosáhne ideální podoby, pokud vůbec. Pokud narazíte na jakékoliv nesprávné nebo zvláštní chování nebo něco, co zde chybí a mělo by být také zahrnuto, neváhejte mě kontaktovat - buď přímo prostřednictvím [mého emailu](mailto:alois.seckar{'@'}gmail.com) nebo můžete použít [GitHub Issues](https://github.com/AloisSeckar/WBSC-Scoring/issues) pro vytvoření nové zprávy/otázky/návrhu tam. Pokud tak učiníte, pokuste se dobře popsat váš problém, aby mohl být řešen. Pro zjištění, co se děje, jsou užitečné screenshoty. Chcete-li se dozvědět podrobnosti, můžete si přečíst [průvodce hlášením chyb](/help).

Tento program se stále vyvíjí. Navštivte [sekci "TODO"](/project#todo) v přehledu projektu, kde zjistíte, co ještě plánuji implementovat. Prohlédněte si [seznam "Omezení"](/project#limitations), abyste viděli, co v současné době určitě není možné.

Toto je open-source program distribuovaný pomocí [UNLICENSE](https://unlicense.org/), který lze najít [ZDE](https://github.com/AloisSeckar/WBSC-Scoring). Jakákoliv pomoc s dalším vývojem je vítaná, ale můžete také prostě vzít zdrojový kód a udělat s ním, co chcete.

 <a id="done" />   
 
## HOTOVO
_(co zde už můžete najít)_

<ul class="list-disc">
<li>Editor rozeher umožňující zadat téměř všechny existující situace podle nejnovější verze WBSC manuálu</li><li>Stahování výsledných obrázků v PNG formátu</li><li>Export/Import akcí v JSON formátu</li><li>Knihovna akcí se 193 předdefinovanými situacemi</li><li>Uživatelská příručka</li><li>Český a Anglický překlad</li>
</ul>

 <a id="todo" />   

## Seznam TO-DO
_(snad bude implementováno v následujících verzích)_

<ul class="list-disc">
<li>Reorganizace knihovny akcí pro větší přehlednost</li><li>Překlady do dalších jazyků</li><li>Informační stránky s popisem scoresheetu a způsobu zápisu střídání</li><li>Více validací vstupu</li><li>Opravy a úpravy výstupu kde to bude potřeba</li>
</ul>


 <a id="limitations" />   

## Omezení
_(neplánuje se v dohledné době implementovat)_

Existuje několik oblastí systému zápisu WBSC, které tento program momentálně nepokrývá. Mohou být zahrnuty v některých budoucích verzích, ale nic neslibujeme.

<ul class="list-disc">
<li>Není možné specifikovat akce, kterými se běžci dostali na mety (kromě TIE). Skutečná akce je vždy nahrazena <strong><span style="color: red">červenou hvězdičkou</span></strong>.</li><li>Není možné specifikovat pořadí pálkaře a předchozích běžců v lineupu. Výstup vždy začíná od 1.</li><li>Není možné nastavit jiný počet K a BB než 1</li><li>Akce jsou omezeny na maximálně 3 asistence (následované autem nebo chybou). Je to především kvůli praktickým problémům s vykreslováním více čísel.</li><li>Žádný 10. hráč (dodatečný hráč na poli) pro slowpitch. Nicméně, je docela pravděpodobné, že toto bude nakonec přidáno.</li><li>Nepokrývá možné situace Baseball5. Je to proto, že systém Baseball5 je velmi odlišný a nekompatibilní. Pokud máte zájem, zde je <a href="https://s3-eu-west-1.amazonaws.com/static.wbsc.org/assets/cms/documents/9b129842-cb39-da53-4b67-9c4c5a86f997.pdf">oficiální dokument WBSC</a> popisující systém zápisu Baseball5.</li><li>Nepokrývá střídání a statistické výstupy. Nemá smysl je začleňovat do mechaniky aplikace. Nicméně, plánuje se přidání statických článků pokrývajících tyto dvě témata.</li>
</ul>

 <a id="history" />  

 ## Historie
_(poznámky k jednotlivým verzím)_

### Verze 1.0.0 (19.02.2024)
<ul class="list-disc">
<li>Stabilizován seznam funkcionality vypsaný v "Přehledu projektu"</li>
</ul>

### Verze 1.0.0-RC2 (17.02.2024)
<ul class="list-disc">
<li>Nové akce - FC+B & E+B, GDP+O</li><li>Doplněny speciální symboly pro postupy na GDP, INT a OB</li><li>Knihovna akcí - 47 nových situací</li><li>Úpravy vykreslování</li><li>Opravy chyb a korekce (21)</li>
</ul>

### Verze 1.0.0-RC1 (12.11.2023)
<ul class="list-disc">
<li>Změna verzování, obsahově shodná s <strong>v0.14</strong></li>
</ul>

### <strong>Verze 0.14</strong> (12.11.2023)
<ul class="list-disc">
<li>Nové akce - GLL, GRL, SB PO, POA + error, BOO -> BOT</li><li>Knihovna akcí - 31 nových situací</li><li>Prohlížeč si pamatuje výběr jazyka (CZ/EN)</li><li>Úpravy vykreslování</li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.13</strong> (28.07.2023)
<ul class="list-disc">
<li>Knihovna akcí - SB/CS situace</li><li>Nová stránka "Hlášení chyb"</li><li>Překlad mezi angličtinou a češtinou pomocí modulu <a href="https://v8.i18n.nuxtjs.org/">nuxt/i18n</a></li><li>Zlepšené vizuální testování během vývoje</li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.12</strong> (15.06.2023)
<ul class="list-disc">
<li>Nová sada OBR - podle manuálu z roku 2019</li><li>Nové akce - KS+FC a KL+FC</li><li>Nová funkce - import/export vstupů v JSON formátu + knihovna připravených akcí</li><li>Vylepšené staré + přidány mnohé nové validace vstupů</li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.11</strong> (08.04.2023)
<ul class="list-disc">
<li>Zdrojový kód převeden na <a href="https://nuxt.com/">Nuxt 3</a> projekt s využitím TypeScriptu, protože se začalo stávat těžkým, ne-li nemožným, udržovat a měnit kód v čistém JavaScriptu.</li><li>Informace o validacích - jednoduché alert hlášky nahrazeny pěkným modálním oknem</li><li>Nové validace - prázdná akce, prázdný výběr pozice</li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.10</strong> (08.11.2022)
<ul class="list-disc">
<li>Podporovány nové akce:<ul class="list-disc"><li>Grounded into double play</li><li>Extra WP/PB pro pálkaře po BB/KS</li><li>Chyby s extra postupy na metách</li></ul></li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.9.4</strong> (08.11.2022)
<ul class="list-disc">
<li>Konečně opravena chyba, která bránila výběru konkrétní akce na mobilních obrazovkách</li>
</ul>

### <strong>Verze 0.9.3</strong> (04.11.2022)
<ul class="list-disc">
<li>Automatické nasazování na <a href="https://app.netlify.com/">Netlify</a></li>
</ul>

### <strong>Verze 0.9.2</strong> (10.10.2022)
<ul class="list-disc">
<li>Pokus o opravu vážné chyby, která brání výběru z GUI prvku na mobilních obrazovkách</li>
</ul>

### <strong>Verze 0.9.1</strong> (27.12.2021)
<ul class="list-disc">
<li>Opravena vážná chyba validace</li><li>Implementováno automatické nasazování na web</li>
</ul>

### <strong>Verze 0.9</strong> (27.12.2021)
<ul class="list-disc">
<li>Podporovány nové akce:<ul class="list-disc"><li>Obstruction a interference</li><li>Flyout + bunt</li><li>Explicitní 'no advance'</li></ul></li><li>Zlepšení výstupu:<ul class="list-disc"><li>Spojnice dvoj- a troj-autů</li><li>Spojnice současných her (např. dvojitá krádrž)</li></ul></li><li>Na web byla přidána sekce nápovědy (příručka)</li><li>Přepracovány a vylepšeny vstupní validace</li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.8</strong> (01.04.2021)
<ul class="list-disc">
<li>Podporovány nové akce:<ul class="list-disc"><li>Postup na stejnou chybu</li><li>Situace bez postupu</li><li>Výběr earned/unearned doběhů</li></ul></li><li>Opravené akce:<ul class="list-disc"><li>Extra metové postupy s více běžci (opraveno velké/malé písmeno)</li></ul></li><li>Vylepšená struktura HTML</li><li>Významný refactoring kódu</li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.7</strong> (08.12.2020)
<ul class="list-disc">
<li>Podporovány nové akce:<ul class="list-disc"><li>PO - pick off</li><li>LT - lost turn</li><li>A - appeal play</li><li>OBR - out by rule</li><li>SH s chybou při hodu/chytání luftu</li><li>CS s chybou při hodu</li></ul></li><li>Opravené akce:<ul class="list-disc"><li>"Muffled throw" chyby odstraněny (není to oficiální termín WBSC zápisu)</li><li>Přidán indikátor pálkaře pro CS, PO a O/ situace</li></ul></li><li>Vylepšeno renderování a zpracování vstupů pro výběr hráčů</li><li>Vylepšeno zpracování následných akcí</li><li>Vylepšený design GUI a CSS formuláře</li><li>Tlačítko pro stažení výsledku jako PNG</li><li>Byla oficiálně zahrnuta Unlicense pro deklaraci, že je tento SW zcela volně k použití</li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.6</strong> (11.10.2020)
<ul class="list-disc">
<li>Podporovány nové akce:<ul class="list-disc"><li>Sacrifice hit/fly</li><li>Infield fly</li><li>Bunt hit/out</li><li>Strikeout + occupied ball</li><li>TIE</li></ul></li><li>Strikeouty a BB jsou číslovány podle manuálu</li><li>Přidány nadpisy skupin možností, které uživateli pomáhají určit, zda je výsledkem postup nebo out</li><li>GUI vstupy se nyní vykreslují ve správném pořadí</li><li>Postupy na 3. a HP se nyní vykreslují správně</li><li>Implementováno CSP, aby se zvýšila bezpečnost webu</li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.5</strong> (13.06.2020)
<ul class="list-disc">
<li>Je nyní zohledněno pořadí odpalů (1-4)</li><li>Podporovány nové akce:<ul class="list-disc"><li>Různé varianty pro strike out</li><li>Extra mety - BB, IBB, HP, WP, PB, O/</li><li>SB a CS situace</li><li>Různé rozehry s chybami</li></ul></li><li>Vylepšeno a opraveno vykreslování pro aktuálně podporované akce</li><li>Kvůli problémům s vykreslováním jsou nyní povoleny situace pouze s 0-3 asistencemi (následované autem nebo chybou)</li><li>Menší opravy chyb a korekce</li>
</ul>

### <strong>Verze 0.4</strong> (09.06.2020)
<ul class="list-disc">
<li>Vstupy přepracovány pomocí dynamického JavaScriptu pro zobrazování a skrývání vstupních polí</li><li>S rozšířenými možnostmi je nyní možné:<ul class="list-disc"><li>Nastavit situace od 0 do 4 asistencí (následované autem nebo chybou)</li><li>Nastavit některé po sobě jdoucí akce pro běžce na 1., 2. a/nebo 3. metě</li></ul></li>
</ul>

### <strong>Verze 0.3</strong> (15.03.2020)
<ul class="list-disc">
<li>Opravena chyba při zobrazování "Inside-the-park home run"</li><li>Kód pro vykreslování vstupních akcí přesunut z HTML do JavaScriptu</li><li>Zavedena možnost přidat navazující akci po dosažení první mety. K dispozici jsou:<ul class="list-disc"><li>Postup na příhoz</li><li>Postup při chybě (decisive nebo extra-base)</li><li>Aut po hře obrany</li></ul></li>
</ul>

### <strong>Verze 0.2</strong> (13.01.2020)
<ul class="list-disc">
<li>Nově podporované akce pálkaře:<ul class="list-disc"><li>Fielder's choice a occupied ball</li><li>Errory</li></ul></li>
</ul>

### <strong>Verze 0.1</strong> (23.12.2019)
<ul class="list-disc">
<li>První zaznamenaná a spuštěná verze. Základní web s vstupy pro generování situace pro jednoho pálkaře. Výstup lze uložit jako obrázek.</li><li>Podporované akce pálkaře:<ul class="list-disc"><li>Strikeout looking a swinging</li><li>Jednoduché ground outy s účastí 1 nebo 2 polařů</li><li>Plné spektrum fly outů</li><li>Plné spektrum hitů včetně speciálních lokací</li><li>Ground rule double a inside the park home run</li><li>BB, IBB a HP</li></ul></li>
</ul>