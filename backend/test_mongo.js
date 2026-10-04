const mongoose = require('mongoose');

const uri = "mongodb://prachiprajapati900_db_user:FpOqyynub3nEjqxn@ac-slq7uul-shard-00-00.7wfzurr.mongodb.net:27017,ac-slq7uul-shard-00-01.7wfzurr.mongodb.net:27017,ac-slq7uul-shard-00-02.7wfzurr.mongodb.net:27017/?ssl=true&replicaSet=atlas-3jcu72-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected with standard URI!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
  });
