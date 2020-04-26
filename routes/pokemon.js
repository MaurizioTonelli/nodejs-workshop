const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post('/', async (req, res, next)=>{
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok weight, pok_base_experience)";
        query += `VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Pokemon insertado"});
        }
        return res.status(500).json({code: 404, message: "ocurrio un error"});
    }
    return res.status(500).json({code: 404, message: "campos incompletos"});
});

pokemon.get('/',async (req, res, next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 200, message: pkmn});
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next)=>{
    const id = req.params.id -1;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE id ="+id+";");
    if(id > 1 && id <=722){
        return res.status(200).json({code: 200, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "pokemon no encontrado"});
});

pokemon.get('/:name([A-Za-z]+)', async (req,res, next)=>{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE name ="+name+";");

    return (pkmn.length > 0) ? 
        res.status(200).json({code: 200, message: pkmn}) 
        : res.status(404).json({code: 404, message: "pokemon no encontrado"});
});

module.exports = pokemon;