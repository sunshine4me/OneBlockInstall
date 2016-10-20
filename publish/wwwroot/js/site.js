// Write your Javascript code.
$(function () {
    $.fn.fillData = function (data) {
        if (this.length == 0) return;

        var jqObj = this.eq(0);
        var fromData;
        if ($.isPlainObject(data))
            fromData = data;
        else
            fromData = eval("(" + data + ")");
        for (var i in fromData) {
            var _input = jqObj.find("[name='" + i + "']");
            if (_input.is("select"))
                jqObj.find("[name='" + i + "']").val(data[i] + "");
            else
                jqObj.find("[name='" + i + "']").val(data[i]);

        }
    };

    jQuery.download = function (url, data, method) {    // 获得url和data
        if (url && data) {
            // data 是 string 或者 array/object
            data = typeof data == 'string' ? data : unescape(jQuery.param(data));    // 把参数组装成 form的  input
            var inputs = '';
            jQuery.each(data.split('&'), function () {
                var pair = this.split('=');
                inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
            });        // request发送请求
            jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>')
            .appendTo('body').submit().remove();
        };
    };
});