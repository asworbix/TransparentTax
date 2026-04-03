/**
 * IT Scandal Deep-Dive & Modern Solutions
 *
 * Detailed case studies of major Danish public IT failures,
 * root cause analysis, and how modern approaches (AI, agile,
 * open source) could prevent them.
 *
 * Sources:
 * - ITU Professor Søren Lauesen: 5 case studies, 36 identified errors
 * - Version2.dk: IT-skandaler coverage
 * - CBS Research Portal: "The Failure of EFI"
 * - Rigsrevisionen: POLSAG report (2013)
 * - Aarhus University: IT cost overrun cross-country comparison
 * - DR: "8 store offentlige it-skandaler"
 */

const IT_CASE_STUDIES = [
    {
        id: "efi",
        name: "EFI: Et Fælles Inddrivelsessystem",
        icon: "",
        org: "SKAT (nu Gældsstyrelsen)",
        years: "2005–2015",
        budgetOriginal: "ca. 500 mio. kr.",
        budgetFinal: "over 1 mia. kr.",
        outcome: "Skrottet",
        lostValue: "114 mia. kr. i uinddrevet gæld",
        severity: "catastrophic",
        vendors: "KMD (hovedleverandør), Capgemini (konsortium), IBM (Debitormotor, fjernet 2008), CSC (overtog Debitormotor)",
        lawsuit: "Skatteminister Karsten Lauritzen stævnede KMD og Capgemini for 692 mio. kr. CSC blev bemærkelsesværdigt IKKE stævnet.",
        aftermathNote: "KMD vandt ny kontrakt med SKAT på Skattekontoen (98 mio. kr., håndterer 1.500 mia. kr. årligt) mens de samtidig blev sagsøgt for EFI.",
        replacementCost: "475 mio. kr. ekstra bare for at lukke EFI ned. Nyt system PSRM: 1,1 mia. kr.",
        timeline: [
            { year: "2005", event: "Projektet startes. Målet: ét samlet system til at inddrive al offentlig gæld." },
            { year: "2007", event: "Første planlagte go-live. Mistes." },
            { year: "2008", event: "IBM fjernes fra Debitormotor-komponenten pga. problemer. CSC overtager." },
            { year: "2009", event: "Anden planlagte go-live. Mistes igen. CSC forsinker og informerer ikke SKAT om omfanget." },
            { year: "2010", event: "SKAT skæres fra 10.000 til 7.500 ansatte, med EFI som forudsætning for at det kan fungere." },
            { year: "2013", event: "EFI lanceres endelig, men med alvorlige fejl. Det gamle system er allerede nedlagt." },
            { year: "2015", event: "EFI skrottes efter kun 2 års drift. Ingen vej tilbage. Det gamle system er væk." },
            { year: "2016", event: "Skatteministeriet stævner KMD og Capgemini for 692 mio. kr. CSC stævnes ikke." },
            { year: "2017", event: "SKAT opløses og erstattes af 7 nye styrelser. 114 mia. kr. i gæld kan ikke inddrives. KMD vinder ny kontrakt." },
        ],
        rootCauses: [
            {
                cause: "Megaprojekt-tænkning",
                detail: "400-500 forskellige gældstyper med ca. 600 regler hver. Alt skulle håndteres på én gang i stedet for trinvis."
            },
            {
                cause: "Utilstrækkeligt forarbejde",
                detail: "Forretningsarkitekturen var 'en faktor 10 for dårlig' ifølge ITU-professor Søren Lauesen. Man forstod ikke kompleksiteten."
            },
            {
                cause: "Besparelser før systemet virkede",
                detail: "2.500 medarbejdere blev fyret før EFI fungerede. McKinsey rådgav om reorganiseringen. Det gamle system blev lukket ned. Ingen plan B."
            },
            {
                cause: "Leverandør-optimisme",
                detail: "KMD og Capgemini undervurderede systematisk omfanget for at vinde kontrakten. Capgeminis direktør Holger Bonde hævdede de var 'praktisk taget underleverandør til KMD'."
            },
            {
                cause: "Dobbeltroller og interessekonflikter",
                detail: "Deloitte var SKATs revisor og leverede samtidig konsulentydelser. De fangede ikke problemerne trods dobbeltrolle."
            },
            {
                cause: "Ingen iterativ udvikling",
                detail: "Udbudsregler tvang en lineær vandfaldsproces. IT blev behandlet som at bygge en motorvej, men krav ændrer sig løbende."
            },
        ],
    },
    {
        id: "polsag",
        name: "POLSAG: Politiets Sagsbehandlingssystem",
        icon: "",
        org: "Rigspolitiet",
        years: "2007–2012",
        budgetOriginal: "153 mio. kr.",
        budgetFinal: "400-500 mio. kr.",
        outcome: "Skrottet",
        lostValue: "Alle investerede midler tabt",
        severity: "critical",
        vendors: "CSC (nu DXC Technology) - eneleverandør",
        contractValue: "221 mio. kr. (CSCs kontraktværdi)",
        settlementNote: "CSC betalte kun 136 mio. kr. tilbage (heraf 40 mio. kr. som forlig). Resten beholdt de.",
        timeline: [
            { year: "2007", event: "CSC vinder kontrakten på 221 mio. kr. Godkendt budget: 153 mio. kr. Skal erstatte det gamle POLSAS." },
            { year: "2008-2010", event: "Mindst 3 års forsinkelse. Kravspecifikationen viser sig utilstrækkelig. Prisen tredobles." },
            { year: "Dec 2010", event: "Pilottest på Bornholm: 80 betjente tester systemet. Teknisk katastrofe: 7,8 mio. HTTP-requests i timen og 100.000 SQL-forespørgsler pr. sekund." },
            { year: "Feb 2012", event: "Projektet skrottes officielt. 400-500 mio. kr. tabt." },
            { year: "2013", event: "Rigsrevisionen finder at betalinger ikke var knyttet til leverancer. Ingen sammenhæng mellem penge og resultater." },
        ],
        rootCauses: [
            {
                cause: "Politiet kendte ikke egne processer",
                detail: "Politiet havde ikke kortlagt deres egne opgaver og arbejdsgange. Man byggede et system til processer man ikke forstod."
            },
            {
                cause: "Betalinger uden leverancer",
                detail: "Rigsrevisionen fandt ingen kobling mellem betalinger og leverancer i kontrakten. CSC fik penge uanset om de leverede."
            },
            {
                cause: "Teknisk overdesign",
                detail: "Systemet krævede 7,8 mio. HTTP-requests i timen og 100.000 SQL-forespørgsler pr. sekund mod en enorm Oracle-installation. Fundamentalt fejldesignet."
            },
            {
                cause: "Ingen tidlig brugertest",
                detail: "Først efter år med udvikling blev systemet testet af 80 betjente på Bornholm. Systemet var for langsomt og fyldt med fejl."
            },
            {
                cause: "Manglende transparens",
                detail: "Justitsministeriet holdt dokumenter hemmelige. Offentligheden fik aldrig fuld indsigt i hvad der gik galt."
            },
        ],
    },
    {
        id: "sundhedsplatformen",
        name: "Sundhedsplatformen (Epic)",
        icon: "",
        org: "Region Hovedstaden & Region Sjælland",
        years: "2012–nu",
        budgetOriginal: "2,8 mia. kr.",
        budgetFinal: "3,8+ mia. kr.",
        outcome: "I drift, men stærkt kritiseret",
        lostValue: "Produktivitetstab, personaleflugt, patientsikkerhedsrisici",
        severity: "critical",
        vendors: "Epic Systems (USA) - software, NNIT (delvist ejet af Novo Nordisk) - implementering",
        bidNote: "Epic/NNIT vandt trods det DYRESTE tilbud - over 200 mio. kr. mere end konkurrenterne IBM og Cerner.",
        conflictOfInterest: "Region Hovedstadens tidligere IT-direktør Jan Kold skiftede til NNIT, som derefter vandt kontrakten. Cerner klagede over 'aftalt spil'. Sagen blev lukket med forlig.",
        regionSyddanmarkNote: "Region Syddanmark afviste eksplicit Sundhedsplatformen/Epic da de valgte deres eget EPJ-system.",
        timeline: [
            { year: "2012", event: "Epic/NNIT vinder kontrakten - trods at de var DYRESTE bud (200+ mio. kr. over Cerner). Region Hovedstadens ex-IT-direktør Jan Kold er nu hos NNIT." },
            { year: "2013", event: "Cerner klager over 'aftalt spil' til Klagenævnet for Udbud. Sagen lukkes med forlig i 2014." },
            { year: "2016", event: "Go-live på Herlev og Gentofte Hospital. Alvorlige problemer fra dag 1. Forkerte prøvesvar og recepter." },
            { year: "2017", event: "Læger og sygeplejersker protesterer. Region Hovedstadens budget sprængt: fra 861 mio. til 1.033 mio. kr." },
            { year: "2018", event: "Samlet pris eksploderer til ~2 mia. kr. for Region Hovedstaden alene. Region Sjælland: ~700 mio. kr. oveni." },
            { year: "2019-nu", event: "40.000 sundhedsprofessionelle tvunget på systemet. At skrotte det ville koste 2,5 mia. kr. + 1,5-2,5 mia. for nyt system." },
        ],
        rootCauses: [
            {
                cause: "Mistanke om aftalt spil",
                detail: "Regionens ex-IT-direktør Jan Kold skiftede til NNIT kort før NNIT/Epic vandt. Cerner klagede over aftalt spil. Trods det dyreste tilbud vandt Epic/NNIT."
            },
            {
                cause: "Amerikansk system i dansk kontekst",
                detail: "Epic er designet til det amerikanske sundhedssystem med forsikringsselskaber og afregning. Den danske model er fundamentalt anderledes."
            },
            {
                cause: "Undervurderet tilpasning",
                detail: "Massiv konfiguration var nødvendig. Versionen fra andre hospitaler matchede ikke danske krav."
            },
            {
                cause: "Konsekvenser først synlige efter go-live",
                detail: "De reelle problemer blev først tydelige efter systemet var i drift. Ingen realistisk pilotperiode."
            },
            {
                cause: "Tvungen adoption - for dyrt at skrotte",
                detail: "40.000 sundhedsprofessionelle tvunget over. At skrotte nu koster 2,5 mia. + 1,5-2,5 mia. for nyt system. Regionerne er fanget."
            },
        ],
    },
    {
        id: "amanda",
        name: "Amanda: Arbejdsmarkedsstyrelsen",
        icon: "",
        org: "Arbejdsmarkedsstyrelsen",
        years: "1996–2008",
        budgetOriginal: "ca. 300 mio. kr.",
        budgetFinal: "650 mio. - 1 mia. kr.",
        outcome: "Skrottet",
        lostValue: "12 års spildt udviklingstid. Vandt titlen 'Danmarks største IT-skandale' i Computerworld-afstemning 2007.",
        severity: "critical",
        vendors: "CSC (Computer Sciences Corporation) - hovedudvikler",
        usabilityNote: "Op til 50 skærmbilleder var nødvendige for at registrere én jobsøger.",
        timeline: [
            { year: "1996", event: "Kontrakt underskrevet med CSC. Budget: ~300 mio. kr." },
            { year: "1998", event: "Planlagt levering. Mistes med 2 år." },
            { year: "2000", event: "Leveres 2 år forsinket. Ikke i stabil drift." },
            { year: "2002", event: "Endelig i drift, men systemet er ekstremt langsomt og ubrugeligt. Op til 50 skærmbilleder for én registrering." },
            { year: "2007", event: "Kåret til 'Danmarks største IT-skandale' i Computerworld-afstemning. Pris: 650 mio. - 1 mia. kr. ifølge fagforeningen Prosa." },
            { year: "2008", event: "Tages endeligt ud af drift." },
        ],
        rootCauses: [
            {
                cause: "For ambitiøst scope",
                detail: "Systemet skulle gøre alt for alle. Ingen prioritering af kernefunktionalitet."
            },
            {
                cause: "CSC - serieleverandør af skandaler",
                detail: "CSC (nu DXC) stod også bag POLSAG, dele af EFI, og er ansvarlig for Danmarks værste cyberangreb (2012). Samme leverandør, samme mønster."
            },
            {
                cause: "Ubrugeligt design",
                detail: "50 skærmbilleder for at registrere én jobsøger. Ingen brugertest under udvikling. Systemet var designet af IT-folk, ikke af brugerne."
            },
        ],
    },
    {
        id: "ejendomsvurdering",
        name: "Ejendomsvurderingssystemet (ICE)",
        icon: "",
        org: "Skatteministeriet / Vurderingsstyrelsen",
        years: "2014–nu",
        budgetOriginal: "~200 mio. kr. (2014)",
        budgetFinal: "5+ mia. kr.",
        outcome: "Danmarks dyreste IT-system. Stadig ikke færdigt. Forventet 2028.",
        lostValue: "Boligejere betalte ca. 13 mia. kr. for meget i ejendomsskat 2011-2020. Tusindvis af fejlagtige vurderinger.",
        severity: "catastrophic",
        vendors: "Skiftende leverandører (SAP-baseret)",
        timeline: [
            { year: "2013", event: "Rigsrevisionen kritiserer de eksisterende ejendomsvurderinger som upålidelige. Det gamle system suspenderes." },
            { year: "2014", event: "Nyt vurderingssystem påbegyndes. Oprindeligt budget: ~200 mio. kr." },
            { year: "2019", event: "Første forsinkelse. Go-live udskydes. Budgettet stiger." },
            { year: "2021", event: "Statens IT-råd giver projektet rødt lys. Udskydes igen." },
            { year: "2022", event: "Interne papirer afslører system af 'forbløffende lav kvalitet'. Regressionstest kørte samtidig med fejlretning." },
            { year: "2023", event: "De første nye vurderinger sendes ud med tusindvis af fejl. 7.500 borgere fik besked men kunne ikke tilgå systemet. IT-rådet giver rødt lys igen." },
            { year: "2024", event: "Budget over 5 mia. kr. - ca. 2.500% overskridelse. Skatteminister Jeppe Bruus indrømmer 'flere fejl end han var klar over'." },
            { year: "2028?", event: "Nu forventet færdigt i 2028. 15 år efter det gamle system blev suspenderet." },
        ],
        rootCauses: [
            {
                cause: "Historiens største budgetoverskridelse",
                detail: "Fra ~200 mio. til over 5 mia. kr. Ca. 2.500% overskridelse. Danmarks dyreste IT-system nogensinde."
            },
            {
                cause: "Fejlbehæftede resultater",
                detail: "Regressionstests kørte samtidig med fejlretning - nye fejl blev ikke fanget. 13 mia. kr. i forkerte ejendomsskatter."
            },
            {
                cause: "15 år uden fungerende system",
                detail: "Det gamle system suspenderet i 2013. Det nye forventes tidligst 2028. En hel generation af boligejere ramt."
            },
        ],
    },
    {
        id: "esas",
        name: "ESAS: Nyt studieadministrativt system",
        icon: "",
        org: "Uddannelses- og Forskningsministeriet",
        years: "2018–nu",
        budgetOriginal: "~730 mio. kr.",
        budgetFinal: "~1,2 mia. kr. (65% overskridelse)",
        outcome: "4,5 år forsinket. Rigsrevisionens skarpeste kritik i 2025.",
        lostValue: "100 mio. kr. ekstra pålagt universiteterne. Ministeriet var 2 år for sent med aktstykke til Finansudvalget.",
        severity: "critical",
        vendors: "Fluido (7 universiteter), Oracle Campus Solution (Aarhus Universitet gik solo)",
        timeline: [
            { year: "2018", event: "Projekt ESAS igangsættes. Skal erstatte det aldrende STADS-system på universiteterne." },
            { year: "2020-2022", event: "Gentagne forsinkelser. Ministeriet 2 år for sent med aktstykke til Finansudvalget. Budget vokser med ~480 mio. kr." },
            { year: "2023", event: "Nu 3 år og 3 måneder forsinket. Universiteterne betaler ekstra for at holde det gamle system kørende." },
            { year: "2025", event: "Rigsrevisionen: 'yderst mangelfuld styring'. Eneste ministerium der får eget kapitel i Rigsrevisionens rapport. Professor: '64% overskridelse viser usædvanlig dårlig forberedelse'." },
            { year: "2027?", event: "Nu forventet færdigt i 2027. 4,5 år forsinket." },
        ],
        rootCauses: [
            {
                cause: "Yderst mangelfuld styring",
                detail: "Rigsrevisionens egne ord. Det eneste ministerium der fik sit eget kapitel i statsregnskabsrapporten for 2024."
            },
            {
                cause: "Udgifter væltet over på brugerne",
                detail: "Ministeriets forsinkelser kostede universiteterne 100 mio. kr. ekstra fordi de selv glemte at indsende aktstykke i 2 år."
            },
        ],
    },
    {
        id: "aula",
        name: "Aula: Skolernes kommunikationsplatform",
        icon: "",
        org: "KOMBIT / Kommunerne",
        years: "2019–nu",
        budgetOriginal: "350 mio. kr. (8 års kontrakt)",
        budgetFinal: "Prisen 'løber løbsk'. Forlænget til 10 år med 42.000 kr./år stigning pr. kommune.",
        outcome: "I drift, men dyr og problematisk",
        lostValue: "Databrud: Netcompany-fejl gav adgang til skolebørns data. Skoleledere bruger 2-4 ekstra timer/uge pga. ulogiske workflows.",
        severity: "critical",
        vendors: "Netcompany - eneleverandør",
        timeline: [
            { year: "2019", event: "Aula lanceres som erstatning for SkoleIntra. Udviklet af Netcompany. Uautoriserede personer kunne frit tilgå skolebørns data. Datatilsynet: 'alvorlig kritik'." },
            { year: "2020", event: "Systemet bryder sammen under COVID-nedlukning da 600.000+ brugere logger på samtidig." },
            { year: "2021", event: "Hård kritik af Netcompanys 'store prestigeprojekt'. Prisstigninger begynder." },
            { year: "2022", event: "Netcompany-fejl giver uautoriseret adgang til skolebørns Aula-data. Datatilsynet kritiserer KOMBIT." },
            { year: "2023", event: "Kommunerne: Aula-pris 'løber løbsk'. KOMBIT overvejer at finde ny leverandør. Vendor lock-in gør det svært." },
        ],
        rootCauses: [
            {
                cause: "Vendor lock-in",
                detail: "Netcompany har eneleverandørrollen. Når prisen stiger har kommunerne intet alternativ. KOMBIT overvejer genudbud, men det er dyrt og risikabelt."
            },
            {
                cause: "Datasikkerhed svigter gentagne gange",
                detail: "Allerede ved lancering i 2019 kunne uautoriserede tilgå børns data. Datatilsynet udstedte 'alvorlig kritik'. Samme type fejl gentog sig."
            },
            {
                cause: "Monopolprissætning",
                detail: "Når én leverandør sidder på alt, kan de sætte prisen. Kontrakt forlænget fra 8 til 10 år med stigende priser. KOMBIT finder det 'alt for dyrt'."
            },
        ],
    },
    {
        id: "mitid",
        name: "MitID / Digital Post (mit.dk)",
        icon: "",
        org: "Digitaliseringsstyrelsen / Finansministeriet",
        years: "2021–nu",
        budgetOriginal: "Del af national digital infrastruktur",
        budgetFinal: "Ukendt (ikke offentliggjort fuldt)",
        outcome: "I drift, men GDPR-bøde, sikkerhedshuller og datalæk",
        lostValue: "15 mio. kr. rekordbøde (GDPR). Borgere kunne logge ind på andres konti. Netcompany ramt af datatyveri i 2024 (kildekode og passwords).",
        severity: "critical",
        vendors: "Netcompany - hovedleverandør af MitID og mit.dk (Digital Post)",
        timeline: [
            { year: "2021", event: "MitID lanceres som erstatning for NemID. Massiv overgangsperiode begynder." },
            { year: "2022", event: "Digital Post flyttes fra e-Boks til mit.dk (Netcompany). Kaotisk overgang. Borgere mister adgang til post. Sikkerhedsbrud: borgere kunne logge ind på andres konti." },
            { year: "2023", event: "Version2 afslører sårbarhed der giver adgang til 18.000 danskeres personlige brugernavne. ITU-professor: 'en skandale' og 'fuldstændig uacceptabelt'." },
            { year: "2024", event: "Datatilsynet indstiller Netcompany til rekordbøde på 15 mio. kr. Netcompany ramt af datatyveri: kildekode, scripts og passwords stjålet." },
            { year: "2025", event: "Stadig klager. Næsten hver femte borger finder digitale løsninger udfordrende." },
        ],
        rootCauses: [
            {
                cause: "Tvungen overgang uden alternativer",
                detail: "Alle borgere tvunget fra NemID til MitID og fra e-Boks til mit.dk. Dem der ikke kan følge med afskæres fra offentlige tjenester."
            },
            {
                cause: "Netcompany-monopol på kritisk infrastruktur",
                detail: "Netcompany leverer MitID, Digital Post (mit.dk), borger.dk og NemLog-in. Én leverandør kontrollerer hele den digitale offentlige infrastruktur. Ca. 33% af statens IT-projekter."
            },
            {
                cause: "Sikkerhed som eftertanke",
                detail: "Borgere kunne logge ind på andres konti. 18.000 brugernavne eksponeret. Rekordbøde på 15 mio. kr. Og i 2024 blev Netcompany selv hacket."
            },
        ],
    },
    {
        id: "psrm",
        name: "PSRM: Det nye inddrivelsessystem (EFI-erstatningen)",
        icon: "",
        org: "Skatteministeriet / Gældsstyrelsen",
        years: "2017–nu",
        budgetOriginal: "1,1 mia. kr.",
        budgetFinal: "1,1+ mia. kr. (plus 822 mio. for EFI + 300 mio. til Kammeradvokaten)",
        outcome: "I drift, men teknologien er allerede forældet. Leverandøren har stoppet sikkerhedsopdateringer.",
        lostValue: "172,2 mia. kr. i offentlig gæld (ultimo 2023). Fuld kommuneintegration først 2026/2027.",
        severity: "critical",
        vendors: "Netcompany (hovedudvikler)",
        timeline: [
            { year: "2015", event: "EFI skrottes. 114 mia. kr. i uinddrevet gæld. Nyt system nødvendigt." },
            { year: "2017", event: "PSRM-projektet startes. Budget: 1,1 mia. kr. Netcompany er hovedleverandør." },
            { year: "2019", event: "Rigsrevisionen: Skatteministeriets planer er 'for optimistiske'. Kompleksiteten undervurderet." },
            { year: "2022", event: "Ministeriet undlod at informere Folketinget om utilstrækkelig fremdrift." },
            { year: "2024", event: "Rigsrevisionen advarer: den underliggende teknologi er nu forældet. Leverandøren har stoppet sikkerhedsopdateringer og bugfixes." },
            { year: "2025", event: "System i drift men ikke fuldt udrullet. Kommuner først fuldt tilsluttet 2026/2027. Offentlig gæld: 172+ mia. kr." },
        ],
        rootCauses: [
            {
                cause: "Forældet teknologi før systemet er færdigt",
                detail: "Den underliggende teknologi modtager ikke længere sikkerhedsopdateringer fra leverandøren. Et nyt system bygget på allerede forældet fundament."
            },
            {
                cause: "Gentager EFI-mønsteret",
                detail: "For optimistiske planer, undervurderet kompleksitet, manglende orientering af Folketinget. Præcis de samme fejl som EFI."
            },
        ],
    },
    {
        id: "rejsekort",
        name: "Rejsekort: Det nationale rejsekort",
        icon: "",
        org: "Transportministeriet / DSB / Regionale trafikselskaber",
        years: "2005–nu",
        budgetOriginal: "~1 mia. kr.",
        budgetFinal: "2+ mia. kr.",
        outcome: "I drift efter 6 års forsinkelse. Nu ved at blive erstattet af app.",
        lostValue: "Omsætning 2011-2014 kun halvdelen af prognoserne. Gartner-rapport kaldte økonomien 'forrykt'. Ministeriet forsøgte at undertrykke rapporten i 2 år.",
        severity: "critical",
        vendors: "Thales Group, Accenture (original). Netcompany, Fairtiq, HaCon (nyere kontrakter)",
        timeline: [
            { year: "2005", event: "Rejsekort-projektet startes. Budget: ~1 mia. kr." },
            { year: "2010", event: "Gartner-rapport kalder økonomien 'forrykt'. Transportministeriet forsøger at undertrykke rapporten i 2 år." },
            { year: "2011", event: "Endelig lancering efter 6 års forsinkelse. Omsætning kun halvdelen af forventet." },
            { year: "2015", event: "Rigsrevisionen: systemet er hverken brugervenligt eller økonomisk bæredygtigt. Konkurs kun undgået i sidste øjeblik." },
            { year: "2024", event: "Ny app lanceres (Netcompany m.fl.). Klagenævnet annullerer kontrakt for brud på udbudsregler. Appen anonymiserer ikke lokationsdata trods løfter. App pauset pga. fejl." },
            { year: "2026", event: "Fysisk Rejsekort forventes udfaset. ~10% af brugere mangler smartphone eller digital kompetence." },
        ],
        rootCauses: [
            {
                cause: "Undertrykt kritik",
                detail: "Transportministeriet forsøgte at holde Gartner-rapporten hemmelig i 2 år. Rapporten kaldte økonomien 'forrykt'."
            },
            {
                cause: "Hverken brugervenligt eller bæredygtigt",
                detail: "Rigsrevisionens konklusion i 2015. Parterne brugte tid på interne uenigheder i stedet for at løse problemerne."
            },
            {
                cause: "Digital eksklusion",
                detail: "Overgang til app efterlader ~10% af brugerne uden smartphone eller digitale kompetencer. Igen tvungen digitalisering."
            },
        ],
    },
    {
        id: "politiets-it",
        name: "Politiets IT-katastrofer (2019-2025)",
        icon: "",
        org: "Rigspolitiet",
        years: "2019–2025",
        budgetOriginal: "Diverse",
        budgetFinal: "Diverse",
        outcome: "Slettet bevismateriale, fejlagtige teledata, ubrugelige systemer",
        lostValue: "27 mio. filer slettet. 10.000+ straffesager måtte gennemgås pga. teledata-fejl. 35 personer løsladt fra varetægt.",
        severity: "catastrophic",
        vendors: "Netcompany (våbenregister), diverse",
        timeline: [
            { year: "2019", event: "Teledata-skandalen: software har produceret fejl i 8 år (2012-2019). Data kasseret, mobilmaster placeret forkert. 10.000+ sager skal gennemgås. 35 personer løslades." },
            { year: "2022 jan", event: "Våbenregistret (PAC, Netcompany): System 'praktisk talt kollapset'. 17.000+ jægere kan ikke forny våbentilladelser. Ombudsmanden griber ind." },
            { year: "2022 aug", event: "~27 millioner filer fra straffesager slettet ved en fejl under serverarbejde. Mobildata, computere, harddiske, GPS-enheder, SD-kort. 'Menneskelig fejl'." },
            { year: "2023", event: "Våbenregistret formelt kritiseret efter 1,5+ års problemer." },
            { year: "2025", event: "POLmedia (nyt medie/bevissystem): Intern undersøgelse kalder det 'et rent skraldesystem' og 'regulær IT-skandale'. Betjente springer over at tage fotos fordi systemet er for dårligt." },
        ],
        rootCauses: [
            {
                cause: "8 års uopdagede fejl i teledata",
                detail: "Software producerede forkerte data i 8 år uden at nogen opdagede det. 10.000+ straffesager kompromitteret. Ingen kvalitetskontrol."
            },
            {
                cause: "27 mio. filer slettet ved en fejl",
                detail: "Rutinemæssigt serverarbejde resulterede i sletning af bevismateriale fra straffesager. Ingen backup-procedure fangede det."
            },
            {
                cause: "Systemer ingen vil bruge",
                detail: "Betjente springer bevisindsamling over fordi IT-systemerne er for dårlige. Det er en retssikkerhedsrisiko."
            },
        ],
    },
    {
        id: "smittestop",
        name: "Smittestop: Corona-appen",
        icon: "",
        org: "Sundheds- og Ældreministeriet / Sundhedsdatastyrelsen",
        years: "2020–2022",
        budgetOriginal: "35+ mio. kr.",
        budgetFinal: "35+ mio. kr.",
        outcome: "Fejlbehæftet under pandemien. Dekommissioneret.",
        lostValue: "Kritikere: specialiserede firmaer kunne have bygget den for en femtedel. Appen virkede ikke da den var mest nødvendig.",
        severity: "critical",
        vendors: "Netcompany",
        timeline: [
            { year: "Jun 2020", event: "Smittestop lanceres. Budget: 35+ mio. kr. Netcompany udvikler." },
            { year: "Sep 2020", event: "Første alvorlige fejl: appen informerer ikke nære kontakter til smittede." },
            { year: "Nov 2020", event: "Android batterioptimering blokerer datahentning. Notifikationer virker ikke." },
            { year: "Jan 2021", event: "Hurtigtest-resultater kan ikke registreres. Sikkerhedssårbarhed i Googles underliggende teknologi." },
            { year: "2022", event: "Appen dekommissioneres efter pandemien. Lukket kildekode betød at kun få kunne finde fejl." },
        ],
        rootCauses: [
            {
                cause: "Virkede ikke da det gjaldt",
                detail: "Appen fejlede med sin kernefunktion: at varsle nære kontakter. Både i september 2020 og under vinterbølgen."
            },
            {
                cause: "Lukket kildekode",
                detail: "Danmark valgte lukket kildekode modsat andre lande. Det betød at kun Netcompany kunne finde og rette fejl."
            },
            {
                cause: "Overprissæt",
                detail: "35+ mio. kr. for en app der ikke virkede. Kritikere sagde specialfirmaer kunne have bygget den for en femtedel."
            },
        ],
    },
    {
        id: "signalprogrammet",
        name: "Signalprogrammet: Nye togsignaler (ERTMS)",
        icon: "",
        org: "Banedanmark / Transportministeriet",
        years: "2009–2033?",
        budgetOriginal: "~19 mia. kr.",
        budgetFinal: "23+ mia. kr. (kommentatorer advarer: kan nå 40 mia.)",
        outcome: "12+ år forsinket. Tidligst færdigt 2033.",
        lostValue: "4,4+ mia. kr. overskridelse. Statsrevisorerne: ministeriet vurderede ikke Banedanmarks fremdriftsrapporter kritisk nok.",
        severity: "catastrophic",
        vendors: "Alstom (Østdanmark, massive forsinkelser), Siemens (Vestdanmark), Thales (S-bane, færdigt 2022)",
        timeline: [
            { year: "2009", event: "Signalprogrammet vedtages. Budget: ~19 mia. kr. Alle signaler i Danmark skal udskiftes til ERTMS." },
            { year: "2014", event: "Første forsinkelser. Alstom kan ikke levere software til tiden." },
            { year: "2017", event: "Budget revideres opad. Yderligere 2,8 mia. kr. i omkostningsstigninger. Ny tidsplan." },
            { year: "2021", event: "Skulle have været færdigt nu. Langt fra i mål. Statsrevisorerne revser Transportministeriet." },
            { year: "2022", event: "Thales færdiggør S-bane-delen. Men Alstom-delen (Østdanmark) er stadig massivt forsinket." },
            { year: "2025", event: "Nu 12+ år forsinket. Kommentatorer advarer: totalomkostningen kan nå 40 mia. kr." },
            { year: "2033?", event: "Nuværende forventet færdiggørelse. Hvis det holder." },
        ],
        rootCauses: [
            {
                cause: "Kompleksitet massivt undervurderet",
                detail: "Udskiftning af ALLE signaler i hele Danmark på én gang. Banedanmark og ministeriet undervurderede opgaven systematisk."
            },
            {
                cause: "Leverandør kan ikke levere",
                detail: "Alstom kunne ikke levere software til tiden. Samme mønster som EFI, POLSAG og Amanda."
            },
            {
                cause: "Manglende ministeriel kontrol",
                detail: "Statsrevisorerne kritiserede at Transportministeriet ikke vurderede Banedanmarks fremdriftsrapporter kritisk. Ministeriet troede blindt på leverandøren."
            },
        ],
    },
    {
        id: "tinglysning",
        name: "Digital Tinglysning",
        icon: "",
        org: "Domstolsstyrelsen / Justitsministeriet",
        years: "2006–2009",
        budgetOriginal: "460 mio. kr.",
        budgetFinal: "653 mio. kr. (+42%)",
        outcome: "1,5 år forsinket. Big-bang overgang trods advarsler. Virker nu.",
        lostValue: "Borgere tabte estimeret 1 mia. kr. i uberettigede renteudgifter pga. ophobede skøder og tvungne mellemfinansieringer.",
        severity: "critical",
        vendors: "CSC (primær IT-leverandør)",
        timeline: [
            { year: "2006", event: "Projekt startes. Budget: 460 mio. kr. Hele tinglysningssystemet skal digitaliseres." },
            { year: "2008", event: "Planlagt lancering. Hele den finansielle sektor advarer mod big-bang overgang." },
            { year: "2009", event: "Lanceres 1,5 år forsinket. Advarsler ignoreret: big-bang overgang skaber kaos. Skøder hober sig op. Boligkøbere tvinges til dyre mellemfinansieringer." },
            { year: "2010", event: "Statsrevisorerne: 'utilstrækkelig organisatorisk forberedelse' og 'utilfredsstillende projekt- og økonomistyring'. Borgere har tabt ~1 mia. kr. i unødvendige renter." },
        ],
        rootCauses: [
            {
                cause: "Big-bang trods advarsler",
                detail: "Hele den finansielle sektor advarede mod at skifte alt på én gang. Domstolsstyrelsen ignorerede advarslerne."
            },
            {
                cause: "CSC igen",
                detail: "CSC var primær IT-leverandør. Samme firma bag Amanda, POLSAG og dele af EFI."
            },
            {
                cause: "Borgerne betalte prisen",
                detail: "Boligkøbere tabte estimeret 1 mia. kr. i uberettigede renteudgifter. Staten svigtede, borgerne betalte."
            },
        ],
    },
    {
        id: "forsvaret-it",
        name: "Forsvarets IT-katastrofer: DeMars, Daccis, Tårnfalken",
        icon: "",
        org: "Forsvarsministeriet",
        years: "2004–nu",
        budgetOriginal: "1,5+ mia. kr. (samlet)",
        budgetFinal: "2+ mia. kr. Teknisk gæld: 17,5-21 mia. kr.",
        outcome: "DeMars: 'sønderlemmende kritik'. Daccis: skrottet. Tårnfalken: fløj aldrig.",
        lostValue: "Soldater kaldte SAP-systemet 'Standser Al Produktivitet'. 17,5-21 mia. kr. i teknisk gæld på tværs af hele forsvarets IT.",
        severity: "catastrophic",
        vendors: "IBM (DeMars/SAP), SAAB (Daccis), diverse",
        timeline: [
            { year: "2004", event: "DeMars (SAP) startes. Budget: 693 mio. kr. IBM er hovedleverandør." },
            { year: "2008", event: "DeMars koster nu 1.152 mio. kr. IT-budget overskredet med 350 mio. kr. Alene 259 mio. til DeMars-konsulenter på ét år." },
            { year: "2008", event: "Daccis (SAAB, 410 mio. kr.) skrottes. SAAB dømmes til at betale 200 mio. kr. i erstatning (2013)." },
            { year: "2010", event: "Tårnfalken-dronen: 436 mio. kr. investeret. Fløj aldrig. Solgt til Canada for en brøkdel." },
            { year: "2011", event: "Rigsrevisionen: 'sønderlemmende kritik'. DeMars kan ikke beregne omkostninger pr. mission. Folketinget kan ikke træffe informerede beslutninger." },
            { year: "2019", event: "DeMars sættes i genudbud for op til 2 mia. kr. Teknisk gæld i forsvarets IT: 17,5-21 mia. kr." },
        ],
        rootCauses: [
            {
                cause: "Fuldstændig mangel på økonomistyring",
                detail: "Rigsrevisionen: DeMars kan ikke beregne hvad en mission koster. Folketinget kan ikke vurdere forsvarsudgifter. Systemet hindrer demokratisk kontrol."
            },
            {
                cause: "Konsulenter dyrere end systemet",
                detail: "I 2008 brugte forsvaret 259 mio. kr. på DeMars-konsulenter alene - mere end hele IT-budgettet var overskredet med."
            },
            {
                cause: "Mia. i teknisk gæld",
                detail: "17,5-21 mia. kr. i teknisk gæld. Forsvarets IT er så forældet at genopretning koster mere end nye kampfly."
            },
        ],
    },
    {
        id: "proask",
        name: "PROASK: Arbejdsskadestyrelsens sagsbehandling",
        icon: "",
        org: "Arbejdsskadestyrelsen / Beskæftigelsesministeriet",
        years: "2010–2014",
        budgetOriginal: "108 mio. kr.",
        budgetFinal: "283 mio. kr. (inkl. renter, licenser, drift)",
        outcome: "Skrottet 2014. Visse arbejdsgange tog 5x længere end systemet fra 1991.",
        lostValue: "283 mio. kr. tabt. Minister Mette Frederiksen kritiseret for ikke at orientere Finansudvalget.",
        severity: "critical",
        vendors: "Ikke offentligt navngivet. Deloitte og Gartner leverede reviews.",
        timeline: [
            { year: "2010", event: "PROASK startes. Budget: 108 mio. kr. Ministeriets første SOA-projekt - bruges som 'prøveklud'." },
            { year: "2012", event: "Gartner: arkitekturen er 'unødvendigt kompleks for opgaven'. Budget vokser til 164 mio. kr." },
            { year: "2013", event: "Visse arbejdsgange tager 5x længere end det 22 år gamle system det skulle erstatte." },
            { year: "2014", event: "Deloitte anbefaler skrotning. PROASK lukkes. Total: 283 mio. kr. tabt. Minister Mette Frederiksen kritiseres for manglende orientering af Finansudvalget." },
        ],
        rootCauses: [
            {
                cause: "Brugt som teknisk eksperiment",
                detail: "Ministeriets første SOA-projekt blev brugt som 'prøveklud' for ny teknologi. Høj risiko fra dag ét."
            },
            {
                cause: "Langsommere end 22 år gammelt system",
                detail: "Visse arbejdsgange tog 5x længere end systemet fra 1991. Det nye system var objektivt dårligere."
            },
            {
                cause: "Politisk ansvarsunddragelse",
                detail: "Minister Mette Frederiksen kritiseret for ikke at orientere Finansudvalget om problemerne i tide."
            },
        ],
    },
    {
        id: "legacy-skat",
        name: "Skatteministeriets Legacy: IT fra 1960'erne",
        icon: "",
        org: "Skatteministeriet / Udviklings- og Forenklingsstyrelsen",
        years: "1960–nu",
        budgetOriginal: "612 mio. kr. (2019-2022 til første skridt)",
        budgetFinal: "Tocifret milliardbeløb over 15 år for fuld udskiftning",
        outcome: "~230 IT-systemer, ~70 klassificeret som legacy. Nogle fra 1960'erne.",
        lostValue: "Systemer fra 1960-70'erne kan kun driftes af en skrumpende gruppe aldrende specialister. Blokerer politiske reformer.",
        severity: "catastrophic",
        vendors: "KMD, CSC/DXC (historisk)",
        timeline: [
            { year: "1960'erne", event: "De første IT-systemer til skatteforvaltningen bygges." },
            { year: "2018", event: "Fortroligt notat advarer: 'der er risiko for at skatteopkrævningen ikke kan gennemføres rettidigt eller i overensstemmelse med lovgivningen'." },
            { year: "2019", event: "612 mio. kr. bevilget til at påbegynde modernisering. Størstedelen går til gældsinddrivelse (5% af indtægterne), ikke til legacy der håndterer 73%." },
            { year: "2025", event: "Systemer fra 1960'erne stadig i drift. Politiske reformer som reduceret fødevare-moms kræver årelang systemtilpasning (først klar 2030)." },
        ],
        rootCauses: [
            {
                cause: "60 år gammel kode i drift",
                detail: "Systemer fra 1960-70'erne håndterer 73% af skatteindtægterne. Den skrumpende gruppe specialister der kan driftes dem nærmer sig pensionsalderen."
            },
            {
                cause: "Blokerer demokratisk lovgivning",
                detail: "Folketinget kan ikke gennemføre reformer fordi IT-systemerne ikke kan tilpasses. Reduceret fødevare-moms: tidligst 2030."
            },
            {
                cause: "Privatisering fjernede al ekspertise",
                detail: "Da Datacentralen blev privatiseret i 1990'erne forsvandt al IT-ekspertise fra staten. Nu sidder CSC/DXC og KMD på systemerne, og staten kan ikke skifte."
            },
        ],
    },
    {
        id: "dsb-ic4",
        name: "DSB IC4/IC2: Danmarks dyreste togkøb",
        icon: "",
        org: "DSB / Transportministeriet",
        years: "2000–2017",
        budgetOriginal: "4,98 mia. kr. (83 IC4-tog + 23 IC2-tog)",
        budgetFinal: "6,8 mia. kr. direkte. 16,7 mia. kr. inkl. erstatning og elektrificering.",
        outcome: "Skrottet. IC4 skåret i stykker og solgt som skrot. IC2 solgt til Rumænien.",
        lostValue: "DSB nedskrev IC4 med 2.731 mio. kr. i 2016. Bogført værdi: 46 mio. kr. (fra 5 mia.).",
        severity: "catastrophic",
        vendors: "AnsaldoBreda (Italien) - valgt som billigste tilbudsgiver over teknisk bedre alternativer",
        timeline: [
            { year: "2000", event: "DSB bestiller 83 IC4-tog fra italienske AnsaldoBreda for 4,98 mia. kr. Billigste tilbud vinder over teknisk bedre alternativer." },
            { year: "2002", event: "Supplerende ordre: 23 IC2-tog for 800 mio. kr." },
            { year: "2003", event: "Togene skulle have været i drift. De er det ikke." },
            { year: "2007", event: "Første tog leveret - 4 år for sent. Kritiske fejl i bremser, motorer, døre, toiletter, ventilation, varme og computere." },
            { year: "2009", event: "Forlig med AnsaldoBreda: 2,25 mia. kr. i prisreduktion. DSB overtager selv færdiggørelsen - bliver både kunde og producent." },
            { year: "2012", event: "Total: 6,2 mia. kr. inkl. 1,1 mia. for lejede erstatningstog. Statsrevisorerne: 'ikke tilfredsstillende'." },
            { year: "2014", event: "Regning når 6,8 mia. kr. - 1,5 mia. over kontrakt." },
            { year: "2016", event: "DSB nedskriver IC4 med 2.731 mio. kr. Bogført værdi: kun 46 mio. kr. DSB poster tab på 2.193 mio. kr. Alle IC2 trukket ud af drift." },
            { year: "2017", event: "Første IC4-tog fysisk skrottet. Ingeniøren: fuld erstatningsregning er 16,7 mia. kr. DSB forsøgte at ændre Rigsrevisionens kritiske ordlyd før offentliggørelse." },
        ],
        rootCauses: [
            {
                cause: "Billigste tilbud vinder altid",
                detail: "DSB valgte det billigste tilbud over teknisk bedre alternativer. Kontrakten manglede effektive bodsklausuler, milestone-betalinger og exit-mekanismer."
            },
            {
                cause: "DSB blev producent",
                detail: "Efter forliget overtog DSB selv færdiggørelsen af togene. En togoperatør blev pludselig togproducent. Uden kompetencerne til det."
            },
            {
                cause: "Fra 5 mia. til 46 mio. i bogført værdi",
                detail: "Tog købt for 5 mia. kr. nedskrevet til 46 mio. kr. og skrottet. Det er 99,1% værditab. Og skatteyderne betalte."
            },
        ],
    },
    {
        id: "dsb-kontrakt",
        name: "DSB Trafikkontrakten: 0 kr. i straf for 7 brud på 8 år",
        icon: "",
        org: "DSB / Transportministeriet",
        years: "2015–nu",
        budgetOriginal: "41,4 mia. kr. (2015-2024, ~4,2 mia./år)",
        budgetFinal: "3,3 mia. kr./år (ny kontrakt 2023-2033)",
        outcome: "DSB brød kontrakten 7 af 8 år. Betalte 0 kr. i kompensation til staten.",
        lostValue: "Passagerer har historisk lav punktlighed. Direktører modtager millionbonusser. Fyret CEO gik med 9,7 mio. kr.",
        severity: "critical",
        vendors: "DSB (statsligt monopol - ingen konkurrence)",
        contractNote: "TV 2 dokumenterede i juni 2023: DSB brød kontrakten 7 ud af 8 år (2015-2023). Transportministeriet bekræftede at DSB IKKE betaler kompensation til staten.",
        timeline: [
            { year: "2015", event: "Ny trafikkontrakt: staten betaler DSB ~4,2 mia. kr./år. Punktlighedskrav stiger til 88% inden 2023." },
            { year: "2016-2022", event: "DSB bryder kontrakten 7 ud af 8 år. Ingen finansielle konsekvenser. Kun 2020 (COVID, reduceret trafik) opfylder kravene." },
            { year: "2023", event: "Punktlighed rammer historisk lavpunkt. TV 2: 'For syvende gang bryder DSB sin kontrakt med staten'. Ministeriet bekræfter: 0 kr. i kompensation." },
            { year: "2024", event: "Punktlighed: 76,8%. Netop over det nye, dramatisk sænkede mål på 75%. Originalt mål var 88%." },
        ],
        rootCauses: [
            {
                cause: "Ingen straf for kontraktbrud",
                detail: "DSB brød kontrakten 7 af 8 år og betalte 0 kr. i kompensation. Passagerer kan få kompensation på specifikke ruter, men STATEN som ejer får intet tilbage."
            },
            {
                cause: "Målene sænkes i stedet for at straffe",
                detail: "I stedet for at holde DSB ansvarlig sænkede ministeriet punktlighedskravet fra 88% til 75%. Problemet løses ved at omdefinere succes."
            },
            {
                cause: "Monopol uden konsekvenser",
                detail: "Arriva viste at konkurrence giver 30% besparelse. Men DSB fik direkte tildeling uden konkurrence. Den nye 2023-kontrakt er officielt den sidste uden udbud."
            },
        ],
    },
    {
        id: "dsb-bonus",
        name: "DSB Bonusser og Ledelsessvigt",
        icon: "",
        org: "DSB",
        years: "2011–2024",
        budgetOriginal: "N/A",
        budgetFinal: "N/A",
        outcome: "Millionbonusser til ledere mens passagerer oplever forsinkelser og aflysninger.",
        lostValue: "Fyret CEO Søren Eriksen: 9,7 mio. kr. i fratrædelse. DSB First-oprydning: 725 mio. kr. Direktør-bonus: 3,3 mio. kr. for at blive i jobbet.",
        severity: "critical",
        vendors: "N/A",
        timeline: [
            { year: "2011", event: "CEO Søren Eriksen fyret pga. finansielt kaos i DSB First (svensk datterselskab). Går med 9,7 mio. kr. DSB afsætter 725 mio. kr. til oprydning. Rigsrevisionen: mistanke om at danske skattepenge subsidierte svensk togdrift." },
            { year: "2016-2017", event: "CEO Flemming Jensen: bonus op til 25% af grundløn. I 2017: 812.953 kr. i bonus. Samlet kompensation: 6,1 mio. kr. - mere end dobbelt så meget som statsministerens løn (2,7 mio.)." },
            { year: "2018-2024", event: "Strategidirektør Jürgen Müller: fastholdelsesbonus på 3,3 mio. kr. bare for IKKE at sige op. Intet andet statsligt selskab bruger sådanne bonusser. Professor: 'skjult lønforhøjelse' og 'uskik'." },
            { year: "2020", event: "Performancebonusser omdannes til fast løn (faktor 53). Bonussystemet forsvinder, men lønnen stiger tilsvarende." },
        ],
        rootCauses: [
            {
                cause: "Belønning uden ansvar",
                detail: "Ledere modtager millionbonusser mens passagerer oplever historisk lav punktlighed og kontrakten brydes år efter år."
            },
            {
                cause: "3,3 mio. kr. for at blive",
                detail: "En direktør fik 3,3 mio. kr. i bonus bare for ikke at sige op. Ingen andre statslige selskaber bruger fastholdelsesbonus."
            },
            {
                cause: "Fyret med millioner",
                detail: "CEO Eriksen forlod DSB med 9,7 mio. kr. efter en skandale der kostede 725 mio. kr. at rydde op efter."
            },
        ],
    },
    {
        id: "odense-letbane",
        name: "Odense Letbane",
        icon: "",
        org: "Odense Kommune / Odense Letbane P/S",
        years: "2015–2022",
        budgetOriginal: "3,0 mia. kr.",
        budgetFinal: "3,6 mia. kr.",
        outcome: "I drift, men 42% færre passagerer end forventet og 147 mio. kr./år i underskud.",
        lostValue: "14.500 daglige passagerer vs. 25.000 forventet. Årligt underskud dækkes af skatteyderne.",
        severity: "critical",
        vendors: "Comsa (Spanien, anlæg), Stadler (Schweiz, tog)",
        timeline: [
            { year: "2015", event: "Anlægslov vedtaget. Budget: 3,0 mia. kr. Forventet 25.000 daglige passagerer." },
            { year: "2018-2020", event: "Anlæg forsinket. Budgetoverskridelser begynder. Odense centrum gravet op i årevis." },
            { year: "2022", event: "Åbner efter forsinkelser. Budget vokset til 3,6 mia. kr. (+20%)." },
            { year: "2023", event: "Kun 14.500 daglige passagerer - 42% under prognosen. Årligt underskud: 147 mio. kr." },
            { year: "2024-2025", event: "Underskuddet fortsætter. Kommunen må dække tabet. Kritikere spørger om letbanen nogensinde bliver rentabel." },
        ],
        rootCauses: [
            {
                cause: "Overoptimistiske passagerprognoser",
                detail: "25.000 daglige passagerer forventet, 14.500 realiseret. 42% under prognosen. Samme mønster som Aarhus Letbane."
            },
            {
                cause: "Ingen konsekvens ved forkerte prognoser",
                detail: "De konsulenter der lavede de optimistiske prognoser bærer intet ansvar. Skatteyderne dækker underskuddet."
            },
            {
                cause: "Årelang gene for borgerne",
                detail: "Odense centrum var en byggeplads i årevis. Butikker lukkede. Borgerne betalte prisen både under og efter anlæg."
            },
        ],
    },
    {
        id: "femern",
        name: "Femern Bælt-forbindelsen",
        icon: "",
        org: "Femern A/S / Transportministeriet",
        years: "2008–2031?",
        budgetOriginal: "52,6 mia. kr.",
        budgetFinal: "64-92 mia. kr. (inkl. tyske tilslutningsanlæg)",
        outcome: "Under anlæg. 13 mia. kr. brugt før tysk godkendelse. Åbning udskudt til 2031+.",
        lostValue: "Milliardoverskridelser. Risiko for at danske skatteydere hænger på regningen hvis brugerbetaling ikke dækker.",
        severity: "catastrophic",
        vendors: "Femern Link Contractors (Vinci, Per Aarsleff m.fl.)",
        timeline: [
            { year: "2008", event: "Statsaftale mellem Danmark og Tyskland. Danmark betaler tunnelen, Tyskland landanlæg." },
            { year: "2015", event: "Anlægslov vedtaget i Danmark. Budget: 52,6 mia. kr. Tysk godkendelse mangler stadig." },
            { year: "2019", event: "13 mia. kr. allerede brugt - FØR tysk planfæstelse er på plads. Point of no return." },
            { year: "2020", event: "Tysk planfæstelse endelig godkendt efter 8 års forsinkelse og modstand fra tyske borgere og færgeselskaber." },
            { year: "2024", event: "Budgettet stiger. Samlede omkostninger inkl. tyske tilslutningsanlæg: 64-92 mia. kr. Renteudgifter eksploderer." },
            { year: "2031?", event: "Forventet åbning. Tilbagebetalingstid: 36 år. Kritikere tvivler på om brugerbetaling dækker." },
        ],
        rootCauses: [
            {
                cause: "13 mia. brugt før godkendelse",
                detail: "Danmark brugte 13 mia. kr. før Tyskland overhovedet havde godkendt projektet. Et gigantisk væddemål med skatteydernes penge."
            },
            {
                cause: "Urealistisk finansieringsmodel",
                detail: "Præsenteret som 'selvfinansierende' via brugerbetaling. Men renteudgifter og budgetoverskridelser truer modellen. Tilbagebetalingstid: 36 år."
            },
            {
                cause: "Ingen plan B",
                detail: "Når 13 mia. er brugt, kan man ikke stoppe. Præcis samme fælde som EFI: invester så meget at projektet bliver 'too big to fail'."
            },
        ],
    },
    {
        id: "cityringen",
        name: "Cityringen (Metro M3)",
        icon: "",
        org: "Metroselskabet / Københavns Kommune",
        years: "2007–2019",
        budgetOriginal: "21,3 mia. kr.",
        budgetFinal: "~25 mia. kr.",
        outcome: "I drift. 9 mdr. forsinket. 36% færre passagerer end forventet.",
        lostValue: "150.000 daglige passagerer vs. 235.000 forventet. Støj og byggegener i 10 år for københavnere.",
        severity: "critical",
        vendors: "Copenhagen Metro Team (Salini Impregilo/Webuild, Seli, Ansaldo STS)",
        timeline: [
            { year: "2007", event: "Cityringen vedtaget. Budget: 21,3 mia. kr. Forventet 235.000 daglige passagerer." },
            { year: "2010-2018", event: "Anlæg. København gravet op i næsten et årti. Massive støjgener, grundvandsproblemer, byggerod." },
            { year: "2019", event: "Åbner 9 måneder forsinket. Budget vokset til ~25 mia. kr." },
            { year: "2023", event: "150.000 daglige passagerer - 36% under prognosen. Gælden skal betales over 40+ år." },
        ],
        rootCauses: [
            {
                cause: "Overoptimistiske passagerprognoser",
                detail: "235.000 forventet, 150.000 realiseret. 36% under. Samme mønster som letbanerne."
            },
            {
                cause: "10 års byggekaos",
                detail: "København var en byggeplads i næsten et årti. Beboere udsat for støj, rystelser og grundvandsproblemer."
            },
            {
                cause: "Gæld i 40+ år",
                detail: "Med færre passagerer end forventet tager tilbagebetalingen længere. Københavnerne betaler i årtier."
            },
        ],
    },
    {
        id: "aarhus-letbane",
        name: "Aarhus Letbane",
        icon: "",
        org: "Aarhus Letbane I/S / Aarhus Kommune / Region Midtjylland",
        years: "2013–2019",
        budgetOriginal: "3,5 mia. kr.",
        budgetFinal: "4,2 mia. kr. + 330 mio. kr. statslig redningspakke",
        outcome: "I drift efter kaotisk åbning. Åbningsceremoni aflyst dagen før. 48% færre passagerer end forventet.",
        lostValue: "4,7 mio. passagerer/år vs. 9 mio. forventet. Staten måtte redde projektet med 330 mio. kr.",
        severity: "critical",
        vendors: "Stadler (tog), Anlun/Aarsleff (anlæg)",
        timeline: [
            { year: "2013", event: "Anlægslov vedtaget. Budget: 3,5 mia. kr. Forventet 9 mio. passagerer/år." },
            { year: "2017", event: "Åbningsceremoni aflyst dagen før pga. manglende sikkerhedsgodkendelse. National pinlighed." },
            { year: "2018", event: "Endelig delvis åbning efter gentagne forsinkelser. Budget vokset til 4,2 mia. kr." },
            { year: "2019", event: "Fuld drift. Men passagertallene er langt under forventning." },
            { year: "2023", event: "4,7 mio. passagerer/år - 48% under prognosen. Staten bevilger 330 mio. kr. redningspakke." },
        ],
        rootCauses: [
            {
                cause: "Aflyst åbning - national skandale",
                detail: "Åbningsceremonien aflyst dagen før fordi togene ikke var sikkerhedsgodkendt. Symbolet på dansk infrastrukturplanlægning."
            },
            {
                cause: "Passagerprognoser som ønsketænkning",
                detail: "9 mio. forventet, 4,7 mio. realiseret. 48% under. Sammen med Odense og Cityringen: et mønster af systematisk overvurdering."
            },
            {
                cause: "Staten betaler når det fejler",
                detail: "330 mio. kr. statslig redningspakke. Risikoen ligger hos skatteyderne, aldrig hos dem der lavede de forkerte prognoser."
            },
        ],
    },
    {
        id: "postnord",
        name: "PostNord Danmark",
        icon: "",
        org: "PostNord / Transportministeriet",
        years: "2009–2025",
        budgetOriginal: "N/A",
        budgetFinal: "1,4 mia. kr. redningspakke + 600 mio. kr. kompensation",
        outcome: "3.500-4.000 afskediget. Stoppede al brevomdeling 2025. Milliarder i offentlige midler.",
        lostValue: "2+ mia. kr. i offentlige redningspakker. Tusindvis af arbejdspladser tabt. Post hver anden dag, derefter slet ikke.",
        severity: "critical",
        vendors: "N/A (statsligt selskab, fællesejet med Sverige)",
        timeline: [
            { year: "2009", event: "Post Danmark fusionerer med svenske Posten AB til PostNord. Dansk brevvolumen falder dramatisk." },
            { year: "2017", event: "PostNord i dyb krise. Milliarder i underskud. Dansk-svensk strid om hvem der betaler." },
            { year: "2018", event: "Redningspakke: 1,4 mia. kr. fra den danske stat. 3.500-4.000 medarbejdere afskediges." },
            { year: "2020", event: "Staten betaler yderligere 600 mio. kr. i kompensation for befordringspligten." },
            { year: "2025", event: "PostNord stopper al brevomdeling i Danmark. Befordringspligten ophæves efter 400+ år." },
        ],
        rootCauses: [
            {
                cause: "Fusion der aldrig virkede",
                detail: "Den dansk-svenske fusion skabte bureaukrati og konflikter. To lande, to kulturer, to postvæsener der aldrig blev ét."
            },
            {
                cause: "Skatteyderne betaler for ledelsens fejl",
                detail: "2+ mia. kr. i offentlige redningspakker. Ledelsen kunne ikke tilpasse sig den digitale virkelighed."
            },
            {
                cause: "Ingen plan for digitaliseringen",
                detail: "Brevmængden faldt forudsigeligt i årevis. Alligevel blev tilpasningen kaotisk og dyr."
            },
        ],
    },
    {
        id: "kronos2",
        name: "Kronos2: Nationalbankens betalingssystem",
        icon: "",
        org: "Danmarks Nationalbank",
        years: "2013–2024",
        budgetOriginal: "~200 mio. kr.",
        budgetFinal: "370 mio. kr. (85% over) - derefter skrottet helt",
        outcome: "Skrottet. Fejl strandede lønudbetalinger for tusindvis af danskere.",
        lostValue: "370 mio. kr. tabt. Borgere ventede på løn og pensioner. Tilliden til betalingsinfrastrukturen ramt.",
        severity: "critical",
        vendors: "Ikke offentligt navngivet",
        timeline: [
            { year: "2013", event: "Kronos2 startes som afløser for Nationalbankens Kronos-system. Budget: ~200 mio. kr." },
            { year: "2018-2022", event: "Gentagne forsinkelser og tekniske problemer. Budget vokser til 370 mio. kr. (+85%)." },
            { year: "2023", event: "Systemfejl strander lønudbetalinger for tusindvis af danskere. Pensioner forsinket. National kritik." },
            { year: "2024", event: "Nationalbanken opgiver Kronos2 og skrottet systemet. 370 mio. kr. tabt." },
        ],
        rootCauses: [
            {
                cause: "Kritisk infrastruktur fejler",
                detail: "Når betalingssystemet fejler, får folk ikke deres løn. Det rammer direkte i borgernes hverdag."
            },
            {
                cause: "Skrottet efter 85% overskridelse",
                detail: "Fra 200 til 370 mio. kr., og så skrottet helt. Pengene er tabt."
            },
            {
                cause: "Selv Nationalbanken kan fejle",
                detail: "Hvis Danmarks mest kompetente finansielle institution ikke kan styre et IT-projekt, hvad siger det om resten af staten?"
            },
        ],
    },
    {
        id: "skat-moms",
        name: "SKATs Momssystem",
        icon: "",
        org: "Skatteministeriet / Udviklings- og Forenklingsstyrelsen",
        years: "2017–nu",
        budgetOriginal: "~247 mio. kr.",
        budgetFinal: "600+ mio. kr. (146% over)",
        outcome: "Forsinket. Hård EU-deadline. Del af mønster hvor statens IT-budget fordobledes 2020-2021.",
        lostValue: "353+ mio. kr. i overskridelse. Risiko for EU-sanktioner hvis deadline misses.",
        severity: "critical",
        vendors: "Ikke offentligt navngivet",
        timeline: [
            { year: "2017", event: "Nyt momssystem påbegyndes. Budget: ~247 mio. kr. EU stiller krav om modernisering." },
            { year: "2020-2021", event: "Statens samlede IT-budget fordobles. Momssystemet er en af synderne." },
            { year: "2023", event: "Budget vokset til 600+ mio. kr. - 146% over. Hård EU-deadline presser ministeriet." },
            { year: "2025", event: "Stadig ikke fuldt implementeret. EU-deadline truer med sanktioner." },
        ],
        rootCauses: [
            {
                cause: "146% budgetoverskridelse",
                detail: "Fra 247 til 600+ mio. kr. Del af et mønster: statens IT-budget fordobledes fra 2020 til 2021."
            },
            {
                cause: "EU-deadline som prispres",
                detail: "Hårde EU-krav gør det umuligt at stoppe eller forsinke yderligere. Leverandørerne ved det - og prisen stiger."
            },
            {
                cause: "Skatteministeriets serielle IT-fiaskoer",
                detail: "EFI, PSRM, ejendomsvurdering, legacy-systemer, og nu momssystemet. Samme ministerium, samme mønster, igen og igen."
            },
        ],
    },
    {
        id: "boligskattesystem",
        name: "Boligskattesystemet",
        icon: "",
        org: "Skatteministeriet / Udviklings- og Forenklingsstyrelsen (UFST)",
        years: "2019–nu",
        budgetOriginal: "~1,3 mia. kr.",
        budgetFinal: "1,5+ mia. kr. (+ 5 mia. for vurderingssystemet)",
        outcome: "Rødt lys fra IT-rådet. UFST nægter at oplyse detaljerede udgifter.",
        lostValue: "Boligejere betaler forkert skat i årevis. Systemet hænger sammen med det 5+ mia. kr. dyre vurderingssystem.",
        severity: "critical",
        vendors: "Ikke offentligt navngivet",
        timeline: [
            { year: "2019", event: "Boligskattesystemet påbegyndes som separat projekt fra ejendomsvurderingssystemet. Budget: ~1,3 mia. kr." },
            { year: "2021", event: "Statens IT-råd giver projektet rødt lys. Kritisk forsinkelse." },
            { year: "2023", event: "Budget vokset til 1,5+ mia. kr. UFST nægter at oplyse detaljerede udgifter trods aktindsigt." },
            { year: "2025", event: "Sammen med vurderingssystemet (5+ mia.) har Skatteministeriet brugt 6,5+ mia. kr. på ejendomsrelateret IT uden fuldt fungerende resultat." },
        ],
        rootCauses: [
            {
                cause: "Hemmelighedskræmmeri",
                detail: "UFST nægter at oplyse detaljerede udgifter. Borgerne betaler men må ikke vide hvad pengene bruges til."
            },
            {
                cause: "Sammenhæng med vurderingsskandale",
                detail: "Boligskattesystemet er afhængigt af ejendomsvurderingssystemet (5+ mia. kr., 2.500% over budget). Fejl i det ene forplanter sig til det andet."
            },
            {
                cause: "IT-rådet ignoreres igen",
                detail: "Rødt lys fra Statens IT-råd. Men projektet fortsætter alligevel. Præcis som med ejendomsvurderingssystemet."
            },
        ],
    },
    {
        id: "atea-korruption",
        name: "Atea-sagen: Korruption i offentlige IT-indkøb",
        icon: "",
        org: "Region Sjælland / Rigspolitiet / Anklagemyndigheden",
        years: "2007–2019",
        budgetOriginal: "N/A",
        budgetFinal: "693 mio. kr. i IT-køb fra Atea",
        outcome: "45 mio. kr. kanaliseret til hemmelig 'Konto 2840'. Luksusrejser, F1 i Dubai. 7 personer fængslet.",
        lostValue: "Danmarks største korruptionssag i den offentlige sektor. Offentlige midler brugt på bestikkelse og luksus.",
        severity: "catastrophic",
        vendors: "Atea (nordisk IT-virksomhed)",
        timeline: [
            { year: "2007-2014", event: "Region Sjælland køber IT-udstyr for 693 mio. kr. fra Atea. Hemmelig 'Konto 2840' oprettes med 45 mio. kr." },
            { year: "2014", event: "Sagen ruller. Politiet efterforsker systematisk korruption. Luksusrejser, Formel 1 i Dubai, dyre middage afsløres." },
            { year: "2016", event: "Første anholdelser. Tidligere regionsdirektør og Atea-chefer sigtes." },
            { year: "2018-2019", event: "7 personer dømmes og fængsles. Danmarks største dom for offentlig korruption." },
        ],
        rootCauses: [
            {
                cause: "Hemmelig konto med 45 mio. kr.",
                detail: "'Konto 2840' blev brugt til at kanalisere offentlige midler til bestikkelse. Luksusrejser, Formel 1 i Dubai, dyre middage."
            },
            {
                cause: "Ingen kontrol med IT-indkøb",
                detail: "693 mio. kr. i IT-køb uden tilstrækkelig kontrol. Offentlige indkøbsprocesser er sårbare over for korruption når kontrollen svigter."
            },
            {
                cause: "Systemisk problem, ikke enkeltstående",
                detail: "7 fængslet. Det var ikke én rådden person - det var et helt netværk. Og spørgsmålet er: hvor mange lignende sager opdages aldrig?"
            },
        ],
    },
    {
        id: "udbetaling-dk-it",
        name: "Udbetaling Danmark IT-kaos",
        icon: "",
        org: "Udbetaling Danmark / ATP",
        years: "2012–nu",
        budgetOriginal: "Diverse",
        budgetFinal: "Diverse",
        outcome: "Fejlbetalinger af boligstøtte, barselsdagpenge, studiegæld. 2.000+ ekstra klager på ét år.",
        lostValue: "Tusindvis af borgere ramt af fejlagtige udbetalinger. Legacy-systemer beskrevet som 'usikre og ustabile'.",
        severity: "critical",
        vendors: "Diverse (legacy-systemer fra KMD m.fl.)",
        timeline: [
            { year: "2012", event: "Udbetaling Danmark oprettes. Overtager kommunale udbetalingsopgaver. Arver aldrende IT-systemer." },
            { year: "2018-2020", event: "Gentagne fejl i boligstøtte, barselsdagpenge og studiegæld. Borgere får for lidt eller for meget udbetalt." },
            { year: "2022", event: "2.000+ ekstra klager på ét år. Ombudsmanden kritiserer sagsbehandlingstider." },
            { year: "2024", event: "Interne rapporter beskriver legacy-systemer som 'usikre og ustabile'. Fejlbetalinger fortsætter." },
        ],
        rootCauses: [
            {
                cause: "Arvede legacy-systemer",
                detail: "Udbetaling Danmark overtog IT-systemer fra 98 kommuner. Systemer der var 'usikre og ustabile' fra dag ét."
            },
            {
                cause: "Borgere betaler for fejl",
                detail: "Fejlagtige udbetalinger rammer de mest sårbare: folk på boligstøtte, barselsdagpenge og studerende. De har ikke ressourcer til at klage."
            },
            {
                cause: "Ingen modernisering i sigte",
                detail: "Systemerne beskrives som usikre, men der er ingen plan eller budget for fuld udskiftning."
            },
        ],
    },
    {
        id: "lynetteholm",
        name: "Lynetteholm",
        icon: "",
        org: "By & Havn / Transportministeriet / Københavns Kommune",
        years: "2018–nu",
        budgetOriginal: "2,5 mia. kr. (selve øen)",
        budgetFinal: "4,2 mia. kr. (øen) + 22-40 mia. kr. (metro/ringvej)",
        outcome: "Præsenteret som 'selvfinansierende'. Professorer beregner 5+ mia. kr. hul. Cyanid-overskridelse i 4 mdr.",
        lostValue: "Miljøskandaler, urealistisk finansiering, demokratisk underskud. Potentielt Danmarks dyreste projekt.",
        severity: "catastrophic",
        vendors: "Diverse entreprenører",
        timeline: [
            { year: "2018", event: "Lynetteholm præsenteres som ny bydel i Københavns Havn. Budget: 2,5 mia. kr. for selve øen. 'Selvfinansierende' via grundsalg." },
            { year: "2021", event: "Anlægslov vedtaget. Kritikere påpeger at metro og ringvej (22-40 mia. kr.) ikke er medregnet." },
            { year: "2023", event: "Budget for øen vokset til 4,2 mia. kr. (+68%). Professorer beregner 5+ mia. kr. hul i finansieringen." },
            { year: "2024", event: "Cyanid-overskridelse i havvandet i 4 måneder. Miljøorganisationer protesterer. Retssager om jordkørsel." },
            { year: "2025", event: "Samlede omkostninger inkl. infrastruktur: potentielt 60+ mia. kr. Ingen ved hvem der betaler." },
        ],
        rootCauses: [
            {
                cause: "'Selvfinansierende' er en myte",
                detail: "Præsenteret som gratis for skatteyderne. Professorer beregner 5+ mia. kr. hul. Grundsalg dækker ikke infrastrukturomkostninger."
            },
            {
                cause: "Skjulte omkostninger",
                detail: "Øen koster 4,2 mia. Men metroen koster 22-40 mia. oveni. Den samlede regning præsenteres aldrig samlet."
            },
            {
                cause: "Miljøskandaler",
                detail: "Cyanid-overskridelse i havvandet i 4 måneder. Overskred grænseværdier uden konsekvenser. Hvem kontrollerer kontrolløren?"
            },
        ],
    },
    {
        id: "superhospitaler",
        name: "Superhospitalerne: Danmarks dyreste byggeprojekt",
        icon: "",
        org: "Regionerne / Sundheds- og Ældreministeriet",
        years: "2007–nu",
        budgetOriginal: "~27 mia. kr. (samlet)",
        budgetFinal: "35+ mia. kr.",
        outcome: "Massive overskridelser på tværs af alle projekter. Nordsjællands Hospital: 70% over budget.",
        lostValue: "8+ mia. kr. i overskridelser. Spareøvelser der fjerner sengepladser og lukker afdelinger.",
        severity: "catastrophic",
        vendors: "Diverse entreprenører og rådgivere",
        timeline: [
            { year: "2007", event: "Kvalitetsfonden oprettes. Staten bevilger ~27 mia. kr. til 16 sygehusbyggerier." },
            { year: "2012-2015", event: "Budgetoverskridelser begynder. Projekter skæres til for at holde rammer. Sengepladser fjernes." },
            { year: "2020", event: "Nyt Aalborg Universitetshospital: fra 5,9 til 7,7 mia. kr. (+30%). Nyt OUH: fra 6,3 til 7,3+ mia. kr." },
            { year: "2023", event: "Nordsjællands Hospital (Nyt Hospital Nordsjælland): fra 4,9 til 8,5-9 mia. kr. - 70% over budget." },
            { year: "2025", event: "Samlede overskridelser: 8+ mia. kr. Regioner må spare på drift for at dække anlæg." },
        ],
        rootCauses: [
            {
                cause: "Systematisk underbudgettering",
                detail: "Alle 16 projekter rammes af overskridelser. Det er ikke uheld - det er et mønster. Budgetterne var urealistiske fra start."
            },
            {
                cause: "Spare på drift for at dække anlæg",
                detail: "Overskridelser dækkes ved at fjerne sengepladser og skære i personale. Patienter betaler prisen for dårlig planlægning."
            },
            {
                cause: "Ingen uafhængig budgetkontrol",
                detail: "Regionerne estimerede selv. Ingen KS1/KS2 som i Norge. Resultatet: 70% overskridelse på Nordsjællands Hospital."
            },
        ],
    },
];

