//validating data from first part and switching to second if is valid

function next(){
    window.location.replace('/konspekt_elementy');
}

const el = document.getElementById("sub");

el.addEventListener("click", next);