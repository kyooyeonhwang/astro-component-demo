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
	} else if($(this).hasClass('html') === true) {
		var delay;
        var editor = CodeMirror.fromTextArea(elem, {
			mode: 'text/html',
			tabMode: 'indent'
			// onChange: function() {
			// 	clearTimeout(delay);
			// 	delay = setTimeout(updatePreview, 300);
			// }
		});
        editor.on("change", function() {
            clearTimeout(delay);
            delay = setTimeout(updatePreview, 300);
        });
        function updatePreview() {
            var preview = $this.prev().prev();
            preview.html(editor.getValue());
        }
        setTimeout(updatePreview, 300);
	}
});