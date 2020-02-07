function check_fill() {
    let errString = '';
    let d_check = true;
    let double_date = false;
    let m_check = true;
    let t_check = true;
    if (document.getElementById("data_z").value === '') {
        errString += 'Data zbiórki';
        d_check = false;
    }
    if (document.getElementById("miejsce_z").value === '') {
        if (!d_check) {
            errString += ', ';
        }
        errString += 'Miejsce zbiórki';
        m_check = false;
    }
    if (document.getElementById("temat_z").value === '') {
        if (!m_check) {
            errString += ', ';
        }
        errString += 'Temat zbiórki';
        t_check = false;
    }
    errString += '\n';

    let errMsg = 'Proszę uzupełnić następujące pola:\n' + errString + 'aby przejść dalej.';

    if (!d_check || !m_check || !t_check) {
        window.alert(errMsg);
    }

}

function check_dates(dates_) {
    let input_date = document.getElementById("data_z").value;

    for (let i of dates_) {
        if (i === input_date) {
            window.alert("Istnieje już konspekt o podanej dacie!");
            break;
        }
    }
}