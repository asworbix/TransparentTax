/**
 * Kontanthjaelp Data - Welfare Dependency Analysis
 *
 * Sources:
 * - Danmarks Statistik: KYS01, dst.dk/nyt
 * - Dansk Arbejdsgiverforening (DA): analyse 2024
 * - OECD: Back to Work Denmark (2016)
 * - Beskæftigelsesministeriet (bm.dk): kontanthjælpsreform 2025
 * - STAR.dk: arbejdspligt regler
 * - Cambridge Core: Trajectories of the Vulnerable Unemployed in Denmark
 */

const KONTANTHJAELP_DATA = {

    /** Current recipient numbers (2025) */
    overview: {
        totalRecipients: 86100,          // Q2 2025 (lowest ever, halved since 2015)
        totalRecipientsYear: "Q2 2025",
        peakRecipients: 172000,          // ~2015 level
        peakYear: "2015",
        declinePct: 50,                   // Halved since 2015

        jobparateCount: 14500,           // Approx. jobparate (job-ready) Q2 2025
        aktivitetsparateCount: 71600,    // Approx. aktivitetsparate (activity-ready)

        // Demographic breakdown
        nonWesternPct: 6.4,              // % of non-Western working-age immigrants on kontanthjælp
        danishOriginPct: 1.9,            // % of Danish-origin working-age on kontanthjælp
        mindstesatsNonWesternPct: 93,    // % of minimum-rate recipients who are non-Western

        // Monthly cost per recipient (approx.)
        monthlyRateHighest: 16300,       // Forhøjet sats (forsørger, over 30)
        monthlyRateBasic: 11800,         // Grundsats
        monthlyRateMinimum: 7500,        // Mindstesats

        // Annual cost to society
        annualCostBn: 18.5,             // Approx annual cost of kontanthjælp system
    },

    /** The two categories and what they mean */
    categories: [
        {
            id: "jobparat",
            name: "Jobparat",
            nameEn: "Job-ready",
            icon: "",
            count: 14500,
            description: "Vurderet klar til at tage et job med det samme. Tælles med i ledighedsstatistikken.",
            requirement: "Skal aktivt søge job og stå til rådighed for arbejdsmarkedet.",
            inJobAfter6Months: 27,  // % in job after 6 months (2022)
            trend: "Faldende. Faldet med 600 i Q1 2024 og 600 i Q2 2024.",
        },
        {
            id: "aktivitetsparat",
            name: "Aktivitetsparat",
            nameEn: "Activity-ready",
            icon: "",
            count: 71600,
            description: "Vurderet til IKKE at kunne tage et job lige nu pga. helbredsproblemer, sociale udfordringer eller manglende kompetencer.",
            requirement: "Skal deltage i aktiviteter der bringer dem tættere på arbejdsmarkedet.",
            inJobAfter6Months: 17,  // % in job after 6 months (2022, up from 10% in 2016)
            trend: "Faldende. Faldet med 900 i Q2 2025.",
        },
    ],

    /** The problem: people who could work but don't */
    theProblem: {
        title: "Hvem er de jobparate der ikke kommer i job?",
        intro: "14.500 mennesker er vurderet JOBPARATE. Det betyder at kommunen har vurderet at de KAN tage et job. Alligevel er kun 27% i beskæftigelse efter 6 måneder. Hvad sker der med de resterende 73%?",
        stats: [
            {
                label: "Jobparate i job efter 6 mdr.",
                value: "27%",
                context: "Kun lidt over 1 ud af 4 jobparate finder arbejde inden for et halvt år."
            },
            {
                label: "Aktivitetsparate i job efter 6 mdr.",
                value: "17%",
                context: "Overraskende: 17% af dem der er vurderet IKKE job-klar finder alligevel job. Steg fra 10% i 2016."
            },
            {
                label: "Kontanthjælpsmodtagere i 3+ år",
                value: "~40%",
                context: "Ca. 40% af alle modtagere har været på kontanthjælp i over 3 år. For aktivitetsparate er det endnu højere."
            },
            {
                label: "Samlet udgift pr. år",
                value: "~18,5 mia. kr.",
                context: "Det er flere penge end hele forsvarsbudgettet (Finansloven 2024: 36,2 mia. kr.) og tæt på halvdelen."
            },
        ],
    },

    /** The 2025 reform */
    reform2025: {
        title: "Kontanthjælpsreformen 2025",
        effectiveDate: "1. juli 2025",
        keyChanges: [
            {
                change: "Arbejdspligt op til 37 timer/uge",
                detail: "Ca. 22.000 modtagere der mangler opholds- eller beskæftigelseshistorik skal nu arbejde op til 37 timer om ugen for at modtage ydelsen. Det kan være nytteindsats, virksomhedspraktik eller løntilskudsjob."
            },
            {
                change: "Ny ydelsesstruktur: 3 satser",
                detail: "De gamle kategorier (kontanthjælp, uddannelseshjælp, SHO) er erstattet af en enkelt ydelse med 3 satser: mindstesats, grundsats og forhøjet sats."
            },
            {
                change: "Krav om 9 af 10 års ophold + 2,5 års fuldtidsarbejde",
                detail: "For at få fuld sats skal man have boet i Danmark mindst 9 af de seneste 10 år OG have arbejdet fuldtid i mindst 2,5 år i de seneste 10 år."
            },
            {
                change: "225-timers reglen skærpes",
                detail: "Modtagere skal have 225 timers ordinær beskæftigelse inden for 12 måneder for at beholde fuld ydelse."
            },
        ],
        governmentQuote: "Det er fuldstændig uacceptabelt, at der er så mange ledige indvandrere, der ikke vil bidrage. Det skal ændre sig. Med arbejdspligten sender vi et klart signal om, at kontanthjælp ikke skal være en strandferie.",
        quoteSource: "Beskæftigelsesministeriet, oktober 2023",
    },

    /** What research actually shows about effectiveness */
    research: {
        title: "Hvad siger forskningen?",
        findings: [
            {
                finding: "Lavere ydelser fører IKKE til flere i job",
                detail: "Kontanthjælpsloftet fra 2016 satte et loft over den samlede hjælp. Forskning viste INGEN positiv effekt på beskæftigelse. Til gengæld steg fattigdom blandt børn i berørte familier markant.",
                source: "CASA 2016, Rockwool Fondens Forskningsenhed",
                positive: false
            },
            {
                finding: "Privat virksomhedspraktik virker",
                detail: "OECD-forskning viser at privat sektorens beskæftigelsesprogrammer har de største positive effekter. Mennesker der kommer i praktik i private virksomheder har markant højere chance for at finde job.",
                source: "OECD Back to Work Denmark, 2016",
                positive: true
            },
            {
                finding: "IPS (Individual Placement and Support) er dobbelt så effektiv",
                detail: "En meta-analyse af 27 RCT-studier viser at IPS-metoden er mere end dobbelt så effektiv som traditionel revalidering til at få sårbare grupper i job.",
                source: "Tandfonline, 2025",
                positive: true
            },
            {
                finding: "7 ud af 10 kommer i job inden for 1 år (det brede arbejdsmarked)",
                detail: "For det brede arbejdsmarked (inkl. dagpengemodtagere) finder 70% af ledige nyt job inden for et år. For kontanthjælpsmodtagere er tallet markant lavere.",
                source: "OECD Flexicurity Analysis",
                positive: true
            },
            {
                finding: "Aktivitetsparate i job steg fra 10% til 17% (2016-2022)",
                detail: "Andelen af nye aktivitetsparate der finder job inden for 6 måneder er næsten fordoblet. Det tyder på at den aktive indsats gør en forskel for denne gruppe.",
                source: "DA Analyse 2024",
                positive: true
            },
            {
                finding: "Ungereformen 2013 virkede",
                detail: "Reformen der erstattede kontanthjælp med uddannelseshjælp for unge havde en positiv effekt. Flere unge forlod ydelsessystemet og gik i uddannelse eller job.",
                source: "Beskæftigelsesministeriet",
                positive: true
            },
        ],
    },

    /** The transparency angle: where does your kontanthjælp-tax go? */
    costBreakdown: {
        title: "Hvad koster kontanthjælpen dig?",
        items: [
            {
                name: "Selve ydelsen (overførsler)",
                pctOfTotal: 65,
                description: "Direkte udbetaling til modtagere.",
            },
            {
                name: "Kommunal sagsbehandling",
                pctOfTotal: 15,
                description: "Jobcentre, sagsbehandlere, visitering, opfølgning.",
            },
            {
                name: "Aktiveringstilbud",
                pctOfTotal: 12,
                description: "Nytteindsats, virksomhedspraktik, kurser, løntilskud.",
            },
            {
                name: "Administration & IT",
                pctOfTotal: 8,
                description: "Systemer, dokumentation, kontrol, klagesager.",
            },
        ],
    },

    /** The real question: what works? */
    whatWorks: {
        title: "Hvad virker faktisk?",
        effective: [
            {
                method: "Privat virksomhedspraktik",
                icon: "",
                effect: "Højeste beskæftigelseseffekt af alle tiltag.",
                detail: "Mennesker der arbejder i rigtige virksomheder opbygger netværk, får referencer og viser arbejdsgivere deres kompetencer."
            },
            {
                method: "IPS (Individual Placement and Support)",
                icon: "",
                effect: "2x mere effektiv end traditionel revalidering.",
                detail: "Place-then-train: Find job først, træn derefter. Modsat det traditionelle train-then-place."
            },
            {
                method: "Tidlig indsats",
                icon: "",
                effect: "Jo hurtigere indsats, jo bedre resultat.",
                detail: "Langvarig ledighed forværrer problemet eksponentielt. Indsats i de første 3 måneder er afgørende."
            },
            {
                method: "Uddannelse for unge",
                icon: "",
                effect: "Ungereformen virkede dokumenterbart.",
                detail: "At erstatte kontanthjælp med uddannelseshjælp for unge under 30 fik flere i uddannelse."
            },
        ],
        ineffective: [
            {
                method: "Lavere ydelser som motivation",
                icon: "",
                effect: "Ingen effekt på beskæftigelse.",
                detail: "Kontanthjælpsloftet fra 2016 reducerede ikke ledigheden. Det øgede børnefattigdom."
            },
            {
                method: "Nytteindsats uden perspektiv",
                icon: "",
                effect: "Begrænset effekt hvis det ikke fører til rigtige jobs.",
                detail: "At rydde op i parker er ikke det samme som at opbygge kompetencer. Uden progression er det blot beskæftigelsesterapi."
            },
            {
                method: "Kompleks sagsbehandling",
                icon: "",
                effect: "Dokumentationskrav tager tid fra den egentlige indsats.",
                detail: "Sagsbehandlere bruger op til 60% af tiden på dokumentation og kun 40% på borgerkontakt."
            },
        ],
    },
};
