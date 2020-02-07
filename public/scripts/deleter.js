function delete_file(where, div_id){
    $.post(where, {'delete': div_id});

    window.location.href = where;
}