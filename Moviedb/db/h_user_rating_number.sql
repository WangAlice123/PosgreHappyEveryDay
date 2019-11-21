
SELECT M.name,Table1.first_name,Table1.last_name,Table1.Total_Number_Of_Rating
FROM movie M Right Join

(Select W.movie_id,U.first_name,U.last_name,count(W.rating) As Total_Number_Of_Rating
From Watches W
Left Join Users U
On U.user_id = W.user_id
Group by W.movie_id,U.first_name,U.last_name) as Table1
ON M.movie_id=Table1.movie_id
Group by M.name,Table1.first_name,Table1.last_name,Table1.Total_Number_Of_Rating;
