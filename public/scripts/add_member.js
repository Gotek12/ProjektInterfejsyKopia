module.exports = {
    addChild: (fs, name, surrname) => {
        let child_ = {
            imie: name,
            nazwisko: surrname
        };

        let lista;

        if(fs.existsSync('./lista_obecnosci/lista_dzieci.json')){
          lista = JSON.parse(fs.readFileSync('./lista_obecnosci/lista_dzieci.json'));
          lista.push(child_);
        }
        else{
          lista = [];
          lista.push(child_);
        }

        fs.writeFileSync('./lista_obecnosci/lista_dzieci.json', JSON.stringify(lista, null, 2));
    },

    get_list: (fs) => {
        let list_ = [];
        if(fs.existsSync('./lista_obecnosci/lista_dzieci.json')){
        let lista = JSON.parse(fs.readFileSync('./lista_obecnosci/lista_dzieci.json'));
        for (e of lista) {
          list_.push(e.imie + " " + e.nazwisko);
        }
      }
      return list_;
    },

    save_after_deletion: (fs, to_del_name, to_del_surr) => {
        let lista = [];

        if(fs.existsSync('./lista_obecnosci/lista_dzieci.json')) {
            lista = JSON.parse(fs.readFileSync('./lista_obecnosci/lista_dzieci.json'));
        }

        let was_in_list = false;

        for(let i = 0; i < lista.length; i++){
            if(lista[i].imie === to_del_name && lista[i].nazwisko === to_del_surr){
                was_in_list = true;
                lista.splice(i, 1);
                break;
            }
        }

        fs.writeFileSync('./lista_obecnosci/lista_dzieci.json', JSON.stringify(lista, null, 2));
        return was_in_list;
    }
};
