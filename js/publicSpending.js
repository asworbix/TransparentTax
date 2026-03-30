/**
 * Public Sector Spending Data
 * How money actually flows through the Danish public sector.
 *
 * Sources:
 * - Statsregnskabet 2024 (oes.dk, published March 2025)
 * - Finansloven 2024/2025 (fm.dk)
 * - Danmarks Statistik: OFF3K, OFF29 (statbank.dk)
 * - Udgiftslofter og statens finanser, November 2024 (fm.dk)
 * - Rigsrevisionen: beretning om revisionen af statsregnskabet 2024
 * - Denmark's Annual Progress Report 2025 (en.fm.dk)
 * - Eurostat: gov_10a_exp (COFOG)
 * - OECD Government at a Glance 2025 (Denmark country note)
 *
 * Fiscal year: Calendar year (January-December).
 * Most recent complete fiscal year with actual accounts: 2024.
 * GDP 2024: ~2,930 mia. DKK.
 * Total public expenditure 2024: ~1,357 mia. DKK (~46.5% of GDP).
 * DAU-saldo (state surplus) 2024: 79.3 mia. DKK.
 */

/**
 * BEVILLINGSREGLER (Appropriation Rules) - Reference Data
 *
 * The Danish appropriation system has several types of bevillinger,
 * each with different carry-forward rules:
 *
 * 1. DRIFTSBEVILLING (Operating appropriation):
 *    - Institutions MAY carry forward surplus to subsequent fiscal years.
 *    - Carried-forward surplus becomes "overført overskud" (transferred surplus)
 *      on the institution's equity.
 *    - NET consumption of accumulated savings across a ministry area must be
 *      zero or negative. Ministries cannot spend down their savings pool
 *      without Finansministeriet dispensation.
 *    - This creates the "use-it-or-risk-losing-influence" dynamic.
 *
 * 2. RESERVATIONSBEVILLING (Reservation appropriation):
 *    - Used for specific projects spanning multiple fiscal years.
 *    - May carry forward for the project's duration.
 *    - Carry-forward lapses if no spending in 2 consecutive years.
 *
 * 3. LOVBUNDEN BEVILLING (Statutory appropriation):
 *    - Demand-driven (pensions, dagpenge, SU, etc.)
 *    - NO carry-forward allowed. Unspent money returns to Treasury.
 *
 * 4. ANDEN BEVILLING (Other appropriation):
 *    - Generally NO carry-forward.
 *    - Exception: grants awaiting approval may carry 1 year if applications
 *      were received in the original fiscal year.
 *
 * The combined effect: institutions tend to accelerate Q4 spending because
 * accumulated savings are constrained and unused specific-purpose funds lapse.
 * Regions/municipalities operate under kassekreditreglen (cash credit rule),
 * requiring average liquidity over the past 12 months to exceed a threshold.
 *
 * Source: Budgetvejledning 2021 (oes.dk), ØAV sections 2.2, 2.6, 2.9, 2.10, 2.12
 */
const APPROPRIATION_RULES = {
    driftsbevilling: {
        name: "Driftsbevilling",
        nameEn: "Operating Appropriation",
        carryForward: true,
        limit: "Net consumption of ministry savings must be zero or negative",
        lapse: "Surplus remains on equity; spending requires FM dispensation",
        source: "Budgetvejledning 2021, ØAV §2.6.7"
    },
    reservationsbevilling: {
        name: "Reservationsbevilling",
        nameEn: "Reservation Appropriation",
        carryForward: true,
        limit: "Must be for specific projects; lapses after 2 years of no activity",
        lapse: "Bortfalder if no spending for 2 consecutive years",
        source: "Budgetvejledning 2021, ØAV §2.10"
    },
    lovbundenBevilling: {
        name: "Lovbunden bevilling",
        nameEn: "Statutory/Demand-driven Appropriation",
        carryForward: false,
        limit: "None. Demand-driven (pensions, dagpenge, SU)",
        lapse: "Unspent funds return to Treasury immediately",
        source: "Budgetvejledning 2021, ØAV §2.9"
    },
    andenBevilling: {
        name: "Anden bevilling",
        nameEn: "Other Appropriation",
        carryForward: false,
        limit: "Generally no carry-forward",
        lapse: "Exception: pending grant applications may carry 1 year",
        source: "Budgetvejledning 2021, ØAV §2.12"
    },
};

