# Castle Itinerary Application

A university group project which allows the user to have a choice of 4 castles to visit for the day and provides a simple itinerary dependant on their choices.

The user may:
1. Choose their desired castle between the 4 options.
2. Choose the date and time they would like to visit the castle.
3. Choose how many people they will visit the castle with.
4. See the best available bus time, bus fees, castle entrance fee, and the total cost of the entire journey.
5. Pay for the given itinerary using PayPal.
6. Be given an order number for their order.
7. Query their order to see the details again using their given order number and the email address used for that itinerary.


## Stack and application info

- VueJS (frontend)
- NodeJS with ExpressJS (backend)
- MySQL (database, hosted through RDS)

New orders from customers are saved onto the relational database, which allows for a retrieval of their order details when the users want to query their order. 

Bus timetable details are stored onto the database and queries are sent from the backend to retrieve the best bus timings for outbound and return journeys to/from the chosen castle.

## System design/architecture

![MicrosoftTeams-image](https://user-images.githubusercontent.com/63564199/175986916-4a4fc111-bcc8-4463-8426-44b8e7a7c2b1.png)

## Application layout
- Front page
<img width="560" alt="Screenshot 2022-06-27 at 17 14 54" src="https://user-images.githubusercontent.com/63564199/175987710-ad4bbe77-f888-4c16-b4ee-ebe06433c74d.png">

- When choosing a castle
<img width="220" alt="Screenshot 2022-06-27 at 17 14 34" src="https://user-images.githubusercontent.com/63564199/175987815-f7075dcd-ed21-46e0-b33e-5423106898dc.png">

- When choosing bus times
<img width="527" alt="Screenshot 2022-06-27 at 17 15 43" src="https://user-images.githubusercontent.com/63564199/175987880-4020e9a5-132b-438d-96ce-ed1b715033a2.png">

- When querying order
<img width="1437" alt="Screenshot 2022-05-12 at 15 08 29" src="https://user-images.githubusercontent.com/63564199/175987977-8a80270e-aa60-42c1-88f1-3bb56ea8315f.png">

- Displaying queried order
<img width="1439" alt="Screenshot 2022-05-12 at 15 09 27" src="https://user-images.githubusercontent.com/63564199/175988060-b0321fdd-dbf6-41d8-beb6-5423bec57f4a.png">


