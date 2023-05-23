var headTag;

window.addEventListener('DOMContentLoaded', (event) => {
  const setHeadTag = function() {
    headTag = `<meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no">
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <meta charset="utf-8">
      <title>프로젝트타이틀</title>
      <meta name="keywords" content="">
      <meta name="description" content="">
      <meta property="og:title" content="">
      <meta property="og:url" content="">
      <meta property="og:image" content="">
      <meta property="og:description" content="">
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
      <link href="../../static/css/common.css" type="text/css" rel="stylesheet">
      <script src="../../static/js/jquery.js"></script>`
  }
  setHeadTag();
  $('.ui_btnCodeCopy').on('click', function(){
    var el = $(this);
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      el.data("text-original", el.text());
      el.text($(this).data("text-swap"));
      el.addClass('active');
  
      $(this).parent().next().css({
      'position': 'absolute',
      'opacity': 0,
      'display': 'block'
    })
    el.parent().next().focus();
    el.parent().next().select();
    document.execCommand('copy');
  
      setTimeout(function(){
        if (el.text() == "Copy!") {
           el.text("Copy to clipboard");
           el.removeClass('active');
        }
      }, 1000);
    } catch(err) {
      console.log('Oops, unable to copy');
    }
  
    window.getSelection().removeAllRanges();
  })
  
  $('.ui_code_content').each(function(index, elem){
    var $this = $(this);
    if($(this).hasClass('css') === true){
      var editor = CodeMirror.fromTextArea(elem, {
        mode: 'text/css',
        tabMode: 'indent'
      });
    }
    if($(this).hasClass('javascript')) {
      var editor = CodeMirror.fromTextArea(elem, {
          mode: 'text/javascript',
          tabMode: 'indent'
      });
    }
    if($(this).hasClass('html')) {
      var delay;
      var editor = CodeMirror.fromTextArea(elem, {
        mode: 'text/html',
        autoRefresh: true,
        tabMode: 'indent'
      });
    }
    if($(this).hasClass('iframe')) {
      var delay;
      var editor = CodeMirror.fromTextArea(elem, {
          mode: 'text/html',
      });
    }  
    editor.on("change", function() {
      clearTimeout(delay);
      delay = setTimeout(updatePreview, 1);
    });
    function updatePreview() {
      if($(elem).hasClass('iframe')) {
        var preview = $this.prev().prev();
        var iframes = $(preview).get(0).contentDocument;
        console.log(iframes)
        $("head", iframes).html(headTag);
        $("body", iframes).html(editor.getValue());
      }
      if($(elem).hasClass('html')) {
        var preview = $this.prev().prev();
        preview.html(editor.getValue());
      }
      if(editor) {
        editor.refresh();
      }
    }
    setTimeout(updatePreview, 1);
  });
})

$('.CodeMirror').each(function(i,  el){
  console.log(el)
  el.CodeMirror.refresh();
});