/**
 * Danish Tax Data 2025
 * Sources: Skatteministeriet, Finansloven 2025, Danmarks Statistik
 */

const TAX_RATES = {
    // AM-bidrag (Arbejdsmarkedsbidrag) - labor market contribution
    amBidrag: 0.08,

    // Personfradrag (personal tax allowance) - 2025
    personfradrag: 51600,

    // Bundskat (bottom bracket state tax) - 2025
    bundskat: 0.1201,

    // Topskat (top bracket tax)
    topskatRate: 0.15,
    topskatThreshold: 611800, // Income threshold after AM-bidrag

    // Kommuneskat (municipal tax) - national weighted average 2025
    kommuneskat: 0.2507,

    // Kirkeskat (church tax) - national average 2025
    kirkeskat: 0.0087,

    // Skatteloft (tax ceiling) - the max combined tax rate
    skatteloft: 0.5207,

    // Beskæftigelsesfradrag (employment deduction) - 2025
    beskaeftigelsesfradragRate: 0.1230,
    beskaeftigelsesfradragMax: 55600,
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
        icon: "",
        name: "Sundhedsvæsen",
        nameEn: "Healthcare",
        percent: 15.8,
        color: "#ef4444",
        description: "Hospitaler, praktiserende læger, speciallæger, psykiatri, ambulancer, medicinsk forskning og forebyggelse.",
        details: "Danmark bruger ca. 200 mia. kr. årligt på sundhed. Det dækker 21 hospitaler, 3.600 praktiserende læger, og gratis behandling for alle borgere."
    },
    {
        id: "social",
        icon: "",
        name: "Social beskyttelse & overførsler",
        nameEn: "Social Protection",
        percent: 25.2,
        color: "#f97316",
        description: "Folkepension, førtidspension, kontanthjælp, dagpenge, sygedagpenge, boligstøtte og børnefamilieydelse.",
        details: "Den største post. Inkluderer alle overførselsindkomster som sikrer borgere i sårbare situationer: arbejdsløshed, sygdom, alderdom."
    },
    {
        id: "education",
        icon: "",
        name: "Uddannelse",
        nameEn: "Education",
        percent: 12.4,
        color: "#3b82f6",
        description: "Folkeskoler, gymnasier, erhvervsuddannelser, universiteter, SU (Statens Uddannelsesstøtte) og voksenuddannelse.",
        details: "Gratis uddannelse fra folkeskole til universitet. Ca. 330.000 studerende modtager SU. Danmark har en af verdens højeste uddannelsesrater."
    },
    {
        id: "childcare",
        icon: "",
        name: "Børnepasning & familie",
        nameEn: "Childcare & Family",
        percent: 5.2,
        color: "#ec4899",
        description: "Vuggestuer, børnehaver, dagpleje, fritidsordninger og familierådgivning.",
        details: "Subsidieret børnepasning gør det muligt for forældre at arbejde. Forældrebetaling dækker kun ca. 25% af omkostningerne."
    },
    {
        id: "eldercare",
        icon: "",
        name: "Ældrepleje",
        nameEn: "Elderly Care",
        percent: 5.8,
        color: "#a855f7",
        description: "Plejehjem, hjemmehjælp, ældreboliger, genoptræning og demenspleje.",
        details: "Over 200.000 ældre modtager hjemmehjælp. Ca. 40.000 plejehjemspladser sikrer værdig alderdom for alle."
    },
    {
        id: "infrastructure",
        icon: "",
        name: "Transport & infrastruktur",
        nameEn: "Transport & Infrastructure",
        percent: 5.1,
        color: "#06b6d4",
        description: "Veje, broer, jernbaner, offentlig transport, cykelstier og vedligeholdelse.",
        details: "Inkluderer drift af 74.000 km veje, S-tog, regionaltog og Storebæltsbroen. Investeringer i grøn transport stiger."
    },
    {
        id: "defense",
        icon: "",
        name: "Forsvar",
        nameEn: "Defense",
        percent: 3.8,
        color: "#6366f1",
        description: "Forsvaret, NATO-bidrag, cybersikkerhed, beredskab og internationale missioner.",
        details: "Danmark øger forsvarsbudgettet mod 2% af BNP. Inkluderer Hæren, Søværnet, Flyvevåbnet og Hjemmeværnet."
    },
    {
        id: "justice",
        icon: "",
        name: "Politi & retsvæsen",
        nameEn: "Police & Justice",
        percent: 2.0,
        color: "#8b5cf6",
        description: "Politi, domstole, kriminalforsorg, anklagemyndighed og retssikkerhed.",
        details: "Ca. 11.000 politibetjente og 36 politikredse. Domstolene behandler over 700.000 sager årligt."
    },
    {
        id: "environment",
        icon: "",
        name: "Miljø & klima",
        nameEn: "Environment & Climate",
        percent: 4.8,
        color: "#22c55e",
        description: "Grøn omstilling, klimaindsats, naturbeskyttelse, vandmiljø, affaldshåndtering og bæredygtig energi.",
        details: "Danmark er verdensførende i vindenergi. Målet er 70% CO₂-reduktion i 2030. Massive investeringer i grøn energi."
    },
    {
        id: "research",
        icon: "",
        name: "Forskning & innovation",
        nameEn: "Research & Innovation",
        percent: 3.5,
        color: "#14b8a6",
        description: "Grundforskning, erhvervsforskning, innovation, teknologiudvikling og danske universiteter.",
        details: "Danmark investerer ca. 3% af BNP i forskning. Det er blandt de højeste i verden. Dækker alt fra kræftforskning til grøn teknologi."
    },
    {
        id: "culture",
        icon: "",
        name: "Kultur & fritid",
        nameEn: "Culture & Leisure",
        percent: 2.8,
        color: "#eab308",
        description: "Biblioteker, museer, teatre, sport, foreningsliv, DR (public service) og kulturarv.",
        details: "Ca. 480 biblioteker, 280 museer og tusindvis af foreninger. Kulturlivet styrker sammenhængskraften i samfundet."
    },
    {
        id: "foreign_aid",
        icon: "",
        name: "Udviklingsbistand",
        nameEn: "Foreign Aid",
        percent: 2.1,
        color: "#f59e0b",
        description: "International bistand, nødhjælp, humanitær indsats og FN-bidrag.",
        details: "Danmark er et af få lande der lever op til FN's mål om 0,7% af BNI til udviklingsbistand. Fokus på fattigdomsbekæmpelse og klima."
    },
    {
        id: "administration",
        icon: "",
        name: "Offentlig administration",
        nameEn: "Public Administration",
        percent: 6.4,
        color: "#78716c",
        description: "Statsadministration, kommunal administration, digitalisering, Folketinget og offentlige IT-systemer.",
        details: "Inkluderer Borger.dk, NemID/MitID, digital post og den administrative maskine der holder samfundet kørende."
    },
    {
        id: "debt",
        icon: "",
        name: "Renter på statsgælden",
        nameEn: "National Debt Interest",
        percent: 1.5,
        color: "#94a3b8",
        description: "Rentebetalinger på den danske statsgæld.",
        details: "Danmark har en af de laveste statsgældsrater i EU, under 30% af BNP. Renteudgifterne er derfor relativt lave."
    },
    {
        id: "housing",
        icon: "",
        name: "Boligområdet",
        nameEn: "Housing",
        percent: 3.6,
        color: "#d946ef",
        description: "Alment boligbyggeri, boligsikring, byfornyelse og grundkapitallån.",
        details: "Over 600.000 almene boliger i Danmark. Boligstøtte hjælper lavindkomstfamilier med at have råd til en bolig."
    },
];

