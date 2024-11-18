import express from 'express';
import 'dotenv/config';
import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import bodyParser from 'body-parser';
import connectDB from './config/connectDB';
import session from 'express-session'
import RedisStore from "connect-redis"
import { createClient } from "redis"

const app = express();
const port = process.env.PORT || 3000;


// Initialize client.
let redisClient = createClient()
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})


app.use(session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: { secure: false }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//test connection
connectDB();

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
