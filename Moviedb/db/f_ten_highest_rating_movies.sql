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
 
