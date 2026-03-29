/**
 * Danish Tax Data 2025
 * Sources: Skatteministeriet, Finansloven 2025, Danmarks Statistik
 */

const TAX_RATES = {
    // AM-bidrag (Arbejdsmarkedsbidrag) - labor market contribution
    amBidrag: 0.08,

    // Personfradrag (personal tax allowance) - 2025
    personfradrag: 49700,

    // Bundskat (bottom bracket state tax)
    bundskat: 0.1209,

    // Topskat (top bracket tax)
    topskatRate: 0.15,
    topskatThreshold: 588900, // Income threshold after AM-bidrag

    // Kommuneskat (municipal tax) - national weighted average 2025
    kommuneskat: 0.25067,

    // Kirkeskat (church tax) - national average 2025
    kirkeskat: 0.0088,

    // Skatteloft (tax ceiling) - the max combined tax rate
    skatteloft: 0.5240, // 52.07% ordinary + marginal ceiling
};

/**
 * Danish Government Budget Breakdown (Finansloven 2025)
 * How the total public expenditure is allocated across sectors.
 * Based on aggregated data from the national budget and municipal spending.
 *
 * These percentages represent total public sector spending across
 * state, regions, and municipalities.
 */
const BUDGET_BREAKDOWN = [
    {
        id: "healthcare",
        icon: "🏥",
        name: "Sundhedsvæsen",
        nameEn: "Healthcare",
        percent: 15.8,
        color: "#ef4444",
        description: "Hospitaler, praktiserende læger, speciallæger, psykiatri, ambulancer, medicinsk forskning og forebyggelse.",
        details: "Danmark bruger ca. 200 mia. kr. årligt på sundhed. Det dækker 21 hospitaler, 3.600 praktiserende læger, og gratis behandling for alle borgere."
    },
    {
        id: "social",
        icon: "🤝",
        name: "Social beskyttelse & overførsler",
        nameEn: "Social Protection",
        percent: 25.4,
        color: "#f97316",
        description: "Folkepension, førtidspension, kontanthjælp, dagpenge, sygedagpenge, boligstøtte og børnefamilieydelse.",
        details: "Den største post. Inkluderer alle overførselsindkomster som sikrer borgere i sårbare situationer — arbejdsløshed, sygdom, alderdom."
    },
    {
        id: "education",
        icon: "🎓",
        name: "Uddannelse",
        nameEn: "Education",
        percent: 12.6,
        color: "#3b82f6",
        description: "Folkeskoler, gymnasier, erhvervsuddannelser, universiteter, SU (Statens Uddannelsesstøtte) og voksenuddannelse.",
        details: "Gratis uddannelse fra folkeskole til universitet. Ca. 330.000 studerende modtager SU. Danmark har en af verdens højeste uddannelsesrater."
    },
    {
        id: "childcare",
        icon: "👶",
        name: "Børnepasning & familie",
        nameEn: "Childcare & Family",
        percent: 5.2,
        color: "#ec4899",
        description: "Vuggestuer, børnehaver, dagpleje, fritidsordninger og familierådgivning.",
        details: "Subsidieret børnepasning gør det muligt for forældre at arbejde. Forældrebetaling dækker kun ca. 25% af omkostningerne."
    },
    {
        id: "eldercare",
        icon: "👴",
        name: "Ældrepleje",
        nameEn: "Elderly Care",
        percent: 5.8,
        color: "#a855f7",
        description: "Plejehjem, hjemmehjælp, ældreboliger, genoptræning og demenspleje.",
        details: "Over 200.000 ældre modtager hjemmehjælp. Ca. 40.000 plejehjemspladser sikrer værdig alderdom for alle."
    },
    {
        id: "infrastructure",
        icon: "🛤️",
        name: "Transport & infrastruktur",
        nameEn: "Transport & Infrastructure",
        percent: 5.1,
        color: "#06b6d4",
        description: "Veje, broer, jernbaner, offentlig transport, cykelstier og vedligeholdelse.",
        details: "Inkluderer drift af 74.000 km veje, S-tog, regionaltog og Storebæltsbroen. Investeringer i grøn transport stiger."
    },
    {
        id: "defense",
        icon: "🛡️",
        name: "Forsvar",
        nameEn: "Defense",
        percent: 3.8,
        color: "#6366f1",
        description: "Forsvaret, NATO-bidrag, cybersikkerhed, beredskab og internationale missioner.",
        details: "Danmark øger forsvarsbudgettet mod 2% af BNP. Inkluderer Hæren, Søværnet, Flyvevåbnet og Hjemmeværnet."
    },
    {
        id: "justice",
        icon: "⚖️",
        name: "Politi & retsvæsen",
        nameEn: "Police & Justice",
        percent: 3.4,
        color: "#8b5cf6",
        description: "Politi, domstole, kriminalforsorg, anklagemyndighed og retssikkerhed.",
        details: "Ca. 11.000 politibetjente og 36 politikredse. Domstolene behandler over 700.000 sager årligt."
    },
    {
        id: "environment",
        icon: "🌿",
        name: "Miljø & klima",
        nameEn: "Environment & Climate",
        percent: 3.2,
        color: "#22c55e",
        description: "Grøn omstilling, klimaindsats, naturbeskyttelse, vandmiljø, affaldshåndtering og bæredygtig energi.",
        details: "Danmark er verdensførende i vindenergi. Målet er 70% CO₂-reduktion i 2030. Massive investeringer i grøn energi."
    },
    {
        id: "research",
        icon: "🔬",
        name: "Forskning & innovation",
        nameEn: "Research & Innovation",
        percent: 3.5,
        color: "#14b8a6",
        description: "Grundforskning, erhvervsforskning, innovation, teknologiudvikling og danske universiteter.",
        details: "Danmark investerer ca. 3% af BNP i forskning — blandt de højeste i verden. Dækker alt fra kræftforskning til grøn teknologi."
    },
    {
        id: "culture",
        icon: "🎭",
        name: "Kultur & fritid",
        nameEn: "Culture & Leisure",
        percent: 2.8,
        color: "#eab308",
        description: "Biblioteker, museer, teatre, sport, foreningsliv, DR (public service) og kulturarv.",
        details: "Ca. 480 biblioteker, 280 museer og tusindvis af foreninger. Kulturlivet styrker sammenhængskraften i samfundet."
    },
    {
        id: "foreign_aid",
        icon: "🌍",
        name: "Udviklingsbistand",
        nameEn: "Foreign Aid",
        percent: 2.1,
        color: "#f59e0b",
        description: "International bistand, nødhjælp, humanitær indsats og FN-bidrag.",
        details: "Danmark er et af få lande der lever op til FN's mål om 0,7% af BNI til udviklingsbistand. Fokus på fattigdomsbekæmpelse og klima."
    },
    {
        id: "administration",
        icon: "🏛️",
        name: "Offentlig administration",
        nameEn: "Public Administration",
        percent: 6.2,
        color: "#78716c",
        description: "Statsadministration, kommunal administration, digitalisering, Folketinget og offentlige IT-systemer.",
        details: "Inkluderer Borger.dk, NemID/MitID, digital post og den administrative maskine der holder samfundet kørende."
    },
    {
        id: "debt",
        icon: "📉",
        name: "Renter på statsgælden",
        nameEn: "National Debt Interest",
        percent: 1.5,
        color: "#94a3b8",
        description: "Rentebetalinger på den danske statsgæld.",
        details: "Danmark har en af de laveste statsgældsrater i EU — under 30% af BNP. Renteudgifterne er derfor relativt lave."
    },
    {
        id: "housing",
        icon: "🏠",
        name: "Boligområdet",
        nameEn: "Housing",
        percent: 3.6,
        color: "#d946ef",
        description: "Alment boligbyggeri, boligsikring, byfornyelse og grundkapitallån.",
        details: "Over 600.000 almene boliger i Danmark. Boligstøtte hjælper lavindkomstfamilier med at have råd til en bolig."
    },
];

