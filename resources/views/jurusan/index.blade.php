@include('layouts.header')

@include('layouts.navbar')
 <div class="container">
    <br>
 
    @if ($message = Session::get('success'))
    <div class="alert alert-success alert-block">
        <button type="button" class="close" data-dismiss="alert">×</button>
          <strong>{{ $message }}</strong>
    </div>
    <br>
    @endif
   
    <form id="customerform" method="post" action="{{url('jurusan.store')}}">
      @csrf
      <div class="form-group">
        <label for="nama_jurusan">Nama Jurusan</label>
        <input type="text" name="nama_jurusan" class="form-control" id="nama_jurusan" placeholder="Please enter name">
        <span class="text-danger">{{ $errors->first('nama_jurusan') }}</span>
      </div>
      <div class="form-group">
        <label for="fakultas">Fakultas</label>
        <input type="text" name="fakultas" class="form-control" id="fakultas" placeholder="Please enter email id">
        <span class="text-danger">{{ $errors->first('fakultas') }}</span>
      </div>      
      <div class="form-group">
       <button type="submit" class="btn btn-success">Submit</button>
      </div>
    </form>
 
</div>

<script>
   if ($("#customerform").length > 0) {
    $("#customerform").validate({
     
    rules: {
      nama_jurusan: {
        required: true,
        maxlength: 50
      },
 
       fakultas: {
            required: true,
        maxlength: 50
        },   
    },
    messages: {
       
      nama_jurusan: {
        required: "Please enter nama jurusan",
        maxlength: "Your last name maxlength should be 50 characters long."
      },
      fakultas: {
        required: "Please enter nama jurusan",
        maxlength: "Your last name maxlength should be 50 characters long."
      },
        
    },
    })
  }
</script>
