function login() {
    var loginx = document.getElementById('login')
    loginx.setAttribute('style', 'display:block')
    var register = document.getElementById('register')
    register.setAttribute('style', 'display: none')
        // background: #242222;
    var btn = document.getElementById('lbtn')
    btn.setAttribute('style', 'background-color: rgb(39, 39, 209);')
    var btnx = document.getElementById('rbtn')
    btnx.setAttribute('style', 'background-color: none')

}

function signup() {
    var register = document.getElementById('register')
    register.setAttribute('style', 'display: block')
    var loginy = document.getElementById('login')
    loginy.setAttribute('style', 'display:none')
    var btn = document.getElementById('rbtn')
    btn.setAttribute('style', 'background-color: rgb(39, 39, 209);')
    var btny = document.getElementById('lbtn')
    btny.setAttribute('style', 'background-color: none')

}

function alertbox() {
    Qual.successd('Congratulations', 'Account Registered Successfully');
}

function emailbox() {
    Qual.errord("Oh no !", "Email is already Registered!");
}

function userbox() {
    Qual.errord("Oh no !", "Username is already Registered!");
}

function comparepass() {
    Qual.warningd("Warning", "Password and Confirm Password must be Same.");
}

function server() {
    Qual.errord("Oh no !", "Something wrong happened");
}