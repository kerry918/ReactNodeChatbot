// include express into the file 
const express = require('express'); 
const bodyParser = require('body-parser'); 
// create the app
const app = express(); 


const config = require('./config/keys'); 
const mongoose = require('mongoose'); 

mongoose.connect(config.mongoURI, { useNewUrlParser: true}); 

require('./models/Registration'); 

app.use(bodyParser.json()); 

// app will be avaliable in the dialogFlowRoutes file 
require('./routes/dialogFlowRoutes')(app); 

if(process.env.NODE_ENV === 'production'){
  // js and css file
  app.use(express.static('client/build')); 

  // index.html for all page routes
  const path = require('path'); 
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
  })
}

const PORT = process.env.PORT || 5000; 

// let the app to listen to port 5000
app.listen(PORT, function() {
    console.log("Server started.......");
  });