/**
 * Systemic root causes across ALL Danish public IT failures
 * Based on ITU Professor Søren Lauesen's analysis of 5 projects (36 errors identified)
 */
const SYSTEMIC_ROOT_CAUSES = [
    {
        id: "megaproject",
        icon: "",
        title: "Megaprojekt-fælden",
        description: "Store monolitiske systemer der skal løse alt på én gang. Ingen trinvis levering, ingen feedback loops.",
        frequency: "Alle 32 sager",
        color: "#ef4444"
    },
    {
        id: "requirements",
        icon: "",
        title: "Kravspecifikation i blinde",
        description: "Organisationer kender ikke deres egne processer. Krav skrives af konsulenter der ikke forstår domænet.",
        frequency: "Alle 32 sager",
        color: "#f97316"
    },
    {
        id: "procurement",
        icon: "",
        title: "Udbudsregler tvinger vandfald",
        description: "EU-udbudsregler behandler IT som byggeri. Lineær proces med fastlåst scope, men software kræver iteration.",
        frequency: "24 af 32 sager",
        color: "#eab308"
    },
    {
        id: "expertise",
        icon: "",
        title: "Tab af intern IT-ekspertise",
        description: "Privatisering i 1990'erne (Datacentralen, Kommunedata) fjernede al ekspertise fra staten. Nu hyres konsulenter til alt.",
        frequency: "Strukturelt problem",
        color: "#8b5cf6"
    },
    {
        id: "premature",
        icon: "",
        title: "Besparelser før systemet virker",
        description: "Medarbejdere fyres og gamle systemer nedlægges FØR det nye system er testet og i drift. Ingen plan B.",
        frequency: "18 af 32 sager",
        color: "#ec4899"
    },
    {
        id: "vendor",
        icon: "",
        title: "Leverandør-optimisme",
        description: "'Den der vinder er den der lyver.' Leverandører underbudgetterer for at vinde, vel vidende at scope vil vokse.",
        frequency: "24 af 32 sager",
        color: "#06b6d4"
    },
    {
        id: "testing",
        icon: "",
        title: "Ingen tidlig brugertest",
        description: "Systemer bygges i årevis uden at rigtige brugere tester dem. Problemer opdages først ved go-live.",
        frequency: "Alle 32 sager",
        color: "#22c55e"
    },
    {
        id: "transparency",
        icon: "",
        title: "Manglende gennemsigtighed",
        description: "Dokumenter holdes fortrolige. Fejl skjules. Ingen offentlig ansvarlighed eller læring.",
        frequency: "18 af 32 sager",
        color: "#94a3b8"
    },
];

