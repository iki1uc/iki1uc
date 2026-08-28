// --- µ1 / µ2 / µ3: Atomare Systemstruktur ---
const VEC = {
    active: true,     // µ1
    state: "idle",    // µ2
    passage: false    // µ3
};

// --- µ9: Funktionsmatrix ---
const VEC9 = {
    vector: true,
    genie: true,
    control: false,
    pulse: 0,
    orbit: 0,
    drift: 0,
    rating: 0,
    route: null,
    trade: null
};

// --- µ81: Cluster-Matrix ---
const VEC81 = {
    trades: Array(81).fill(null)
};

// --- µ9: DOO/IT Kontrolle ---
function DOO_control() {
    VEC9.control = true;
    VEC.state = "control-ready";
    return "DOO/IT Kontrolle aktiviert.";
}

// --- µ3: DOOR Übergang ---
function DOOR_passage() {
    VEC.passage = true;
    VEC.state = VEC9.control ? "stable-transition" : "tmp-transition";

    return VEC9.control
        ? "DOOR stabil geöffnet → Kontrolle aktiv."
        : "DOOR geöffnet (tmp) → Übergang ohne Kontrolle.";
}

// --- µ9: VECTOR Routing ---
function VECTOR_route(input) {
    if (!VEC.passage) return "Kein Übergang aktiv.";

    VEC9.route = input;
    return `Routing über .VECTOR: ${input}`;
}

// --- µ9: GENIE Bewertung (deterministisch) ---
function GENIE_rate(value) {
    if (!VEC9.genie) return "GENIE nicht aktiv.";

    const p = value.length;
    const v = p % 9;
    const i = (p * v) % 9;

    VEC9.pulse = (p + v + i) % 9;
    VEC9.orbit = (p * v * i) % 9;
    VEC9.drift = (p - v + i) % 9;

    VEC9.rating = VEC9.pulse + VEC9.orbit + VEC9.drift;

    return `GENIE Bewertung für '${value}': ${VEC9.rating}`;
}

// --- µ81: Trade-Cluster ---
function VEC_trade(item) {
    if (!VEC.passage) return "Trade blockiert → kein Übergang.";

    const rating = GENIE_rate(item);

    const index = VEC81.trades.findIndex(t => t === null);
    if (index === -1) return "µ81 Matrix voll.";

    VEC81.trades[index] = { item, rating };

    return `Trade ausgeführt: ${item} → ${rating}`;
}

module.exports = {
    VEC,
    VEC9,
    VEC81,
    DOO_control,
    DOOR_passage,
    VECTOR_route,
    GENIE_rate,
    VEC_trade
};
