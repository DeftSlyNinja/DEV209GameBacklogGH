var express = require('express');
var router = express.Router();

let ServerGameArray = [];

let GameObject = function (pID, pTitle, pGenre, pLink, pPriority) {
    this.ID = generateID();
    this.title = pTitle;
    this.genre = pGenre;
    this.link = pLink;
    this.prio = pPriority;
}

var fs = require("fs");

let fileManager  = {
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    ServerGameArray = goodData;
  },

  write: function() {
    let data = JSON.stringify(ServerGameArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};

if (!fileManager.validData()) {
ServerGameArray.push(new GameObject(1, "Persona 3", "RPG", "https://store.steampowered.com/app/2161700/Persona_3_Reload/", 1));
ServerGameArray.push(new GameObject(2, "Call of Duty", "FPS", "https://store.steampowered.com/app/1938090/Call_of_Duty/", 2));
ServerGameArray.push(new GameObject(3, "XCOM", "Strategy", "https://store.steampowered.com/app/200510/XCOM_Enemy_Unknown/", 3));
fileManager.write();
}
else {
  fileManager.read(); // do have prior movies so load up the array
}

console.log(ServerGameArray);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET Backlog data */
router.get('/getAllGames', function(req, res) {
  fileManager.read();
  res.status(200).json(ServerGameArray);
});

/* Add one new game */
router.post('/AddGame', function(req, res) {
  const newGame = req.body;
  ServerGameArray.push(newGame);
  fileManager.write();
  res.status(200).json(newGame);
});

// add route for delete
router.delete('/DeleteGame/:ID', (req, res) => {
  const delID = req.params.ID;
  let found = false;
  let pointer = GetArrayPointer(delID);
  if(pointer == -1){ // if did not find movie in array
  console.log("not found");
  return res.status(500).json({
  status: "error - no such ID"
  });
  }
  else { // if did find the movie
  serverArray.splice(pointer, 1); // remove 1 element at index
  res.send('Movie with ID: ' + delID + ' deleted!');
  }
});

// cycles thru the array to find the array element with a matching ID
function GetArrayPointer(localID) {
  for (let i = 0; i < serverArray.length; i++) {
  if (localID === serverArray[i].ID) {
  return i;
  }
  }
  return -1; // flag to say did not find a movie
}

module.exports = router;

function generateID() {
  let newID = Math.random().toString(16).slice(5);
  return newID;
}
