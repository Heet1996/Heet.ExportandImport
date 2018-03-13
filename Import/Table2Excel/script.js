// Code goes here

$(document).ready(function(){
  var table = $('#example').DataTable();
  
  $('#btn-export').on('click', function(){
$("#example").table2excel({
					exclude: ".noExl",
					name: "Excel Document Name",
					filename: "myFileName" + new Date().toISOString().replace(/[\-\:\.]/g, ""),
					fileext: ".xls",
					exclude_img: true,
					exclude_links: true,
					exclude_inputs: true
				});
  });      
})

