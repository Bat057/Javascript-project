function postLogin() {
    const submit = document.querySelector("form");
    submit.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        if (!mail.validity.valid || !password.validity.valid) {
            showError();
        } 

        const login = {
            email: document.querySelector("[name=email").value,
            password: document.querySelector("[name=psw]").value,
        }
        

        const body = JSON.stringify(login);

        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "accept": "application/json", "Content-Type": "application/json" },
            body: body
        })
        const log = await reponse.json();
        
        
        if (log.token) {
            
            const token = JSON.stringify(log.token);

            window.sessionStorage.setItem("token", token);
            location.href = "index.html"
            console.log(window.sessionStorage)
        } 
        
    })

}

function showError() {
    
    const emailError = document.querySelector(".error");
    if (mail.validity.valueMissing && password.validity.valueMissing ) {
        emailError.textContent = " Entrez votre email et mot de passe";   
    } else if (mail.validity.valueMissing){
        emailError.textContent = "Entrez votre email";
    } else if (mail.validity.typeMismatch) {
        emailError.textContent = "Errur, vous devez entrez une adresse email";
    } else if (password.validity.valueMissing){
        emailError.textContent = "Entrez votre mot de passe"
    } 
    
  }

const mail = document.getElementById("email");
const password = document.getElementById("psw");
postLogin();



