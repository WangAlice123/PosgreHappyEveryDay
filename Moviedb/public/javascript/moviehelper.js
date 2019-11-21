var movie_data;
var page;
var global_i;
var global_b;
$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/users/get_movie_list",
    data: {},
    success: function(result) {
      $('#image-gallery-image1').attr('src', result[0].image);
      $("#frame").attr("src", "http://www.youtube.com/embed/" + result[0].trailer.replace(/\s+/g, '') + "?rel=0&autoplay=0");
     $('#image-gallery-title1').text(result[0].name.replace(/\s+/g, ''));
   //$('#image-gallery-caption1').text(result[0].name.replace(/\s+/g, ''));


      movie_data = result;
      var length = result.length;
      var grid_length = 12;
      if (length < grid_length) {
        grid_length = length;
      }
      var id = "#grid" + 1;
      var $movie_row = $("#grid1");
      var string1;
      var string2;
      var i = 0;
      var a=1;
      var img_id;
      var html;
      var actor;
      var director;
      for (i = 0; i < 12; i++) {
        string1 = result[i].image;
        string2 = result[i].name;
        string1 = string1.replace(/\s+/g, '');
        string2 = string2.replace(/\s+/g, '');




        global_b=i+1;
        //alert(global_b+"a");

        id = "#g" + a;
        img_id = "img" + a;
        $movie_row = $(id);
        var html=" <a id='"+img_id+"' class='thumbnail' href='#' data-image-id='' data-toggle='modal' data-target='#image-gallery"+a+"' data-title='Im so nice' data-caption='And if there is money left, my girlfriend will receive this car' data-image='"+string1+"' ><img class='img-responsive' src='"+string1+"' style='width:390px;height:260px;' alt='Another alt text'></a>";
        $movie_row.empty();

        $movie_row.append(html);
        $('#image-gallery-image'+a).attr('src', result[i].image);
        $("#frame"+a).attr("src", "http://www.youtube.com/embed/" + result[i].trailer.replace(/\s+/g, '') + "?rel=0&autoplay=0");
       $('#image-gallery-title'+a).text(result[i].name.replace(/\s+/g, ''));

        a++;
       }
       global_i=i;
       $.ajax({
         type: "POST",
         url: "http://localhost:3000/users/get_actors_from_movie",
         data: {
           moviename: result[0].name
         },
         success: function(result2) {
           var actorid="#actors"+1;
          //alert(actorid+"");
           var $actors = $(actorid);
           $actors.empty();
           $.each(result2, function(index, value) {
             actor=result2[index].first_name.replace(/\s+/g, '')+" "+result2[index].last_name.replace(/\s+/g, '');
             $actors.append("<p>Actor:"+actor+"</p>");
           });
         }
       });
       $.ajax({
         type: "POST",
         url: "http://localhost:3000/users/get_director_from_movie",
         data: {
           moviename: result[0].name
         },
         success: function(result3) {
           var actorid="#actors"+1;
           //alert(actorid);
           var $actors = $(actorid);
             director=result3[0].first_name.replace(/\s+/g, '')+" "+result3[0].last_name.replace(/\s+/g, '');
             $actors.append("<p> Director:"+director+"</p>");

         }
       });
    }
    //GET ACTORS:



  });


  $('#right').click(function(){
    var length = movie_data.length;
    var grid_length = 12;
    if (length < grid_length) {
      grid_length = length;
    }
    var id = "#grid" + 1;
    var $movie_row = $("#grid1");
    var string1;
    var string2;
    if(global_i>=length){
      global_i=0;
    }
    var a=1;
    var img_id;
    var html;
    for (i = 0; i < 12; i++) {
      string1 = movie_data[global_i].image;
      string2 = movie_data[global_i].name;
      string1 = string1.replace(/\s+/g, '');
      string2 = string2.replace(/\s+/g, '');

      id = "#g" + a;
      img_id = "img" + a;
      $movie_row = $(id);
      var html=" <a id='"+img_id+"' class='thumbnail' href='#' data-image-id='' data-toggle='modal' data-target='#image-gallery"+a+"' data-title='Im so nice' data-caption='And if there is money left, my girlfriend will receive this car' data-image='"+string1+"' ><img class='img-responsive' src='"+string1+"' style='width:390px;height:260px;' alt='Another alt text'></a>";
      //var ss="<a href='#' class='btn btn-default meat' data-img='http://i.imgur.com/R3WLi9s.jpg'> <input type='image' src='http://i.imgur.com/R3WLi9s.jpg' alt='Submit' width='48' height='48'></a>";
      $movie_row.empty();

      $movie_row.append(html);
      $('#image-gallery-image'+a).attr('src', movie_data[global_i].image);
      $("#frame"+a).attr("src", "http://www.youtube.com/embed/" + movie_data[global_i].trailer.replace(/\s+/g, '') + "?rel=0&autoplay=0");
     $('#image-gallery-title'+a).text(movie_data[global_i].name.replace(/\s+/g, ''));
   global_i++;
   global_i=global_i%length;
   a++;
    }

  });

  $('#search').click(function(){
    var $append = $("#append");
    var entry=$("#query").val();
    $append.empty();

    //append movie:
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/get_movie",
        data: {
          moviename: entry
        },
        success: function(result) {
          var trailer = result[0].trailer;
          trailer = trailer.replace(/\s+/g, '');
          var img=result[0].image;
          img=img.replace(/\s+/g, '');
          var name=result[0].name;
          $append.append("<div class='row'><div class='col-sm-6'><img class='img-responsive' src='"+img+"' style='width:390px;height:260px;'></div><div class='col-sm-6'><div id='actoor'><div>"+name+"</div></div></div></div><hr><div class='row'><div class='col-md-offset-1'><iframe id='frame1' src='http://www.youtube.com/embed/" + trailer + "?rel=0&autoplay=0'width='500' height='300' frameborder='0' allowfullscreen></iframe></div></div>");

        }
      });
      //get director:
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/get_director_from_movie",
        data: {
          moviename: entry
        },
        success: function(result3) {
          //alert(result3);
            var first_name=result3[0].first_name;
            var last_name=result3[0].last_name
            var $actoor = $("#actoor");
            first_name=first_name.replace(/\s+/g, '');
            last_name=last_name.replace(/\s+/g, '');
            $actoor.append("<div> Director: "+first_name+"  "+last_name+"</div>");

        }
      });
      // actor in the movie
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/get_actors_from_movie",
        data: {
          moviename: entry
        },
        success: function(result2) {
            var list=1;
          $.each(result2, function(index, value) {

            var first_name=result2[index].first_name;
            var last_name=result2[index].last_name
            var $actoor = $("#actoor");
            first_name=first_name.replace(/\s+/g, '');
            last_name=last_name.replace(/\s+/g, '');
            $actoor.append("<div> Actor"+list+": "+first_name+"  "+last_name+"</div>");
list++;
          });
        }
      });


      //get actor:
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/find_actor",
        data: {
          first_name: entry
        },
        success: function(result4) {
          $.each(result4, function(index, value) {

            var first_name=result4[index].first_name;
            var last_name=result4[index].last_name;
            var img=result4[0].image;
            img=img.replace(/\s+/g, '');
            var $actoor = $("#actoor");
            first_name=first_name.replace(/\s+/g, '');
            last_name=last_name.replace(/\s+/g, '');
            $append.append("<div class='row'><div class='col-sm-6'><img class='img-responsive' src='"+img+"' style='width:390px;height:260px;'></div><div class='col-sm-6'><div id='actoor'><div> Name:"+first_name+" "+last_name+"</div><div> Date of birth: "+result4[0].date_of_birth+"</div></div></div></div><hr><div class='row'></div>");
          });
        }
      });
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/find_director",
        data: {
          first_name: entry
        },
        success: function(result4) {
          $.each(result4, function(index, value) {

            var first_name=result4[index].first_name;
            var last_name=result4[index].last_name;
            var img=result4[0].image;
            img=img.replace(/\s+/g, '');
            first_name=first_name.replace(/\s+/g, '');
            last_name=last_name.replace(/\s+/g, '');
            $append.append("<div class='row'><div class='col-sm-6'><img class='img-responsive' src='"+img+"' style='width:390px;height:260px;'></div><div class='col-sm-6'><div id='director'><div> Name:"+first_name+" "+last_name+"</div><div> Country: "+result4[0].country+"</div></div></div></div><hr><div class='row'></div>");
          });
        }
      });

      $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/find_movie_by_director",
        data: {
          first_name: entry
        },
        success: function(result5) {
            var list2=1;
          $.each(result5, function(index, value) {


            var $director = $("#director");


            $director.append("<div> Movie"+list2+": "+result5[index].name+"</div>");
list2++;
          });
        }
      });
      //get studio
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/get_studio",
        data: {
          studio_name: entry
        },
        success: function(result6) {
          $.each(result6, function(index, value) {

            var name=result6[index].name;
            var country=result6[index].country;
            var img=result6[0].image;
            img=img.replace(/\s+/g, '');
            $append.append("<div class='row'><div class='col-sm-6'><img class='img-responsive' src='"+img+"' style='width:390px;height:260px;'></div><div class='col-sm-6'><div id='studio'><div> Studio Name:"+name+"</div><div> Country: "+result6[0].country+"</div></div></div></div><hr><div class='row'></div>");
          });
        }
      });
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/find_movie_by_studio",
        data: {
          studio_name: entry
        },
        success: function(result5) {
            var list2=1;
          $.each(result5, function(index, value) {


            var $studio = $("#studio");

            $studio.append("<div> Movie"+list2+": "+result5[index].name+"</div>");
            list2++;
          });
        }
      });


});







 });
//
//
//
//
// // loading the page with info
