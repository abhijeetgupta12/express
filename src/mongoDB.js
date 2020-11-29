const mongoose = require("mongoose");
const validator = require("validator");

//Connects and create a database named 'mongoDB' if not present
mongoose
  .connect(
    "mongodb+srv://abhi_db:abhi_mongodb@cluster0.bhvdu.mongodb.net/test_db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("Connected Succesfully...."))
  .catch((err) => console.log(err));

//A Mongoose schema defines the structure of the documents, default values, validators, etc.
const listSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  ctype: String,
  videos: {
    type: Number,
    validate(val) {
      //user defined validation
      if (val < 0) {
        throw new Error("videos cannot be negetive");
      }
    },
  },
  author: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

//A Mongoose model is a wrapper on the Mongoose schema. A Mongoose shema defines the structure of the documaent,
//default values, validators etc., whereas a mongoose model provides an interface to the database for creating,
//querying, updating, deleting records etc. Basically collections are created using mongoose model.
const Playlist /*class*/ = new mongoose.model("Playlist", listSchema);

//CRUD on documents(records)
const createDocument = async () => {
  try {
    /*const jsPlaylist = new Playlist({
            name:"JavaScript",
            ctype:"Back End",
            videos: 10,
            author:"abhijeet",
            active:true,         
        })

        const expressPlaylist = new Playlist({
            name:"ExpressJs",
            ctype:"Back End",
            videos: 20,
            author:"abhijeet",
            active:true,         
        })*/

    const mongoDBPlaylist = new Playlist({
      name: "mongoDB",
      ctype: "Database",
      videos: 50,
      author: "abhijeet",
      email: "abhih@c.com",
      active: true,
    });
    const result = await Playlist.insertMany([mongoDBPlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
//createDocument();

const readDocument = async () => {
  try {
    const result = await Playlist.find(/*query*/);
    //returns an array
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
//readDocument();

const updateDocument = async (id) => {
  try {
    const result = await Playlist.findOneAndUpdate(
      { _id: id },
      { $set: { name: "JavaScript" } },
      { new: true, useFindAndModify: false } //new:true is so that in the result variable we can see the updated value
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
//updateDocument("5fbc1d50b9aafd171ca4e505");

const deleteDocument = async (id) => {
  try {
    const result = await Playlist.findOneAndDelete(
      { _id: id },
      { useFindAndModify: false } //new:true is so that in the result variable we can see the updated value
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
//deleteDocument("5fbc1d50b9aafd171ca4e505");

/*-------------------------------------------EXTRA CODES----------------------------------------------*/

/*
const requests = require("requests");

app.get('/', (req, res) => {  
  requests(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=cd246ba455a7d58ca7609c23a80d8f84`)
        .on('data',  (chunk) => {
            const a = JSON.parse(chunk);
            console.log(`City is ${a.name} and temp is ${a.main.temp}`);
            res.send(`City is ${a.name} and temp is ${a.main.temp-273}`);
        })
        .on('end', (err) => {
            if (err) return console.log('connection closed due to errors', err);
            
            return;
        });          
});
app.listen(8000);*/

/*-------------------------------------------EXTRA CODES----------------------------------------------*/
