Select distinct U.First_name,U.Last_name,U.email
From Users U
Where U.user_id in (Select W.user_id
                   From Watches W
                   Where W.rating < Any (Select WW.rating
                                         From Watches WW,Users UU
                                         Where (UU.First_name = 'Kent')
                                           And (UU.Last_name = 'Johnson')
                                           And (UU.user_id = WW.user_id) ));
