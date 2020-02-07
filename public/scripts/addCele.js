let active = false;
const nazwaCelu = document.querySelector('[name="nazwa_c"]');
const metoda = document.querySelector('[name="cel_metoda"]');
const uwagi = document.querySelector('[name="cel_uwagi"]');
let obj = {
    table: []
};
let elementsValues = [];
let elementsBindings = [];
let id = 0;

// dropdown menu 
function showAddElement(){
    var button = document.querySelector('[name="dodaj_element_celu"]');
    var add = document.getElementById('hidable');
    if(!active){
        button.style.backgroundColor = 'var(--BackgroundDark)';
        button.style.color = 'var(--BackgroundLight)';
        add.style.display = 'inline-block';
        active = true;
    }else{
        button.style.backgroundColor = "var(--BackgroundLight)";
        button.style.color = "var(--BackgroundDark)";
        add.style.display = 'none';
        active = false;
    }
}

//erase data and hide menu
function eraseElement(){
    nazwaCelu.value="";
    uwagi.value="";
    metoda.value="";
    showAddElement();
}

function checkIfNotEmpty(){
    if (nazwaCelu.value === ''){
        
        return false;
    }
    else if (metoda.value === ''){
        return false;
    }
    return true;
}

function addElement(){
    if(checkIfNotEmpty()){

        obj.table.push({
            nazwaCelu: nazwaCelu.value,
            metodaCelu: metoda.value,
            uwagiCelu:  uwagi.value
        });
        
        let new_element = document.createElement("div");
        let title_element = document.createElement("span");
        let method_element = document.createElement("span");
        let lol_element = document.createElement("span");

        title_element.innerText = "Nazwa: " + nazwaCelu.value;
        method_element.innerText = "Metoda: " + metoda.value;

        if(uwagi.value === ""){
            lol_element.innerText = "Uwagi: brak";
        }else{
            lol_element.innerText = "Uwagi: " + uwagi.value;
        }

        new_element.appendChild(title_element);
        new_element.appendChild(method_element);
        new_element.appendChild(lol_element);
        
        new_element.style.display = "flex";
        new_element.className = "listElement";
        new_element.id = id;

        list.appendChild(new_element);

        id++;
        eraseElement();
    }else{
        alert("Należy podać Nazwe celu i metody realizacji jako obowiązkowe pola");
    }  
    
}

let saveCele = document.getElementById("addTargets");
saveCele.addEventListener("click", () => {
    if(obj.table.length !== 0){

        let counter = 0;
        obj.table.forEach((e) => {
            if(e.uwagiCelu.length === 0){
                e.uwagiCelu = "Brak uwag";
            }
        });


        //console.log(obj.table[0].nazwaCelu)
        $.post("./zapisz_cel", { 'celeList': obj.table}); 
        window.location.href = '/main';

    }else{
        alert("Błąd wprowadzanie danych:\nbrakuje informacji o celach");
    }
});