/**
 * Private market costs for services currently covered by tax.
 * These are annual costs per unit in DKK, based on Danish and
 * comparable international private market prices.
 *
 * Sources: CEPOS, DI, international health insurance comparisons,
 * Danish private school/childcare fees, infrastructure cost studies.
 */
const PRIVATE_COSTS = {
    // Healthcare - private health insurance for a family
    // Based on comparable systems (Switzerland ~8.000 CHF/person/year,
    // US ~$7.000/person/year for employer plans). Danish private
    // sundhedsforsikring covers limited care; full coverage would be far more.
    healthInsurancePerAdult: 48000,   // Full private coverage per adult/year
    healthInsurancePerChild: 24000,   // Per child/year
    doctorVisit: 1200,               // Private GP consultation
    hospitalDayRate: 18000,          // Private hospital per day (avg stay 4.5 days)
    hospitalStayAvgDays: 4.5,

    // Education - private school fees
    nurseryPerChild: 144000,         // Private vuggestue ~12.000 kr./md (full cost)
    kindergartenPerChild: 108000,    // Private børnehave ~9.000 kr./md (full cost)
    folkeskolePerChild: 72000,       // Privatskole ~6.000 kr./md
    highschoolPerChild: 84000,       // Privat gymnasium ~7.000 kr./md
    universityPerPerson: 120000,     // Tuition comparable to EU private uni + no SU

    // Transport - private alternatives
    publicTransportPerPerson: 18000, // Yearly pass subsidized portion (~1.500/md subsidy value)

    // Library
    libraryPerHousehold: 4000,       // Books, media, digital access equivalent

    // Shared services (per capita) - everyone benefits from these whether they
    // "use" them directly or not. Calculated as total budget / 5.9M population.
    // Total Danish public expenditure ~1.300 mia. kr.
    perCapitaDefense: 8400,          // Forsvar
    perCapitaPolice: 4400,           // Politi & retsvæsen
    perCapitaInfrastructure: 11200,  // Veje, broer, cykelstier (beyond transport pass)
    perCapitaEnvironment: 10600,     // Miljø & klima
    perCapitaAdministration: 14100,  // Borger.dk, MitID, digital post, etc.
    perCapitaResearch: 7700,         // Forskning & innovation
    perCapitaSocialSafety: 55500,    // Social sikkerhedsnet (dagpenge, kontanthjælp, pension)
    perCapitaEldercare: 12800,       // Ældrepleje (du betaler nu, du bruger det senere)
    perCapitaHousing: 7900,          // Boligstøtte, alment byggeri
    perCapitaCulture: 6200,          // Kultur, sport, foreningsliv
    perCapitaForeignAid: 4600,       // Udviklingsbistand
    perCapitaDebt: 3300,             // Renter på statsgæld
};

