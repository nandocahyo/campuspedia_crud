var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;

manageData();

function manageData() {
    $.ajax({
        dataType: 'json',
        url: url,
        data: {page:page}
    }).done(function(data){
    	total_page = data.last_page;
    	current_page = data.current_page;

    	$('#pagination').twbsPagination({
	        totalPages: total_page,
	        visiblePages: current_page,

	        onPageClick: function (event, pageL) {
	        	page = pageL;
                if(is_ajax_fire != 0){
			        	 getPageData();
                }
	        }
	    });

	    manageRow(data.data);
	    is_ajax_fire = 1;
    });
}

$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});

function getPageData() {
	$.ajax({
    	dataType: 'json',
    	url: url,
    	data: {page:page}
	}).done(function(data){
		manageRow(data.data);
	});
}

function manageRow(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.nama+'</td>';
	  	rows = rows + '<td>'+value.no_hp+'</td>';
        rows = rows + '<td>'+value.email+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
      rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Edit</button> ';
      rows = rows + '<button class="btn btn-danger remove-item">Delete</button>';
      rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});

	$("tbody").html(rows);
}

$(".crud-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-item").find("form").attr("action");
    var nama = $("#create-item").find("input[name='nama']").val();
    var no_hp = $("#create-item").find("input[name='no_hp']").val();
    var email = $("#create-item").find("input[name='email']").val();

    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nama:nama, no_hp:no_hp, email:email}
    }).done(function(data){
        getPageData();
        $(".modal").modal('hide');
        toastr.success('Post Created Successfully.', 'Success Alert', {timeOut: 5000});
    });
});

$("body").on("click",".remove-item",function(){
    var id = $(this).parent("td").data('id');
    var c_obj = $(this).parents("tr");

    $.ajax({
        dataType: 'json',
        type:'delete',
        url: url + '/' + id,
    }).done(function(data){
        c_obj.remove();
        toastr.success('Post Deleted Successfully.', 'Success Alert', {timeOut: 5000});
        getPageData();
    });
});

$("body").on("click",".edit-item",function(){
    var id = $(this).parent("td").data('id');
    var nama = $(this).parent("td").prev("td").prev("td").text();
    var no_hp = $(this).parent("td").prev("td").text();
    var email = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='nama']").val(nama);
    $("#edit-item").find("input[name='no_hp']").val(no_hp);
     $("#edit-item").find("input[name='email']").val(email);
    $("#edit-item").find("form").attr("action",url + '/' + id);
});

$(".crud-submit-edit").click(function(e){
    e.preventDefault();

    var form_action = $("#edit-item").find("form").attr("action");
    var id = $("#edit-item").find("input[name='id']").val();
    var nama = $("#edit-item").find("input[name='nama']").val();
    var no_hp = $("#edit-item").find("input[name='no_hp']").val();
    var email = $("#edit-item").find("input[name='email']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nama:nama, no_hp:no_hp, email:email}
    }).done(function(data){
        getPageData();
        $(".modal").modal('hide');
        toastr.success('Post Updated Successfully.', 'Success Alert', {timeOut: 5000});
    });
});