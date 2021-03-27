
// $('#exampleModal').modal('show');
$(document).ready(function() {
    $('#exampleModal').modal('show');
});


// Set the date we're counting down to
var countDownDate = new Date("Mar 26, 2021 20:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "D : " + hours + "H : "
  + minutes + "M : " + seconds + "S";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

// komentar
$(document).ready(function(){
  //Mengirimkan Token Keamanan
  $.ajaxSetup({
          headers : {
              'Csrf-Token': $('meta[name="csrf-token"]').attr('content')
          }
      });
    
  $('#form_komen').on('submit', function(event){
    event.preventDefault();
    let nama_pengirim = $('#nama_pengirim').val();
    let komen = $('#komen').val();
    
    if(nama_pengirim==''){
        alert("Nama Pengirim Harus disii");
    } else if(komen==''){
        alert("Komentar Harus disii");
    } else {
        var form_data = $(this).serialize();
        $.ajax({
          url:"tambah_komentar.php",
          method:"POST",
          data:form_data,
          success:function(data){
            $('#form_komen')[0].reset();
            $('#komentar_id').val('0');
            load_comment();
          }, error: function(data) {
                  console.log(data.responseText)
                }
        })
    }
  });

  load_comment();

  function load_comment(){
    $.ajax({
      url:"ambil_komentar.php",
      method:"POST",
      success:function(data){
        $('#display_comment').html(data);
      }, error: function(data) {
              console.log(data.responseText)
            }
    })
  }

  $(document).on('click', '.reply', function(){
    var komentar_id = $(this).attr("id");
    $('#komentar_id').val(komentar_id);
    $('#nama_pengirim').focus();
  });
});
// komentar
