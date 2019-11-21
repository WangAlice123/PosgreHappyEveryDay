
UPDATE profile
SET age_range=$1, year_born=$2,gender=$3,occupation=$4,device_used=$5
WHERE user_id=$6;
