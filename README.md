This is my "student project". Fullstack application with PHP backend and React frontend. This app is an youtube music videos aggregator, that stores all music from selected channels in project database, and allow to keep all music videos aside other kind of videos on youtube.

# Instalation

To instal an app:

1. setup MySQL database - you can use `sql/install.sql` file to build it.
2. duplicate file `backend/.env.example` ane rename it to `backend/.env`
3. fill your `backend/.env` file with correct data (mySql connection, youtube API key)
4. fill database with your favorite channels, u can do it via CLI - just go to `backend/cli` and run

`php index.php -a build_channel --id <youtube_channel_id>`

And for now, that's all. Right now, the Authentication methods in backend are ready, but are not used in frontend yet, so after this four steps, you can start apps and play around with it.

# Start app

To start app, you have to run two things: backend php server, and frontend node server. Right now, frontend is configured to communicate with API on localhost:8084, so to run backend go to `backend/public` and run `php -S localhost:8084`, then in second terminal, go to `frontend` and run `npm start`. That's all. In dev environment app should be able to communicate.
