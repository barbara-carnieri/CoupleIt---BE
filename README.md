# COUPLE IT

## Description
CoupleIt is a tool that helps you and your partner to organise the life together. Collaborative platform for couples sharing features as counting important dates, to-do tasks, photo gallery and calendar.
I built it by myself with HTML, ES6, React, Express, Node.js, HTTP, CRUD, Auth.


## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start creating or joining another user
-  **Login:** As a user I can login to the platform so that I can see my profile and private features
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **See my profile:** As a user I want to see my profile
-  **Edit my profile:** As a user I can edit my profile

-  **Connect to another user:** As a user I can connect to another user that will be my couple

-  **See my tasks:** As a user I want to see my tasks page
-  **Add tasks:** As a user I can add a task
-  **Edit tasks:** As a user I can edit a task
-  **Delete tasks:** As a user I can delete a task

-  **See my gallery:** As a user I want to see my photo gallery
-  **Add photo:** As a user I can add a photo to my gallery
-  **Edit photo:** As a user I can edit a photo title
-  **Delete photo:** As a user I can delete a photo 

-  **See my stories:** As a user I want to see my story page
-  **Add story:** As a user I can add a story to my stories
-  **Edit story:** As a user I can edit a story 
-  **Delete story:** As a user I can delete a story 

-  **See my calendar:** As a user I want to see my calendar page
-  **Add calendar:** As a user I can add a date to my calendar
-  **Edit calendar:** As a user I can edit a date to my calendar
-  **Delete calendar:** As a user I can delete a date from my calendar



## Backlog
- Share photo WhatsApp, Instagram, Facebook
- Google Calendar
-SignIn with Google, Facebook
-Facebook events share
-Real time chat

# Client / Frontend

## Routes (React App)

| Path | Component | Permissions |  Behavior
|---|---|---|---|      
| / | Landing page | public | Landing page view. 
| /auth/login | LoginPage | anon only | Login form, link to signup, navigate to homepage after login.   
| /auth/signup | SignupPage | anon only | Signup form, link to login, navigate to homepage after signup.
| /auth/logout | n/a | anon only | Navigate to landing page after logout, expire session.   
| /index | IndexPage | user only | Renders index view. 
| /profile/:id | ProfilePage | user only | Renders profile view. 
| /profile/:id/edit | ProfileEditPage | user only | Renders profile/edit form view. 
| /profile/:id/edit | ProfileEditPage | user only |  Sends edit-profile info to server and updates user in DB. Redirects to the  profile view. 
| /tasks | TasksPage | user only |  Renders the tasks view. 
| /tasks | TasksPage | user only |  Adds a new task. Redirects to the tasks view.  
| /tasks/:id | TasksPage | user only | Edit the existing task in the DB. Redirects to the tasks view.  
| /tasks/:id | TasksPage | user only |  Deletes the existing task in DB. Redirects to the tasks view.  
| /gallery | GalleryPage | user only | Renders the gallery view. 
| /gallery | GalleryPage | user only | Adds a new photo. Redirects to the gallery view.  
| /gallery/:id | GalleryDetailPage | user only |  Renders the photo detail view. 
| /gallery/:id | GalleryDetailPage | user only | Edit the existing photo title in the DB. Renders the photo detail view. 
| /gallery/:id | GalleryDetailPage | user only |  Deletes the existing photo in DB. Redirects to the gallery view.  
| /story | StoryPage | user only |  Renders the story dates view. 
| /story | StoryPage | user only |  Adds a new story date. Redirects to the story dates view.  
| /story/:id | StoryPage | user only | Edit the existing story date in the DB. Redirects to the story dates view.  
| /story/:id | StoryPage | user only | Deletes the existing story date in DB. Redirects to the story dates view.  
| /calendar | CalendarPage | user only |  Renders the calendar dates view. 
| /calendar | CalendarPage | user only | Adds a new event date. Redirects to the calendar dates view.  
| /calendar/:id | CalendarPage | user only | Edit the existing calendar date in the DB. Redirects to the calendar dates view. 
| /calendar/:id | CalendarPage | user only | Deletes the existing calendar date in DB. Redirects to the calendar dates view.  

## Components

- LandingPage

- HomePage

- ProfilePage

- ProfileEditPage

- GalleryPage

- GalleryDetailPage

- TasksPage

- StoriesPage

- CalendarPage

- Navbar

- Footer


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.imageUpload(file)
  - auth.logout()
  - auth.me()

- User Service
  - user.getOne(id)
  - user.getOneByEmail(email)
  - user.updateUser(id, data)
  
- Couple Service
  - user.getAll()
  - user.getOne(id)
  - user.getOneByEmail(email)
  - user.updateUser(id, data)

- Gallery Service
  - gallery.getAll()
  - gallery.create(data)
  - gallery.getOne(id)
  - gallery.updateOne(data)
  - gallery.delete(data)

- Task Service
  - tasks.getAll()
  - tasks.create(data)
  - tasks.getOne(id)
  - tasks.updateOne(data)
  - tasks.delete(data)

