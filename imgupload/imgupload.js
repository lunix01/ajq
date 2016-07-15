/**
 * version: v0.0.0.1
 */
;(function($) {
    $.fn.fileupload = function(options) {
        var defaults = {
            name: "defaultname",
            accept: ".jpg, .jpeg, .gif, .png",
            multiple: false
        };
        var settings = $.extend(defaults, options);
        var $root = $(this);
        var tpl = '<div class="fileupload">'
            +   '<span class="J_file"></span>'
            +   '<span class="fileselect-img J_selectFile"></span>'
            +   '<input type="file" accept="' + settings.accept + '" style="display: none;">'
            + '</div>';
        $root.html(tpl);

        $root.on('click', '.J_selectFile', function() {
            $root.find('input:file').trigger('click');
        });
        var arrResult = [];
        $root.on('change', 'input:file', function() {
            if (window.FileReader) {
                var file = this.files[0];
                var reader = new FileReader();
                var imghtml = '';
                reader.onload = function(e) {
                    imghtml = '<span class="imgbox J_imgbox">'
                            +    '<img src="' + e.target.result + '">'
                            +    '<span class="delete J_del"></span>'
                            + '</span>';
                    if(settings.multiple) {
                        $root.find('.J_file').append(imghtml);
                        var $img = $root.find('.J_file .J_imgbox img');
                        arrResult = [];
                        $($img).each(function () {
                            arrResult.push($(this).attr('src'));
                        });
                        settings.complete(arrResult);
                    } else {
                        $root.find('.J_file').html(imghtml);
                        arrResult.push(e.target.result);
                        settings.complete(arrResult);
                        $root.find('.J_selectFile').hide();
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert("该功能暂不支持您当前使用的浏览器，请更换现代浏览器!");
            }
        });
        $root.on('click', '.J_del', function() {
            if(confirm('确定删除？')) {
                $(this).parent('.J_imgbox').remove();
                var a  = $(this).parent('.J_imgbox').find('img').attr('src');
                arrResult.splice($.inArray(a, arrResult), 1);
                settings.complete(arrResult);
                if(!(settings.multiple)) {
                    $root.find('.J_selectFile').show();
                }
            }
        });
    }
})(jQuery);
