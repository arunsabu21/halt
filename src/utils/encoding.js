export function encodeEmailToId(email) {
    return btoa(email);
}

export function decodeIdToEmail(id) {
    try {
        return atob(id);
    } catch {
        return null;
    }
}