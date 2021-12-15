# Spotfiy API
  To run this app on your computer you need to run this commends in your terminal:
  - `npm install` to install node-model folder
  - `npm install axios`
  - `npm install react-router-dom@6`
  - `npm install react-icons --save`
  - `yarn start`
  -  There are Bootstarp, Awesone Icons links inside index.html file in public folder
  
## How create this Project:
- go to spotfiy site and create web app to get client-id and client-secret.
- and specify Scope what we want data exactly in my case I choice `user-read-currently-playing', 'user-read-playback-state`.
  
### Login And Authentication Flow:
- create button to for handle with event to login to Home Page .
- split the url to get Token for authentication.

### Search Input:
we can get data when we write any character in this input field, With `Dropdown` to help users and give them suggestions, to imprve UX.

### Get Albums For Each Artist: 
when we want to get all `albums` for specific Artist just you need to click on the `Image` for this Artist to get his Albums.

### opens a new tab to the Spotify preview of that album.
you just need to click on Image of that album

## Notes:
- The main Component is Search component where fetched the data from API and spread them to another Components.
- EASY TO MAINTAIN: If you want to update any component just you need to go throgh that component and do what you want.
- Each Component has separate CSS file if you want to maintenance or change any thing in the style.
