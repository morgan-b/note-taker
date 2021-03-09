// LOAD DATA


const notesData = require('Develop/public/data/notesData.js');


// ROUTING

module.exports = (app) => {
  // API GET Requests


  app.get('/api/notes', (req, res) => res.json(notesData));



  // API POST Requests


  app.post('/api/notes', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
 
      notesData.push(req.body);
      res.json(true);
  
    })
  };

 