function next(){
    window.location.href = "/main";
}

const el = document.getElementById("sub");
el.addEventListener("click", validateForm);
document.addEventListener("keydown",ev=>{
    if (ev.code ==="Enter"){
        el.click();
    }
 });

function validateForm() {
    let pass = document.loginForm.haslo.value;
    let log = document.loginForm.login.value;
    let info = document.getElementById("error");
    const aE = document.getElementsByClassName("erro");

    let infoDat = ['admin', 'admin', "Alina Malina"];

    if(pass != infoDat[0] || log != infoDat[1]){
        aE[0].classList.add("erro2");
        aE[1].classList.add("erro2");
        info.textContent = "BŁĘDNE DANE";
    }else{
        info.textContent = "";
        aE[0].classList.remove("erro2");
        aE[1].classList.remove("erro2");
        next();
    }
}