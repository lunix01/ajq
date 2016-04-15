function tab(groupname, mode, activeClass) {
    var $item = $('[data-groupname="' + groupname + '"][data-tab="item"]');
    var $content = $('[data-groupname="' + groupname + '"][data-tab="content"]');
    var $itemActive = $item.filter('.' + activeClass + '');
    if($itemActive.length == 1) {
        var index = $item.index($itemActive);
        $content.not($content.eq(index)).hide();
    } else {
        $content.not(':first').hide();
    }
    $('html, body').on(mode || 'click', '[data-groupname="' + groupname + '"][data-tab="item"]', function() {
        var index = $item.index(this);
        $(this).addClass(activeClass || 'active');
        $item.not($item.eq(index)).removeClass(activeClass || 'active');
        $content.eq(index).show();
        $content.not($content.eq(index)).hide();
    });
}
