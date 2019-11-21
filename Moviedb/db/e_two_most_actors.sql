SELECT * FROM ACTOR WHERE actor_id=(
Select A1.actor_id
From Actor A1,Actor A2
Where (select(A1.actor_id,A2.actor_id) As Apairs) =
(Select P.pairs
From
 (Select (N.AC1,N.AC2) As pairs, count(*) as appears
 From
 (Select V.actor_id As AC1,W.actor_id As AC2,V.movie_id
 From (Select actor_id,movie_id
       From ActorPlays) As V
   Join (Select actor_id,movie_id
       From ActorPlays) As W

   On (V.movie_id = W.movie_id) And (V.actor_id != W.actor_id)) As N

   Group by pairs
   Order by appears Desc
   Limit 1) As P))
   or actor_id=(
   Select A2.actor_id
   From Actor A1,Actor A2
   Where (select(A1.actor_id,A2.actor_id) As Apairs) =
   (Select P.pairs
   From
    (Select (N.AC1,N.AC2) As pairs, count(*) as appears
    From
    (Select V.actor_id As AC1,W.actor_id As AC2,V.movie_id
    From (Select actor_id,movie_id
          From ActorPlays) As V
      Join (Select actor_id,movie_id
          From ActorPlays) As W

      On (V.movie_id = W.movie_id) And (V.actor_id != W.actor_id)) As N

      Group by pairs
      Order by appears Desc
      Limit 1) As P))
