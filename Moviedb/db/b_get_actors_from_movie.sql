

Select distinct A.First_name,A.Last_name,A.Date_Of_Birth,R.name
From Actor A, Role R, Movie M, ActorPlays Ap
    Where (M.name = $1)
    AND (M.movie_id = Ap.movie_id)
    AND (Ap.actor_id = A.actor_id)
    AND (Ap.role_id = R.role_id);
