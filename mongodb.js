const mongoose = require('mongoose')

const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.

const DB= "mongodb+srv://jagrit:Jha8875091601@cluster0.w9uya.mongodb.net/text?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>{
    console.log(con.connected);
    console.log('DB connection successfull')
})
dotenv.config.env.DATABASE.replace('<Pass>',process.env)
// MongoClient.connect(DB, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });