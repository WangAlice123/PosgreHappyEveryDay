/* a */
Select M.*
from Movie M
where M.name = user_select_name
/*a is done*/
/* b is done */
Select distinct A.First_name,A.Last_name,A.DateOfBirth,R.name
From Actor A, Role R, Movie M, ActorPlays Ap
Where (M.name = user_select_name)
  AND (M.MovieID = Ap.movieid)
  AND (Ap.ActorID = A.ActorID)
  AND (Ap.RoleID = R.RoleID)

 /* c */
 Select distinct D.firstname,D.lastname,D.country,S.name,S.country,M.date_released
 From Director D, Directs Ds, Movie M, Studio S, Topics T, MovieTopics Mt, Sponsors Sp
 Where (T.description = $1)
   AND (T.topic_id = Mt.movie_id)
   AND (Mt.movie_id = M.movie_id)
   AND (Mt.movie_id = Ds.movie_id)
   AND (Ds.director_id =  D.director_id)
   AND (Mt.movie_id = Sp.movie_id)
   AND (Sp.studio_id = S.studio_id);


/* d */
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

 /* e */
 Select A.*
 From Actor A,ActorPlays Ap
 Where

 A.ActorID in (Select )

 /* f */
 Select distinct M.name
 From Movie M, Watches W
 Where (M.movie_id in (Select movie_id
                      From (Select WW.movie_id, sum(WW.rating) As overall
                            From Watches WW
                            Group by WW.movie_id
                            Order by  overall Desc
                            Limit 10) As MID
                            ))
  And (M.movie_id = W.movie_id);

 /* g */
Select M.*,T.description
 From Movie M, Topics T, MovieTopics Mt
 Where (M.movie_id in (Select movie_id
                      From (Select W.movie_id,sum(W.rating) As overall
                            From Watches W
                            Group by W.movie_id
                            Order by overall Desc
                            Limit 1) As MID))
   AND (M.movie_id = Mt.movie_id)
   AND (Mt.movie_id = T.topic_id);

/* h */
Select W.movie_id,U.UserID,count(W.rating) As Total_Number_Of_Rating,W.date
From Watches W
Left Join Users U
On U.UserID = W.userid
Group by W.movie_id,U.UserID,W.date;

/* i */
Select M.*
From Movie M,Watches W
Where (W.date < '2016-01-01')
  AND (W.movie_id = M.movie_id);

/* j */
Select M.name,M.date_released,D.firstname, D.lastname
From Watches W,Movie M,Director D,Directs Ds
Where (W.userid = X)
  AND (W.movie_id = M.movie_id)
  AND (W.movie_id = Ds.movie_id)
  AND (Ds.director_id = D.director_id);

/* k */
Select distinct M.*, U.First_name,U.first_name
From Users U,Movie M,Watches W,MovieTopics Mt,Topics T
Where (T.description = Y)
  AND (T.topic_id = Mt.topic_id)
  AND ((M.movie_id,U.UserID) in (Select movie_id,userid
                     From Watches WW
                     Order by WW.rating
                     Limit 1));
