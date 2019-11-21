$(document.body).on('click', '#topic_list2 li a', function(e) {
  var description = $(this).text();


  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/category_highest_movie",
    data: {
      topic: description
    },
    success: function(result) {
      var $query_k_rows = $("#query_k_rows");
      $query_k_rows.empty();
      var fir;
      var las;
      $.each(result, function(index, value) {
        fir=result[index].first_name.replace(/\s+/g, '');
        las = result[index].last_name.replace(/\s+/g, '');
        $query_k_rows.append("<tr>");
        $query_k_rows.append("<td>"+result[index].name+"</td>");
        $query_k_rows.append("<td>"+fir+"  "+las+"</td>");
        $query_k_rows.append("</tr>");
      });
    }
  });
});
