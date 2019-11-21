Select distinct A.First_name,A.Last_name,A.Date_Of_Birth, D.first_name,D.last_name,D.country,S.name,S.country,NN.Movie_ID
From Actor A, Director D,Studio S, Actorplays Ap,
(Select N.movie_id,N.director_id,N.studio_id
 From (Select Ds.movie_id,Ds.director_id,Sp.studio_id
From ((Select movie_id,director_id
      From Directs) As Ds
 Join (Select movie_id,studio_id
       From Sponsors) As Sp
ON (Ds.movie_id = Sp.movie_id)))As N) As NN

Where (A.Actor_ID in (Select Actor_ID
                    From (SELECT AAp.Actor_ID,COUNT(AAp.Actor_ID) AS occurrence
                          FROM ActorPlays AAp
                          GROUP BY AAp.Actor_ID
                          ORDER BY occurrence DESC
                          LIMIT 1)
                    As most_actor))
 AND (A.Actor_ID = Ap.Actor_ID)
 AND (NN.movie_id = Ap.Movie_ID)
 And (NN.director_id = D.director_id)
 And (NN.studio_id = S.studio_id)
