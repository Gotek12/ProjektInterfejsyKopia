module.exports = {

    delDir: (fs) => {
        if (fs.existsSync('./data')) {
            fs.rmdir('./data', { recursive: true }, (err) => {
                if(err){
                    throw err;
                }
            });
        }
        if (fs.existsSync('./pdf')) {
            fs.rmdir('./pdf', { recursive: true }, (err) => {
                if(err){
                    throw err;
                }
            });
        }

    },

    addDirectories: (fs) => {
        if (!fs.existsSync('./data')) {
            fs.mkdirSync("./data");
            fs.mkdirSync("./data/konspekty");
            fs.mkdirSync("./data/podsumowania");
            fs.mkdirSync("./data/obecnosci");
            fs.mkdirSync("./data/cele");
        } else {
            if (!fs.existsSync('./data/konspekty')){
                fs.mkdirSync("./data/konspekty");
            }
            if (!fs.existsSync('./data/podsumowania')){
                fs.mkdirSync("./data/podsumowania");
            }
            if (!fs.existsSync('./data/obecnosci')){
                fs.mkdirSync("./data/obecnosci");
            }
            if (!fs.existsSync('./data/cele')){
                fs.mkdirSync("./data/cele");
            }
        }

        if (!fs.existsSync('./pdf')) {
            fs.mkdirSync("./pdf");
        }

        if (!fs.existsSync('./lista_obecnosci')) {
            fs.mkdirSync("./lista_obecnosci");
        }

        if (!fs.existsSync('./oceny_indywidualne')) {
            fs.mkdirSync("./oceny_indywidualne");
        }
    },

    sendDate: (info) => {
        rok = info.substring(0, 4);
        miesiac = info.substring(5, 7);
        dzien = info.substring(8, 10);
        return dzien + "-" + miesiac + "-" + rok;
    },

    saveKonspekt: (fs, kon1, konEl, czas) => {

        if(konEl == null || typeof konEl === "undefinied"){
            console.log("Brak elementów podczas dodawania");
            konEl = [];
        }

        if (!fs.existsSync('./data/konspekty/konspekt-' + czas + '.json')) {
            let obj = {
                konMain: kon1,
                elementy: konEl
            };

            if(typeof konEl[0].test !== "undefinied"){
                fs.writeFile('./data/konspekty/konspekt-' + czas + '.json', JSON.stringify(obj), 'utf-8', function(err) {
                    if (err){
                        console.log("Problem z zapisem w saveKonspekt");
                        throw err;
                    }
                });
            }else{
                console.log("brak danych");
            }
        }

    },

    savePodsumowanie: (fs, podsumowanie, czas) => {
        if(podsumowanie == null || typeof podsumowanie === "undefinied"){
            console.log("Brak podsumowania do dodania");
        }

        if (!fs.existsSync('./data/podsumowania/podsumowanie-' + czas + '.json')){
            fs.writeFile('./data/podsumowania/podsumowanie-' + czas + '.json', JSON.stringify(podsumowanie), 'utf-8', function(err) {
                if (err){
                    console.log("Problem z zapisem w savePodsumowanie");
                    throw err;
                }
            });
        }else{
            console.log("brak danych");
        }
    },

    saveOcenyIndywidualne: (fs, oceny_ind) => {
        if(oceny_ind == null || typeof oceny_ind === "undefinied"){
            console.log("Brak podsumowania do dodania");
        }
        if (!fs.existsSync('./oceny_indywidualne/oceny-' + oceny_ind.data + '.json')){
            fs.writeFile('./oceny_indywidualne/oceny-' + oceny_ind.data + '.json', JSON.stringify(oceny_ind), 'utf-8', function(err) {
                if (err){
                    console.log("Problem z zapisem w saveOcenyIndywidualne");
                    throw err;
                }
            });
        }else{
            console.log("brak danych");
        }
    },

    saveCele: (fs, objC) => {
        var obj = {
            cele: []
        };

        //if empty
        if(!fs.existsSync('./data/cele/cele.json')){
            objC.forEach(e => {
                obj.cele.push({
                    nazwaCelu: e.nazwaCelu,
                    metodaCelu: e.metodaCelu,
                    uwagiCelu:  e.uwagiCelu
                });
            });
            var json = JSON.stringify(obj);
            fs.writeFile('./data/cele/cele.json', json, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });

        }else{
            fs.readFile('./data/cele/cele.json', 'utf8', (err, data) => {
                if (err){
                    console.error(err);
                } else {
                obj = JSON.parse(data);
                objC.forEach(e => {
                    obj.cele.push({
                        nazwaCelu: e.nazwaCelu,
                        metodaCelu: e.metodaCelu,
                        uwagiCelu:  e.uwagiCelu
                    });
                });
                json = JSON.stringify(obj); 
                fs.writeFile('./data/cele/cele.json', json, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }});
        }
        
    }
};
