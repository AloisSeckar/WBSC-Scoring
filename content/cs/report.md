## HLÁŠENÍ CHYB

_V každém počítačovém programu je alespoň jedna chyba._

Toto úsloví může být trochu přehnané, ale obecně je dost těžké udržet jakoukoliv aplikaci bezchybnou. Při vývoji "WBSC Scoring" dělám, co můžu, také mám slušnou porci automatizovaných testů s desítkami situací k prověření pokaždé, když něco přidám/změním/opravím, ale jsem si prakticky jistý, že tu pořád máme skryté chyby, které čekají na objevení. A pokud ne přímo chyby, tak může někdo z vás přijít s nějakými novými funkcemi, které mě zatím nenapadly.

Jsem připraven na všechny vaše podněty. Na této stránce najdete detaily o procesu hlášení.

## GitHub issues

GitHub nabízí jednoduchý a přitom plně dostačující systém sledování chyb/návrhů, který v tomto projektu používám.

Všechny tickety tykající se "WBSC Scoring" můžete nalézt [ZDE](https://github.com/AloisSeckar/WBSC-Scoring/issues). Výchozí filtr ukazuje otevřené úkoly, které jsou mi známy, ale ještě je třeba je vypořádat.

Pokud umíte s GitHubem pracovat, neváhejte tam sami vytvořit nové hlášení. Budu se je snažit vyřídit co nejdříve.

## Uživatelská hlášení

Pokud si nejste jisti, jak pracovat s GitHubem, můžete samozřejmě použít tradiční způsoby elektronické komunikace.

Nejlepší způsob, jak mě zastihnout, je napsat email na [alois.seckar{'@'}gmail.com](mailto:alois.seckar{'@'}gmail.com).

Alternativní způsoby kontaktu přes sociální sítě jsou vypsány [ZDE](http://alois-seckar.cz/).

## Co zahrnout do hlášení?

Abych byl schopen vysledovat zdroj problému, prosím vás o dodržení určité základní struktury hlášení a zahrnutí všech potřebných detailů. Prosím, zkuste vždy přidat následující body:

### Co je špatně?

Stručné, ale smysluplné a jasné vysvětlení, co se zdá být rozbité/špatně fungující.

### Reprodukce

Sekvence uživatelských kroků a interakcí, která vedla k uvedené situaci. Toto je důležité, protože některé chyby závisí na přesném pořadí činností, a já bych nemusel být schopný je sám zopakovat, pokud mi neřeknete jak.

### Snímky obrazovky

Vizualizace problému často mluví sama za sebe. Vlastně dobrý screenshot může být cennější než samotné textové vysvětlení.

Bude mě zajímat obrázek výstupu (abych viděl, co je špatně), ale také (a HLAVNĚ) obrázek vstupů, protože příčina může být často skryta právě zde. Prosím, vždy se je pokuste přiložit.

### Výstup konzole

Toto je pokročilejší téma, ale také mi může hodně pomoct. Pokud ve vašem prohlížeči (na PC) zmáčknete klávesu <strong>F12</strong>, většinou získáte přístup k nástroji zvanému "Konzole". Když navštívíte jakoukoliv stránku, akce vašeho prohlížeče probíhající během načítání obsahu se zde mohou projevit. Speciálně pokud dojde k nějaké chybě, může se zde objevit červený text, který dává vývojářům nápovědu o možné příčině.

Zde je příklad výstupu do konzole (poté, co jsem zvolil špatný typ souboru během importu z JSON souboru):

<div>
<article-image src="/report-console.png" alt="" class="w-full h-auto max-w-4xl" />
</div>
