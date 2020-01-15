//hamburger menu
let wrapper = document.getElementById("hamburgerIcon");
let test = true;
let test2 = true;
let med = window.matchMedia("(max-width: 950px)")
wrapper.addEventListener("click", function(e){  
    if(!med.matches){
        if(test){
            var link = document.createElement('link');  
            link.rel = 'stylesheet';  
            link.type = 'text/css';
            link.id = "smallMenu";
            link.href = 'styles/smallerMenu.css';
            document.getElementsByTagName('HEAD')[0].appendChild(link); 
            test = false;
        }else{
            document.getElementById("smallMenu").remove();
            test = true;
              
        } 
    }

    if(med.matches){
        if(test2){
            var link = document.createElement('link');  
            link.rel = 'stylesheet';  
            link.type = 'text/css';
            link.id = "slide";
            link.href = 'styles/menu/slide.css';
            document.getElementsByTagName('HEAD')[0].appendChild(link);
            test2 = false;
        }else{
            document.getElementById("slide").remove();
            test2 = true;
        }
    } 
});


