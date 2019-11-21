var glob1;
var glob2;

$(document.body).on('click', '#topic_list3 li a', function(e) {
  glob1 = $(this).text();
if(glob1===undefined || glob2===undefined){
}else{
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/category_most_popular",
    data: {
      topic1:glob1,
      topic2:glob2
    },
    success: function(result) {
      var $query_l_rows = $("#query_l_rows");
      $query_l_rows.empty();

      $.each(result, function(index, value) {

        $query_l_rows.append("<tr>");
        $query_l_rows.append("<td>"+result[index].description+"</td>");
        $query_l_rows.append("<td>"+result[index].count+"</td>");
        $query_l_rows.append("</tr>");
      });
    }
  });
}
});

$(document.body).on('click', '#topic_list4 li a', function(e) {
  glob2 = $(this).text();
  if(glob1===undefined || glob2===undefined){
  }else{

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/category_most_popular",
    data: {
      topic1:glob1,
      topic2:glob2
    },
    success: function(result) {
      var $query_l_rows = $("#query_l_rows");
      $query_l_rows.empty();

      $.each(result, function(index, value) {

        $query_l_rows.append("<tr>");
        $query_l_rows.append("<td>"+result[index].description+"</td>");
        $query_l_rows.append("<td>"+result[index].count+"</td>");
        $query_l_rows.append("</tr>");
      });
    }
  });
}
});
