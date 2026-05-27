export function formateDateKey(date) {
    return date.toISOString().slice(0, 10);
}

export function formatRedeableDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
}