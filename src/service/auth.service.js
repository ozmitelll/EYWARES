export const isAuth = () => {
    const token = JSON.parse(localStorage.getItem('auth'));
    return token;
}