/**
 * How modern approaches (AI, agile, open source) could address each root cause.
 * Each solution maps to one or more root causes above.
 */
const MODERN_SOLUTIONS = [
    {
        id: "ai-requirements",
        icon: "",
        title: "AI-drevet kravanalyse",
        rootCauses: ["requirements", "megaproject"],
        description: "AI kan analysere eksisterende arbejdsgange, dokumentation og brugeradfærd for automatisk at kortlægge processer. Det er præcis det POLSAG manglede fuldstændigt.",
        savings: "Reducer kravspecifikation fra 2 år til 2-3 måneder",
        howItWorks: [
            "Natural Language Processing analyserer tusindvis af eksisterende dokumenter, mails og sagsgange for at kortlægge reelle processer.",
            "AI-agenter kan simulere brugere og finde edge cases før en eneste linje kode er skrevet.",
            "Process mining identificerer automatisk flaskehalse og undtagelser i eksisterende systemer.",
            "Kravdokumentation genereres automatisk fra analyse, ikke fra konsulenter der gætter.",
        ],
        orbixAngle: "Orbix Core bruger AI til at forstå komplekse systemer og generere præcis kravspecifikation baseret på data, ikke gætværk."
    },
    {
        id: "incremental",
        icon: "",
        title: "Trinvis levering med AI-feedback",
        rootCauses: ["megaproject", "testing", "premature"],
        description: "I stedet for megaprojekter: lever små moduler hver 2-4 uge. AI overvåger kvalitet, brugeroplevelse og fejl i realtid.",
        savings: "Opdager fejl 10-100x hurtigere end vandfaldsmodellen",
        howItWorks: [
            "Modulær arkitektur: byg systemet i uafhængige dele der kan udrulles og testes separat.",
            "Continuous deployment: nye versioner leveres løbende, ikke efter 5 år.",
            "AI-drevet monitoring: overvåger automatisk patientsikkerhed, brugerklager og systemfejl i realtid.",
            "Automatisk rollback: hvis AI opdager kritiske problemer, ruller systemet automatisk tilbage.",
        ],
        orbixAngle: "Orbix Core bygger software i korte sprints med løbende AI-kvalitetskontrol. Problemer fanges i dage, ikke år."
    },
    {
        id: "ai-testing",
        icon: "",
        title: "AI-drevet test & kvalitetssikring",
        rootCauses: ["testing", "vendor"],
        description: "AI kan generere og køre tusindvis af tests automatisk. Det er det der manglede i EFI, POLSAG og Sundhedsplatformen.",
        savings: "80-90% reduktion i uopdagede fejl ved go-live",
        howItWorks: [
            "AI genererer automatisk testcases baseret på kravspecifikation og brugerhistorier.",
            "Simulerede brugerflows tester systemet med realistiske data, 24/7, ikke kun i en uge på Bornholm.",
            "Regressionstesting: AI sikrer at nye funktioner ikke ødelægger eksisterende.",
            "Performance-test: AI simulerer belastning fra 40.000 brugere (som Sundhedsplatformen) før go-live.",
        ],
        orbixAngle: "Orbix Core integrerer AI-testing i hele udviklingsprocessen, ikke bare som en eftertanke ved go-live."
    },
    {
        id: "ai-procurement",
        icon: "",
        title: "Data-drevet budgettering & risikostyring",
        rootCauses: ["procurement", "vendor"],
        description: "AI kan analysere historiske projektdata for at give realistiske budgetter og tidlige advarsler. Det er modgiften til leverandør-optimisme.",
        savings: "Reducer budgetoverskridelser fra 108% til under 20%",
        howItWorks: [
            "Machine learning på 1000+ offentlige IT-projekter giver realistiske estimater baseret på projektets karakteristika.",
            "Automatisk risikovurdering: AI identificerer advarselssignaler (scope creep, ressourcemangel, leverandørstabilitet).",
            "Real-time budget tracking: AI sammenligner løbende faktisk forbrug med plan og advarer tidligt.",
            "Benchmarking: Hvad kostede lignende projekter i Norge (8% overskridelse) vs. Danmark (108%)?",
        ],
        orbixAngle: "Orbix Core bruger data-drevet estimering og løbende AI-overvågning for at holde projekter på sporet."
    },
    {
        id: "inhouse",
        icon: "",
        title: "AI som intern ekspertise-forstærker",
        rootCauses: ["expertise"],
        description: "AI kan kompensere for den tabte interne IT-ekspertise og reducere afhængigheden af dyre konsulenter.",
        savings: "Reducer konsulentforbrug med 40-60% (5-9 mia. kr./år)",
        howItWorks: [
            "AI-assistenter hjælper offentlige ansatte med tekniske opgaver der i dag kræver konsulenter.",
            "Code review og arkitekturvurdering kan ske med AI i stedet for McKinsey til 15.000 kr./dag.",
            "Vidensbevarelse: AI fanger og strukturerer institutionel viden der ellers forsvinder med personaleudskiftning.",
            "Onboarding: Nye medarbejdere trænes med AI der kender systemet indgående.",
        ],
        orbixAngle: "Orbix Core bygger AI-løsninger der giver offentlige institutioner ekspertviden uden konsulentafhængighed."
    },
    {
        id: "transparency-ai",
        icon: "",
        title: "Fuld gennemsigtighed med AI-dashboards",
        rootCauses: ["transparency"],
        description: "Realtids-dashboards drevet af AI der giver borgere og politikere indsigt i alle offentlige IT-projekters status.",
        savings: "Tidlig indgriben kan spare 50-70% af tabte midler",
        howItWorks: [
            "Automatisk statusrapportering: AI aggregerer data fra alle projekter og genererer forståelige rapporter.",
            "Offentligt tilgængeligt dashboard: Enhver borger kan se status, budget og risici for alle offentlige IT-projekter.",
            "Anomali-detektion: AI flager automatisk projekter der afviger fra planen.",
            "Ansvarlighedsmekanisme: Transparens gør det umuligt at skjule problemer i årevis.",
        ],
        orbixAngle: "Orbix Core tror på fuld gennemsigtighed. Det er hele fundamentet bag Skattefilerne."
    },
];

