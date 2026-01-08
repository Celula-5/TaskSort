const loginSection = document.getElementById("Section-Login");
const signSection = document.getElementById("Section-Singup");
const btnLogin = document.getElementById("To-login");
const btnSign = document.getElementById("To-sing");

const formLogin = document.getElementById("Login-form");
const formSing = document.getElementById("Sign-form");
const singMessage = document.getElementById("Sing-message");
const loginMessage = document.getElementById("Login-message");

const toggleAuth = () => {
    loginSection.classList.toggle("hidden-form");
    signSection.classList.toggle("hidden-form");
};

btnLogin.addEventListener("click", toggleAuth);
btnSign.addEventListener("click", toggleAuth);

let dataBase = JSON.parse(localStorage.getItem("tasksort_users")) || [
    { email : "TaskSort@example.com", password : "12345678", user: "Juan Pablo"}
]

const saveData = () => {
    localStorage.setItem("tasksort_users" , JSON.stringify(dataBase));
    console.log("synchronization complete");
};

if (localStorage.getItem("current_user")){
    window.location.href = "tasksort.html";
}

formSing.addEventListener("submit", (e) =>{
    e.preventDefault();

    const newUser = {
        email: document.getElementById("Email2").value,
        password: document.getElementById("Password1").value,
        user: document.getElementById("User").value
    };

    const exist = dataBase.some(user => user.email === newUser.email);

    if (exist){
        singMessage.style.color = "red";
        singMessage.textContent = "Email loged."

        setTimeout(() => {
            loginMessage.textContent = "";
        }, 2000);
    }
    else{
        dataBase.push(newUser);
        saveData();
        singMessage.style.color = "green";
        singMessage.textContent = "Account created correctly, you can login";
        formSing.reset();
    }

});

formLogin.addEventListener("submit", (e) =>{
    e.preventDefault();

    const emailInput = document.getElementById("Email1").value;
    const passwordField = document.getElementById("Password");
    const passwordInput = passwordField.value;

    const found = dataBase.find(user => user.email === emailInput && user.password === passwordInput);

    if (found){
        localStorage.setItem('current_user', JSON.stringify(found));
        loginMessage.style.color = "green";
        loginMessage.textContent = `Already, welcome ${found.user}!`;
        setTimeout(() =>{
            window.location.href = "tasksort.html";
        },2000);
        console.log("Users:", dataBase);
    }
    else{
        loginMessage.style.color = "red";
        loginMessage.textContent = "Email or password wrong";

        passwordField.value = ""

        setTimeout(() => {
            loginMessage.textContent = "";
        }, 2000);
    }
});