const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res,next)=>{
    return res.status(200).send("Bienvenido a Pokedex");
});

app.post('/pokemon',(req, res, next)=>{
    return res.status(200).send(req.body);
});

app.get('/pokemon',(req, res, next)=>{
    return res.status(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next)=>{
    const id = req.params.id -1;
    if(id > 0 && id <=150){
        return res.status(200).send(pokemon[id]);
    }
    return res.status(404).send("Pokemon no encontrado");
});

app.get('/pokemon/:name([A-Za-z]+)', (req,res, next)=>{
    const name = req.params.name;

    const pk = pokemon.filter((p)=>{
        return p.name.toUpperCase() == name.toUpperCase();
    });

    return (pk.length > 0) ? 
        res.status(200).send(pk) : res.status(404).send("pokemon no encontrado");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running");
});

