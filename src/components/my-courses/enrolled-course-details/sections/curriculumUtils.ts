// Utility functions for session and class status

export function parseLastSession(s: string): number {
    const nums = s.match(/\d+/g);
    return nums ? Math.max(...nums.map(Number)) : 0;
}

export function parseFirstSession(s: string): number {
    const nums = s.match(/\d+/g);
    return nums ? Math.min(...nums.map(Number)) : 0;
}