### Important Note :

1. Almost 90% MYSQL code is inside the routes/eventRoutes.js
2. I will repeat the same process in other routes
3. That's why I uploaded this code to explain my thought process regarding how I am converting mongoose(mongodb) code to mysql2(mysql)
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

### Features pending(work in progress):

1. CRUD regarding NUDGES
2. Upload & Update photo
3. Update event & Delete Event

### Features that I missed :
1. uid column in the event table, will add it later once I am done with other more important things related to NUDGES & image uploading. 

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

============================================================================



### Why am I excited about small things?

1. When I can build something using deductive logic, there joy is unparalleled. This API might not be a great thing for a lot of people and that's okay. But it is immensely great for me because I am learning to connect the dots. I have grown emotionally fonder of this API & I don't know why.

2. When I will be able to connect the dots well, I will be able to model any real world design in database and programming logic. 

3. No one youtube teaches, how to imagine an idea, note it down on paper & then transform the plan into code.

4. Building small things with attention to detail, help me reach conclusions which are reusbale. That's why I am excited about small programs and concepts. They enlighten me. 

5. Being from a non-CS background, I guess my brain has not registered & associated the boring feelings to interesting concepts. Most of my friends I know & meet are not interested in OOPs concepts & UML Diagrams OR Entity Relationships Diagrams.

6. It's very important to be able to use pre-written libraries because they make our development process faster. But being able to write reusable code is far more joyful. Analogy : It is easy to play a tune which is already composed. You know the chords because you have searched on Google. You can play that song in live shows & people will clap for you. But when you attempt to compose an original song that is as beautiful, you need to study hard(prodigies AND geniuses excluded) OR experiment intensely. That's the same with computer science also.

7. These are just my beliefs & how I see things. I will not want to waste anyone's time during live-interviews with these long lines so I am just saying these things here in my GITHUB readme. I hope I find someone who understands my excitement & guides me on how to write reusable code. 

8. But why I want to write my reusbale code? The ability to write reusable code can help me build my own libraries & frameworks.