- Story Service
  - story.getAll()
  - story.create(data)
  - story.getOne(id)
  - story.updateOne(data)
  - story.delete(data)

- Calendar Service
  - calendar.getAll()
  - calendar.create(data)
  - calendar.getOne(id)
  - calendar.updateOne(data)
  - calendar.delete(data)


# Server / Backend

## Models
```
user={
  password: String,
  username: String
  email: {
    type:String,
    required: true,
    unique: true
  },
  photoUrl: String,
  coupleId: {type: Schema.Types.ObjectId, ref: ‘Couple’},
}

couple={
 gallery: [{type: Schema.Types.ObjectId, ref: ‘Gallery’}],
 tasks: [{type: Schema.Types.ObjectId, ref: ‘Task’}],
 stories: [{type: Schema.Types.ObjectId, ref: ‘Story’}],
calendar: [{type: Schema.Types.ObjectId, ref: ‘Calendar’}],
members:[{type: Schema.Types.ObjectId, ref: ‘User’}],
}

gallery={
  title:{ type: String, required: true},
 photoUrl: { type: String, required: true},
  coupleId:{ type: Schema.Types.ObjectId, ref: ‘Couple’},
}

task={
  name:{ type: String, required: true},
  description: { type: String, required: true},
 coupleId:{ type: Schema.Types.ObjectId, ref: ‘Couple’},
}

story={
  date:{ type: String, required: true},
  title:{ type: String, required: true},
  description:{ type: String, required: true},
  type: { type: String, required: true},
 coupleId:{ type: Schema.Types.ObjectId, ref: ‘Couple’},
}

calendar={
  date:{ type: String, required: true},
  event:{ type: String, required: true},
  type: { type: String, required: true},
  coupleId:{ type: Schema.Types.ObjectId, ref: ‘Couple’},
}


```


## API Endpoints (backend routes)

| HTTP Method | URL| Request Body|Description| 
|---|---|---|---|         
| GET | / | Landing page route. Renders landing page view. 
| GET | /auth/login | Renders auth-views/login form view.   
| POST | /auth/login | {username, password} | Sends Login form data to the server. Redirects to the index view.  
| GET | /auth/signup | Renders auth-views/signup form view.   
| POST | /auth/signup | { password,  username,  email, photoUrl, quote, partnerEmail } | Sends Sign Up info to the server and creates user in the DB. Redirects to the index view. 
| GET | /auth/logout | (empty) | Renders the landing page view.   
| GET | /index | Private route. Renders index view. 
| GET | /profile/:id | Private route. Renders profile view. 
| GET | /profile/:id/edit | Private route. Renders profile/edit form view. 
| PUT | /profile/:id/edit | { password,  username,  email, photoUrl, quote, partnerEmail } |Private route. Sends edit-profile info to server and updates user in DB. Redirects to the  profile view. 
| GET | /tasks | Private route. Renders the tasks view. 
| POST | /tasks | { name, description} | Private route. Adds a new task. Redirects to the tasks view.  
| PUT | /tasks/:id | { name, description} | Private route. Edit the existing task in the DB. Redirects to the tasks view.  
| DELETE | /tasks/:id | {id} | Private route. Deletes the existing task in DB. Redirects to the tasks view.  
| GET | /gallery | Private route. Renders the gallery view. 
| POST | /gallery | { title, photoUrl } | Private route. Adds a new photo. Redirects to the gallery view.  
| GET | /gallery/:id | {id} | Private route. Renders the photo detail view. 
| PUT | /gallery/:id | { title, photoUrl } | Private route. Edit the existing photo title in the DB. Renders the photo detail view. 
| DELETE | /gallery/:id | {id} | Private route. Deletes the existing photo in DB. Redirects to the gallery view.  
| GET | /story | Private route. Renders the story dates view. 
| POST | /story | { date, description, title, type } | Private route. Adds a new story date. Redirects to the story dates view.  
| PUT | /story/:id | { date, description, title, type } | Private route. Edit the existing story date in the DB. Redirects to the story dates view.  
| DELETE | /story/:id | {id} | Private route. Deletes the existing story date in DB. Redirects to the story dates view.  
| GET | /calendar | Private route. Renders the calendar dates view. 
| POST | /calendar | { date, event, type } | Private route. Adds a new event date. Redirects to the calendar dates view.  
| PUT | /calendar/:id | { date, event, type } | Private route. Edit the existing calendar date in the DB. Redirects to the calendar dates view.  
| DELETE | /calendar/:id | {id} | Private route. Deletes the existing calendar date in DB. Redirects to the calendar dates view.  


## Links


### Trello
Link to your trello board
[Link url](https://trello.com/invite/b/RQ9oAh0W/013a144cd8f0722b171a0f947135b111/couple-app)


### Git
URls for the project repo and deploy
[Link Repo Server]()
[Link Repo Client]()
[Link Deploy]()


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/1QVpkPgq-aePxqcCm08F6kw7_UIKDhTURQPRnWkwhyQc/edit?usp=sharing)