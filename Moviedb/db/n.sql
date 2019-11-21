Select U.*,P.*
From Users U,Profile P
Where U.user_id in (Select user_id
                    From (Select W.user_id,count(W.user_id) as count
                          From Watches W
                          Where W.movie_id = $1
                          Group by W.user_id
                          Order by count Desc
                          Limit 1) As UID)
And (U.user_id = P.user_id);
