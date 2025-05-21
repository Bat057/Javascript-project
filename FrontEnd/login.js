 function postLogin(){
    let rep;
    const submit = document.querySelector("form");
    submit.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const login = {
        email: document.querySelector("[name=email").value,
        password: document.querySelector("[name=psw]").value,
    };
    
    const body = JSON.stringify(login);
    
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"accept": "application/json", "Content-Type": "application/json"},
        body: body
    })
    const log = await reponse.json();
    
    if (log.token){
        console.log(log)
        const token = JSON.stringify(log.token);
    
        window.sessionStorage.setItem("token", token);
        location.href = "index.html"
    }else{
        console.log(log)
        const pError = document.querySelector(".error").style.display = "flex";
    }
    
})

}

postLogin();


