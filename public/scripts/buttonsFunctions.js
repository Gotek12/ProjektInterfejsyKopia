// HOVER
function mouseOver(id_, over_src){
    document.getElementById(id_).src = over_src;
}

function mouseOut(id_, out_src){
    document.getElementById(id_).src = out_src;
}

// CLICK
function redirect(url_){
    window.location.href = url_
}

function darken(id) {
    let mask = document.getElementById(id);
    mask.classList.add('dark_mask');
}

function pop(id){
    let popup = document.getElementById(id);
    popup.classList.toggle("show");
}

function close_pop(){
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("close");
}