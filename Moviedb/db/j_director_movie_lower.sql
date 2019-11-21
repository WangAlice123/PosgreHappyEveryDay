Select M.name,M.date_released,D.first_name, D.last_name
From Watches W,Movie M,Director D,Directs Ds
Where (W.rating <= Any (Select WW.rating
                        From Watches WW
                        Where (WW.user_id =$1)))
  AND (W.movie_id = M.movie_id)
  AND (W.movie_id = Ds.movie_id)
  AND (Ds.director_id = D.director_id)
  Order by M.date_released