/**
 * Norway vs Denmark: Why Norway's public IT projects cost 8% over budget while Denmark's cost 108% over.
 * Sources:
 * - Aarhus Universitet / Bent Flyvbjerg: Cross-country IT project overrun study
 * - NTNU Concept Research Programme (Trondheim): Quality Assurance of large public projects
 * - Digitaliseringsdirektoratet (Norway): Medfinansieringsordningen
 * - Rigsrevisionen (Denmark) & Riksrevisjonen (Norway): Audit comparisons
 * - Version2: "Norge har 8% overskridelse - Danmark har 108%"
 */
const NORWAY_COMPARISON = {
    headline: {
        dk: { label: "Danmark", overrunPct: 108, color: "#c8102e", maxOverrun: "414%" },
        no: { label: "Norge", overrunPct: 8, color: "#00843d", maxOverrun: "84%" },
        multiplier: "13,5x",
        source: "Per Svejvig (Aarhus Universitet), Morten Welde (NTNU Concept), Jan Pries-Heje (RUC) - 'Cost Performance in Major Public IT Projects: A Cross-Country Comparison', IRNOP Conference 2024",
        sampleSize: "9 danske og 7 norske store offentlige IT-projekter",
        broaderData: "NTNUs Concept-program har analyseret 111 store norske statsprojekter: gennemsnitligt 5% UNDER budget. 3 ud af 4 projekter har underforbrugt.",
    },

    keyDifferences: [
        {
            area: "Kvalitetssikring før projektstart (KS1 & KS2)",
            norway: "Obligatorisk ekstern kvalitetssikring siden 2000. KS1: uafhængig vurdering af konceptvalg FØR projektstart. KS2: kvalitetssikring af budget og styringsgrundlag FØR Stortinget bevilger penge. IT-projekter har lavere grænse: kun 300 mio. NOK (~270 mio. kr.) vs. 1 mia. NOK for andre projekter. Konsulenterne rapporterer til Finansdepartementet, IKKE til det ministerium der kører projektet.",
            denmark: "Ingen obligatorisk ekstern kvalitetssikring. Statens IT-råd (oprettet 2011) er kun rådgivende - har ingen vetoret. Ministerier kan ignorere advarsler. IT-rådet vurderede 48 projekter i 2024: 25% fik rødt lys, men projekterne fortsatte ufortrødent.",
            icon: "",
        },
        {
            area: "Reference Class Forecasting",
            norway: "Obligatorisk siden 2005. Baseret på Nobelpristager Daniel Kahnemans forskning, operationaliseret af Bent Flyvbjerg. Budgetter baseres på hvad LIGNENDE projekter faktisk kostede - ikke hvad leverandøren lover. Resultat for vejprojekter: overskridelse faldt fra 38% til 5% efter indførelse.",
            denmark: "Danmark bruger leverandørens eget estimat. Leverandører underbudgetterer systematisk for at vinde udbud. Ejendomsvurdering: fra 200 mio. til 5+ mia. (2.500% over). EFI: fra 500 mio. til 1+ mia. Ingen systematisk korrektion for optimismebias.",
            icon: "",
        },
        {
            area: "Intern IT-ekspertise",
            norway: "Norge beholdt stærk intern IT-kapacitet. Digitaliseringsdirektoratet (Digdir) har 400+ specialister og vurderer ALLE ministeriernes IT-budgetforslag for Finansdepartementet. Norge er nr. 4 i OECDs Digital Government Index 2023.",
            denmark: "Danmark privatiserede Datacentralen (1996) og Kommunedata. Al IT-ekspertise forsvandt fra staten. Nu 100% afhængig af eksterne konsulenter til selv at specificere krav. Rigsrevisionen (2020): 44 statens IT-projekter realiserede MINDRE END HALVDELEN af lovede gevinster.",
            icon: "",
        },
        {
            area: "Medfinansiering & trinvis godkendelse",
            norway: "Medfinansieringsordningen: Projekter får kun delvis statslig finansiering. Resten skal tjenes ind via dokumenterede gevinster. KS1 tvinger evaluering af ALTERNATIVE koncepter før man fortsætter. Stop/go-beslutninger ved hver fase.",
            denmark: "Fuld bevilling vedtages med Finansloven. Ingen trinvis godkendelse. Ingen krav om at evaluere alternativer. Når pengene er bevilget, fortsætter projektet uanset problemer. EFI kørte i 10 år trods advarsler. Signalprogrammet: 12+ år forsinket, ingen har stoppet det.",
            icon: "",
        },
        {
            area: "Åbenhed og transparens",
            norway: "Alle KS1/KS2-rapporter er offentligt tilgængelige. NTNU Concept-programmet publicerer løbende forskning finansieret af Finansdepartementet. Pressen og forskere har adgang til alle projektdata.",
            denmark: "Rapporter holdes fortrolige. Transportministeriet undertrykte Gartner-rapport om Rejsekort i 2 år. Justitsministeriet hemmeligholdt POLSAG-dokumenter. UFST nægter at udlevere Boligskat-budgetdata. DSB forsøgte at ændre Rigsrevisionens kritiske ordlyd.",
            icon: "",
        },
        {
            area: "Konsekvenser ved fejl",
            norway: "Ansvarlige ledere kan fjernes. Riksrevisjonen har stærkere sanktionsmuligheder. Projekter kan stoppes midtvejs - Helseplattformen (Epic) blev SAT PÅ PAUSE da der opstod problemer, i stedet for at køre videre.",
            denmark: "Ingen er nogensinde fyret for en IT-skandale. DSB brød kontrakten 7/8 år: 0 kr. i straf. KMD blev sagsøgt for EFI - og vandt ny kontrakt med SKAT samtidig. CSC leverede 4 skandaler i træk og drifter stadig Statens Lønsystem.",
            icon: "",
        },
        {
            area: "Projektstørrelse og modularitet",
            norway: "Norge foretrækker mindre, modulære projekter. Altinn blev bygget trinvist fra 2003 til i dag (nu version 3.0, open source). Store behov opdeles i håndterbare dele med separate udbud.",
            denmark: "Danmark elsker megaprojekter: EFI (600 regler × 500 gældstyper på én gang), Signalprogrammet (ALLE signaler i hele landet), Ejendomsvurdering (alle boliger i ét system). Alt-eller-intet tænkning.",
            icon: "",
        },
        {
            area: "Leverandøransvar",
            norway: "Kontrakter med klare milestone-betalinger. Leverandører betales KUN ved dokumenteret levering. Bøder og exit-klausuler er standard. Uafhængige konsortier kontrollerer leverancen.",
            denmark: "Rigsrevisionen fandt at POLSAG-betalinger IKKE var knyttet til leverancer. CSC fik betaling uanset resultat. DSB IC4-kontrakten manglede bodsklausuler. Netcompany får 734 mio./år trods GDPR-bøder og sikkerhedshuller.",
            icon: "",
        },
    ],

    norwegianSuccesses: [
        {
            name: "Altinn (digital borgerplatform)",
            description: "Lanceret 2003 som skatteportal. Vokset til 200+ mio. digitale formularer og beskeder. Nu genopbygget som open source Altinn 3.0. 'Næppe noget andet land kan vise tilsvarende udbredelse af elektroniske tjenester.' Modulært bygget, trinvist udrullet over 20 år.",
            result: "I drift siden 2003. Løbende moderniseret. Open source. Ingen megaskandale. Ingen milliardoverskridelse.",
        },
        {
            name: "Helseplattformen (Midt-Norge)",
            description: "Norges pendant til Sundhedsplatformen - også Epic-baseret. Problemer ved lancering i 2022. Men norske myndigheder STOPPEDE udrulningen og krævede rettelser FØR videre implementering.",
            result: "I Danmark kørte man videre med Sundhedsplatformen trods advarsler og tvang 40.000 sundhedsansatte over. I Norge sagde man stop. DÉT er forskellen.",
        },
        {
            name: "ID-porten (digital identitet)",
            description: "Lanceret 2006. Standardiseret gateway der muliggør tværsektoriel digital integration 'i en grad der er næsten uden fortilfælde'. Bygget med flere leverandører og åbne standarder.",
            result: "Fungerer stabilt. Ingen GDPR-bøder. Ingen sikkerhedsskandaler. Ingen monopol. I Danmark kontrollerer Netcompany MitID, Digital Post og borger.dk alene.",
        },
    ],

    structuralComparison: [
        { feature: "Ekstern kvalitetssikring", norway: "KS1/KS2 siden 2000 (obligatorisk, uafhængig)", denmark: "Statens IT-råd siden 2011 (rådgivende, ingen vetoret)" },
        { feature: "IT-projekt grænse for kontrol", norway: "300 mio. NOK (~270 mio. kr.)", denmark: "10 mio. kr. for business case (men ingen uafhængig review)" },
        { feature: "Budgetmetode", norway: "Stokastisk estimering + usikkerhedsanalyse + reference class forecasting", denmark: "Standard business case baseret på leverandørens estimat" },
        { feature: "Forskningsprogram", norway: "NTNU Concept (finansieret af Finansdep.)", denmark: "Intet tilsvarende systematisk program" },
        { feature: "Centralt IT-kompetencecenter", norway: "Digdir vurderer ALLE IT-budgetforslag", denmark: "Digitaliseringsstyrelsen koordinerer (begrænset magt)" },
        { feature: "OECD Digital Government Index", norway: "Nr. 4 (2023)", denmark: "Nr. 1 (2023) - men med verdens dyreste overskridelser" },
    ],

    rigsrevisionenFindings: [
        { year: "2020", finding: "44 statens IT-projekter realiserede MINDRE END HALVDELEN af lovede gevinster. Statsrevisorerne: 'meget utilfredsstillende'." },
        { year: "2022", finding: "Hverken Statens IT eller 4 andre myndigheder overholdt alle 20 tekniske minimumskrav til IT-sikkerhed." },
        { year: "2023", finding: "7 af 12 samfundskritiske IT-systemer manglede tilfredsstillende beredskab. 537 servere med udløbet levetid." },
        { year: "2024", finding: "48 igangværende IT-projekter for 15,8 mia. kr. 25% fik rødt lys. IT-rådet: 'der er for mange store IT-projekter i gang'." },
    ],

    flyvbjergQuotes: [
        {
            quote: "Over budget, over time, under delivering, over and over again.",
            source: "Bent Flyvbjerg, 'How Big Things Get Done' (2023)",
            context: "Dansk-født professor (Aalborg → Oxford → ITU København) der har studeret 16.000+ megaprojekter i 136 lande. Hans 'Iron Law of Megaprojects': 91,5% sprænger budget, tidsplan eller begge."
        },
        {
            quote: "The cost overruns are not random. They are systematically biased by strategic misrepresentation - that is, lying.",
            source: "Bent Flyvbjerg, 'Survival of the Unfittest' (2009)",
            context: "Leverandører underbudgetterer bevidst for at vinde kontrakter. Politikere godkender fordi de VIL tro på det lave tal. Begge parter har incitament til at lyve."
        },
        {
            quote: "18% af IT-projekter har budgetoverskridelser over 50%. For disse projekter er den gennemsnitlige overskridelse 447%.",
            source: "Flyvbjerg, Budzier, Lee, Keil, Lunn & Bester (2022) - analyse af 5.392 IT-projekter til $56,5 mia.",
            context: "IT-overskridelser følger en power law-fordeling: ekstreme sprængninger er langt hyppigere end standardmodeller forudsiger. Danmark har flere af disse 'fat tail'-projekter end noget andet nordisk land."
        },
        {
            quote: "Reference class forecasting er det eneste dokumenterede middel mod optimismebias og strategisk fejlbudgettering.",
            source: "Bent Flyvbjerg / Daniel Kahneman (Nobelpris 2002)",
            context: "Norge indførte det obligatorisk i 2005. Norske vejprojekter gik fra 38% til 5% overskridelse. Danmark har stadig ikke gjort det obligatorisk i 2025."
        },
    ],

    bottomLine: {
        title: "Hvad ville det betyde for Danmark?",
        text: "Hvis Danmark havde Norges budgetoverskridelse på 8% i stedet for 108%, ville vi have sparet mindst 60-70 mia. kr. over de seneste 20 år - alene på de 32 dokumenterede sager. Det svarer til 3 nye superhospitaler, 7.000 ekstra sygeplejersker i 10 år, eller fuld modernisering af hele skatteministeriets IT.",
        savingsEstimate: "60-70 mia. kr.",
        equivalents: [
            { label: "3 nye superhospitaler", icon: "" },
            { label: "7.000 sygeplejersker i 10 år", icon: "" },
            { label: "Fuld modernisering af skatteministeriets 230 IT-systemer", icon: "" },
            { label: "Gratis tandlæge for alle danskere i 6 år", icon: "" },
        ],
    },
};

