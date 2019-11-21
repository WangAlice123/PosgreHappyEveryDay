SELECT director.* FROM director,movie,directs
WHERE movie.name=$1 And
movie.movie_id=directs.movie_id And
director.director_id=directs.director_id;
