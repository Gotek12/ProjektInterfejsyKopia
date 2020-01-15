module.exports = {

    saveObecnosci: (fs, dzieci, acData) => {
        if (!fs.existsSync('./data/obecnosci/' + acData + '.json')) {
            let obecnosci = {
                dzieciaczki: dzieci
            };


            fs.writeFile('./data/obecnosci/' + acData + '.json', JSON.stringify(obecnosci), 'utf-8', function(err) {
                if (err){
                    console.error("Problem z zapisem w obecnosci");
                    throw err;
                }
            });

        }
    },

    readDaty: (fs) => {
        var tabDir = [];
        fs.readdirSync("./data/konspekty").forEach(file => {

            if(file.split('.').pop() === "json"){
                tabDir.push(file);
            }
        });

        let tabD = [];
        //sortowanie po dacie
        if(tabDir.length !== 0){
            tabDir.forEach((e) => {
                tabD.push(e.slice(9, 19).slice(0, 2) + "-" + e.slice(9, 19).slice(3, 5) + "-" + e.slice(9, 19).slice(6, 10));
            });
        }

        return tabD;
    },

    redapdf: (fs, id) => {
(id);
        let readEl = fs.readFileSync("./data/konspekty/konspekt-" + id + ".json");
        //console.info(dane);
        return JSON.parse(readEl);
    },

    redapdfPodsumowanie: (fs, id) => {
        (id);
                let readEl = fs.readFileSync("./data/podsumowania/podsumowanie-" + id + ".json");
                //console.info(dane);
                return JSON.parse(readEl);
            },

    viewMain: (fs) => {

        //ilosc el wyswietlanych na glownej stronie
        const ilosc = 3;

        var tabDir = [];
        //test czy jest to plik json
        fs.readdirSync("./data/konspekty").forEach(file => {
            if(file.split('.').pop() === "json"){
                tabDir.push(file);
            }
        });
        //console.info(JSON.stringify(tabDir));

        //sortowanie po dacie
        tabDir.sort(function(a, b) {
            a = new Date(
                a.slice(9, 19).slice(6, 10),
                a.slice(9, 19).slice(3, 5),
                a.slice(9, 19).slice(0, 2)
            );
            b = new Date(
                b.slice(9, 19).slice(6, 10),
                b.slice(9, 19).slice(3, 5),
                b.slice(9, 19).slice(0, 2)
            );
            return a < b ? -1 : a > b ? 1 : 0;
        });
        //console.info(JSON.stringify(tabDir));

        const elToDispay = 3; //ile aktualnie max eleentów wyświetla się na ekranie głównym
        let t = 0;
        let newest  = [];
        for(let i = 0; i < tabDir.length; i++){
            if(t === elToDispay){
                break;
            }
            newest.push(tabDir[i]);
            t++;
        }


        const lastObj = {
            tab: []
        };

        //czytam dane z wybranych plików
        if(newest.length !== 0 || typeof newest !== "undefined"){
            newest.forEach((e) => {
                try {
                    var re = fs.readFileSync('./data/konspekty/'+ e);
                    var dane = JSON.parse(re);
                    var elementsList = [];
                    var cza = dane.konMain.czas;

                    if(dane.elementy != null || typeof dane.elementy !== "undefined"){
                        dane.elementy.forEach((i) => {
                            elementsList.push(i.potrzebne_elementy);
                        });
                    }else{
                        console.info("Brak elementow do przygotowania");
                    }

                    lastObj.tab.push({
                        nazwa: e,
                        czas: cza,
                        elementsList: elementsList
                    });
                }catch(err){
                    console.error("newest.forEach problem z iteracją");
                    throw err;
                }

            });
            return lastObj;
        }else{
            console.warn("Empty object");
            return {tab: []};
        }

    },

    viewConspects: (fs) => {
        var tabDir = [];
        fs.readdirSync("./data/konspekty").forEach(file => {

            if(file.split('.').pop() === "json"){
                tabDir.push(file);
            }
        });
         //sortowanie po dacie
        tabDir.sort(function(a, b) {
            a = new Date(
                a.slice(9, 19).slice(6, 10),
                a.slice(9, 19).slice(3, 5),
                a.slice(9, 19).slice(0, 2)
            );
            b = new Date(
                b.slice(9, 19).slice(6, 10),
                b.slice(9, 19).slice(3, 5),
                b.slice(9, 19).slice(0, 2)
            );
            return a > b ? -1 : a < b ? 1 : 0;
        });
        //console.info(JSON.stringify(tabDir));

        const elToDispay = 3;
        let t = 0;
        let all=[];
        for(let i = 0; i < tabDir.length; i++){

            all.push(tabDir[i]);
        }


        const conspects = {
            tab: []
        };

        //czytam dane z wybranych plików
        all.forEach((e) => {
            try {
                var re = fs.readFileSync('./data/konspekty/'+ e);
                var dane = JSON.parse(re);
                var cza = dane.konMain.czas;
                var temat = dane.konMain.tematZbiorki;

                conspects.tab.push({
                    nazwa: e,
                    czas: cza,
                    temat : temat
                });
            }catch(err){
                console.error(err);
                throw err;
            }

        });
        return conspects;
    },

    getConspect: (fs,id)=>{
        let data = id.split('-').reverse().join('-');
        let file = JSON.parse(fs.readFileSync('./data/konspekty/konspekt-' +data +'.json'));
        console.log("getting conspect: " + data);
        return file;
    },

    viewSummaries: (fs) => {
        var tabDir = [];
        fs.readdirSync("./data/podsumowania").forEach(file => {

            if(file.split('.').pop() === "json"){
                tabDir.push(file);
            }
        });
         //sortowanie po dacie
        tabDir.sort(function(a, b) {
            a = new Date(
                a.slice(13, 23).slice(6, 10),
                a.slice(13, 23).slice(3, 5),
                a.slice(13, 23).slice(0, 2)
            );
            b = new Date(
                b.slice(13, 23).slice(6, 10),
                b.slice(13, 23).slice(3, 5),
                b.slice(13, 23).slice(0, 2)
            );
            return a > b ? -1 : a < b ? 1 : 0;
        });
        //console.info(JSON.stringify(tabDir));

        const elToDispay = 3;
        let t = 0;
        let all=[];
        for(let i = 0; i < tabDir.length; i++){

            all.push(tabDir[i]);
        }


        const summaries = {
            tab: []
        };

        //czytam dane z wybranych plików
        all.forEach((e) => {
            try {
                var re = fs.readFileSync('./data/podsumowania/'+ e);
                var dane = JSON.parse(re);
                var cza = dane.czas;
                var temat = dane.podsumowanieTemat;

                summaries.tab.push({
                    nazwa: e,
                    czas: cza,
                    temat : temat
                });
            }catch(err){
                console.error(err);
                throw err;
            }

        });
        return summaries;
    },

    deleteConspect: (fs, id)=>{
        let data = id.split('-').reverse().join('-');
        console.log("Próbuję usunąć konspekt z dnia " + id);

        if(fs.existsSync('./data/konspekty/konspekt-' + data + '.json')){
            fs.unlinkSync('./data/konspekty/konspekt-' + data + '.json');
            console.log("Usunięto");
        }
        else{
            console.error("Błąd!");
        }
    },

    deleteSummary: (fs, id) => {
        let data = id.split('-').reverse().join('-');
        console.log("Próbuję usunąć podsumowanie z dnia " + id);

        if (fs.existsSync('./data/podsumowania/podsumowanie-' + data + '.json')) {
            fs.unlinkSync('./data/podsumowania/podsumowanie-' + data + '.json');
            console.log("Usunięto");
        } else {
            console.error("Błąd!");
        }
    }
};
