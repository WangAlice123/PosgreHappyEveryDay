Select M.*,T.description
 From Movie M, Topics T, MovieTopics Mt
 Where (M.movie_id in (Select movie_id
                      From (Select W.movie_id,sum(W.rating) As overall
                            From Watches W
                            Group by W.movie_id
                            Order by overall Desc
                            Limit 5) As MID))
   AND (M.movie_id = Mt.movie_id)
   AND (Mt.movie_id = T.topic_id);