/**
 * Calculate total private cost for a household profile.
 * Returns itemized breakdown + total.
 */
function calculatePrivateCost(household, totalTax) {
    const items = [];

    // --- Healthcare ---
    const adults = household.adults;
    const totalChildren = household.nursery + household.kindergarten +
                          household.school + household.highschool;
    const healthInsurance = (adults * PRIVATE_COSTS.healthInsurancePerAdult) +
                            (totalChildren * PRIVATE_COSTS.healthInsurancePerChild);
    const doctorCost = household.doctorVisits * PRIVATE_COSTS.doctorVisit;
    const hospitalCost = household.hospitalVisits *
                         PRIVATE_COSTS.hospitalDayRate * PRIVATE_COSTS.hospitalStayAvgDays;

    items.push({
        icon: "",
        name: "Sundhedsforsikring",
        publicCost: Math.round(totalTax * 0.158),
        privateCost: Math.round(healthInsurance),
        note: `${adults} voksen(e)${totalChildren > 0 ? ' + ' + totalChildren + ' barn' : ''}, fuld privat dækning`
    });
    items.push({
        icon: "",
        name: "Lægebesøg & hospital",
        publicCost: 0, // included in healthcare above
        privateCost: Math.round(doctorCost + hospitalCost),
        note: `${household.doctorVisits} lægebesøg + ${household.hospitalVisits} hospitalsbesøg/år`
    });

    // --- Childcare ---
    if (household.nursery > 0) {
        items.push({
            icon: "",
            name: "Vuggestue/dagpleje",
            publicCost: Math.round(totalTax * 0.052 * (household.nursery / Math.max(1, totalChildren || 1))),
            privateCost: household.nursery * PRIVATE_COSTS.nurseryPerChild,
            note: `${household.nursery} barn, fuld pris uden offentligt tilskud`
        });
    }
    if (household.kindergarten > 0) {
        items.push({
            icon: "",
            name: "Børnehave",
            publicCost: Math.round(totalTax * 0.052 * (household.kindergarten / Math.max(1, totalChildren || 1))),
            privateCost: household.kindergarten * PRIVATE_COSTS.kindergartenPerChild,
            note: `${household.kindergarten} barn, fuld pris uden offentligt tilskud`
        });
    }

    // --- Education ---
    if (household.school > 0) {
        items.push({
            icon: "",
            name: "Folkeskole (privatskole)",
            publicCost: Math.round(totalTax * 0.124 * 0.4), // ~40% of education budget is folkeskole
            privateCost: household.school * PRIVATE_COSTS.folkeskolePerChild,
            note: `${household.school} barn i privatskole`
        });
    }
    if (household.highschool > 0) {
        items.push({
            icon: "",
            name: "Gymnasium/erhvervsuddannelse",
            publicCost: Math.round(totalTax * 0.124 * 0.25),
            privateCost: household.highschool * PRIVATE_COSTS.highschoolPerChild,
            note: `${household.highschool} ung(e) i privat gymnasium`
        });
    }
    if (household.university > 0) {
        items.push({
            icon: "",
            name: "Universitet (tuition + tabt SU)",
            publicCost: Math.round(totalTax * 0.124 * 0.35),
            privateCost: household.university * PRIVATE_COSTS.universityPerPerson,
            note: `${household.university} studerende, privat tuition, ingen SU`
        });
    }

    // --- Transport ---
    if (household.transport > 0) {
        items.push({
            icon: "",
            name: "Offentlig transport (subsidieandel)",
            publicCost: Math.round(totalTax * 0.051 * 0.3),
            privateCost: household.transport * PRIVATE_COSTS.publicTransportPerPerson,
            note: `${household.transport} person(er), den offentlige subsidie du mister`
        });
    }

    // --- Library ---
    if (household.library) {
        items.push({
            icon: "",
            name: "Bibliotek & medieadgang",
            publicCost: Math.round(totalTax * 0.028 * 0.15),
            privateCost: PRIVATE_COSTS.libraryPerHousehold,
            note: "Bøger, e-bøger, film, musik, digitale tjenester"
        });
    }

    // --- Shared services everyone uses ---
    const sharedServices = [
        { icon: "", name: "Forsvar & sikkerhed", cost: PRIVATE_COSTS.perCapitaDefense, note: "Din andel af nationalt forsvar. Kan ikke fravælges" },
        { icon: "", name: "Politi & retsvæsen", cost: PRIVATE_COSTS.perCapitaPolice, note: "Retssikkerhed, politibeskyttelse, domstole" },
        { icon: "", name: "Veje & infrastruktur", cost: PRIVATE_COSTS.perCapitaInfrastructure, note: "Veje, broer, cykelstier. Brugt af alle dagligt" },
        { icon: "", name: "Miljø & klima", cost: PRIVATE_COSTS.perCapitaEnvironment, note: "Rent vand, affald, grøn omstilling" },
        { icon: "", name: "Administration & digitalisering", cost: PRIVATE_COSTS.perCapitaAdministration, note: "MitID, Borger.dk, digital post, skatteadministration" },
        { icon: "", name: "Forskning & innovation", cost: PRIVATE_COSTS.perCapitaResearch, note: "Medicinsk forskning, teknologi, universitetsforskning" },
        { icon: "", name: "Socialt sikkerhedsnet", cost: PRIVATE_COSTS.perCapitaSocialSafety, note: "Dagpenge, kontanthjælp, pension. Din forsikring mod uforudsete hændelser" },
        { icon: "", name: "Ældrepleje (din fremtidige pleje)", cost: PRIVATE_COSTS.perCapitaEldercare, note: "Du betaler nu. Du bruger det når du bliver ældre" },
        { icon: "", name: "Boligstøtte & alment byggeri", cost: PRIVATE_COSTS.perCapitaHousing, note: "Holder boligmarkedet tilgængeligt for alle" },
        { icon: "", name: "Kultur, sport & foreningsliv", cost: PRIVATE_COSTS.perCapitaCulture, note: "Museer, biblioteker, DR, sportsfaciliteter" },
        { icon: "", name: "Udviklingsbistand", cost: PRIVATE_COSTS.perCapitaForeignAid, note: "Danmarks internationale forpligtelser" },
        { icon: "", name: "Renter på statsgæld", cost: PRIVATE_COSTS.perCapitaDebt, note: "Lav gæld = lave renter. Et tegn på sund økonomi" },
    ];

    sharedServices.forEach(svc => {
        const perHousehold = svc.cost * adults; // scale by adults in household
        items.push({
            icon: svc.icon,
            name: svc.name,
            publicCost: 0, // we show the total comparison at the end
            privateCost: Math.round(perHousehold),
            note: svc.note,
            isShared: true
        });
    });

    const totalPrivate = items.reduce((sum, item) => sum + item.privateCost, 0);

    return { items, totalPrivate };
}

