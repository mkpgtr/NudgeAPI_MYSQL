### Important Note :

1. To see the mongodb version of this code, please go to : https://github.com/mkpgtr/DeepThought_NudgeAPI
2. I will repeat the same process in other routes
3. I have removed almost all of the mongoDB code & only MySQL code remains. However, I am still checking if some file has mongoDB code still present. I am also going to remove the dependencies in the package.json file.  
4. So most of the recent changes I have made are inside routes/eventRoutes.js
5. I have tried to be as open as possible while writing comments because that will give the evaluator an accurate idea of my thought process & why I am doing things a certain way. 
6. And it will also help the evaluator in knowing which level I am currently at.


### Important Screenshots :

1. Pagination & Type=latest  : https://res.cloudinary.com/dvfpxjjk1/image/upload/v1686205997/pagination_correct_uuabo4.png

2. POST EVENT : https://res.cloudinary.com/dvfpxjjk1/image/upload/v1686205818/postEVENT_vesxjn.png

3. Search event by ID : https://res.cloudinary.com/dvfpxjjk1/image/upload/v1686205814/searchByID_u33ryx.png

4. Events Table : https://res.cloudinary.com/dvfpxjjk1/image/upload/v1686206280/a_glimpse_of_my_EVENTS_TABLE_fow82q.png

5. users table : https://res.cloudinary.com/dvfpxjjk1/image/upload/v1686206600/usersTABLE_invjtm.png

6. subcategory table : https://res.cloudinary.com/dvfpxjjk1/image/upload/v1686206602/SUBCATEGORYTABLE_zi3ls8.png

7. atendees table : https://res.cloudinary.com/dvfpxjjk1/image/upload/v1686206587/attendeesTABLE_uq3bjy.png

8. NUDGE TABLE : https://res.cloudinary.com/dvfpxjjk1/image/upload/v1686206596/NUDGE_TABLE_lubxyp.png
### Features :

1. Add An Event
2. Get All Events
3. Get An Event By ID
4. Pagination & Sort Recent Posts
5. Upload & Update NUDGE CoverImage
6. Upload & Update Event Images
7. Error Handling (Although I'm still checking at which places I have missed handling errors)

### New status code I used for the first time :

1. 409 : 409 status code means CONFLICT. I used it when I had to send a status code that says something is already existing. When a NUDGE is already existing about an EVENT, then there is no need to add another NUDGE about that same event. Right? that's when I felt it is appropriate to use status code 409.

### Features pending(work in progress):

1. Get single nudge
2. Some routes in routes/userRoutes.js

### Features that I missed :
1. uid column in the event table.

### I need help with : 

1. the route that deals with events pagination & sort by recent events. My code is so messy. I have violated DRY (do not repeat yoursef) principle.
2. Optimizing other sql queries & best practices in SQL.
3. createPool error handling. when database connection fails, how can I throw error if I am using createPool & not createConnnection. I found the code for createConnection but not createPool.


**without phpmyadmin this would not have been possible. The GUI(Graphical User Interface) helped me visualize solutions in terms of tables(instead of mongodb Document Objects)**


### Challenges faced & solved :

(a bit of background)

1. I was nervous about converting MongoDB + mongoose code to mysql.
2. The reason was : my mongodb + mongoose version had a lot of parent-child/nested kind of relationship.
    My mongoose code had a lot of populate function & I had never done that thing with MYSQL.
3. Fortunately, I was able to recall from my past php + mysql training & apply that knowledge to solve this problem(although the solutions are brute force solutions[at least they feel like brute force solutions])
4. Running nested loops in a recurring pattern in this project & I have used it everywhere.
5. The code is not clean.
6. I will still be pushing code for other routes that are stll pending. 

(the challenges which I overcame)

1. How to define relationships between tables in mysql.
2. how to send array from the frontend & store the attendees on a different table with two columns(event_id & attendee_id). (how to store attendees for an event)
 3. how to update only certain fields. I ran into terrible problems like updating the entire table with one value.
 
### New things I learnt while building this assignment:

1. In mongodb, I did not know how to remove children documents when the parent gets removed. This was the reason why I was not able to delete replies to the comments which themselves were replies to some other comment(in my social media API, i was able to remove comments only level deep[and that too with lots of nested looping & unclean code]). In MYSQL, there is a feature called CASCADE on Delete. It is such a powerful feature. It deletes rows from the child table when the parent table rows are deleted.

2. Although, the work in under progress, I tested this concept in PHPMYADMIN. For a NUDGE to exist, there must be an event(otherwise what is there to NUDGE about?). So when the EVENT is deleted, the NUDGE will also be deleted. Makes sense right! I achieved this while adding the foreign key to my NUDGE table that was reffering to the EVENT ID. I enabled, CASCADE on DELETE & it worked so beautifully.

3. I also discovered that UNCHECKING(disabling) the ENABLE FOREIGN KEY CHECKS does not throw an error when we delete parent rows & this might lead to inconsistent data.

4. I also found out that if we try creating relationships between table rows with inconsistent data types then we will get an error. This took a lot of my time while I was starting out.


### Some realizations : 

5. My experience while building this API was phenomenal. I did very simple things but I enjoyed it a lot. Being able to connect my php+mysql training to something like this was very enlightening. I also felt that development can be fun when we are able to connect small things with other small things. I long for these connections. In an age of chatGPT, if I am able to connect things well, I will be able to build things without getting frustrated when errors appear.

6. Writing SQL queries is a crucial skill. Although I did write SQL queries that SELECT,DELETE AND UPDATE data, I learnt that I need to work on my SQL querying in order to write(or read) long sql queries.

7. I write long notes because they help me connect my train of thoughts. Sometimes they help me in applying the Feynmann Technique on myself!
 

============================================================================
