/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Hottab13:<84315422Qw>@cluster0.oadx9.mongodb.net/<TestBD>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://Hottab13:84315422Qw@cluster0.oadx9.mongodb.net/Nest?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});

//Код запускающий куру
var exec = require('child_process').execFile;
var executeSlicer = function(){
	console.log("Cura starting");
	exec('D:/Projects/server_test/server/curaEngine/CuraEngine.exe', function(err, data) {
		console.log(err)
		console.log(data.toString());
	});
}

executeSlicer(); // Запускаем куру