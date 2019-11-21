Select distinct m.*

From studio s,sponsors ss, movie m

where s.name=$1

and m.movie_id=ss.movie_id

and ss.studio_id=s.studio_id;
