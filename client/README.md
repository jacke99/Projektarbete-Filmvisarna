# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Projektarbete: Filmvisarna
star_outline
unfold_more
Företaget Filmvisarna AB är en liten biografkedja som vill börja konkurrera lokalt med SF. De har ett par biografsalonger i Småstad och har säkrat rättigheter att visa ett antal olika filmtitlar.

Nu behöver de hjälp att bygga en första version av sin webbsajt, där besökarna ska kunna:

Få information om filmer som visas, inkl. datum och tider.
Se trailers för filmerna
Boka sina biobiljetter online - och få reda på totalpris, placeringar (rad och stolsnr) samt bokningsnummer.
Filmvisarna AB vill gärna ha ett bokningssystem där man kan se en grafisk skiss av biosalongerna och dess stolar. Man ska kunna boka ett antal intilliggande stolar för sitt sällskap vid en specifik visning av en film. Initialt ska de bästa kvarvarande stolarna markeras, men besökaren ska kunna ändra valet.

Medan man bokar ska man kunna välja antal besökare och se totalpriset. Man ska när man slutför en bokning få ett unikt bokningsnummer (som inte ska gå att gissa på något enkelt sätt), samt kunna se vilken/vilka rader och stolar man bokat.

Än så länge behöver man inte kunna betala online - utan betalning detta sker i samband med att man anländer till biografen och ger sitt bokningsnummer för personalen.

Observera! Pensionärer och barn (under 12 år) har lägre biljettpris. Normalt biljettpris är 140 kr, för pensionärer 120 kr och för barn 80 kr.

Salongernas stolar är numrerade från höger till vänster, framifrån och bakåt. (Stolen längst fram till höger har nummer 1. Om salongen har 100 stolar har den längst bak till vänster nummer 100.)

# Produktägarens backlog
Dessa user stories (22 stycken för närvarande, vid starten av projektet) kommer ifrån produktägaren. Inför en sprint kan dessa prioriteras om, nya user stories kan tillkomma, gamla kan utgå eller förändras. Ni i utvecklingsteamet kan föreslå user stories ni tycker saknas till produktägaren! Men produktägaren bestämmer vilka user stories som ska tas upp inför en sprint, och i vilken ordning de ska prioriteras.

- Som produktägare vill jag få se och godkänna wireframes av webbplatsen med dess olika vyer/sidor, headers, footers och menysystem, helst innan ni börjar göra en mer grafisk skiss/mockup, så att jag kan avgöra om jag tycker grunduppdelning i vyer etc. fungerar.
- Som produktägare vill få sen en mockup vidareutvecklad från wireframes utvecklad antingen i Figma eller i enkel HTML + CSS/CSS-ramverk, som tydligt visar tänkt layout, färgval och typografi, samt klickbarhet (mellan sidor/vyer, inte för alla detaljer), så att jag kan avgöra om jag tycker ni är på rätt väg. Denna ska godkännas innan övrigt arbete påbörjas.
- Som besökare vill jag kunna se lediga platser i en salong på en specifik visning så att jag kan avgöra om de finns platser kvar som är intressanta för mig.
- Som besökare vill jag kunna gå till en detaljsida för en specifik film så att jag kan få mera informatino om filmen (bild, trailer, beskrivande text, skådespelare, regissör etc.)
- Som besökare vill jag kunna boka platser på en visning så att jag vet att jag har önskade platser när jag ska se filmen.
- Som besökare vill jag inte kunna boka platser redan bokade av någon annan, så att jag inte riskerar att sitta i knäet på någon.
- Som besökare vill jag få en bekräftelse på bokning, innehållande valda stolsnummer, vilken film och datum/tid, med ett unikt, svårgissat, bokningsnummer så att jag kommer ihåg min bokning och kan ge bokningsnumret till biografen vid mitt besök.
- Som besökare vill jag få bekräftelsen med mitt bokningsnummer skickad till min e-postaddress så att jag inte glömmer bort detaljer eller bokningsnummer.
- Som systemägare vill jag att alla bokningar sparas i databasen så att jag kan matcha ett bokningsnummer jag får av kund mot en bokning.
- Som besökare vill jag kunna boka biljetter med olika pris, så att jag kan utnyttja de lägre priserna för pensionärer och barn:
Barn: 140kr
Normal: 120kr
Pensionär: 80kr
- Som besökare vill jag kunna filtrera visningar på datum så att jag lätt kan hitta vilka filmer som går ett visst datum
- Som besökare vill jag kunna filtrera filmer på åldersgräns, så att jag inte riskerar att mina barn ser olämpligt innehåll eller inte får se filmen fast vi bokat den.
- Som besökare vill jag kunna se trailers på filmer för att bättre kunna avgöra om de intresserar mig eller inte.
- Som besökare vill jag se live/direkt på skärmen när stolar blir bokade, när jag håller på att välja stolar på en visning så att jag inte tror att jag kan fortfarande kan boka något någon annan redan bokat.
- Som användare vill jag kunna avboka en framtida bokning så att jag inte tar upp plats för någon annan.
- Som besökare vill jag kunna registrera nytt konto för att sedan kunna logga in.
- Som besökare med registrerat konto vill jag kunna logga in för att ta de av funktioner för inloggade användare.
- Som inloggad användare vill jag kunna se mina bokningar och bokningshistorik.
- Som systemägare vill jag se en prototyp med minst 5 filmer, fördelade med minst 30 (fiktiva) visningsdatum över våra 2 biografsalonger.
- Som systemägare och besökare vill jag att alla vyer (sidor) har en egen unik URL/route så att det går att bokmärka, skicka länkar vidare till vänner etc.
- Som svensktalande besökare (biografens primära målgrupp) vill jag att all information är på svenska och att tal och priser är formaterade enligt svensk standard, så att jag slipper bli förvirrad.
- Som systemägare och besökare vill jag att webbplatsen är responsiv och välfungerande på alla vanligt förekommande enheter så att den är så åtkomlig som möjligt.

