export const getSession = () => JSON.parse(localStorage.getItem('session'));

export const setSession = (session) => {
    localStorage.setItem('session', JSON.stringify(session))};


