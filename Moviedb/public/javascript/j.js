
$(document.body).on('click', '#query_j_dropdown li a', function(e) {
  var id =parseInt($(this).attr('value'), 10);

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/director_movie_lower",
    data: {
      user_id:id
    },
    success: function(result) {
      var $query_j_rows = $("#query_j_rows");
      $query_j_rows.empty();
      var fir;
      var las;
      $.each(result, function(index, value) {
         fir=result[index].first_name.replace(/\s+/g, '');
         las = result[index].last_name.replace(/\s+/g, '');

        $query_j_rows.append("<tr>");
        $query_j_rows.append("<td>"+result[index].name+"</td>");
        $query_j_rows.append("<td>"+result[index].date_released+"</td>");
        $query_j_rows.append("<td>"+fir+"  "+las+"</td>");
        $query_j_rows.append("</tr>");
      });
    }
  });
});
