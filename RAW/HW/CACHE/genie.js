function GENIE_structure(struct) {
    const score = Math.round(Math.random() * 100);
    return {
        id: `S-${Date.now()}`,
        struct,
        score
    };
}