/**
 * Budget vs. Actual Spending by sector (fiscal year 2024)
 * Finansloven 2024 (budget) vs. Statsregnskabet 2024 (actual accounts)
 * All figures in billions DKK.
 *
 * Key context for 2024:
 * - Statsregnskabet 2024 showed DAU-saldo of +79.3 mia. kr (surplus).
 * - The surplus was 42.75 mia. kr HIGHER than the Finanslov 2024 estimate,
 *   decomposed as: +36 mia. higher revenue, -6.5 mia. lower expenditure.
 * - State operating expenditure (delloft for drift) was ~13 mia. kr BELOW
 *   the expenditure ceiling, partly due to 5.75 mia. writedowns on
 *   Erhvervsministeriet loss provisions.
 * - Fourth consecutive year with a state surplus (since 2021).
 * - State debt fell to 217 mia. kr (7.4% of GDP).
 *
 * Sources: Statsregnskabet 2024 (oes.dk), Udgiftslofter og statens finanser
 *          Nov 2024 (fm.dk), DST OFF3K, Copenhagen Post, Eurostat gov_10a_exp.
 */
const BUDGET_VS_ACTUAL = [
    {
        sector: "Sundhedsvæsen",
        icon: "",
        budgetBn: 283.0,  // ~278 actual + slight budget overestimate; health expenditure rose 4% in 2024
        actualBn: 278.0,  // DST: healthcare expenditures 278 mia. kr in 2024; hospitals ~128 mia. (46%)
        color: "#ef4444",
        note: "Sundhedsudgifterne steg 4% i 2024. Det er den første stigning siden 2021. Hospitaler tegner sig for 46% (128 mia. kr). Underforbrug skyldes forsinkede sygehusbyggerier og ubesatte stillinger."
    },
    {
        sector: "Social beskyttelse",
        icon: "",
        budgetBn: 340.0,  // Largest single post; indkomstoverførsler budgetteret til 322.75 mia. under delloft + additional transfers
        actualBn: 331.0,  // Lavere ledighed end forventet; sociale pensioner 223.2 mia + øvrige persontilskud 87.2 mia + tjenestemandspensioner 30 mia = ~340 mia from statsregnskab but some is state-only
        color: "#f97316",
        note: "Overførsler er lovbundne og følger konjunktur. Lavere ledighed end forventet = lavere dagpengeudgifter. Sociale pensioner: 223,2 mia. kr, øvrige persontilskud: 87,2 mia. kr, tjenestemandspensioner: 30,0 mia. kr."
    },
    {
        sector: "Uddannelse",
        icon: "",
        budgetBn: 162.0,  // Includes folkeskole (municipal), gymnasier, universities, SU
        actualBn: 156.5,  // Underspending on SU (fewer recipients), delayed university projects
        color: "#3b82f6",
        note: "Underforbrug pga. færre SU-modtagere end budgetteret og forsinkede universitetsprojekter. Forskning & udvikling: 22,8 mia. kr budgetteret i FL2025."
    },
    {
        sector: "Forsvar",
        icon: "",
        budgetBn: 42.0,   // Finansloven 2024 defense budget 36.2 mia. + additional security/NATO
        actualBn: 36.2,   // fmn.dk: total defence budget 36.2 mia. kr on Finansloven 2024
        color: "#6366f1",
        note: "Kronisk underforbrug. Forsinkede materielanskaffelser og rekrutteringsproblemer. Forsvarsforlig 2024-2033: 195 mia. kr over 10 år + accelerationsfond på 50 mia. kr i 2025-2026."
    },
    {
        sector: "Transport & infrastruktur",
        icon: "",
        budgetBn: 67.0,
        actualBn: 59.5,
        color: "#06b6d4",
        note: "Store anlægsprojekter forsinkes systematisk. Femern-forbindelsen: fra 55 mia. til 80+ mia. kr. Signalprogrammet: fra 22 mia. til 30+ mia. kr og 7+ års forsinkelse."
    },
    {
        sector: "Miljø & klima",
        icon: "",
        budgetBn: 62.5,
        actualBn: 57.0,
        color: "#22c55e",
        note: "Grøn omstilling budgetteret ambitiøst, men implementeringen halter. CO2-fangst-projekter og landbrugsaftalen forsinkede."
    },
    {
        sector: "Politi & retsvæsen",
        icon: "",
        budgetBn: 26.0,   // 0.9% of GDP = ~26 mia. (Eurostat COFOG: public order & safety)
        actualBn: 25.3,
        color: "#8b5cf6",
        note: "Relativt tæt match. Politiet bruger næsten hele bevillingen. Laveste udgift til offentlig orden i EU (0,9% af BNP i 2023)."
    },
    {
        sector: "Offentlig administration",
        icon: "",
        budgetBn: 84.0,   // Delloft for driftsudgifter 281 mia.; admin share ~30%
        actualBn: 80.0,
        color: "#78716c",
        note: "IT-systemer og digitaliseringsprojekter driver underforbruget. Bloktilskud til kommuner/regioner: 216,1 mia. kr. Driftsudgifter under loftet med ~13 mia. kr i 2023."
    },
];

