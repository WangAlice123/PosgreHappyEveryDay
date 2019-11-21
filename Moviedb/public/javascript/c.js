$(document.body).on('click', '#topic_list li a', function(e) {
  var description = $(this).text();


  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/details_of_directors_and_studios",
    data: {
      topic: description
    },
    success: function(result) {
      var $query_c_rows = $("#query_c_rows");
      $query_c_rows.empty();
      $.each(result, function(index, value) {
        $query_c_rows.append("<tr>");
        $query_c_rows.append("<td>"+result[index].first_name+"</td>");
        $query_c_rows.append("<td>"+result[index].last_name+"</td>");
        $query_c_rows.append("<td>"+result[index].country+"</td>");
        $query_c_rows.append("<td>"+result[index].date_released+"</td>");
        $query_c_rows.append("</tr>");
      });
    }
  });
});