/**
 * Summary statistics for the "what could have been saved" calculation
 */
const IT_WASTE_SUMMARY = {
    totalWastedBn: 120,          // Conservative estimate: 120+ mia. kr. wasted on failed IT, infrastructure and transport over 30 years (32 documented cases, incl. IC4 16.7 mia., Femern 12+ mia. overrun, Superhospitaler 8+ mia. overrun)
    annualConsultantBn: 13.5,    // 12-15 mia. kr./year on consultants
    avgOverrunPct: 108,          // Danish average
    norwayOverrunPct: 8,         // Norway comparison
    projectsMonitored: 49,       // By Statens IT-råd (H2 2024: 28 grøn, 8 gul, 12 rød + yderligere)
    projectsFlagged: 20,         // Yellow + Red warnings (H2 2024)
    projectsRedLight: 12,        // Critical red status (H2 2024)
    totalStateBudgetBn: 15.8,    // Total state IT project spending 2024 (up from 4.7 mia. in 2018)
    potentialSavingsAI: {
        requirementsPhase: 0.40, // 40% savings via AI requirements analysis
        developmentPhase: 0.30,  // 30% savings via incremental + AI testing
        consultantReduction: 0.50, // 50% reduction in consultant dependency
        overrunReduction: 0.70,  // Reduce overruns by 70% (from 108% to ~30%)
    }
};

