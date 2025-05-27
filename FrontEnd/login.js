function postLogin() {
    const submit = document.querySelector("form");
    submit.addEventListener("submit", async function (event) {
        event.preventDefault();
        let reponse = "";
        if (!mail.validity.valid || !password.validity.valid) {
            showError(reponse);
        } 

        const login = {
            email: document.querySelector("[name=email").value,
            password: document.querySelector("[name=psw]").value,
        }
        

        const body = JSON.stringify(login);

        reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "accept": "application/json", "Content-Type": "application/json" },
            body: body
        })
        console.log(reponse)
        if (reponse.status != 200){
            showError(reponse)
        }
        const log = await reponse.json();
        console.log(log)
        
        if (log.token) {
            
            /* const token = JSON.stringify(log.token); */

            window.sessionStorage.setItem("token", log.token);
            location.href = "index.html"
            console.log(window.sessionStorage)
        } 
        
    })

}

function showError(reponse) {
    
    const emailError = document.querySelector(".error");
    if (mail.validity.valueMissing && password.validity.valueMissing ) {
        emailError.textContent = " Entrez votre email et mot de passe";   
    } else if (mail.validity.valueMissing){
        emailError.textContent = "Entrez votre email";
    } else if (mail.validity.typeMismatch) {
        emailError.textContent = "Erreur, vous devez entrez une adresse email";
    } else if (password.validity.valueMissing){
        emailError.textContent = "Entrez votre mot de passe"
    } else if (reponse.status == 401){
        emailError.textContent = "Mot de passe incorrect"
    } else if (reponse.status == 404){
        emailError.textContent = "Aucun compte associé à cette adresse email"
    }
    
  }

const mail = document.getElementById("email");
const password = document.getElementById("psw");
postLogin();



