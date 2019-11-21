$(document.body).on('click', '#topic_list1 li a', function(e) {
  var description = $(this).text();


  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/diverse_user",
    data: {
      topic: description
    },
    success: function(result) {
      var $query_p_rows = $("#query_p_rows");
      $query_p_rows.empty();
      $.each(result, function(index, value) {
        $query_p_rows.append("<tr>");
        $query_p_rows.append("<td>"+result[index].first_name+"</td>");
        $query_p_rows.append("<td>"+result[index].last_name+"</td>");
        $query_p_rows.append("<td>"+result[index].email+"</td>");
        $query_p_rows.append("<td>"+result[index].name+"</td>");
        $query_p_rows.append("<td>"+result[index].rating+"</td>");
        $query_p_rows.append("</tr>");
      });
    }
  });
});
