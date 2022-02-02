This is my "student project". Fullstack application with PHP backend and React frontend. This app is an youtube music videos aggregator, that stores all music from selected channels in project database, and allow to keep all music videos aside other kind of videos on youtube.

# Instalation

To instal an app:

1. setup MySQL database - the preffered way, is to use Laravel migration tools, but you can also use `sql/install.sql` file to build it. The databases created with SQL query should be compatybile with the one made with Laravel ```artisan:migrate```.
2. duplicate file `backend/.env.example` ane rename it to `backend/.env`
3. fill your `backend/.env` file with correct data (mySql connection, youtube API key)
4. fill database with your favorite channels, u can do it via CLI - just go to `backend/cli` and run

`php index.php -a build_channel --id <youtube_channel_id>`

`php index.php -a update_channels`

And for now, that's all. Right now, the Authentication methods in backend are ready, but are not used in frontend yet, so after this four steps, you can start apps and play around with it.

# Start app

To start app, you have to run two things: backend php server, and frontend node server. Right now, frontend is configured to communicate with API on localhost:8084, so to run backend go to `backend/public` and run `php -S localhost:8084`, then in second terminal, go to `frontend` and run `npm start`. That's all. In dev environment app should be able to communicate.

# Maintenance

The app is build in a way, that allow you atomate maintenance with simple CRON. Commands that you mostle need to run at least once a day to keep everything fresh:

`php backend/cli/index.php -a update_all` - fetch newest records from channels.

`php backend/cli/index.php -a clear_database` - in case that update_all action messed something up, and fetched data from some other channels that you wanted to - this action will clear database from every record that has channel_id different than ids from channels table.

`php backend/cli/index.php -a clear_404` - hide records that was removed or set to private in youtube.

# DEMO

If you want to see the app in action - you can see it here: `http://react.metalmusic.pl/`
