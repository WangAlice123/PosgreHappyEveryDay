$(document.body).on('click', '#movie_list1 li a', function(e) {
  var name=$(this).text();


  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/get_actors_from_movie",
    data: {
      moviename: name
    },
    success: function(result) {
    }
  });

});