/**
 * Consultant spending data - who gets the money?
 * Sources:
 * - Version2/DigiTech: "Netcompany dominerer statens it-konsulentforbrug: Se top 10 her" (2024)
 * - OPS Indsigt: "Et selskab står for 18 pct. af statens udgifter til it-konsulenter" (2024)
 * - Altinget: "Staten favoriserer udenlandske konsulentgiganter" (2019)
 * - DR: "Politikere undrer sig: Hvorfor har vi betalt 2 milliarder for it-system?" (2018)
 * - Version2: "Epic og NNIT vinder milliardstor ordre på sundhedsplatform" (2013)
 */
const CONSULTANT_DATA = {
    totalAnnualSpendBn: 4.1,  // 2023 total
    totalAnnualSpendYear: "2023",
    growthPct: 14,  // Year-over-year growth
    govTargetReductionBn: 3,  // Government's 2019 target to reduce by 3 mia

    topSuppliers: [
        {
            rank: 1,
            name: "Netcompany",
            annualStateBn: 0.734,
            annualStateLabel: "734 mio. kr.",
            pctOfTotal: 18,
            note: "Dobbelt så meget som nr. 2. Leverer bl.a. MitID, NemLog-in, borger.dk-infrastruktur.",
            controversy: "Dominerer markedet markant. Kritiseret for vendor lock-in."
        },
        {
            rank: 2,
            name: "KMD (NEC)",
            annualStateBn: 0.38,
            annualStateLabel: "~380 mio. kr.",
            pctOfTotal: 9,
            note: "Tidligere Kommunedata. Japansk-ejet (NEC) siden 2019. Drifter kernesystemer for kommuner.",
            controversy: "Arv fra monopoltiden. Kommuner har svært ved at skifte væk."
        },
        {
            rank: 3,
            name: "Visma Consulting",
            annualStateBn: 0.284,
            annualStateLabel: "284 mio. kr.",
            pctOfTotal: 7,
            note: "Norsk-ejet. Vokser hurtigt på det danske marked.",
            controversy: ""
        },
        {
            rank: 4,
            name: "Deloitte",
            annualStateBn: 0.25,
            annualStateLabel: "~250 mio. kr.",
            pctOfTotal: 6,
            note: "Både IT-konsulenter og managementrådgivning. Dobbeltrolle som revisor og konsulent.",
            controversy: "Var revisor for SKAT under EFI-skandalen, samtidig med konsulentopgaver."
        },
        {
            rank: 5,
            name: "Atea",
            annualStateBn: 0.2,
            annualStateLabel: "~200 mio. kr.",
            pctOfTotal: 5,
            note: "Nordisk IT-infrastruktur og konsulentvirksomhed.",
            controversy: ""
        },
        {
            rank: 6,
            name: "CSC/DXC Technology",
            annualStateBn: 0.15,
            annualStateLabel: "~150 mio. kr.",
            pctOfTotal: 4,
            note: "Leverede POLSAG til politiet. Amerikansk virksomhed.",
            controversy: "POLSAG-skandalen: 500 mio. kr. tabt. CSC fik betaling trods at systemet aldrig virkede."
        },
    ],

    scandalInvolvement: [
        {
            scandal: "EFI (SKATs inddrivelse)",
            totalCost: "1+ mia. kr.",
            consultants: "KMD (udvikling), Accenture (rådgivning), McKinsey (strategi), Deloitte (revision)",
            whoDecided: "Skatteminister Kristian Jensen (V) igangsatte. Holger K. Nielsen (SF) fortsatte.",
            whatHappened: "KMD og Accenture leverede et system med fundamentale designfejl. McKinsey rådgav om organisationsændringer der fjernede 2.500 medarbejdere FØR systemet virkede. Deloitte var SKATs revisor men fangede ikke problemerne."
        },
        {
            scandal: "POLSAG (Politiets system)",
            totalCost: "500 mio. kr.",
            consultants: "CSC (nu DXC Technology)",
            whoDecided: "Rigspolitiet. Justitsminister Brian Mikkelsen (K) var ansvarlig.",
            whatHappened: "CSC vandt kontrakten på 153 mio. kr. men leverede et system der ikke fungerede. Prisen tredobledes. Justitsministeriet holdt dokumenter hemmelige. CSC beholdt betalingen."
        },
        {
            scandal: "Sundhedsplatformen",
            totalCost: "3,8+ mia. kr.",
            consultants: "Epic Systems (USA), NNIT (implementering)",
            whoDecided: "Region Hovedstaden v/ regionsrådsformand Sophie Hæstorp Andersen (S). IT-direktør Jan Kold skiftede fra regionen til NNIT.",
            whatHappened: "Epic/NNIT vandt trods at de var DYRESTE tilbud (200 mio. kr. over konkurrenten Cerner). Cerners protest om 'aftalt spil' blev lukket med forlig. Jan Kold, regionens tidligere IT-direktør, var nu hos NNIT. Prisen eksploderede fra 2,8 til 3,8+ mia."
        },
        {
            scandal: "Amanda (Arbejdsmarkedsstyrelsen)",
            totalCost: "1 mia. kr.",
            consultants: "Skiftende leverandører (bl.a. Accenture, IBM)",
            whoDecided: "Arbejdsmarkedsstyrelsen under Beskæftigelsesministeriet.",
            whatHappened: "5 års forsinkelser. Gentagne leverandørskift førte til videnstab. Ca. 1 mia. kr. tabt uden brugbart system."
        },
    ],

    managementConsultants: {
        totalMarketBn: 2.5,  // Annual public sector management consulting spend
        topFirms: [
            { name: "McKinsey", role: "Strategirådgivning", hourlyRate: "7.000-15.000 kr./time", controversy: "Rådgav om SKATs reorganisering under EFI. Presset ud af top 10 i 2017." },
            { name: "Boston Consulting Group (BCG)", role: "Strategirådgivning", hourlyRate: "7.000-15.000 kr./time", controversy: "Overtog McKinseys position som statens foretrukne strategikonsulent." },
            { name: "Deloitte", role: "Revision + konsulentydelser", hourlyRate: "3.000-8.000 kr./time", controversy: "Dobbeltrolle som revisor og konsulent skaber interessekonflikter." },
            { name: "PwC", role: "Revision + konsulentydelser", hourlyRate: "3.000-8.000 kr./time", controversy: "" },
            { name: "EY (Ernst & Young)", role: "Revision + konsulentydelser", hourlyRate: "3.000-8.000 kr./time", controversy: "" },
        ],
        civilServantHourlyRate: "350-550 kr./time",
        consultantMultiplier: "8-25x dyrere end en fastansat",
    },

    concentrationNote: "7 leverandører står for over halvdelen af statens konsulentforbrug på 4,1 mia. kr. Regeringen lovede i 2019 at reducere konsulentforbruget med 3 mia. kr. inden 2025. I stedet steg det med 14% på ét år.",

    vendorLockIn: {
        criticalSystems: 85,        // Samfundskritiske IT-systemer identificeret af Statens IT-råd
        cannotBeTendered: 11,       // Systemer der ikke kan sendes i udbud - total vendor lock-in
        legacyNote: "DXC (tidl. CSC) og KMD sidder stadig på størstedelen af legacy-systemer: Statens Lønsystem, Rigspolitiets 21 legacy-systemer og CPR-systemet.",
    },

    serialOffenders: {
        cscDxc: {
            name: "CSC/DXC Technology",
            origin: "Opstået fra Datacentralen (offentligt, 1959-1996), privatiseret. Fusioneret med HP Enterprise til DXC i 2017.",
            scandals: [
                "Amanda: 650 mio. - 1 mia. kr., skrottet",
                "POLSAG: 400-500 mio. kr., skrottet",
                "EFI (Debitormotor): del af 1+ mia. kr. fiasko",
                "Digital Tinglysning: 1,5 år forsinket, 266 mio. kr. overskridelse",
                "Rigspolitiet hack (2012): 'Danmarks værste cyberangreb' - millioner af følsomme data lækket pga. utilstrækkelig sikkerhed",
                "SKAT TastSelv datalæk: 140 borgeres skattedata eksponeret",
                "900.000 CPR-numre lækket: CSC ansvarlig for fejlbehæftet datafil",
            ],
            stillOperates: "Drifter stadig: Statens Lønsystem, Rigspolitiets 21 legacy-systemer, CPR-systemet.",
        },
        kmd: {
            name: "KMD (NEC Corporation)",
            origin: "Tidligere Kommunedata (1972), ejet af KL (kommunerne) til 2009, nu japansk-ejet (NEC).",
            totalPublicRevenue: "1,77 mia. kr. (2022) - største enkeltstående offentlige IT-leverandør",
            monopolBreak: "KOMBIT brød KMDs monopol og opnåede 25% prisreduktion = ~1,6 mia. kr. årlig besparelse for kommunerne.",
            penalties: "KMD betalte 100 mio. kr. i bøder for forsinkede leverancer til kommuner (KOMBIT-systemer, over 1 år forsinket).",
        },
        netcompany: {
            name: "Netcompany",
            gdprFine: "Indstillet til rekordbot på 15 mio. kr. (GDPR) for sikkerhedssvigt i Digital Post (mit.dk).",
            monopolWarning: "Professor Jan Pries Heje kalder det 'et nyt monopol'. Dobbelt så stor som nr. 2.",
        },
    },
};

