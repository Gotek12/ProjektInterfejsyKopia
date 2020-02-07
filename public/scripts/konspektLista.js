window.onclick = function(e) {
    let id = 0;
    let el = e.target;
    if(el.className === "gen"){
        if(el.parentElement.parentElement.className === "listElement"){
            id = el.parentElement.parentElement.id;
        }else{  
            id = el.parentElement.id;
        }

        $.post("./konspektListaDownload", { 'id': id});   

        if(el.id === "zap"){

            //cczeka aby stworzył najpierw plik zanim go pobierze
            //cbo jak nie to wywala program
            setTimeout(function(){ 
                $.post("./konspektListaDownload", { 'idd': id});   
                $.post("./konspektListaDownload/download", { 'idd': id}); 
                window.location.href = "/konspektListaDownload/download";   
            }, 1500);

        }

        if(el.id === "podglad"){
            setTimeout(function(){ 
                $.post("./konspektListaDownload/podglad/" + id, { 'id': id}); 
                //window.location.href = "/konspektListaDownload/podglad/" + id; 
                window.open("/konspektListaDownload/podglad/" + id,'_blank');
            }, 1500);
        }

    }
};

function dodajPodsumowanie(id) {
    //$.post('./podsumowanie'+'/'+id );
    window.location.href = 'podsumowanie/' + id;
}

function dodajOcenyIndywidualne(id){
    console.log(id);
    // $.post('./oceny_indywidualne', {id: id});
    window.location.href = 'oceny_indywidualne/?data='+ id;
}

function edytujKonspekt(id){
    $.get('./edytujKonspekt'+'/'+id)
}