## Castle Itinerary Application

A university group project which allows the user to have a choice of 4 castles to visit for the day and provides a simple itinerary dependant on their choices.

The user may:
1. Choose their desired castle between the 4 options.
2. Choose the date and time they would like to visit the castle.
3. Choose how many people they will visit the castle with.
4. See the best available bus time, bus fees, castle entrance fee, and the total cost of the entire journey.
5. Pay for the given itinerary using PayPal.
6. Be given an order number for their order.
7. Query their order to see the details again using their given order number and the email address used for that itinerary.


# Stack and application info

- VueJS (frontend)
- NodeJS with ExpressJS (backend)
- MySQL (database, hosted through RDS)

New orders from customers are saved onto the relational database, which allows for a retrieval of their order details when the users want to query their order. 

Bus timetable details are stored onto the database and queries are sent from the backend to retrieve the best bus timings for outbound and return journeys to/from the chosen castle.

