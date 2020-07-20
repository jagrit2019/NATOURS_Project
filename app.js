const express = require('express');

const app = express();
const port = 3000;

app.get('/',(req,res)=>{
res.status(200).send('Hello form the server side')
})
app.listen(port,()=>{
    console.log(`the server is running on ${port}`);
});
