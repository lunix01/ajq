function selectAll(btn, chk) {
    $(btn).on('click', function() {
        if($(this).is(':checked')) {
            $(chk).prop('checked', 'checked');
        } else {
            $(chk).prop('checked', '');
        }
    });
    $('html, body').on('click', chk, function() {
        var chkArray = [];
        $(chk).each(function() {
            if($(this).is(':checked')) {
                chkArray.push($(this));
            }
        });
        if($(chk).length == chkArray.length) {
            $(btn).prop('checked', 'checked');
        } else {
            $(btn).prop('checked', '');
        }
    });
}
