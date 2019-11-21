SET SEARCH_PATH='moviedb';
Select M.name,M.date_released,D.firstname, D.lastname
From Watches W,Movie M,Director D,Directs Ds
Where (W.userid = X)
  AND (W.movie_id = M.movie_id)
  AND (W.movie_id = Ds.movie_id)
  AND (Ds.director_id = D.director_id);
