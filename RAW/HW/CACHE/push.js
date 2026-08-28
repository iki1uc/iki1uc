function COMMANDER(input) {
    return {
        cmd: input,
        impact: Math.random(),   // Marktimpuls
        time: Date.now()
    };
}
