Select distinct m.*

From director d,directs ds, movie m

where d.first_name=$1

and m.movie_id=ds.movie_id

and ds.director_id=d.director_id;