/**
 * Concrete impact examples per budget category
 * Shows what a specific tax amount "buys" in real terms
 */
const IMPACT_EXAMPLES = [
    {
        icon: "",
        threshold: 0, // always show
        titleFn: (tax) => `${formatDKK(tax * 0.158)} til sundhedsvæsenet`,
        descFn: (tax) => {
            const days = Math.max(1, Math.round((tax * 0.158) / 6800));
            return `Dit sundhedsbidrag svarer til ca. ${days} dages hospitalsbehandling. Hver dansker bruger gennemsnitligt sundhedsvæsenet 7 gange om året, og det er gratis ved brug.`;
        }
    },
    {
        icon: "",
        threshold: 0,
        titleFn: (tax) => `${formatDKK(tax * 0.124)} til uddannelse`,
        descFn: (tax) => {
            const months = Math.max(1, Math.round((tax * 0.124) / 8500));
            return `Dit uddannelsesbidrag svarer til ca. ${months} måneders folkeskoleundervisning for ét barn. Du finansierer gratis uddannelse for alle, fra 1. klasse til ph.d.`;
        }
    },
    {
        icon: "",
        threshold: 0,
        titleFn: (tax) => `${formatDKK(tax * 0.052)} til børnepasning`,
        descFn: (tax) => {
            const weeks = Math.max(1, Math.round((tax * 0.052) / 3600));
            return `Dit bidrag dækker ca. ${weeks} ugers subsidieret børnepasning. Uden offentlig støtte ville en fuldtids vuggestueplads koste over 12.000 kr./md.`;
        }
    },
    {
        icon: "",
        threshold: 0,
        titleFn: (tax) => `${formatDKK(tax * 0.051)} til infrastruktur`,
        descFn: (tax) => {
            const meters = Math.max(1, Math.round((tax * 0.051) / 120));
            return `Dit bidrag vedligeholder ca. ${meters.toLocaleString('da-DK')} meter offentlig vej. Du finansierer veje, broer, cykelstier og offentlig transport som alle bruger dagligt.`;
        }
    },
    {
        icon: "",
        threshold: 0,
        titleFn: (tax) => `${formatDKK(tax * 0.058)} til ældrepleje`,
        descFn: (tax) => {
            const days = Math.max(1, Math.round((tax * 0.058) / 1800));
            return `Dit bidrag svarer til ca. ${days} dages hjemmehjælp for en ældre borger. Du er med til at sikre en værdig alderdom for alle danskere.`;
        }
    },
    {
        icon: "",
        threshold: 50000,
        titleFn: (tax) => `${formatDKK(tax * 0.035)} til forskning`,
        descFn: () => `Dansk forskning har givet verden insulin, Bluetooth-teknologi og banebrydende kræftbehandling. Dit bidrag finansierer fremtidens løsninger.`
    },
];
