$(document.body).on('click', '#movie_list2 li a', function(e) {
  var id =parseInt($(this).attr('value'), 10);


  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/n",
    data: {
      movie_id: id
    },
    success: function(result) {
      var $query_n_rows = $("#query_n_rows");
      var fir;
      var las;
      $query_n_rows.empty();
      $.each(result, function(index, value) {
        fir=result[index].first_name.replace(/\s+/g, '');
        las = result[index].last_name.replace(/\s+/g, '');
        $query_n_rows.append("<tr>");
        $query_n_rows.append("<td>"+fir+"  "+las+"</td>");
        $query_n_rows.append("<td>" +result[index].email + "</td>");
        $query_n_rows.append("<td>" +result[index].city + "</td>");
        $query_n_rows.append("<td>" +result[index].province + "</td>");
        $query_n_rows.append("<td>" +result[index].country + "</td>");
        $query_n_rows.append("<td>" +result[index].age_range + "</td>");
        $query_n_rows.append("<td>" +result[index].year_born + "</td>");
        $query_n_rows.append("<td>" +result[index].gender + "</td>");
        $query_n_rows.append("<td>" +result[index].occupation + "</td>");
        $query_n_rows.append("<td>" +result[index].device_used + "</td>");
        $query_n_rows.append("</tr>");
    });
    }
  });
});
