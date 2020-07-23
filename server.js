const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');


dotenv.config({ path: './config.env' });

const DB= "mongodb+srv://jagrit:Jha8875091601@cluster0.w9uya.mongodb.net/text?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>{
    console.log(con.connected);
    console.log('DB connection successfull')
});

//most basic
// const tourSchema = new mongoose.Schema({
//   name:String,
//   rating : Number,
//   price:Number,
// })
const tourSchema = new mongoose.Schema({
  name:{
    type:String,
    //the string is error is 
    required:[true,'A tour must have a name'],
    unique:true
  },
  rating:{Number},

  price:{
    type:Number,
    required:[true,'Price is necessary']
  }
});

const Tour = mongoose.model('Tour',tourSchema);

const testTour = new Tour({
  name:"The forst",
  rating:5.4,
  price:343
});
testTour.save().then(doc =>{
  console.log(doc);
}).catch(err =>{
  console.log("Error 🤷‍♀️",err);
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
