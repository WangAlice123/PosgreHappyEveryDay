$(document.body).on('click', '#movie_list1 li a', function(e) {
  var name = $(this).text();


  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/get_actors_from_movie",
    data: {
      moviename: name
    },
    success: function(result) {
      var $query_b_rows = $("#query_b_rows");
      $query_b_rows.empty();
      $.each(result, function(index, value) {
        $query_b_rows.append("<tr>");
        $query_b_rows.append("<td>"+result[index].first_name+"</td>");
        $query_b_rows.append("<td>"+result[index].last_name+"</td>");
        $query_b_rows.append("<td>"+result[index].date_of_birth+"</td>");
        $query_b_rows.append("<td>"+result[index].name+"</td>");
        $query_b_rows.append("</tr>");
      });
    }
  });
}); 
