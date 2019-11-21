$(document).ready(function() {



  $.ajax({
    type: "POST",
    url: "http://localhost:3000/movie/get_user",
    data: {

    },
    success: function(result) {
      var str = JSON.stringify(result);
      $('#first_name').attr('value', result[0].first_name);
      $('#last_name').attr('value', result[0].last_name);
      $('#email').attr('value', result[0].email);
      $('#city').attr('value', result[0].city);
      $('#province').attr('value', result[0].province);
      $('#country').attr('value', result[0].country);
      //$('#age_range').attr('value', result[0].age_range);
      $('#year_born').attr('value', result[0].year_born);
      //$('#gender').attr('value', result[0].gender);
      $('#occupation').attr('value', result[0].occupation);
      $('#device_used').attr('value', result[0].device_used);
      $('#password').attr('value', result[0].password);


    }
  });
});

//
// $(document.body).on('click', '#update', function() {
//
//   $.ajax({
//     type: "POST",
//     url: "http://localhost:3000/movie/update_user",
//     data: {
//       first_name: $("#first_name").val(),
//       last_name: $("#last_name").val(),
//       email: $("#email").val(),
//       city: $("#city").val(),
//       province: $("#province").val(),
//       country: $("#country").val(),
//       password: $("#password").val(),
//       age_range: $("#age_range").text(),
//       year_born: $("#year_born").val(),
//       gender: $("#gender").text(),
//       occupation: $("#occupation").val(),
//       device_used: $("#device_used").val()
//     },
//     success: function(result) {
//       var str = JSON.stringify(result);
//       alert(result);
//     }
//   });
// });
