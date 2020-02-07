//validating data from first part and switching to second if is valid

function validate(){
    // validate
    setTimeout(function() {window.location = 'konspekt_elementy.html' });
}

let obj = {
    table: []
};
let id = 0;

let active = false;
let elementsValues = [];
let elementsBindings = [];


function showAddElement(){
    let button = document.querySelector('[name="dodaj_element_konspektu"]');
    let add = document.getElementById('hidable');
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

function eraseElement(){
    document.querySelector('[name="nazwa_elementu"]').value="";
    document.querySelector('[name="forma"]').value="";
    document.querySelector('[name="przewidywany_czas"]').value="";
    document.querySelector('[name="przewidywany_czas_text"]').value="";
    document.querySelector('[name="cel_srodroczny"]').value="";
    document.querySelector('[name="potrzebne_do_elementu"]').value="";
    showAddElement();
}

function checkIfNotEmpty(){
    if (document.querySelector('[name="nazwa_elementu"]').value === ''){
        return false;
    }
    else if (document.querySelector('[name="forma"]').value === ''){
        return false;
    }
    else if (document.querySelector('[name="przewidywany_czas"]').value === '' || document.querySelector('[name="przewidywany_czas"]').value < 0){
        return false;
    }
    else return document.querySelector('[name="przewidywany_czas_text"]').value !== '';
}

function checkIfNotEmptyEdit(edit){
    // check name
    if (edit.childNodes[0].lastChild.value === ''){
        return false;
    }
    // check form
    else if (edit.childNodes[1].lastChild.value === ''){
        return false;
    }
    // check time
    else if (edit.childNodes[2].childNodes[3].value === '' || edit.childNodes[2].childNodes[3].value < 0){
        return false;
    }
    // check time description
    else return edit.childNodes[2].lastChild.value !== '';
}

function addElement(){

    //dodawanie danych do obiektu
    if(checkIfNotEmpty()){
        obj.table.push({
            id: id,
            nazwa_elementu: document.querySelector('[name="nazwa_elementu"]').value,
            forma: document.querySelector('[name="forma"]').value,
            przewidywany_czas: document.querySelector('[name="przewidywany_czas"]').value,
            przewidywany_czas_text: document.querySelector('[name="przewidywany_czas_text"]').value,
            cel: document.querySelector('[name="cel_srodroczny"]').value,
            potrzebne_elementy: document.querySelector('[name="potrzebne_do_elementu"]').value,
            test: "true"
        });


        let element = [
            document.querySelector('[name="nazwa_elementu"]').value,
            document.querySelector('[name="forma"]').value,
            document.querySelector('[name="przewidywany_czas"]').value,
            document.querySelector('[name="przewidywany_czas_text"]').value,
            document.querySelector('[name="cel_srodroczny"]').value,
            document.querySelector('[name="potrzebne_do_elementu"]').value,
        ];

        elementsValues.push(element);
        // adding list item and hidden element to edit this item
        let list = document.getElementById("list");
        let element_title = document.createElement("span");
        let element_form = document.createElement("span");
        let element_time = document.createElement("span");
        let has_goal = document.createElement("img");
        let new_element = document.createElement("div");
        let new_element_edit = document.createElement("div");

        if(element[0].length > 40) {
            element_title.innerHTML = "Tytuł: " + element[0].substr(0, 37) + "...";
        }
        else {
            element_title.innerHTML = "Tytuł: " + element[0];
        }
        element_title.className = "ElementSpanName";
        if(element[1].length > 40) {
            element_form.innerHTML = "  Forma: " + element[1].substr(0, 37) + "...";
        }
        else {
            element_form.innerHTML = "  Forma: " + element[1];
        }
        element_form.className = "ElementSpan";
        if(element[2].length > 10) {
            element_time.innerHTML = "  Czas: " + element[2].substr(0, 7) + "..." + " " + element[3];
        }
        else {
            element_time.innerHTML = "  Czas: " + element[2] + " " + element[3];
        }
        element_time.className = "ElementSpan";
        has_goal.src="../images/konspekt/has_goal.png";
        if(element[4] !== "")has_goal.style.display="inline";
        has_goal.setAttribute("alt","maCel");
        new_element.className = "listElement";
        new_element.appendChild(element_title);
        new_element.appendChild(element_form);
        new_element.appendChild(element_time);
        new_element.appendChild(has_goal);
        new_element.style.display = "flex";
        new_element.style.cursor = "pointer";
        new_element_edit.className = "edit";
        let new_element_edit_line1 = document.createElement("div");
        let new_element_edit_line2 = document.createElement("div");
        let new_element_edit_line3 = document.createElement("div");
        let new_element_edit_line4 = document.createElement("div");
        let new_element_edit_line5 = document.createElement("div");
        let new_element_edit_line6 = document.createElement("div");
        new_element_edit_line1.className = "editLine";
        new_element_edit_line2.className = "editLine";
        new_element_edit_line3.className = "editLine";

        // new_element_edit_line3.style.display = 'flex';
        // new_element_edit_line3.style.flexFlow = 'row';
        // new_element_edit_line3.style.verticalAlign = 'middle';
        // new_element_edit_line3.style.marginTop = '0.5rem';
        // new_element_edit_line3.style.marginBottom = '0.5rem';
        // new_element_edit_line3.style.maxWidth = '100%';
        // new_element_edit_line3.style.height = '2rem';

        new_element_edit_line4.className = "editLine";
        new_element_edit_line5.className = "editLine";
        new_element_edit_line6.className = "editLine";

        new_element_edit_line1.innerHTML = `
        <div class="addButtons" onclick="moveUp()">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z" fill="#071A3F"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </div>    
            <label style="min-width: 5%; margin-right: 2.5%;">Nazwa elementu</label>
            <input type="text" name="edit_nazwa_elementu" minlength = "1" value = "${element[0]}">`;
        new_element_edit_line2.innerHTML = `
            <datalist id="edit_time_des">
                <option value="sekund">
                <option value="sekundy">
                <option value="minut">
                <option value="minuty">
                <option value="godzin">
                <option value="godziny">
            </datalist>
            <label style="min-width: 8%">Forma</label>
            <textarea name="edit_forma" rows="3">${element[1]}</textarea>`;

        new_element_edit_line3.innerHTML = `
            <label style="min-width: 8%;">Przewidywany czas</label>
            <input type="number" name="edit_przewidywany_czas" class="dzialaj_czasie" min="1" pattern="[1-9]{1}[0-9]*" value = "${element[2]}">
            <input list="edit_time_des" name="edit_przewidywany_czas_text" value = "${element[3]}">`;

        new_element_edit_line4.innerHTML = `
        <label style="min-width: 8.25%;">Cel śródroczny</label>
        <input type="text" name="edit_cel_srodroczny" value = "${element[4]}">`;

        new_element_edit_line5.innerHTML = `
            <label>Potrzebne do elementu</label>
            <textarea name="edit_potrzebne_do_elementu" rows="3" >${element[5]}</textarea>`;
        new_element_edit_line5.style.alignContent = "baseline";

        new_element_edit_line6.style.justifyContent = "space-between";
        new_element_edit_line6.innerHTML = `
        <div class="addButtons" onclick="moveDown()">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" fill="#071A3F"/><path d="M0 0h24v24H0z" fill="none"/></svg>        
        </div>
        <div onclick="deleteElement()" class="addButtons" style="margin-left: 60%">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" height="32" width="32">
            <path
                style="stroke-width:1.29237282"
                id="path2"
                fill="#071A3F"
                d="m 5.3008475,19.245763 c 0,1.42161 1.1631356,2.584746 2.5847457,2.584746 h 7.7542378 c 1.42161,0 2.584745,-1.163136 2.584745,-2.584746 V 6.3220338 H 5.3008475 Z M 19.516949,2.4449152 H 15.639831 L 14.347458,1.1525423 H 9.1779661 L 7.8855932,2.4449152 H 4.0084746 V 5.029661 H 19.516949 Z" />
            <path
                id="path4"
                d="M0 0h24v24H0z"
                fill="none" />
        </svg>
        </div>
        <div onclick="editElement()" class="addButtons" style="float:right">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill='#071A3F'/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </div>`;
        // adding id's to bind them together
        let elementId = element[0];
        let editId = "edit "+element[0];

        new_element.id = elementId;
        new_element_edit.id = editId;

        new_element_edit.appendChild(new_element_edit_line1);
        new_element_edit.appendChild(new_element_edit_line2);
        new_element_edit.appendChild(new_element_edit_line3);
        new_element_edit.appendChild(new_element_edit_line4);
        new_element_edit.appendChild(new_element_edit_line5);
        new_element_edit.appendChild(new_element_edit_line6);
        new_element_edit.style.display = "none";

        // binding elements
        let binding = {
            id: id,
            editId: editId,
            elementId: elementId
        };

        elementsBindings.push(binding);

        id++;

        // console.info(new_element_edit)
        list.appendChild(new_element);
        list.appendChild(new_element_edit);
        // console.info(list)
        eraseElement();
        // console.info(obj.table);
    }else{
        window.alert("Należy wypełnić wszystkie pola obowiązkowe:\nNazwa Elementu, Forma, Przewidywany czas oraz opis czasu (minuty lub godziny).");
    }

}

let saveKon = document.getElementById("letsGo");
saveKon.addEventListener("click", () => {

    if(obj.table.length !== 0){

        let counter = 0;
        obj.table.forEach((e) => {
            if(e.potrzebne_elementy.length === 0){
                counter++;
            }
        });
        console.info(counter + " oraz " + obj.table.length);

        if(counter === obj.table.length){

            obj.table[0].potrzebne_elementy = "Brak elementów";
        }

        //console.dir(obj.table);
        $.post("./zapisz_konspekt", { 'tobj': obj.table});
        window.location.href = '/main';
    }else{
        alert("Błąd wprowadzanie danych:\nbrakuje informacji o elemencie");
    }

});

clicked = false;
lastClickedTag = "";

function editElement(){

    if(lastClickedTag !== ""){

        let edit = document.getElementById(lastClickedTag);
        if(checkIfNotEmptyEdit(edit)){
            //determin which element of the list is to edit
            let elementId, valuesId;
            for(let i = 0; i < elementsBindings.length; i++){
                if(elementsBindings[i].editId === lastClickedTag){

                    elementId = elementsBindings[i].elementId;
                    valuesId = elementsBindings[i].id;
                }
            }
            let element = document.getElementById(elementId);
            // let edit = document.getElementById(lastClickedTag);
            //Read updated values - DO NOT TOUCH MAGIC NUMBERS!
            let edited_name = edit.childNodes[0].lastChild.value;
            let edited_form = edit.childNodes[1].lastChild.value;
            let edited_time = edit.childNodes[2].childNodes[3].value;
            let edited_time_description = edit.childNodes[2].lastChild.value;
            let edited_goal = edit.childNodes[3].lastChild.value;
            let edited_to_preapre = edit.childNodes[4].lastChild.value;

            //console.error(edited_name + " " + edited_form + " " + edited_time + edited_time_description + " " + edited_goal + " " + edited_to_preapre);

            //Update elements at display and in elementsValues and obj.table
            if(edited_name.length > 40) {
                element.childNodes[0].innerHTML = "Tytuł: " + edited_name.substr(0, 27) + "...";
            }
            else {
                element.childNodes[0].innerHTML = "Tytuł: " + edited_name;
            }
            if(edited_form.length > 40){
                element.childNodes[1].innerHTML = "Forma: " + edited_form.substr(0, 37) + "...";
            }
            else {
                element.childNodes[1].innerHTML = "Forma: " + edited_form;
            }
            if(edited_time.length > 10){
                element.childNodes[2].innerHTML = "Czas: " + edited_time.substr(0, 7) + "... " + edited_time_description;
            }
            else {
                element.childNodes[2].innerHTML = "Czas: " + edited_time + " " + edited_time_description;
            }

            if(edited_goal !== "") element.lastChild.style.display = 'inline';
            else element.lastChild.style.display = 'none';

            //editing tags in bindings and DOM elements
            element.id = edited_name;
            edit.id = "edit "+edited_name;
            lastClickedTag = edit.id;
            elementsBindings[valuesId].elementId = edited_name;
            elementsBindings[valuesId].editId = "edit "+edited_name;

            elementsValues[valuesId] = [edited_name, edited_form, edited_time, edited_time_description, edited_goal, edited_to_preapre];
            obj.table[valuesId].nazwa_elementu = edited_name;
            obj.table[valuesId].forma = edited_form;
            obj.table[valuesId].przewidywany_czas = edited_time;
            obj.table[valuesId].przewidywany_czas_text = edited_time_description;
            obj.table[valuesId].cel = edited_goal;
            obj.table[valuesId].potrzebne_elementy = edited_to_preapre;


            // console.info(obj.table[valuesId], elementsBindings[valuesId])
            hide(element, lastClickedTag)
        }
        else{
            window.alert("Należy wypełnić wszystkie pola obowiązkowe:\nNazwa Elementu, Forma, Przewidywany czas oraz opis czasu (minuty lub godziny).");
        }
    }
}

function deleteElement(){
    if(lastClickedTag !== ""){
        //determin which element of the list is to edit
        let elementId, valuesId;
        for(let i = 0; i < elementsBindings.length; i++){
            console.info(elementsBindings[i]);
            if(elementsBindings[i].editId===lastClickedTag){
                elementId = elementsBindings[i].elementId;
                valuesId = elementsBindings[i].id;
            }
        }
        let element = document.getElementById(elementId);
        let edit = document.getElementById(lastClickedTag);

        //deleting value from obj.table
        obj.table.splice(valuesId,1);
        elementsValues.splice(valuesId,1);
        elementsBindings.splice(valuesId,1);
        element.remove();
        edit.remove();
        // console.info(obj.table)
    }
}

function moveUp(){
    let originEdit = document.getElementById(lastClickedTag);

    let elementId, originValuesId;
    for(let i = 0; i < elementsBindings.length; i++){
        if(elementsBindings[i].editId === lastClickedTag){
            elementId = elementsBindings[i].elementId;
            originValuesId = elementsBindings[i].id;
        }
    }
    let originElement = document.getElementById(elementId);
    if(originElement.previousSibling!=null){
        // console.info(originEdit, originEdit.previousSibling);
        let swapEdit = originElement.previousSibling;
        let swapElement = swapEdit.previousSibling;
        let swapValuesId = originValuesId-1;
        let parent = originEdit.parentNode;
        // console.info(obj);
        // swap bindings and values
        let help = elementsBindings[originValuesId];
        elementsBindings[originValuesId] = elementsBindings[swapValuesId];
        elementsBindings[swapValuesId] = help;
        help = elementsValues[originValuesId];
        elementsValues[originValuesId] = elementsValues[swapValuesId];
        elementsValues[swapValuesId] = help;
        help = obj.table[originValuesId];
        obj.table[originValuesId] = obj.table[swapValuesId];
        obj.table[swapValuesId] = help;

        // update values
        obj.table[originValuesId].id+=1;
        obj.table[swapValuesId].id-=1;
        elementsBindings[originValuesId].id+=1;
        elementsBindings[swapValuesId].id-=1;
        // console.info(obj);

        //swap DOM elements
        parent.insertBefore(originEdit, swapElement);
        parent.insertBefore(originElement, originEdit);
    }
}

function moveDown(){
    let originEdit = document.getElementById(lastClickedTag);
    if(originEdit.nextSibling!=null){
        let elementId, originValuesId;
        for(let i = 0; i < elementsBindings.length; i++){
            if(elementsBindings[i].editId === lastClickedTag){
                elementId = elementsBindings[i].elementId;
                originValuesId = elementsBindings[i].id;
            }
        }
        let originElement = document.getElementById(elementId);
        // console.info(originEdit, originEdit.nextSibling);
        let swapElement = originEdit.nextSibling;
        let swapEdit = swapElement.nextSibling;
        let swapValuesId = originValuesId+1;
        let parent = originEdit.parentNode;
        // console.info(obj);
        // swap bindings and values
        let help = elementsBindings[originValuesId];
        elementsBindings[originValuesId] = elementsBindings[swapValuesId];
        elementsBindings[swapValuesId] = help;
        help = elementsValues[originValuesId];
        elementsValues[originValuesId] = elementsValues[swapValuesId];
        elementsValues[swapValuesId] = help;
        help = obj.table[originValuesId];
        obj.table[originValuesId] = obj.table[swapValuesId];
        obj.table[swapValuesId] = help;

        // update values
        obj.table[originValuesId].id-=1;
        obj.table[swapValuesId].id+=1;
        elementsBindings[originValuesId].id-=1;
        elementsBindings[swapValuesId].id+=1;
        // console.info(obj);

        //swap DOM elements
        parent.insertBefore(swapEdit, originElement);
        parent.insertBefore(swapElement, swapEdit);

    }

}

function moveUp(){
    let originEdit = document.getElementById(lastClickedTag);

    let elementId, originValuesId;
    for(let i = 0; i < elementsBindings.length; i++){
        if(elementsBindings[i].editId === lastClickedTag){
            elementId = elementsBindings[i].elementId;
            originValuesId = elementsBindings[i].id;
        }
    }
    let originElement = document.getElementById(elementId);
    if(originElement.previousSibling!=null){
        // console.info(originEdit, originEdit.previousSibling);
        let swapEdit = originElement.previousSibling;
        let swapElement = swapEdit.previousSibling;

        let swapValuesId = originValuesId-1;
        let parent = originEdit.parentNode;
        // console.info(obj);
        // swap bindings and values
        let help = elementsBindings[originValuesId];
        elementsBindings[originValuesId] = elementsBindings[swapValuesId];
        elementsBindings[swapValuesId] = help;
        help = elementsValues[originValuesId];
        elementsValues[originValuesId] = elementsValues[swapValuesId];
        elementsValues[swapValuesId] = help;
        help = obj.table[originValuesId];
        obj.table[originValuesId] = obj.table[swapValuesId];
        obj.table[swapValuesId] = help;

        // update values
        obj.table[originValuesId].id+=1;
        obj.table[swapValuesId].id-=1;
        elementsBindings[originValuesId].id+=1;
        elementsBindings[swapValuesId].id-=1;
        // console.info(obj);

        //swap DOM elements
        parent.insertBefore(originEdit, swapElement);
        parent.insertBefore(originElement, originEdit);
    }
}

function moveDown(){
    let originEdit = document.getElementById(lastClickedTag);
    if(originEdit.nextSibling!=null){
        let elementId, originValuesId;
        for(let i = 0; i < elementsBindings.length; i++){
            if(elementsBindings[i].editId === lastClickedTag){
                elementId = elementsBindings[i].elementId;
                originValuesId = elementsBindings[i].id;
            }
        }
        let originElement = document.getElementById(elementId);
        // console.info(originEdit, originEdit.nextSibling);
        let swapElement = originEdit.nextSibling;
        let swapEdit = swapElement.nextSibling;
        let swapValuesId = originValuesId+1;
        let parent = originEdit.parentNode;
        // console.info(obj);
        // swap bindings and values
        let help = elementsBindings[originValuesId];
        elementsBindings[originValuesId] = elementsBindings[swapValuesId];
        elementsBindings[swapValuesId] = help;
        help = elementsValues[originValuesId];
        elementsValues[originValuesId] = elementsValues[swapValuesId];
        elementsValues[swapValuesId] = help;
        help = obj.table[originValuesId];
        obj.table[originValuesId] = obj.table[swapValuesId];
        obj.table[swapValuesId] = help;

        // update values
        obj.table[originValuesId].id-=1;
        obj.table[swapValuesId].id+=1;
        elementsBindings[originValuesId].id-=1;
        elementsBindings[swapValuesId].id+=1;
        // console.info(obj);

        //swap DOM elements
        parent.insertBefore(swapEdit, originElement);
        parent.insertBefore(swapElement, swapEdit);
    }

}

function hide(el, editId){
    el.style.backgroundColor = 'var(--BackgroundDark)';
    el.style.color = 'var(--BackgroundLight)';
    clicked = false;
    lastClickedTag = "";
    this.document.getElementById(editId).style.display='none'
}

function show(el, editId){
    el.style.backgroundColor = 'var(--BackgroundLight)';
    el.style.color = 'var(--BackgroundDark)';
    clicked = true;
    lastClickedTag = editId;
    this.document.getElementById(editId).style.display='inline-block'
}

window.onclick = function(e) {
    // console.info(obj.table)
    let el = e.target;
    if(el.className === "ElementSpan" || el.class === "ElementSpanName"){
        el = el.parentElement;
    }
    if(el.className === "listElement"){
        let editId;
        for(let i = 0; i < elementsBindings.length; i++){
            console.info(elementsBindings[i]);
            if(el.id === elementsBindings[i].elementId) editId = elementsBindings[i].editId
        }
        console.info(editId);
        if(!clicked){
            show(el,editId)
        }
        else if(clicked && lastClickedTag === editId){
            hide(el,editId)
        }


    }
};