window.onclick = function(e) {
    let id = 0;
    let el = e.target;
    if(el.className === "gen"){
        if(el.parentElement.parentElement.className == "listElement"){
            id = el.parentElement.parentElement.id;
        }else{  
            id = el.parentElement.id;
        }

        $.post("./podsumowanieListaDownload", { 'id': id});   

        if(el.id === "zap"){

            //cczeka aby stworzył najpierw plik zanim go pobierze
            //cbo jak nie to wywala program
            setTimeout(function(){ 
                $.post("./podsumowanieListaDownload", { 'idd': id});   
                $.post("./podsumowanieListaDownload/download", { 'idd': id}); 
                window.location.href = "/podsumowanieListaDownload/download";   
            }, 1500);

        }

        if(el.id === "podglad"){
            setTimeout(function(){ 
                $.post("./podsumowanieListaDownload/podglad/" + id, { 'id': id}); 
                //window.location.href = "/podsumowanieListaDownload/podglad/" + id; 
                window.open("/podsumowanieListaDownload/podglad/" + id,'_blank');
            }, 1500);
        }

    }
}