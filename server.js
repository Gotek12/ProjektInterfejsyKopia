const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
let ejs = require("ejs");
let bodyParser = require('body-parser');
let konspekt_el = require('./public/scripts/konspekt_elementy');
let lista_dzieci = require('./public/scripts/add_member');
let mainInfo = require('./public/scripts/mainInfo');
const PORT = process.env.PORT || 8080;
const pdf = require("html-pdf");
let serveIndex = require('serve-index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

//jeśli nie ma directory
konspekt_el.addDirectories(fs);

let tabDates = [];
let tmp = null;
let summary = null;
let obecnosci = null;
let obecnosci_count = null;
let oceny_ind = null;

function renderMain(res){
    let last;
    //wyswietlanie  na głównej stronie
    last = mainInfo.viewMain(fs);
    console.info(last);

    res.render('main', {data: last});
}

app.get('/', (req, res) => {
    console.info(req.url);
    res
        .status(200)
        .sendFile(path.join(__dirname, "public", "index.html"));
    konspekt_el.addDirectories(fs);
    res.end();
});

app.all('/main', (req, res) =>{
    renderMain(res);
});

app.all('/zapisz_konspekt', (req, res) => {
    konspekt_el.addDirectories(fs);
    console.info(req.url);
    console.info(req.body);


    let info = null; //informacje z tworzenia konspektu

    //zapis do jsona konspektu
    if(tmp != null){
        info = tmp;
        tmp = null;

        konspekt_el.saveKonspekt(fs, info, req.body.tobj, konspekt_el.sendDate(info.czas));

    }

    renderMain(res);
});

app.all('/konspektLista', (req, res) => {
    let id_to_delete = req.body.delete;

    if(id_to_delete !== null &&  typeof id_to_delete !== 'undefined'){
        mainInfo.deleteConspect(fs, id_to_delete);
    }

    let conspects = mainInfo.viewConspects(fs);
    res.render('konspektLista', {data: conspects});
});

app.all('/podsumowanieLista', (req, res) => {
    let id_to_delete = req.body.delete;

    if(id_to_delete !== null &&  typeof id_to_delete !== 'undefined'){
        mainInfo.deleteSummary(fs, id_to_delete);
    }

    let summaries = mainInfo.viewSummaries(fs);
    res.render('podsumowanieLista', {data: summaries});
});

let acId;
app.all('/konspektListaDownload', (req, res) => {
    //console.info(req.body.id);
    let conspects = mainInfo.viewConspects(fs);
    let id = req.body.id;
    acId = req.body.idd;

    if(typeof id !== 'undefined'){
        let dane = mainInfo.redapdf(fs, konspekt_el.sendDate(req.body.id));

        ejs.renderFile('./public/templates/konspektPdftemplate.ejs', {el: dane}, (err, data) => {
            //console.info(dane);
            if (err) {
                throw err;
            }else {
                let options = { format: 'Letter' };
                pdf.create(data, options).toFile("./pdf/konspekt-" + id + ".pdf", (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.info("File created successfully for date: " + id);
                    }
                });
            }
        });

    }else{
        console.warn("Bledne id");
    }
    res.render('konspektListaDownload', {data: conspects});
});

//pobiera jeśli plik istnieje
app.get('/konspektListaDownload/download', (req, res) => {
    let file = fs.createReadStream("./pdf/konspekt-" + acId + ".pdf");
    let stat = fs.statSync("./pdf/konspekt-" + acId + ".pdf");
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=konspekt-' + acId + '.pdf');
    file.pipe(res);
});

app.get('/konspektListaDownload/podglad/:id', (req, res) => {
    let id = req.params.id;
    let file = fs.createReadStream("./pdf/konspekt-" + id + ".pdf");
    file.pipe(res);
});

app.all('/podsumowanieListaDownload', (req, res) => {
    //console.info(req.body.id);
    let summaries = mainInfo.viewSummaries(fs);
    let id = req.body.id;
    acId = req.body.idd;

    if(typeof id !== 'undefined'){
        let dane = mainInfo.redapdfPodsumowanie(fs, konspekt_el.sendDate(req.body.id));

        ejs.renderFile('./public/templates/podsumowaniePdftemplate.ejs', {el: dane}, (err, data) => {
            //console.info(dane);
            if (err) {
                throw err;
            }else {
                let options = { format: 'Letter' };
                pdf.create(data, options).toFile("./pdf/podsumowanie-" + id + ".pdf", (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.info("File created successfully for date: " + id);
                    }
                });
            }
        });

    }else{
        console.warn("Bledne id");
    }
    res.render('podsumowanieListaDownload', {data: summaries});
});

