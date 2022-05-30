// Define spreadsheet URL.
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/13bHbrh4cjnChodL8T3otMhFrRDYUNgduoywxr3EopRc/edit#gid=0';
var zepline = 'https://app.zeplin.io/project/5c7d0e63c7bd5051ed91ec3b/screen/';

// Load top five HR leaders.
$('.datatable').sheetrock({
  url: mySpreadsheet,
  zepline: zepline,
  callback : makeSortable
});

function makeSortable(error, options, response) {
  // Target is not a jQuery object, so we need to call jQuery
  // explicitly.
  $(options.user.target).DataTable({
  	"paging": false,
    "ordering": false,
    "info": false,
    "autoWidth": false,
    "columnDefs": [
     	  {
          "render": function (data, type, row) {
            return '<a href="'+ row[4] + data +'.html" target="_blank" class="screen_link">' + data + '</a>';
          },
          "targets": [5]
        },{
          "render": function (data, type, row) {
            return '<a href="'+ row[5] + row[6] +'.html" target="myiframe" >Mobile</a>';
          },
          "targets": [6]
        },{
          "render": function (data, type, row) {
            return '<a href="'+ zepline + data + '" target="blank" title="새창열림">' + data + '</a>';
          },
          "targets": [7]
        },{
          "render": function(data, type, row){
            
            return "<ul><li>" + data.replace(/(?:\r\n|\r|\n)/g, '</li><li>') + "</ul>";
          },
          "targets": [10]
        },{
          "visible": false,
          "targets": [4,12,13]
        }
     ],
    "columns": [
      {className: "depth1"},
      {className: "depth2"},
      {className: "depth3"},
      {className: "depth4"},
      null,
      {className: "screen_id"},
      {className: "emulator"},
      {className: "figma"},
      {className: "planner"},
      {className: "date_01"},
      {className: "comment"},
      {className: "author"},
      null,
			null
		 ],
     "createdRow": function (row, data, index) {
        $(row).addClass(data[12]);
        $(row).addClass(data[13]);
     }
  });
}

$(document).ready(function() {
    $('body table').on('mouseover', 'a.screen_link', function() {
        $(this).addClass('active');
        $(this).qrcode({
            render: 'canvas',
            size: 110,
            text: this.href
        });
    });

    $('body table').on('mouseleave', 'a', function() {
        $(this).removeClass('active');
        $(this).children('canvas').remove();
    });

    $(".screen_iframe").click(function(e) {
        e.preventDefault();
        $("#myiframe").attr("src", $(this).attr("href"));
    })

    $("#ui_mobile_emulator").click(function(e){
        $("body").toggleClass("mobile_emulator_on");
    })
})