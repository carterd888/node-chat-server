const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

//test array used for latest message:

// let messages = [{
//     id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// },{
//     id: 1,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 2,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// },{
//     id: 3,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 4,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// },{
//     id: 5,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// },{
//     id: 6,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 7,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 8,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 9,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 10,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 11,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// },{
//     id: 12,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 13,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// },{
//     id: 14,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 15,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// },{
//     id: 16,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// },{
//     id: 17,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 18,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 19,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 20,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }, {
//     id: 21,
//   from: "Bart",
//   text: "Welcome to CYF chat system!"
// }];

// unused
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

//gets all messages
app.get("/messages", function(request, response) {
  response.json(messages);
});

//gets message with text query
app.get("/messages/search", (req, res) => {
  const searchText = req.query.text;
  
  res.json(
    messages.filter(
      message =>
        message.text.includes(searchText)
    )
  );
});

//shows last 10 messages in array:
app.get("/messages/latest", (req, res) => {
  res.json(messages.slice(Math.max(messages.length - 10, 0)));
});

//gets message by id
app.get("/messages/:id", (request, response) => {
  const { id } = request.params;
  // console.log(id);
  const foundMessage = messages.find(msg => msg.id == id);

  response.json(foundMessage);
});


//create new message
app.post("/messages", function(request, response) {
  if(request.body.text && request.body.from) {
  messages.push(request.body);
  response.json({ success: true });  
  }
  else {
    response.json({ status: 400 });
  }
});

// delete message by id:
app.delete("/messages/:id", function(req, res) {
  const { id } = req.params;
  messages.forEach(function(message, index) {
    if (message.id == id) {
      messages.splice(index, 1);
    }
  });
  
  res.json({ success: true });
});


app.listen(process.env.PORT);
