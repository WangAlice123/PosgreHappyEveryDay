Select M.*
From Movie M,Watches W
Where (W.date < '2016-01-01')
  AND (W.movie_id = M.movie_id);