/**
 * Operational cost breakdown: how money is actually spent INSIDE the public sector.
 * When a sector receives its budget, here's the typical split.
 *
 * Sources:
 * - Statsregnskabet 2024 (oes.dk)
 * - DST quarterly accounts: Q3 2025 showed aflønning af ansatte = 108,0 mia. kr
 *   per quarter (~432 mia./year), out of total quarterly expenditure of ~350 mia.
 * - Eurostat COFOG economic breakdown (gov_10a_exp): EU avg health =
 *   23.1% compensation of employees, 16.8% intermediate consumption,
 *   3.4% GFCF, ~53% social transfers. Denmark is above EU avg on salaries.
 * - World Bank / Trading Economics: compensation of employees = ~11% of
 *   total government expense (central government only). For general government
 *   (incl. municipalities/regions), it is much higher at ~32%.
 * - Moderniseringsstyrelsen: public sector workforce data.
 * - Regionernes pris- og lønregulering 2024: 3.6% for sundhed excl. medicin.
 * - Regionernes anlægsramme 2025: 800 mio. kr til IT og medicoudstyr +
 *   50 mio. kr til cybersikkerhed.
 *
 * Note: "salaries" for general government (including municipalities/regions)
 * is approximately 32% of total expenditure. For direct operations (excl.
 * transfers), salaries dominate at 52-72% depending on sector.
 */
const OPERATIONAL_BREAKDOWN = {
    // Average across all public sector OPERATIONAL spending (excl. pure transfers)
    overall: {
        label: "Gennemsnit for hele den offentlige sektor (drift)",
        salaries: 52.0,        // Lønninger - largest cost; ~432 mia./yr for general gov
        transfers: 22.0,       // Overførsler til borgere (in relevant sectors)
        buildings: 6.5,        // Bygninger, husleje, vedligeholdelse
        equipment: 4.0,        // Udstyr, materialer, inventar
        it: 5.5,               // IT-systemer, licenser, drift
        consultants: 4.5,      // Konsulenter & ekstern rådgivning (~12-15 mia. kr/år total)
        other: 5.5,            // Transport, rejser, diverse
    },

    // Per-sector breakdown: where the money goes INSIDE each sector
    healthcare: {
        label: "Sundhedsvæsen (278 mia. kr i 2024)",
        icon: "",
        salaries: 64.0,        // Hospitals are very labor-intensive; DK above EU avg
        medicine: 12.0,        // Medicin; only 42% of pharma spending publicly covered (EU: 59%)
        buildings: 8.0,        // Massive hospital construction program (supersygehuse)
        equipment: 7.0,        // Medical equipment; regions allocated 800 mio. for IT+medico 2025
        it: 4.0,               // Sundhedsplatformen, EPJ systems
        consultants: 1.5,
        other: 3.5,
        customLabels: {
            medicine: "Medicin & behandlingsudstyr",
        }
    },
    education: {
        label: "Uddannelse (156,5 mia. kr i 2024)",
        icon: "",
        salaries: 72.0,        // Highest salary share - teachers, professors
        su: 8.0,               // SU-udbetalinger
        buildings: 7.0,        // School and university buildings
        equipment: 3.5,
        it: 5.0,
        consultants: 1.5,
        other: 3.0,
        customLabels: {
            su: "SU-udbetalinger",
        }
    },
    administration: {
        label: "Offentlig administration (80 mia. kr i 2024)",
        icon: "",
        salaries: 48.0,
        buildings: 8.0,
        equipment: 2.5,
        it: 18.0,              // IT is the big cost driver here: MitID, Borger.dk, NemID, etc.
        consultants: 14.0,     // Highest consultant share of any sector
        other: 9.5,
    },
    defense: {
        label: "Forsvar (36,2 mia. kr i 2024)",
        icon: "",
        salaries: 42.0,
        materiel: 25.0,        // Materiel spending rising with new forsvarsforlig
        buildings: 10.0,
        equipment: 8.0,
        it: 5.0,
        consultants: 3.0,
        other: 7.0,
        customLabels: {
            materiel: "Militært materiel & våben",
        }
    },
};

