SET SEARCH_PATH='moviedb';
Select W.movie_id,U.UserID,count(W.rating) As Total_Number_Of_Rating,W.date
From Watches W
Left Join Users U
On U.UserID = W.userid
Group by W.movie_id,U.UserID,W.date;