/**
 * Concrete impact examples per budget category
 * Shows what a specific tax amount "buys" in real terms
 */
const IMPACT_EXAMPLES = [
    {
        icon: "🏥",
        threshold: 0, // always show
        titleFn: (tax) => `${formatDKK(tax * 0.158)} til sundhedsvæsenet`,
        descFn: (tax) => {
            const days = Math.max(1, Math.round((tax * 0.158) / 6800));
            return `Dit sundhedsbidrag svarer til ca. ${days} dages hospitalsbehandling. Hver dansker bruger gennemsnitligt sundhedsvæsenet 7 gange om året — og det er gratis ved brug.`;
        }
    },
    {
        icon: "🎓",
        threshold: 0,
        titleFn: (tax) => `${formatDKK(tax * 0.126)} til uddannelse`,
        descFn: (tax) => {
            const months = Math.max(1, Math.round((tax * 0.126) / 8500));
            return `Dit uddannelsesbidrag svarer til ca. ${months} måneders folkeskoleundervisning for ét barn. Du finansierer gratis uddannelse for alle — fra 1. klasse til ph.d.`;
        }
    },
    {
        icon: "👶",
        threshold: 0,
        titleFn: (tax) => `${formatDKK(tax * 0.052)} til børnepasning`,
        descFn: (tax) => {
            const weeks = Math.max(1, Math.round((tax * 0.052) / 3600));
            return `Dit bidrag dækker ca. ${weeks} ugers subsidieret børnepasning. Uden offentlig støtte ville en fuldtids vuggestueplads koste over 12.000 kr./md.`;
        }
    },
    {
        icon: "🛤️",
        threshold: 0,
        titleFn: (tax) => `${formatDKK(tax * 0.051)} til infrastruktur`,
        descFn: (tax) => {
            const meters = Math.max(1, Math.round((tax * 0.051) / 120));
            return `Dit bidrag vedligeholder ca. ${meters.toLocaleString('da-DK')} meter offentlig vej. Du finansierer veje, broer, cykelstier og offentlig transport som alle bruger dagligt.`;
        }
    },
    {
        icon: "👴",
        threshold: 0,
        titleFn: (tax) => `${formatDKK(tax * 0.058)} til ældrepleje`,
        descFn: (tax) => {
            const days = Math.max(1, Math.round((tax * 0.058) / 1800));
            return `Dit bidrag svarer til ca. ${days} dages hjemmehjælp for en ældre borger. Du er med til at sikre en værdig alderdom for alle danskere.`;
        }
    },
    {
        icon: "🔬",
        threshold: 50000,
        titleFn: (tax) => `${formatDKK(tax * 0.035)} til forskning`,
        descFn: () => `Dansk forskning har givet verden insulin, Bluetooth-teknologi og banebrydende kræftbehandling. Dit bidrag finansierer fremtidens løsninger.`
    },
];
