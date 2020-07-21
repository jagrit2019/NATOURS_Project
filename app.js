const express = require('express');
const fs = require('fs');


const app = express();

//this is the middleware
app.use(express.json());

const port = 3000;


const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


//this is an event loop dont put a sync fucntion inside otherwise you are gone
app.get('/api/v1/tours',(req,res)=>{
res.status(200).json({
    status:"success",
    results:tours.length,
    data:{
        tours
    }
})
});

app.post('/api/v1/tours',(req,res)=>{
    console.log(req.body);
    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({id:newId},req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'success',
            data:{
                tour:newTour
            }
        })
    })
    // res.send("DOne");
});



// app.get('/',(req,res)=>{
// res.status(200).json({message:'Hello form the server side', app:'Natours'})
// })
// app.post('/',(req,res)=>{
//     res.send("This is the post request")
// })
app.listen(port,()=>{
    console.log(`the server is running on ${port}`);
});
