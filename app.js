const express = require('express');
const fs = require('fs');

const morgan = require('morgan');


const app = express();

//1) middlewares

//this is the middleware
app.use(morgan('dev'));


app.use((req,res,next)=>{
    console.log("Hello from the middleware 👋");
    next();
});

app.use(express.json());

const port = 3000;
//this is also an expample where y is the optiona parameter
// app.get('/api/v1/tours/:id/:x/:y?',(req,res)=>{



//2)route Handlers

const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
// getting sepcific tour using id in the url ":id" this is way we declear a variable

app.use((req,res,next)=>{
req.requestTime= new Date().toISOString();
next();
});

const updateTour= (req,res)=>{
    if(req.params.id= 1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }
    res.status(201).json({
        status:"success",
        data:{
            tour:'<Updated tour is here>'
        }
    })
};

   
/////////////////Delete/////////////////////
const deleteTour=(req,res)=>{
    if(req.params.id= 1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }
    res.status(204).json({
        status:"success",
        data: "null"
        
    })
};

//this is an event loop dont put a sync fucntion inside otherwise you are gone
const getAllTours = (req,res)=>{
    console.log(req.requestTime);

    res.status(200).json({
    status:"success",
    requestedAt:req.requestTime,
    results:tours.length,
    data:{
        tours
    }
    })
};
// app.get('/api/v1/tours',getAllTours);



const createNew = (req,res)=>{
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
}
const createTour=(req,res)=>{
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
}


const getAllUsers = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route was not yet defined'
    })
}
const getUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route was not yet defined'
    })
}
const updateUsers = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route was not yet defined'
    })
}
const deleteUsers = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route was not yet defined'
    })
}
const createUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route was not yet defined'
    })
}
// app.get('/api/v1/tours/:id',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);
// app.post('/api/v1/tours',createNew);

//best optimised

const tourRouter = express.Router();
const UserRouter = express.Router();


tourRouter.route('/')
.get(getAllTours)
.post(createNew);
// this will only execute for the below ones only not of the function above it
tourRouter.use((req,res,next)=>{
    console.log("Hello from the middleware 👋");
    next();
});

app.route('/:id')
.get(createTour)
.patch(updateTour)
.delete(deleteTour);




// app.get('/',(req,res)=>{
// res.status(200).json({message:'Hello form the server side', app:'Natours'})
// })
// app.post('/',(req,res)=>{
//     res.send("This is the post request")
// })




app.route('/')
.get(getAllUsers)
.post(createUser);

app.route('/:id')
.get( getUser)
.patch(updateUsers)
.delete(deleteUsers);

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',UserRouter);

app.listen(port,()=>{
    console.log(`the server is running on ${port}`);
});
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
   
    

  // put we expect an entire new uodate object
  //patch properties that should are been updated