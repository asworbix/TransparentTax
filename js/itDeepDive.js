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
        name: "EFI — Et Fælles Inddrivelsessystem",
        icon: "💀",
        org: "SKAT (nu Gældsstyrelsen)",
        years: "2005–2015",
        budgetOriginal: "ca. 500 mio. kr.",
        budgetFinal: "over 1 mia. kr.",
        outcome: "Skrottet",
        lostValue: "114 mia. kr. i uinddrevet gæld",
        severity: "catastrophic",
        timeline: [
            { year: "2005", event: "Projektet startes. Målet: ét samlet system til at inddrive al offentlig gæld." },
            { year: "2007", event: "Første planlagte go-live. Mistes." },
            { year: "2009", event: "Anden planlagte go-live. Mistes igen. Internt kaldet '7-9-13'." },
            { year: "2010", event: "SKAT skæres fra 10.000 til 7.500 ansatte — med EFI som forudsætning for at det kan fungere." },
            { year: "2013", event: "EFI lanceres endelig — med alvorlige fejl. Det gamle system er allerede nedlagt." },
            { year: "2015", event: "EFI skrottes efter kun 2 års drift. Ingen vej tilbage — det gamle system er væk." },
            { year: "2017", event: "SKAT opløses og erstattes af 7 nye styrelser. 114 mia. kr. i gæld kan ikke inddrives." },
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
                detail: "2.500 medarbejdere blev fyret før EFI fungerede. Det gamle system blev lukket ned. Ingen plan B."
            },
            {
                cause: "Leverandør-optimisme",
                detail: "'Den der vinder er den der lyver' — leverandøren undervurderede systematisk omfanget for at vinde kontrakten."
            },
            {
                cause: "Ingen iterativ udvikling",
                detail: "Udbudsregler tvang en lineær vandfaldsproces. IT blev behandlet som at bygge en motorvej — men krav ændrer sig løbende."
            },
        ],
    },
    {
        id: "polsag",
        name: "POLSAG — Politiets Sagsbehandlingssystem",
        icon: "🚔",
        org: "Rigspolitiet",
        years: "2007–2012",
        budgetOriginal: "153 mio. kr.",
        budgetFinal: "400-500 mio. kr.",
        outcome: "Skrottet",
        lostValue: "Alle investerede midler tabt",
        severity: "critical",
        timeline: [
            { year: "2007", event: "CSC vinder kontrakten. Budget: 153 mio. kr. Skal erstatte det gamle POLSAS." },
            { year: "2008-2010", event: "Gentagne forsinkelser og budgetoverskridelser. Kravspecifikationen viser sig utilstrækkelig." },
            { year: "Dec 2010", event: "Pilottest på Bornholm. Systemet fungerer ikke i praksis." },
            { year: "Feb 2012", event: "Projektet skrottes officielt. Over 500 mio. kr. tabt." },
            { year: "2013", event: "Rigsrevisionen udgiver kritisk rapport. Alle afgørende dokumenter holdes fortrolige." },
        ],
        rootCauses: [
            {
                cause: "Politiet kendte ikke egne processer",
                detail: "Politiet havde ikke kortlagt deres egne opgaver og arbejdsgange. Man byggede et system til processer man ikke forstod."
            },
            {
                cause: "Umulig kravspecifikation",
                detail: "Kravene var ufuldstændige og ændrede sig løbende. Leverandøren byggede efter en spec der ikke matchede virkeligheden."
            },
            {
                cause: "Ingen tidlig brugertest",
                detail: "Først efter år med udvikling blev systemet testet af rigtige brugere (Bornholm). Det var for sent."
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
        icon: "🏥",
        org: "Region Hovedstaden & Region Sjælland",
        years: "2012–nu",
        budgetOriginal: "2,8 mia. kr.",
        budgetFinal: "3,8+ mia. kr.",
        outcome: "I drift — men stærkt kritiseret",
        lostValue: "Produktivitetstab, personaleflugt, patientsikkerhedsrisici",
        severity: "critical",
        timeline: [
            { year: "2012", event: "Region Hovedstaden og Region Sjælland indgår aftale med Epic Systems (USA). 2,8 mia. kr." },
            { year: "2016", event: "Go-live på Herlev og Gentofte Hospital. Alvorlige problemer fra dag 1." },
            { year: "2017", event: "Læger og sygeplejersker protesterer. Patientsikkerhedsproblemer rapporteres. Fejlagtige prøvesvar og recepter." },
            { year: "2018", event: "Udrulning fortsætter trods massiv kritik. 32% af brugere er utilfredse." },
            { year: "2019-nu", event: "Planlagte fyringer af lægesekretærer må droppes. Læger bruger mere tid på IT end på patienter. Budget overskredet med 1+ mia." },
        ],
        rootCauses: [
            {
                cause: "Amerikansk system i dansk kontekst",
                detail: "Epic er designet til det amerikanske sundhedssystem. Den danske patientkontaktmodel er fundamentalt anderledes og mere kompleks."
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
                cause: "Tvungen adoption uden alternativer",
                detail: "40.000 sundhedsprofessionelle blev tvunget over på et system der tog længere tid og øgede fejlrisiko. Ingen mulighed for at gå tilbage."
            },
            {
                cause: "Burnout og personaleflugt",
                detail: "Læger bruger mere tid på at dokumentere end på at behandle. Utilfredsheden øger risikoen for udbrændthed."
            },
        ],
    },
    {
        id: "amanda",
        name: "Amanda — Arbejdsmarkedsstyrelsen",
        icon: "📋",
        org: "Arbejdsmarkedsstyrelsen",
        years: "2002–2008",
        budgetOriginal: "ca. 300 mio. kr.",
        budgetFinal: "ca. 1 mia. kr.",
        outcome: "Skrottet",
        lostValue: "6 års spildt udviklingstid",
        severity: "critical",
        timeline: [
            { year: "2002", event: "Projektet igangsættes. Skal modernisere hele arbejdsmarkedssystemet." },
            { year: "2003-2007", event: "5 års forsinkelse. Gentagne redesigns og leverandørskift." },
            { year: "2008", event: "Skrottet. Ca. 1 mia. kr. tabt." },
        ],
        rootCauses: [
            {
                cause: "For ambitiøst scope",
                detail: "Systemet skulle gøre alt for alle. Ingen prioritering af kernefunktionalitet."
            },
            {
                cause: "Leverandørafhængighed",
                detail: "Skift mellem leverandører førte til videnstab og gentagne omstarter."
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
        icon: "🎯",
        title: "Megaprojekt-fælden",
        description: "Store monolitiske systemer der skal løse alt på én gang. Ingen trinvis levering, ingen feedback loops.",
        frequency: "5 af 5 skandaler",
        color: "#ef4444"
    },
    {
        id: "requirements",
        icon: "📝",
        title: "Kravspecifikation i blinde",
        description: "Organisationer kender ikke deres egne processer. Krav skrives af konsulenter der ikke forstår domænet.",
        frequency: "5 af 5 skandaler",
        color: "#f97316"
    },
    {
        id: "procurement",
        icon: "⚖️",
        title: "Udbudsregler tvinger vandfald",
        description: "EU-udbudsregler behandler IT som byggeri. Lineær proces med fastlåst scope — men software kræver iteration.",
        frequency: "4 af 5 skandaler",
        color: "#eab308"
    },
    {
        id: "expertise",
        icon: "🧠",
        title: "Tab af intern IT-ekspertise",
        description: "Privatisering i 1990'erne (Datacentralen, Kommunedata) fjernede al ekspertise fra staten. Nu hyres konsulenter til alt.",
        frequency: "Strukturelt problem",
        color: "#8b5cf6"
    },
    {
        id: "premature",
        icon: "✂️",
        title: "Besparelser før systemet virker",
        description: "Medarbejdere fyres og gamle systemer nedlægges FØR det nye system er testet og i drift. Ingen plan B.",
        frequency: "3 af 5 skandaler",
        color: "#ec4899"
    },
    {
        id: "vendor",
        icon: "🤥",
        title: "Leverandør-optimisme",
        description: "'Den der vinder er den der lyver.' Leverandører underbudgetterer for at vinde, vel vidende at scope vil vokse.",
        frequency: "4 af 5 skandaler",
        color: "#06b6d4"
    },
    {
        id: "testing",
        icon: "🧪",
        title: "Ingen tidlig brugertest",
        description: "Systemer bygges i årevis uden at rigtige brugere tester dem. Problemer opdages først ved go-live.",
        frequency: "5 af 5 skandaler",
        color: "#22c55e"
    },
    {
        id: "transparency",
        icon: "🔒",
        title: "Manglende gennemsigtighed",
        description: "Dokumenter holdes fortrolige. Fejl skjules. Ingen offentlig ansvarlighed eller læring.",
        frequency: "3 af 5 skandaler",
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
        icon: "🤖",
        title: "AI-drevet kravanalyse",
        rootCauses: ["requirements", "megaproject"],
        description: "AI kan analysere eksisterende arbejdsgange, dokumentation og brugeradfærd for automatisk at kortlægge processer — det POLSAG manglede fuldstændigt.",
        savings: "Reducer kravspecifikation fra 2 år til 2-3 måneder",
        howItWorks: [
            "Natural Language Processing analyserer tusindvis af eksisterende dokumenter, mails og sagsgange for at kortlægge reelle processer.",
            "AI-agenter kan simulere brugere og finde edge cases før en eneste linje kode er skrevet.",
            "Process mining identificerer automatisk flaskehalse og undtagelser i eksisterende systemer.",
            "Kravdokumentation genereres automatisk fra analyse — ikke fra konsulenter der gætter.",
        ],
        orbixAngle: "Orbix bruger AI til at forstå komplekse systemer og generere præcis kravspecifikation baseret på data — ikke gætværk."
    },
    {
        id: "incremental",
        icon: "🔄",
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
        orbixAngle: "Orbix bygger software i korte sprints med løbende AI-kvalitetskontrol — problemer fanges i dage, ikke år."
    },
    {
        id: "ai-testing",
        icon: "🧪",
        title: "AI-drevet test & kvalitetssikring",
        rootCauses: ["testing", "vendor"],
        description: "AI kan generere og køre tusindvis af tests automatisk — det der manglede i EFI, POLSAG og Sundhedsplatformen.",
        savings: "80-90% reduktion i uopdagede fejl ved go-live",
        howItWorks: [
            "AI genererer automatisk testcases baseret på kravspecifikation og brugerhistorier.",
            "Simulerede brugerflows tester systemet med realistiske data — 24/7, ikke kun i en uge på Bornholm.",
            "Regressionstesting: AI sikrer at nye funktioner ikke ødelægger eksisterende.",
            "Performance-test: AI simulerer belastning fra 40.000 brugere (som Sundhedsplatformen) før go-live.",
        ],
        orbixAngle: "Orbix integrerer AI-testing i hele udviklingsprocessen — ikke bare som en eftertanke ved go-live."
    },
    {
        id: "ai-procurement",
        icon: "📊",
        title: "Data-drevet budgettering & risikostyring",
        rootCauses: ["procurement", "vendor"],
        description: "AI kan analysere historiske projektdata for at give realistiske budgetter og tidlige advarsler — modgiften til leverandør-optimisme.",
        savings: "Reducer budgetoverskridelser fra 108% til under 20%",
        howItWorks: [
            "Machine learning på 1000+ offentlige IT-projekter giver realistiske estimater baseret på projektets karakteristika.",
            "Automatisk risikovurdering: AI identificerer advarselssignaler (scope creep, ressourcemangel, leverandørstabilitet).",
            "Real-time budget tracking: AI sammenligner løbende faktisk forbrug med plan og advarer tidligt.",
            "Benchmarking: Hvad kostede lignende projekter i Norge (8% overskridelse) vs. Danmark (108%)?",
        ],
        orbixAngle: "Orbix bruger data-drevet estimering og løbende AI-overvågning for at holde projekter på sporet."
    },
    {
        id: "inhouse",
        icon: "🏛️",
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
        orbixAngle: "Orbix bygger AI-løsninger der giver offentlige institutioner ekspertviden uden konsulentafhængighed."
    },
    {
        id: "transparency-ai",
        icon: "🔍",
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
        orbixAngle: "Orbix tror på fuld gennemsigtighed — det er hele fundamentet bag TransparentTax."
    },
];

/**
 * Summary statistics for the "what could have been saved" calculation
 */
const IT_WASTE_SUMMARY = {
    totalWastedBn: 25,           // Conservative estimate: 25 mia. kr. wasted on failed IT over 15 years
    annualConsultantBn: 13.5,    // 12-15 mia. kr./year on consultants
    avgOverrunPct: 108,          // Danish average
    norwayOverrunPct: 8,         // Norway comparison
    projectsMonitored: 40,       // By Statens IT-råd
    projectsFlagged: 24,         // With warnings
    projectsRedLight: 12,        // Critical status
    potentialSavingsAI: {
        requirementsPhase: 0.40, // 40% savings via AI requirements analysis
        developmentPhase: 0.30,  // 30% savings via incremental + AI testing
        consultantReduction: 0.50, // 50% reduction in consultant dependency
        overrunReduction: 0.70,  // Reduce overruns by 70% (from 108% to ~30%)
    }
};