app.get('/podsumowanieListaDownload/download', (req, res) => {
    let file = fs.createReadStream("./pdf/podsumowanie-" + acId + ".pdf");
    let stat = fs.statSync("./pdf/podsumowanie-" + acId + ".pdf");
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=podsumowanie-' + acId + '.pdf');
    file.pipe(res);
});

app.get('/podsumowanieListaDownload/podglad/:id', (req, res) => {
    let id = req.params.id;
    let file = fs.createReadStream("./pdf/podsumowanie-" + id + ".pdf");
    file.pipe(res);
});

app.all('/podsumowanieListaDownload', (req, res) => {
    //console.info(req.body.id);
    let summaries = mainInfo.viewSummaries(fs);
    let id = req.body.id;
    acId = req.body.idd;

    if(typeof id !== 'undefined'){
        let dane = mainInfo.redapdfPodsumowanie(fs, konspekt_el.sendDate(req.body.id));

        ejs.renderFile('./public/templates/podsumowaniePdftemplate.ejs', {el: dane}, (err, data) => {
            //console.info(dane);
            if (err) {
                throw err;
            }else {
                let options = { format: 'Letter' };
                pdf.create(data, options).toFile("./pdf/podsumowanie-" + id + ".pdf", (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.info("File created successfully for date: " + id);
                    }
                });
            }
        });

    }else{
        console.warn("Bledne id");
    }
    res.render('podsumowanieListaDownload', {data: summaries});
});

app.get('/podsumowanieListaDownload/download', (req, res) => {
    var file = fs.createReadStream("./pdf/podsumowanie-" + acId + ".pdf");
    var stat = fs.statSync("./pdf/podsumowanie-" + acId + ".pdf");
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=podsumowanie-' + acId + '.pdf');
    file.pipe(res);
});

app.get('/podsumowanieListaDownload/podglad/:id', (req, res) => {
    let id = req.params.id;
    var file = fs.createReadStream("./pdf/podsumowanie-" + id + ".pdf");
    file.pipe(res);
});

app.get('/del', (req, res) => {
    konspekt_el.delDir(fs);
    res.send("Del data firectory");
});

app.get('/wybierzPodsumowanie', (req, res) => {
    let conspects = mainInfo.viewConspects(fs);
    res.render('wybierzPodsumowanie', {data: conspects});
});

app.get('/podsumowanie/:id', (req, res) => {
    let id = req.params.id;
    let conspect = mainInfo.getConspect(fs, id);
    res.render('podsumowanie',{data: conspect});
});

app.get('/wybierzEdycja', (req, res) => {
    let conspects = mainInfo.viewConspects(fs);
    res.render('wybierzEdycja', {data: conspects})
});


app.get('/konspektDodaj', (req, res) => {

    //uzupełniamy tablicę dat
    tabDates = mainInfo.readDaty(fs);

    res.render('konspekt', {tabDates: tabDates});
});

app.all('/sprObecnosc', (req, res) => {
    let get_new = req.body.new_child;
    let get_del = req.body.to_del;
    let was_del = false;

    if(get_new != null && typeof get_new != 'undefined'){
        console.error("Adding " + get_new.name.toString() + " " + get_new.surrname.toString());
        lista_dzieci.addChild(fs, get_new.name, get_new.surrname);
    }

    if(get_del != null && typeof get_del != 'undefined'){
        console.error("Try to delete " + get_del.name.toString() + " " + get_del.surrname.toString());
        was_del = lista_dzieci.save_after_deletion(fs, get_del.name, get_del.surrname);
    }

    let l_to_send = lista_dzieci.get_list(fs);
    console.info(l_to_send);

    res.render('obecnosci', {members: l_to_send, deletion_: was_del});
});

app.get('/dodajCele', (req, res) => {
    res.render('dodaj_cele');
});

