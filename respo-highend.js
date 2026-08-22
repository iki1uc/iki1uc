// respo-highend.js
export function respoHighEnd(respoList) {
    return respoList.filter(r =>
        r.includes("81") ||
        r.includes("RESPO") ||
        r.includes("hoch") ||
        r.includes("Q81") ||
        r.includes("X81")
    );
}
