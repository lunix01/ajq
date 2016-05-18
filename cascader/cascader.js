;(function($) {
    var tab = function(groupname, activeClass) {
        var $item = $('[data-groupname="' + groupname + '"][data-tab="item"]');
        var $content = $('[data-groupname="' + groupname + '"][data-tab="content"]');
        var $itemActive = $item.filter('.' + (activeClass || 'active'));
        if($itemActive.length == 1) {
            var index = $item.index($itemActive);
            $content.not($content.eq(index)).hide();
        } else {
            $content.not(':first').hide();
        }
        $('html, body').on('click', '[data-groupname="' + groupname + '"][data-tab="item"]', function() {
            var index = $item.index(this);
            $(this).addClass(activeClass || 'active');
            $item.not($item.eq(index)).removeClass(activeClass || 'active');
            $content.eq(index).show();
            $content.not($content.eq(index)).hide();
        });
    }
    $.fn.cascader = function(option) {
        var $root = $(this);
        var data = {};
        var tpl = '<div class="cascader">'
                    +    '<span class="select-box cascader-selected J_selected">'
                    +     '<span class="text">全部地区</span><i class="select-arrow"></i>'
                    +   '</span>'
                    +   '<div class="cascader-picker J_picker">'
                    +     '<span class="select-box active J_provinceItem" data-groupname="' + option.name + '" data-tab="item">'
                    +       '<span class="text">请选择</span><i class="select-arrow"></i>'
                    +     '</span> '
                    +     '<span class="select-box J_cityItem" data-groupname="' + option.name + '" data-tab="item">'
                    +       '<span class="text">请选择</span><i class="select-arrow"></i>'
                    +     '</span> '
                    +     '<span class="select-box J_areaItem" data-groupname="' + option.name + '" data-tab="item">'
                    +       '<span class="text">请选择</span><i class="select-arrow"></i>'
                    +     '</span> '
                    +     '<span class="select-box J_townItem" data-groupname="' + option.name + '" data-tab="item">'
                    +       '<span class="text">请选择</span><i class="select-arrow"></i>'
                    +     '</span> '
                    +     '<div class="cascader-cont J_province" data-groupname="' + option.name + '" data-tab="content"></div>'
                    +     '<div class="cascader-cont J_city" data-groupname="' + option.name + '" data-tab="content"></div>'
                    +     '<div class="cascader-cont J_area" data-groupname="' + option.name + '" data-tab="content"></div>'
                    +     '<div class="cascader-cont J_town" data-groupname="' + option.name + '" data-tab="content"></div>'
                    +   '</div>'
                    +'</div>';
        $root.html(tpl);
        tab(option.name);

        var flag = true;
        $root.on('click', '.J_selected', function() {
            $.ajax({
                url: option.url,
                type: 'GET',
                dataType: 'json',
                success: function(respdata) {
                    data = respdata;
               }
            }).done(function() {
                var phtml = '';
                phtml += '<ul class="ul">'
                $.each(data, function(index, element) {
                    phtml += '<li class="li" data-value="' + element.id + '">' + element.name + '</li>';
                });
                phtml += '</ul>';
                $root.find('.J_province').html(phtml);
            })
            
            if(flag) {
                flag = false;
                $(this).addClass('active');
                $root.find('.J_picker').show();
            } else {
                flag = true;
                $(this).removeClass('active');
                $root.find('.J_picker').hide();
            };
        });

        var province = '';
        var city= '';
        var area = '';
        var town = '';
        var provinceTxt = '';
        var cityTxt = '';
        var areaTxt = '';
        var townTxt = '';
        var txt = '';
         $root.find('.J_province').on('click', '.li', function() {
            province = $(this).attr('data-value');
            provinceTxt = $(this).text();
            $root.find('.J_provinceItem .text').text($(this).text());
            if(0 == province) {
                flag = true;
                $root.find('.J_selected').removeClass('active');
                $root.find('.J_picker').hide();
            } else {
                var cityhtml = '';
                cityhtml += '<ul class="ul">'
                $.each(data, function(index, element) {
                    if(data[index].id == province) {
                        $.each(element.sub, function(index, element) {
                            cityhtml += '<li class="li" data-value="' + element.id + '">' + element.name + '</li>';
                        });
                    }
                });
                cityhtml += '</ul>';
                $root.find('.J_city').html(cityhtml);
                $root.find('.J_cityItem').trigger('click');
            }
            $root.find('.J_cityItem .text, .J_areaItem .text, .J_townItem .text').text('请选择');
            $root.find('.J_area').empty();
            $root.find('.J_town').empty();
            city = '';
            area = '';
            town = '';
            cityTxt = '';
            areaTxt = '';
            townTxt = '';
            txt = provinceTxt;
            $root.find('.J_selected .text').text(txt);
            option.complete(province);
        });
        $root.find('.J_city').on('click', '.li', function() {
            city = $(this).attr('data-value');
            cityTxt = $(this).text();
            $root.find('.J_cityItem .text').text($(this).text());
            if(0 == city) {
                flag = true;
                $root.find('.J_selected').removeClass('active');
                $root.find('.J_picker').hide();
            } else {
                var areahtml = '';
                areahtml += '<ul class="ul">'
                $.each(data, function(index, element) {
                    $.each(element.sub, function(index, element) {
                        if(element.id == city) {
                            $.each(element.sub, function(index, element) {
                                areahtml += '<li class="li" data-value="' + element.id + '">' + element.name + '</li>';
                            });
                        }
                    });
                });
                areahtml += '</ul>';
                $root.find('.J_area').html(areahtml);
                $root.find('.J_areaItem').trigger('click');
            }
            $root.find('.J_areaItem .text, .J_townItem .text').text('请选择');
            $root.find('.J_town').empty();
            area = '';
            town = '';
            areaTxt = '';
            townTxt = '';
            txt = provinceTxt + '/' +cityTxt;
            $root.find('.J_selected .text').text(txt);
            v = province + ',' +city;
            option.complete(v);
        });

        $root.find('.J_area').on('click', '.li', function() {
            area = $(this).attr('data-value');
            areaTxt = $(this).text();
            $root.find('.J_areaItem .text').text($(this).text());
            if(0 == area) {
                flag = true;
                $root.find('.J_selected').removeClass('active');
                $root.find('.J_picker').hide();
            } else {
                var townhtml = '';
                townhtml += '<ul class="ul">'
                $.each(data, function(index, element) {
                    $.each(element.sub, function(index, element) {
                        $.each(element.sub, function(index, element) {
                            if(element.id == area) {
                                $.each(element.sub, function(index, element) {
                                    townhtml += '<li class="li li-w" data-value="' + element.id + '">' + element.name + '</li>';
                                });
                            }
                        });
                    });
                });
                townhtml += '</ul>';
                $root.find('.J_town').html(townhtml);
                $root.find('.J_townItem').trigger('click');
            }
            $root.find('.J_townItem .text').text('请选择');
            town = '';
            townTxt = '';
            txt = provinceTxt + '/' +cityTxt + '/' +areaTxt;
            $root.find('.J_selected .text').text(txt);
            v = province + ',' +city + ',' +area;
            option.complete(v);
        });

        $root.find('.J_town').on('click', '.li', function() {
            town = $(this).attr('data-value');
            townTxt = $(this).text();
            $root.find('.J_townItem .text').text($(this).text());
            txt = provinceTxt + '/' +cityTxt + '/' +areaTxt + '/' +townTxt;
            $root.find('.J_selected .text').text(txt);
            v = province + ',' +city + ',' +area+ ',' +town;
            option.complete(v);
            flag = true;
            $root.find('.J_selected').removeClass('active');
            $root.find('.J_picker').hide();
        });
    }
})(jQuery);