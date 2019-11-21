
Select distinct D.first_name,D.last_name,D.country,S.name,S.country,M.date_released
From Director D, Directs Ds, Movie M, Studio S, Topics T, MovieTopics Mt, Sponsors Sp
Where (T.description = $1)
  AND (T.topic_id = Mt.movie_id)
  AND (Mt.movie_id = M.movie_id)
  AND (Mt.movie_id = Ds.movie_id)
  AND (Ds.director_id =  D.director_id)
  AND (Mt.movie_id = Sp.movie_id)
  AND (Sp.studio_id = S.studio_id);
