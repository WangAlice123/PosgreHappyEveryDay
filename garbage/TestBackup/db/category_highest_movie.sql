SET SEARCH_PATH='moviedb';
Select distinct M.*, U.First_name,U.first_name
From Users U,Movie M,Watches W,MovieTopics Mt,Topics T
Where (T.description = Y)
  AND (T.topic_id = Mt.topic_id)
  AND ((M.movie_id,U.UserID) in (Select movie_id,userid
                     From Watches WW
                     Order by WW.rating
                     Limit 1));
