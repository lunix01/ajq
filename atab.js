function tab(groupname, mode, activeClass) {
  var $content = $('[data-groupname="' + groupname + '"][data-tab="content"]');
  $content.not(':first').hide();
  $('html, body').on(mode || 'click', '[data-groupname="' + groupname + '"][data-tab="item"]', function() {
      var index = $('[data-groupname="' + groupname + '"][data-tab="item"]').index(this);
      $(this).addClass(activeClass || 'active');
      $('[data-groupname="' + groupname + '"][data-tab="item"]').not($('[data-groupname="' + groupname + '"][data-tab="item"]').eq(index)).removeClass(activeClass || 'active');
      $content.eq(index).show();
      $content.not($content.eq(index)).hide();
  });
}
