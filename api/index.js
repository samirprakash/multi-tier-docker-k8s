const cors = require("cors");
const express = require("express");
const { Pool } = require("pg");
const redis = require("redis");
const keys = require("./keys");

// express app setup
const app = express();
app.use(cors());
app.use(express.json());

// postgres setup
const pgClient = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  user: keys.pgUser
});

// catch postgres error
pgClient.on("error", () =>
  console.error("Lost connection to Postgres client!")
);

// create "values" table
pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch(err => console.error(err));

// redis setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// express route handlers
app.get("/", (req, res) => {
  res.send("Hi");
});

// read data from pg "values" table
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values.rows);
});

// read data from redis server
app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => res.send(values));
});

app.post("/values", async (req, res) => {
  const index = req.body.index;

  // check if the index value is too large and set a cap on 40
  if (parseInt(index) > 40) {
    res.status(422).send("Index too high!");
  }

  // set empty index in redis
  redisClient.hset("values", index, "much empty");
  //   Call on "insert" subscription on the worker
  redisPublisher.publish("insert", index);
  //   save index on to the database
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
  //   return status
  res.send({ working: true });
});

// start server
app.listen(keys.serverPort, err =>
  console.log(`Listening on PORT: ${keys.serverPort}`)
);
