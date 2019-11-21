Select distinct M.*, U.First_name,U.Last_name
From Users U,Movie M,Watches W,MovieTopics Mt,Topics T
Where (T.description = $1)
  AND (T.topic_id = Mt.topic_id)
  AND ((M.movie_id,U.user_id) in (Select movie_id,user_id
                     From Watches WW
                     Order by WW.rating
                     Limit 1));