/**
 * Default operational cost labels (Danish)
 */
const COST_LABELS = {
    salaries: "Lønninger til ansatte",
    transfers: "Overførsler til borgere",
    buildings: "Bygninger & vedligeholdelse",
    equipment: "Udstyr & materialer",
    it: "IT-systemer & digitalisering",
    consultants: "Konsulenter & ekstern rådgivning",
    other: "Øvrige driftsudgifter",
    medicine: "Medicin & behandlingsudstyr",
    su: "SU-udbetalinger",
    materiel: "Militært materiel & våben",
};

const COST_COLORS = {
    salaries: "#3b82f6",
    transfers: "#f97316",
    buildings: "#8b5cf6",
    equipment: "#06b6d4",
    it: "#eab308",
    consultants: "#ef4444",
    other: "#94a3b8",
    medicine: "#22c55e",
    su: "#ec4899",
    materiel: "#6366f1",
};

/**
 * Quarterly spending flow: how money moves through the fiscal year.
 *
 * Danish fiscal year = calendar year (January-December).
 * Clear seasonal pattern visible in DST quarterly accounts (OFF3K):
 * - Q4 2024: public expenditure growth accelerated to +1.6% qoq
 * - Q1 2025: government consumption contracted -1.1% qoq (sharpest since end-2023)
 * - Q3 2025: total public expenditure 349.9 mia. kr
 *   (aflønning 108.0 mia. + indkomstoverførsler 107.8 mia.)
 * - Q4 2025: government spending rose to 157.6 mia. kr (from 149.3 in Q3)
 *
 * The Q4-spike / Q1-contraction pattern is consistent with year-end
 * budget exhaustion behavior driven by the bevillingsregler.
 *
 * Sources: DST OFF3K, Trading Economics, FocusEconomics Denmark GDP reports.
 */
