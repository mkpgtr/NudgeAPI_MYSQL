


# Deepthought_NudgeAPI


## Solutions Links :

#### Important Note : 
0. THis project will not work without the credentials in the .env file. The .env file includes
    mongo_url,JWT_SECRET,CLOUD_NAME (which refers to cloudinary cloud name), CLOUD_API_KEY, and 
    CLOUD_API_SECRET
1. I have planned & designed & coded this API without any external help(except for Swagger Documentation).
2. Creating Swagger Documentation was new for me. 
3. I rely on my github code &  video recordings to explain every functionality during interview round.
4. I have tried and tested the endpoints and they work absolutely fine using Postman. 
If things break(or if some inconsistent status codes are shown[silly mistakes]) in the Swagger Documentation, then it must be some configuration error.
5. I have built everything myself.
6. To run the swagger documention on localhost:5000, comment out the render link on line number 7 
    and uncomment the the line number 6 in swagger.yaml file. restart the node server and visit
    http://localhost:5000/api/v3/app/api-docs/#
Links : 

### Task 1

1. Task 1 : https://github.com/mkpgtr/DeepThought_NudgeAPI
    Task 1 Video Link(Event Creation Process) : https://drive.google.com/file/d/1ENchv1flTSV19FaA4cnmBP2DbiivgQdY/view
    (the scheduled field in nudge & event schema finally evolved. while recording this video the scheduled field has a different structure than the current structure )
    Task 1 Video Link(Pagination & Search By Id) : https://drive.google.com/file/d/1DG4Zrnhlgg4r2o85atL-DfO-ZXj-tTkh/view


(A json formatter is recommended to actually clearly see this on the browser like so : https://res.cloudinary.com/dvfpxjjk1/image/upload/v1685611902/jsonformatsss_opvud7.png )
Please also have a look at : https://deepthought-nudge-api.onrender.com/api/v3/app/events
and 
also this : https://deepthought-nudge-api.onrender.com/api/v3/app/events?id=64783a7e3e6c3f6a30160330

For pagination & recent posts : https://deepthought-nudge-api.onrender.com/api/v3/app/events?type=latest&page=1&limit=5

### Task 2

2. Task 2 :https://deepthought-nudge-api.onrender.com/api-docs/#/

    (See the Nudge Section by visiting this above link)
    (I have also explained my thought process about Nudges in this readme.md also)
    
     >(this link takes some time to load(approx one minute) as it is deployed on a free server)



    (this api is password protected for create & delete operations, I will send the password in google
    form for assignment submission
    )


Deepthought Nudge API is an API that assists in creating annoucements(nudges) for events. Designed & built by Manish Kumar Panda as part of an assignment task for Deepthought. The API uses different Schemas to model Events. Once an Event is created, A Nudge can be created about it. 


## Features

- Create Events based on EventTypes & Sub Categories
- Assign moderators & attendees for a particular event
- Upload images for the Event and Nudge and store them on cloud
- Easily create Nudges(annoucements) with an icon, tagline,schedule,etc.
- Create new users and assign them a specific role
- Authentication system in place to prohibit access
- Error handling to maintain stability & data integrity 
- API Documentation written in swagger & deployed on Render
- Pagination feature along with sorting functionality for latest events
- Create, Read, Update & Delete an Event along with their images
- Create, Read, Update & Delete a Nudge along with their images
- The API can be consumed easily by frontend developers to perform CRUD operations.


### Deepthought_NudgeAPI revolves around Events & Nudges.




##### Some important points about Events:
1. An Event is made up(composed) of EventType(parent),SubCategory(of Event i.e child)
2. Attendees(who attend the event) & Moderators who host the Event
3. User(who is entering the Event data into database)
4. Rigor rank(regarding the rigor of the event).
 Assumption with an Example : An event about machine learning model optimization(rigor_rank:9) is more rigorous than an event on making hot/cold coffee(rigor_rank:5) provided that company deals in machine learning projects(an not in coffee) and any mistake in that area might cost the company a lot.
6. scheduled date & time of the event(stored as type:Date in Event Schema)
7. Tagline(that is a witty line for that event)

##### Some important points about Nudges(and how I made sense of it):

Assume there are Events already Scheduled in February. Now, invitations(Nudges) must be sent
prior to one week(or more) to make sure that everyone knows about the Event beforehand.

Also, think of a Nudge being created out of an User Interface. This User Interface must use the previously created Events to create announcements,notifications or invitations(Nudges) about those Events.

1. Nudges can be created about an Event
2. A Nudge is made up (composed) of Event & Event Type
3. A nudge has a cover image
4. A nudge has a title
5. A nudge can be scheduled to be sent on at certain time
6. A nudge has an icon & invitation line which can be used while viewing a minimized version of a nudge.

#### CRUD Operations regarding photo & photo upload
##### upload photo(meaning add a photo for first time)
1. It's important to note that photo  is uploaded to the cloud via one endpoint(which returns an image url of the photo on the cloud).
2. This photo which lives on the cloud can be accessed through a url
3. we store this url in the event document as a string
  
##### update photo(change an already uploaded photo)

1. for an Event the endpoint is /images/{id}/upload-image
2. the id refers to the event id of which we want to change the image
3. upload the image to this endpoint
4. the image is updated
5. detailed flow can be understood by looking at my code

##### delete photo

1. A photo can be deleted only by deleting an event.
2. this is done so that no event ever remains on database without an image.

#### The CRUD operations on Nudge cover image can be performed just like the CRUD operations Event photo/image


### Task 2 Explanation

1. By looking at the endpoints in the documentation, it must be extremely clear regarding how I thought 
    about Nudges. It might not be the best way to think about Nudges, but it makes a lot of sense(at least to me.)
2. Task 2 also showed a UI which helped me a lot to relate it to a real-life situation.
3. I also attempted to build the UI with Ant Design System and also a succeeded in doing so. But I      abandoned the plan later because I was not much familiar with Ant Design and some Select    Component features were not easy to customize.