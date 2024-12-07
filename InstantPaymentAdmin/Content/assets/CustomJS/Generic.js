function BindDropdownlist(url, Dropdownlist, ID) {
    $.ajax({
        type: "GET",
        url: url,
        data: "{}",
        success: function (data) {

            var s = '<option value="0" selected="selected">--Select--</option>';
            for (var i = 0; i < data.data.length; i++) {
                s += '<option value="' + data.data[i].id + '">' + data.data[i].Value + '</option>';
            }
            $("#" + Dropdownlist).html(s);
            if (ID != null && ID != undefined && ID != '') {
                $("#" + Dropdownlist).find('option[value="' + ID + '"]').attr('selected', 'selected');
            }
        }
    });

}