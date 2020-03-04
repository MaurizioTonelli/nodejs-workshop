const express = require('express');
const app = express();

app.get("/",(req,res,next)=>{
    res.send("Bienvenido");
});

app.get('/:name',(req, res, next)=>{
    console.log(req.params.name);
    res.status(200);
    res.send(req.params.name);
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running");
});

