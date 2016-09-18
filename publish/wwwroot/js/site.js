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
    }
});