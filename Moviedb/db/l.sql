Select T.description,count(W.movie_id)
From Topics T,MovieTopics Mt,Watches W
Where T.description in ($1,$2)
  And (T.topic_id = Mt.topic_id)
  And (Mt.movie_id = W.movie_id)
Group by T.description;