const QUARTERLY_FLOW = {
    pattern: [
        {
            quarter: "Q1 (jan-mar)",
            percentSpent: 22,
            cumulative: 22,
            note: "Langsom start. Nye bevillinger skal fordeles, ansættelsesprocesser kører, udbud igangsættes. Q1 2025 viste -1,1% fald i offentligt forbrug. Det var det skarpeste fald siden Q4 2023.",
            status: "under"
        },
        {
            quarter: "Q2 (apr-jun)",
            percentSpent: 24,
            cumulative: 46,
            note: "Drift normaliserer sig. Anlægsprojekter kommer i gang. Stadig under gennemsnit.",
            status: "under"
        },
        {
            quarter: "Q3 (jul-sep)",
            percentSpent: 23,
            cumulative: 69,
            note: "Sommerperiode. Lavere aktivitet pga. ferie. Q3 2025: samlede udgifter 349,9 mia. kr. Aflønning 108,0 mia. + overførsler 107,8 mia.",
            status: "under"
        },
        {
            quarter: "Q4 (okt-dec)",
            percentSpent: 31,
            cumulative: 100,
            note: "\"Brug-det-eller-mist-det\" kvartal. Q4 2024: udgiftsvækst +1,6% qoq. Q4 2025: 157,6 mia. kr (op fra 149,3 i Q3). Hastige indkøb, kontraktunderskrifter og konsulenthonorarer stiger markant.",
            status: "over"
        }
    ],
    carryoverExplanation: "Driftsbevillinger kan videreføre overskud til næste år, men nettoforbrug af ministerområdets opsparede midler skal være nul eller negativt. Det vil sige, man kan spare op, men ikke bruge opsparingen uden Finansministeriets dispensation. Lovbundne bevillinger (pension, dagpenge, SU) kan IKKE videreføres. Ubrugte midler tilgår statskassen. Reservationsbevillinger bortfalder efter 2 år uden aktivitet. Regionerne og kommunerne har kassekreditreglen, som kræver positiv gennemsnitslikviditet over 12 måneder.",
    totalCarryoverBn: 18.5, // Estimated annual carryover across state institutions
    /** Detailed carry-forward rules reference */
    carryoverRules: {
        driftsbevilling: "Overskud kan videreføres, men nettoforbrug af opsparing skal være neutralt eller negativt for ministerområdet. Dispensation fra FM kræves for nettoforbrug.",
        reservationsbevilling: "Kan videreføres for specifikke projekter. Bortfalder efter 2 år uden disponering.",
        lovbundenBevilling: "Ingen videreførsel. Uforbrugt bevilling tilgår statskassen.",
        andenBevilling: "Hovedregel: ingen videreførsel. Undtagelse: ansøgninger modtaget i bevillingsåret kan videreføres 1 år.",
        kommuner: "Kassekreditreglen: gennemsnitlig likviditet over 12 måneder skal være positiv. Kan svinge kvartal-for-kvartal.",
        regioner: "Driftsramme aftales årligt med regeringen. Historisk løft i 2025 (største i 14 år).",
    },
};

/**
 * Known spending issues: concrete examples of waste, overhead and inefficiency.
 *
 * Sources:
 * - DR: "Her er 8 store offentlige it-skandaler til milliarder" (dr.dk)
 * - Version2: "Statens it-projekter er skredet med tre milliarder på fire år" (version2.dk)
 * - Version2: "Samlet regning for EFI-skandale: Over én milliard kroner"
 * - Aarhus University: "Cost Performance in Major Public IT Projects" - Denmark
 *   average cost overrun 108%, max 414%; Norway avg 8%, max 84%.
 * - Finansministeriet: "Regeringen når 2 mia. i besparelser på det offentlige
 *   konsulentforbrug" (fm.dk, 2020)
 * - Rigsrevisionen: multiple audit reports on state accounts.
 * - Statens IT-råd: 24 of 40 monitored projects flagged; 12 red-light status.
 */
