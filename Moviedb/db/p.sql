Select U.first_name,U.Last_name,U.email,M.name,wW.rating
From Users U,Movie M,Watches WW,Topics TT,MovieTopics Mtt
Where U.user_id in (Select user_id
                   From (Select W.user_id,variance(W.rating) as var
                         From Watches W,Topics T,MovieTopics Mt
                         Where (T.description = $1)
                           And (T.topic_id = Mt.topic_id)
                           And (Mt.movie_id = W.movie_id)
                          Group by W.user_id
                          Order by var
                          Limit 1) As UID
                          )
And (U.user_id = WW.user_id)
And (WW.movie_id = M.movie_id)
And (WW.movie_id = Mtt.movie_id)
And (Mtt.topic_id = TT.topic_id)
And (TT.description = $1)
Order by M.name;
