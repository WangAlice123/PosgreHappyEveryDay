SET SEARCH_PATH='moviedb';
Select distinct A.First_name,A.Last_name,A.DateOfBirth, D.firstname,D.lastname,D.country,S.name,S.country
From Actor A, Director D,Studio S, Sponsors Sp,ActorPlays Ap,Directs Ds
Where (A.ActorID in (Select ActorID
                    From (SELECT AAp.ActorID,COUNT(AAp.ActorID) AS occurrence
                          FROM ActorPlays AAp
                          GROUP BY AAp.ActorID
                          ORDER BY occurrence DESC
                          LIMIT 1)
                    As most_actor))
 AND (A.ActorID = Ap.ActorID)
 AND (Sp.movie_id = Ap.MovieID)
 AND (S.studio_id = Sp.studio_id)
 AND (Ds.movie_id = Ap.MovieID); 