const SPENDING_ISSUES = [
    {
        icon: "",
        title: "IT-skandaler",
        amount: "Statens IT-projekter skredet med 3,5 mia. kr over 4 år (97 projekter)",
        examples: [
            "EFI (Et Fælles Inddrivelsessystem): SKATs inddrivelsessystem kostede over 1 mia. kr og blev skrottet efter 2 år. Ca. 114 mia. kr i uinddrevet gæld ophobede sig. Kaldt \"verdens dyreste IT-lektion\". Skulle have virket i 2007, derefter 2009. Lanceret 2013 med fejl. Internt kaldet \"7-9-13\".",
            "Amanda (Arbejdsmarkedsstyrelsen): Skrottet 2008. Kostede ca. 1 mia. kr. 5 års forsinkelse.",
            "Polsag (Politiets sagsbehandling): Skrottet 2012. Ca. 400-500 mio. kr. Fungerede ikke efter pilottest på Bornholm.",
            "DeMars (Forsvarets IT): 6 års forsinkelse, budgetoverskridelse på min. 400 mio. kr.",
            "PROASK (Arbejdsskadestyrelsen): Skrottet 2014. Kostede 164 mio. kr.",
            "Digital Tinglysning: 1,5 års forsinkelse, budgetoverskridelse på 266 mio. kr.",
            "Aarhus Universitet-studie: Gennemsnitlig budgetoverskridelse på danske offentlige IT-projekter er 108% (vs. 8% i Norge). Max overskridelse: 414% (DK) vs. 84% (NO).",
            "Statens IT-råd: 24 af 40 overvågede projekter har advarselslamper. 12 har rød status (meget alvorlige problemer)."
        ],
        severity: "high"
    },
    {
        icon: "",
        title: "Konsulentforbrug",
        amount: "Ca. 12-15 mia. kr./år totalt; besparelsesmål på 3 mia./år (kun 2 mia. nået)",
        examples: [
            "Staten bruger ~4-5 mia. kr./år på konsulenter (McKinsey, Deloitte, PwC, Accenture m.fl.). Besparelse aftalt: 0,9 mia. kr./år fra FL2020.",
            "Kommunerne bruger ~8-10 mia. kr./år. Besparelse: fra 0,5 mia. (2021) stigende til 1,0 mia. (2025).",
            "Regeringens ambition var 3 mia. kr./år i konsulentbesparelser, men kun 2 mia. er realiseret (fm.dk, 2020).",
            "Offentlig sektor mangler intern IT-ekspertise efter outsourcing i 1990'erne. Eksperterne sidder hos konsulentfirmaer.",
            "Mange konsulenthonorarer ligger 3-5x over hvad en fastansat ville koste for samme arbejde."
        ],
        severity: "high"
    },
    {
        icon: "",
        title: "Anlægsoverskridelser",
        amount: "Typisk 20-40% budgetoverskridelse på store projekter",
        examples: [
            "Signalprogrammet (DSB/Banedanmark): Fra 22 mia. til 30+ mia. kr. og 7+ års forsinkelse.",
            "Supersygehuse: Nyt Aalborg Universitetshospital, Nyt OUH. Alle har overskredet budget med milliarder.",
            "Femern-forbindelsen: Oprindeligt budget 55 mia. kr., nu estimeret til 80+ mia. kr.",
            "Cityringen (M3): Fra 15 mia. til 24+ mia. kr.",
            "Vurderingsstyrelsens ejendomsvurdering: Oprindeligt <100 mio. kr, nu estimeret til 3+ mia. kr."
        ],
        severity: "high"
    },
    {
        icon: "",
        title: "Administrativ vækst",
        amount: "Offentlig beskæftigelsesandel rekordlav (27,2%), men ledere steget 30% på 15 år",
        examples: [
            "Danmark har ca. 800.000 offentligt ansatte. Det er næstflest pr. indbygger i OECD.",
            "Den offentlige andel af beskæftigelsen er rekordlav: 27,2% vs. gennemsnit 28,7% siden 1980 (AE-rådet, 2024).",
            "Antallet af chefer og mellemledere er steget langt hurtigere end frontmedarbejdere (sygeplejersker, lærere, pædagoger).",
            "Inden for undervisning, sundhed og social beskyttelse er antallet af ansatte ift. brugerne faldet siden 2008.",
            "Dokumentationskrav og kontrol er steget markant. Mere tid bruges på at rapportere end på kerneopgaven.",
            "32% af centralt ansatte er unge 18-34 (OECD gns: 19%), men udskiftning er høj og institutionel viden tabes."
        ],
        severity: "medium"
    },
    {
        icon: "",
        title: "Q4-forbrug (\"december-feber\")",
        amount: "~31% af årsbudgettet bruges i Q4 (vs. 25% ved jævn fordeling)",
        examples: [
            "Q4 2024: udgiftsvækst accelererede til +1,6% qoq. Q1 2025: -1,1% qoq fald (skarpeste siden Q4 2023).",
            "Bevillingsreglerne skaber incitament: driftsbevillinger kan videreføres, men nettoforbrug af opsparing skal godkendes af FM.",
            "Lovbundne bevillinger bortfalder helt. Ubrugte midler tilgår statskassen.",
            "Konsulentkøb stiger markant i oktober-december.",
            "Rigsrevisionen har gentagne gange påpeget at indkøb i Q4 ofte har lavere kvalitetskontrol."
        ],
        severity: "medium"
    },
    {
        icon: "",
        title: "Dobbeltadministration",
        amount: "Stat, 5 regioner og 98 kommuner duplikerer opgaver",
        examples: [
            "Samme borger registreres i flere systemer der ikke taler sammen.",
            "Sundheds-IT: Regionerne har forskellige systemer der ikke er kompatible. Sundhedsplatformen (Region Hovedstaden): 3,8 mia. kr, massivt kritiseret.",
            "Beskæftigelsesindsatsen: Kommuner, A-kasser og Jobnet overlapper.",
            "Kontrolinstanser kontrollerer hinanden. Lag-på-lag af tilsyn.",
            "Strukturreformen i 2007 lovede færre administratorer. Resultatet blev det modsatte."
        ],
        severity: "medium"
    },
];