/**
 * Netcompany Deep-Dive: Why one company controls Denmark's digital infrastructure
 * Sources: Version2, Ingeniøren, DR, Datatilsynet, Prosabladet, Information, Kristeligt Dagblad
 */
const NETCOMPANY_DEEP_DIVE = {
    overview: {
        revenue2025: "7,9 mia. kr.",
        revenueGrowth: "20,7%",
        earningsDown: "Resultat faldet 45,4% pga. SDC-integration",
        publicSectorGrowthQ1_2025: "13,5%",
        stateProjectShare: "~33% af statens IT-projekter (34 af 104)",
        stateSystemShare: "~15% af statens IT-systemer (111 af 723)",
        danmarkShareOfRevenue: "Over 50%",
        employees: "8.929 (inkl. SDC)",
        founded: "2000 af André Rogaczewski og Claus Jørgensen",
        sdcAcquisition: "Opkøbte SDC for 1 mia. kr. (2025). Opsagde overenskomst dag 1. Strejke truede 2 mio. bankkunder. Ny aftale jan. 2026 efter 5 måneders pres.",
        sharesBuyback2026: "Aktietilbagekøb op til 750 mio. kr. (feb. 2026). Hævede marginforventninger marts 2026.",
    },

    timeline2025_2026: [
        { date: "Feb 2025", event: "Netcompany annoncerer opkøb af SDC (bankernes IT-leverandør) for 1 mia. kr." },
        { date: "Jan 2025", event: "35-årig dømt for datatyveri — brugte Netcompany-password fundet på statslig server til at tilgå 20 produktionssystemer." },
        { date: "Jul 2025", event: "SDC-opkøb lukkes. Overenskomst opsagt dag 1. 630 medarbejdere ramt." },
        { date: "Jul 2025", event: "Datatilsynet: 'alvorlig kritik' af Digital Post-migrationen. Borgere kunne læse andres post." },
        { date: "Okt 2025", event: "Pol-Disp forsinket igen. Pris steget fra 200 til 388 mio. kr. København først 2027." },
        { date: "Nov 2025", event: "Stort MitID-nedbrud rammer borger.dk og offentlige tjenester." },
        { date: "Jan 2026", event: "Ny overenskomst med Finansforbundet efter 5 måneders forhandling. Strejke afværget." },
        { date: "Feb 2026", event: "Aktietilbagekøbsprogram op til 750 mio. kr. lanceret." },
        { date: "Mar 2026", event: "To MitID-nedbrud på 3 uger. Apoteker lammet i 4,5 timer. 'Intern systemfejl.'" },
        { date: "Mar 2026", event: "Netcompany hæver marginforventninger for 2026 — mens nedbrud fortsætter." },
    ],

    whyTheyKeepWinning: [
        {
            reason: "Størrelse som selvforstærkende fordel",
            detail: "Netcompany er dobbelt så stor som nr. 2 på statens IT-marked. Udbud kræver dokumenteret erfaring med lignende projekter, og Netcompany har flest referencer."
        },
        {
            reason: "Bredde skaber afhængighed",
            detail: "Netcompany leverer MitID, Digital Post (mit.dk), borger.dk, NemLog-in, NemKonto, Aula, PSRM og mange flere. Hvert nyt system gør det sværere at skifte."
        },
        {
            reason: "Udbudsregler favoriserer de store",
            detail: "Kriterier der vægter global omsætning og referenceprojekter udelukker effektivt mindre, specialiserede firmaer."
        },
        {
            reason: "Revolving door",
            detail: "Medarbejdere skifter mellem ministerier og Netcompany. Kendskab til interne processer giver fordel i udbud."
        },
    ],

    documentedFailures: [
        { project: "MitID/mit.dk", issue: "GDPR-bot 15 mio. kr. Borgere kunne logge ind på andres konti. 18.000 brugernavne lækket. Fortsat nedbrud i 2026 — 2 nedbrud på 3 uger i marts 2026, apoteker lammet." },
        { project: "Aula", issue: "Pris 'løber løbsk'. Børns data eksponeret. KOMBIT overvejer leverandørskift men er låst." },
        { project: "PSRM (gældsinddrivelse)", issue: "Teknologien allerede forældet. Leverandøren stoppet sikkerhedsopdateringer." },
        { project: "Smittestop-appen", issue: "35+ mio. kr. for app der ikke virkede. Lukket kildekode." },
        { project: "Våbenregistret (PAC)", issue: "System 'praktisk talt kollapset'. 17.000+ jægere uden våbentilladelser." },
        { project: "Rejsekort-app", issue: "Pauset pga. fejl. Anonymiserede ikke lokationsdata. Kontrakt annulleret af Klagenævnet." },
        { project: "Pol-Disp (politi-dispatchsystem)", issue: "Budget: 200 mio. → 388 mio. kr. (+94%). 3+ år forsinket. Rigspolitiet peger på Netcompany. København først klar 2027." },
        { project: "ESAS (studieadministration)", issue: "Budget: 171 mio. → 292 mio. kr. (+65%). 3 år forsinket. 21 uddannelsesinstitutioner ramt. 80 mio. kr. i tabte effektiviseringsgevinster." },
        { project: "Digital Post migration (2022-2025)", issue: "Datatilsynet: 'alvorlig kritik' juli 2025. Borgere kunne tilgå andres postkasser. 160 TB data, 1,4 mia. dokumenter migreret med utilstrækkelig test." },
    ],

    securityIncidents: {
        datatyveri2024: {
            title: "Datatyveri 2024: Kildekode og passwords stjålet",
            detail: "Hackergruppen Zyndicate lækkede kildekode, scripts og passwords fra Netcompany. Truede med at frigive data fra Skattestyrelsen. En 34-årig mand (tidligere ansat i Udviklings- og Forenklingsstyrelsen) anholdt og tiltalt. Sad fængslet 193 dage.",
            expertQuote: "Professor Hanne Marie Motzfeldt: 'Myndigheder må genoverveje deres tillid til Netcompany som databehandler.'"
        },
        gdprBot: {
            title: "GDPR-rekordbøde: 15 mio. kr.",
            detail: "Datatilsynet indstillede Netcompany til 15 mio. kr. i bøde for utilstrækkelig sikkerhed i Digital Post (mit.dk). Største GDPR-bøde i dansk historie."
        },
    },

    corporateStructure: {
        jersey: "Netcompanys ejere har historisk brugt selskabskonstruktioner via Jersey (britisk kanaløen). Sjællandske Nyheder: 'De største offentlige IT-leverandører skjuler sig i skattely'. Enhedslisten og Socialdemokratiet stillede spørgsmål til skatteministeren.",
        rogaczewskiQuote: "André Rogaczewski: 'Netcompany bør ikke betragtes som en dansk virksomhed, men som en europæisk virksomhed med danske rødder.'",
        boersnoteret: "Børsnoteret i Danmark siden 2018.",
    },

    workCulture: {
        imageRank: "Sidsteplads (#60 af 60) i Ingeniørens undersøgelse af danske IT-virksomheders image (2025). Faldet fra #35 (2023) til #53 (2024) til #60.",
        turnover2023: "19% medarbejderomsætning (2023). Steget til 21,7% i Q3 2024. ~400 medarbejdere forlader om året.",
        idaSager: "IDA (Ingeniørforeningen) har behandlet over 100 opsigelsessager fra Netcompany de seneste år.",
        prosaWarning: "PROSAs næstformand Curt Kjærsgaard Raavig: 'Tænk dig om før du takker ja til job i Netcompany. For mange bliver slidt op. I 20erne!'",
        netcompanyResponse: "André Rogaczewski: 16-20% medarbejderomsætning er 'meget normalt'. Netcompany afviser at stille op til interview om undersøgelsen.",
        sdcOverenskomst: "SDC-opkøbet (2025): Opsagde overenskomst dag 1. 630 medarbejdere miste rettigheder. 100+ 'hush money'-fratrædelser siden 2023. Finansforbundet: 'Dybt problematisk.'",
    },

    systemicRisk: "Netcompany kontrollerer MitID, Digital Post, borger.dk, NemLog-in, NemKonto, Aula og ~33% af statens IT-projekter. Hvis Netcompany fejler, fejler Danmarks digitale infrastruktur. Professor Jan Pries Heje: 'Et nyt monopol.' Præcis det der skete med KMD.",

    dsbComparison: {
        analogy: "Netcompany er IT-verdenens DSB: statsligt monopol, ingen reel konkurrence, kontrakterne brydes uden konsekvenser, og alternativerne er systematisk udelukket.",
    },
};

