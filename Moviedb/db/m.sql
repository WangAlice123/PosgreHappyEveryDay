Select U.*,P.*
From Users U,Profile P
Where (U.user_id in (Select user_id
                    From (Select W.user_id, Avg(W.rating) As average
                          From Watches W
                          Group by W.user_id
                          Order by average Desc
                          Limit 1) As UID))
  And (U.user_id = P.user_id);
