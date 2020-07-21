const express = require('express');
const fs = require('fs');


const app = express();

//this is the middleware
app.use(express.json());

const port = 3000;
//this is also an expample where y is the optiona parameter
// app.get('/api/v1/tours/:id/:x/:y?',(req,res)=>{

const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
// getting sepcific tour using id in the url ":id" this is way we declear a variable
app.get('/api/v1/tours/:id',(req,res)=>{
    //req.params that gives/to read the value of the variable
    console.log(req.params);
    // to converst string in to a number just multiply  with one
    
    const id = req.params.id *1;

   
         const tour = tours.find(el=>el.id===id)
         if(!tour){
            res.status(404).json({
                status:"fail",
                message:"Sorry invalid id"
             })
         }
         else{
            res.status(200).json({
                status:"success",
              
                data:{
                    tour
                }
             })
            
         }
   
    // if(id<=tours.length){
    //      const tour = tours.find(el=>el.id===id)
    // res.status(200).json({
    //     status:"success",
      
    //     data:{
    //         tour
    //     }
    //  })
    // }
    // else{
    //     res.status(404).json({
    //         status:"fail",
    //         message:"Sorry invalid id"
          
       
    //      })
       
    // }
   
    });

  // put we expect an entire new uodate object
  //patch properties that should are been updated

    app.patch('/api/v1/tours/:id',(req,res)=>{
        if(req.params.id= 1>tours.length){
            return res.status(404).json({
                status:'fail',
                message:'Invalid ID'
            });
        }
        res.status(200).json({
            status:"success",
            data:{
                tour:'<Updated tour is here>'
            }
        })
    });
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
