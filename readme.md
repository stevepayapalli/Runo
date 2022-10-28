This assignment is all about Cowin/Corona vaccination registration 
First Api that i have created is User registration 
router.post(/UserRegistration) this api does is registering people details before booking the slot for the vaccine 
then the next API i have created is login API Where a person can login his credential in order to book the slot for the vaccine  
router.post(/loginUser)
Once the person has Logged in -> He should be able to check the availablity Slot for the vaccine by filtering the date which he is looking for the vaccination -> For this the API which i will be creating is GET API the steps are First the person login's the account he will be getting the token with that token he will be able to check the availiablity slots by fetching all the vaccination details
router.GET(/getVaccineDetails)
Once he gets the details he will be able to book the slot by registering the slot 
router.post(/registerSlot)
Once the timeline ends it shall be assumed that person has completed the first dose so he can go for secound dose
----------------------------------------------------------------------------------
Admin - 
Admin Registration does not require any API it should be manually be created in DB but with through API it can be done
Admin should be able to see how many people have registered for the vaccination by using GET API 
------------------------------------------------------------------------------------
Vaccine Model 

we will be creating a model schema in order to create the information which a user can see the availablity slots for the vaccination 
which does not require any validation the reason is we are just adding the information in DB so user can access it later
let us assume there is 30 days vaccination drive 
Each day the timing for the slot will be Morning 10:00AM to 5:00PM 
Every half an hour there is a vaccination avalilablity slot (EX 10:00-10:30, 10:30-11:00.......so on)
Each time slot 10 person can register for the vaccination.
so total number of vaccination should be 30*14*10=4200 vaccination  

-------------------------------------------------------------------------------------
