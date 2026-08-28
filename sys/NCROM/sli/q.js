// q.js – Meta (Bindung)
export function Q(meta) {
    return {
        q: meta,
        bind(x, y) {
            return (x * y) + meta;
        }
    };
}