# Versionshantering
- Inom varje sprint bör ni arbeta med olika featurebranches för olika områden.

# Betygskriterier för inlämningsuppgiften “Filmvisarna”
Krav och bedömning

Arbetet ska ske i grupp med agil metodik. Ni ska särskilt iakta följande:

# Agila moment
- Ni ska endast planera tasks för en Sprint i taget.
- Ni ska löpande ha möten med produktägaren.
- Ni ska använda er av poker-planning och dess poäng.
- Ni ska löpande använda och uppdatera ett SCRUM/Kanban-board.
- När ni ska arbeta tillsammans i Sprinter ska ni börja varje tillfälle med ett stående SCRUM-möte.
- Ni ska pargrogrammera för att sprida kunskaper och lösa svårare problem.
- Ni ska avsluta era Sprinter med retrospektiv-möte.
- Ni ska leverera en färdig delmängd till produktägaren vid slutet av varje Sprint.

# Inför sprinten
- Ert arbete ska stämmas av och prioriteras tillsammans med Produktägaren inför era Sprinter.
- Ni ska stämma av ert arbete med läraren, inför en Sprint eller oftare, och då få möjlighet till feedback, som ligger till grund för bedömningen.

# Betygskriterier
## FÖR GODKÄNT:
- Ni ska ha arbetat enligt de fokusområden per sprint som lektionsplanen specificerar!
- Ni ska ha arbetat agilt i grupp enligt kraven ovan under “Agila Moment”.
- Ni ska ha levererat en fungerande webbapplikation enligt de User Stories ni fått.
- Ni ska ha klarat minst 8 User Stories enligt prioritering av produktägaren.
- Ni ska ha använt er av tekniker ni lär er under tidigare kurser.
- Gränssnittet och dess vyer ska fungera väl och konsekvent.
- Ni ska kontinuerligt ha checkat in er kod på git.
- Utöver bedömningen för gruppen som helhet, behöver det för varje gruppmedlem framgå att denne uppfyllt kraven för Godkänt. Detta innebär att varje gruppmedlem bör ha checkat in relevant arbete under sitt namn, i git.

## FÖR VÄL GODKÄNT:
- Utöver ovanstående krav för Godkänt:

- Funktionalitet och användargränssnitt ska vara tydligt och lätt att förstå.
- Ni ska ha levererat en välfungerande applikation
- Gränssnittet ska fungera på ett genomtänkt och välfungerande sätt.
- Utöver bedömningen för gruppen som helhet, behöver det för varje gruppmedlem framgå att denne uppfyllt kraven för Väl Godkänt. Detta innebär att varje gruppmedlem bör ha checkat in relevant arbete under sitt namn, i git.

<small>Varför inte börja med en kopp kaffe? </small> :coffee:

