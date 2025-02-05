const login = document.getElementById("login");
const register = document.getElementById("register");

startLogin();

function startLogin() {
    login.showModal();
    register.close();
}

function startRegister() {
    login.close();
    register.showModal();
}

function endAll() {
    login.close();
    register.close();
}