app.post('/sprObecnosc/save',(req,res)=>{
    let arrayOfChilds = req.body.whoIsPresent;
    let acData = req.body.acData;
    //console.log(arrayOfChilds);
    mainInfo.saveObecnosci(fs, arrayOfChilds, acData);

});

let nData;
app.post('/konspekt_elementy', (req, res) => {
    console.info(req.url);
    //console.info(req.body);

    tmp = req.body;

    //pobranie daty z konspektu
    if(req.body.czas != null){
        let d = req.body.czas;
        nData = konspekt_el.sendDate(d);
    }

    res.render('konspekt_elementy', {dataa: nData});
});

app.post('/podsumowanie/dalej', (req, res) =>{
    summary = req.body.podsum;
    let conspect = mainInfo.getConspect(fs, req.body.id);
    // console.error("Podsumowanie: ",summary);
    let isLast = (conspect.elementy.length === 1);
    summary.tablicaElementow = [];
    res.render('podsumowanie_elementy', {elementsCounter: 0, lastElement: isLast, element: conspect.elementy[0], konspekt_id: req.body.id});
});

app.post('/podsumowanie/nastepny_element', (req,res)=>{

    summary.tablicaElementow[req.body.elementsCounter] = req.body.element;
    // console.log("Nastepny element:",summary);
    let elCount = parseInt(req.body.elementsCounter)+1;
    console.log("elCount: ", elCount);
    let conspect = mainInfo.getConspect(fs, req.body.konspekt_id);
    let isLast = (conspect.elementy.length === elCount+1);
    console.log("Nastepny element - konspekt:", conspect);
    res.render('podsumowanie_elementy', {elementsCounter: elCount, lastElement: isLast, element: conspect.elementy[elCount], konspekt_id: req.body.konspekt_id});

});

app.post('/podsumowanie/wnioski_ze_zbiorki', (req, res) =>{
    summary.tablicaElementow[req.body.elementsCounter] = req.body.element;
    res.render("podsumowanie_wnioski", {konspekt_id: req.body.konspekt_id});
});

app.post('/podsumowanie/zapisz_podsumowanie', (req, res) =>{
    console.log("Zapsiywanie: ", req.body.wnioski);
    summary.wnioski = req.body.wnioski;
    console.log("Wszystkie elementy:",summary);

    konspekt_el.savePodsumowanie(fs, summary, konspekt_el.sendDate(req.body.konspekt_id));
    summary = null;

    renderMain(res);
});

app.get('/wybierzObecnosci', (req, res) => {
    let ob = mainInfo.viewObecnosci(fs);
    res.render('wybierzObecnosci', {data: ob});
});

app.all('/oceny_indywidualne', (req, res) => {
    oceny_ind = {
        data: req.url.substr(26),
        oceny: []
    };
    obecnosci = mainInfo.getObecnosci(fs, oceny_ind.data);
    obecnosci_count = 0;

    let lastElement = obecnosci.dzieciaczki.length === obecnosci_count + 1;
    res.render('ocena_indywidualna', {data: obecnosci.dzieciaczki[obecnosci_count], lastElement: lastElement});
});

app.all('/oceny_indywidualne/nastepna_osoba', (req, res) =>{
    oceny_ind.oceny[obecnosci_count] = req.body.element;
    obecnosci_count++;

    let lastElement = obecnosci.dzieciaczki.length === obecnosci_count + 1;
    console.log("oceny_ind:",oceny_ind);
    res.render('ocena_indywidualna', {data: obecnosci.dzieciaczki[obecnosci_count], lastElement: lastElement});
});

app.all('/oceny_indywidualne/zapisz_oceny', (req, res) =>{
    oceny_ind.oceny[obecnosci_count] = req.body.element;
    console.log("oceny_ind:",oceny_ind);
    konspekt_el.saveOcenyIndywidualne(fs, oceny_ind);
    obecnosci = null;
    obecnosci_count = 0;
    oceny_ind = null;
    renderMain(res);
});

app.post('/zapisz_cel', (req, res) => {
    konspekt_el.saveCele(fs, req.body.celeList);
});

app.all('/cele', (req, res) => {

    let celeR = mainInfo.readCele(fs);
    console.log(celeR);
    res.render('cele', {data: celeR});
});

app.listen(PORT, () => console.info(`Listen at port ${ PORT } -> http://localhost:${ PORT }/`));
