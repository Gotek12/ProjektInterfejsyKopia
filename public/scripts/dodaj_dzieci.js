function changer(div_id, checkbox_id) {
    let to_change = document.getElementById(div_id);
    let c_ = document.getElementById(checkbox_id);
    let isPresent = false;

    if(c_.checked === true){
        isPresent = true;
        to_change.style.backgroundColor = '#071A3F';
        to_change.style.color = '#fff';
    }
    else{
        isPresent = false;
        to_change.style.backgroundColor = '#E2E6D7';
        to_change.style.color = '#000000';
    }
}

function clear_ns() {
    let clear_n = document.getElementById("imie_n_d");
    let clear_n_del = document.getElementById("imie_n_d_del");
    let clear_s = document.getElementById("nazwisko_n_d");
    let clear_s_del = document.getElementById("nazwisko_n_d_del");
    clear_n.value = '';
    clear_n_del.value = '';
    clear_s.value = '';
    clear_s_del.value = '';
}

function checkIfNotEmpty(del_){
    if(del_){
        if (document.querySelector('[name="imie_dziecka_del"]').value === '') {
            return false;
        } else return document.querySelector('[name="nazwisko_d_del"]').value !== '';
    }
    else {
        if (document.querySelector('[name="imie_dziecka"]').value === '') {
            return false;
        } else return document.querySelector('[name="nazwisko_d"]').value !== '';
    }
}

function add_new(){
    if(checkIfNotEmpty(false)){
        let obj = {
           name: document.querySelector('[name="imie_dziecka"]').value,
           surrname: document.querySelector('[name="nazwisko_d"]').value
        };

        let popup = document.getElementById("myPopup");
        popup.classList.toggle("show");

        $.post('/sprObecnosc', {"new_child": obj});

        clear_ns();
        window.alert("Dodano " + obj.name + " " + obj.surrname + " do listy obecności.");
        window.location.href = '/sprObecnosc';
    }
    else {
        window.alert("Należy podać imię oraz nazwisko.");
    }
}

function delete_child(){
    if(checkIfNotEmpty(true)) {
        let obj = {
            name: document.querySelector('[name="imie_dziecka_del"]').value,
            surrname: document.querySelector('[name="nazwisko_d_del"]').value
        };

        let popup = document.getElementById("myPopup_d");
        popup.classList.toggle("show");

        $.post('/sprObecnosc', {"to_del": obj});

        window.alert("Wypisano " + obj.name + " " + obj.surrname + " z listy obecności.");
        clear_ns();
        window.location.href = '/sprObecnosc';
    }
    else {
        window.alert("Należy podać imię oraz nazwisko.");
    }
}