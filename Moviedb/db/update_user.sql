UPDATE users
SET password=$1, last_name=$2,first_name=$3,email=$4,city=$5,province=$6,country=$7
WHERE user_id=$8;
