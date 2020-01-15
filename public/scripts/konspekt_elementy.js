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
        }

        if (!fs.existsSync('./pdf')) {
            fs.mkdirSync("./pdf");
        }

        if (!fs.existsSync('./lista_obecnosci')) {
            fs.mkdirSync("./lista_obecnosci");
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
    }
};