/**
 * KEY DATA SOURCES - for transparency and further development.
 * These are the authoritative sources for Danish public spending data.
 */
const DATA_SOURCES = {
    primary: [
        {
            name: "Statsregnskabet 2024",
            url: "https://oes.dk/statsregnskab/statens-regnskaber/statsregnskabet/statsregnskabet-2024/",
            description: "Official state accounts. Published March 2025 by Økonomistyrelsen.",
            dataType: "Actual expenditure by ministry (paragraf), DAU-saldo, bevillingsafregning."
        },
        {
            name: "Finansloven (Finance Act)",
            url: "https://fm.dk/udgivelser/2025/februar/finanslov-for-finansaaret-2025/",
            description: "Annual budget law. 3,742 pages organized by 29 paragraphs (ministries).",
            dataType: "Budgeted expenditure by ministry. Database at fm.dk allows custom queries."
        },
        {
            name: "Statistikbanken / StatBank Denmark",
            url: "https://www.statbank.dk/",
            description: "Danmarks Statistik interactive data tables.",
            dataType: "Key tables: OFF3K (quarterly govt finance), OFF29 (COFOG breakdown), OFF24 (expenditure by function & consumption group)."
        },
        {
            name: "Udgiftslofter og statens finanser",
            url: "https://fm.dk/",
            description: "Finansministeriet semi-annual publication on expenditure ceilings.",
            dataType: "DAU-saldo forecasts, expenditure ceiling compliance, deviations from budget."
        },
    ],
    secondary: [
        {
            name: "Eurostat gov_10a_exp",
            url: "https://ec.europa.eu/eurostat/databrowser/view/gov_10a_exp/default/table?lang=en",
            description: "COFOG breakdown for all EU countries. Allows economic transaction breakdown.",
            dataType: "Expenditure by COFOG function AND economic type (salaries, goods, GFCF, transfers)."
        },
        {
            name: "OECD Government at a Glance",
            url: "https://www.oecd.org/en/publications/government-at-a-glance-2025-country-notes_da3361e1-en/denmark_d54729ff-en.html",
            description: "Biennial OECD publication. Denmark country note.",
            dataType: "Cross-country comparisons of spending, employment, trust, digital government."
        },
        {
            name: "Budgetvejledning / ØAV (bevillingsregler)",
            url: "https://oes.dk/statsregnskab/oekonomisk-administrativ-vejledning-oeav/bevillingsregler/",
            description: "The rules governing how appropriations can be spent, carried forward, and lapsed.",
            dataType: "Legal framework for all appropriation types."
        },
        {
            name: "Rigsrevisionen (National Audit Office)",
            url: "https://www.rigsrevisionen.dk/",
            description: "Independent auditor of state accounts. Reports to Folketinget.",
            dataType: "Audit findings, compliance reports, special investigations."
        },
    ],
    apis: [
        {
            name: "StatBank API (Danmarks Statistik)",
            url: "https://www.dst.dk/en/Statistik/statistikbanken/api",
            description: "Free JSON/CSV API for all StatBank tables.",
            example: "GET https://api.statbank.dk/v1/data/OFF3K/JSONSTAT?lang=en"
        },
        {
            name: "Eurostat API (SDMX REST)",
            url: "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/gov_10a_exp/",
            description: "EU-wide COFOG data via SDMX API.",
            example: "Filter: A.MIO_NAC.DK.S13.TE.GF07 (annual, mio DKK, Denmark, general govt, total expenditure, health)"
        },
    ],
};
