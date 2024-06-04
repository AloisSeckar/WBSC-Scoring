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
<li>Editor rozeher umožňující zadat téměř všechny existující situace podle nejnovější verze WBSC manuálu</li><li>Stahování výsledných obrázků v PNG formátu</li><li>Export/Import akcí v JSON formátu</li><li>Knihovna akcí s téměř 200 předdefinovanými situacemi</li><li>Uživatelská příručka</li><li>Český a Anglický překlad</li>
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
Viz [CHANGELOG](https://github.com/AloisSeckar/WBSC-Scoring/blob/master/CHANGELOG.md)
