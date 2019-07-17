export function getToken() {
    return localStorage.getItem("sessionToken");
}

export function setToken(token) {
    localStorage.setItem("sessionToken", token);
}

export function isLoggedIn() {
    return getToken() != undefined;
}

export function logIn(token) {
    if (token) {
        setToken(token);
        return true;
    }
    else {
        return false;
    }
}

export function logOut() {
    localStorage.removeItem("sessionToken");
}