/**
 * ORBIX CORE — 100% Ownership. Zero Vendor Lock-in.
 * Sources: orbixcore.ai, research analysis of Danish public IT failure patterns
 */
const ORBIX_CORE_DATA = {
    tagline: "100% ejerskab. Nul vendor lock-in. Hver eneste proces. Hvert eneste bit data. Dit.",
    intro: "Den danske stat har tabt over 120 milliarder kroner fordi leverandører ejer koden, processerne og dataen — ikke skatteyderne. Orbix Core vender modellen på hovedet: alt hvad vi bygger, ejer du. Fuldt. Permanent. Uden undtagelser.",

    ownershipPillars: [
        {
            icon: "01",
            title: "100% kode-ejerskab",
            desc: "Hver linje kode vi skriver, ejer du fra dag 1. Ingen proprietære frameworks, ingen licensnøgler, ingen afhængigheder af os. Du kan tage koden og gå — når som helst, uden spørgsmål.",
            contrast: "I dag: Netcompany kontrollerer kildekoden til MitID, Digital Post, borger.dk og NemKonto. Staten kan ikke skifte leverandør uden at starte forfra. Det koster milliarder.",
        },
        {
            icon: "02",
            title: "100% data-ejerskab",
            desc: "Alle data forbliver hos dig. Ingen data forlader din infrastruktur. Ingen tredjeparter har adgang. Du bestemmer hvor dataen ligger, hvem der ser den, og hvornår den slettes.",
            contrast: "I dag: Digital Post-migrationen afslørede at 1,4 mia. dokumenter blev flyttet med utilstrækkelig test. Borgere kunne læse andres post. GDPR-bøde: 15 mio. kr.",
        },
        {
            icon: "03",
            title: "100% proces-ejerskab",
            desc: "Du ejer hele udviklingsprocessen: kravspecifikationer, arkitekturbeslutninger, testresultater, deploymentpipelines, dokumentation. Alt er gennemsigtigt og overdragbart.",
            contrast: "I dag: EFI-projektet kørte i 10 år uden at nogen opdagede at budgettet var eksploderet fra 500 mio. til 1+ mia. kr. Processen var en sort boks.",
        },
        {
            icon: "04",
            title: "100% AI-agent-ejerskab",
            desc: "De AI-agenter vi bygger til dig, ejer du. De kører på din infrastruktur, med dine data, under din kontrol. Ingen abonnementer der holder dig som gidsel.",
            contrast: "I dag: Staten bruger 4+ mia. kr./år på IT-konsulenter. Når de går, tager de viden, processer og kontekst med sig. Hver gang starter man forfra.",
        },
        {
            icon: "05",
            title: "100% frihed til at skifte",
            desc: "Alt bygges med åbne standarder og fuld dokumentation. Du kan skifte leverandør, insource, eller videreudvikle selv — uden tab af funktionalitet eller viden.",
            contrast: "I dag: 289 af statens 723 IT-systemer kan IKKE sendes i udbud pga. vendor lock-in. Leverandøren har magten, ikke kunden.",
        },
        {
            icon: "06",
            title: "100% gennemsigtighed",
            desc: "Intet skjult. Ingen ændringsordrer. Ingen overraskelser. Du ser realtidsstatus på forbrug, fremdrift, kvalitet og sikkerhed — som et live dashboard, ikke en kvartalsrapport.",
            contrast: "I dag: Pol-Disp (politiets system) gik fra 200 mio. til 388 mio. kr. Forsinkelser og ekstraregninger blev først synlige efter årevis.",
        },
    ],

    vendorLockInStats: {
        title: "Vendor lock-in i tal — det problem Orbix Core løser",
        stats: [
            { value: "289", label: "statslige IT-systemer der IKKE kan sendes i udbud", note: "Total vendor lock-in" },
            { value: "33%", label: "af statens IT-projekter kontrolleret af ét firma", note: "Netcompany (34 af 104)" },
            { value: "4+ mia.", label: "kr./år på IT-konsulenter", note: "Viden forsvinder med fakturaen" },
            { value: "108%", label: "gennemsnitlig budgetoverskridelse", note: "Norge: 8%. Danmark: 108%." },
        ],
    },

    howItWorks: [
        {
            step: "1",
            title: "Vi bygger — du ejer",
            desc: "Orbix Core udvikler med AI-agenter i kernen. Hurtigere, billigere, med færre fejl. Men forskellen er: alt vi bygger, overdrages til dig med fuld dokumentation og åben kildekode.",
        },
        {
            step: "2",
            title: "Vi træner — du mestrer",
            desc: "Vi gør ikke din organisation afhængig. Vi træner dit team i AI-drevet udvikling, så I selv kan vedligeholde, videreudvikle og skalere — uden os.",
        },
        {
            step: "3",
            title: "Vi går — du beholder alt",
            desc: "Når projektet er færdigt, har du koden, dataen, processerne, AI-agenterne og kompetencen. Internt. Permanent. Ingen løbende licensbetalinger, ingen opsigelsesklausuler.",
        },
    ],

    comparisonTable: {
        headers: ["", "Typisk leverandør", "Orbix Core"],
        rows: [
            ["Kode-ejerskab", "Leverandøren ejer koden", "Kunden ejer 100%"],
            ["Data-placering", "Leverandørens infrastruktur", "Kundens infrastruktur"],
            ["Leverandørskift", "Praktisk umuligt", "Når som helst, fuld overdragelse"],
            ["Dokumentation", "Minimal eller proprietær", "Fuld, åben, AI-genereret"],
            ["AI-agenter", "SaaS-abonnement", "Kører hos kunden, ejerskab fra dag 1"],
            ["Videnoverførsel", "Forsvinder med konsulenten", "Trænet internt team overtager"],
            ["Gennemsigtighed", "Kvartalsrapporter", "Live dashboard, realtid"],
            ["Exit-omkostning", "Millioner (start forfra)", "Nul (alt er portabelt)"],
        ],
    },

    callToAction: {
        headline: "Stop med at leje din egen infrastruktur. Ej den.",
        body: "120+ milliarder kroner er spildt fordi den offentlige sektor lejer systemer de burde eje. Orbix Core bygger software med AI — hurtigere, billigere, gennemsigtigt — og du ejer hver eneste del. Kode. Data. Processer. AI-agenter. Alt.",
        linkText: "Se hvordan på orbixcore.ai",
        linkUrl: "https://orbixcore.ai",
    },
};
