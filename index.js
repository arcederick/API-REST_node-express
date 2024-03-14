const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Banco de dados ficticio
var db = {
    games: [
        {
            id: 23 ,
            title: "Call Of Duty" ,
            year: 2019,
            price: 60,
        },
        {
            id: 65 ,
            title: "God Of War" ,
            year: 2018,
            price: 80,
        },
        {
            id: 2 ,
            title: "Valorant" ,
            year: 2020,
            price: 50,
        },
        {
            id: 5 ,
            title: "GTA V" ,
            year: 2020,
            price: 110,
        },
    ]
}
// Rotas GET 
app.get("/games",(req, res)=>{
    res.statusCode = 200;
    res.json(db.games)
})

app.get("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = db.games.find(g => g.id == id);
        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
})

// Rotas POST 
app.post("/game",(req,res)=>{
    var {title, price, year} = req.body;

    db.games.push({
        id: 55 ,
        title,
        price,
        year
    })
    res.sendStatus(200);
})

// Rotas PUT 
app.put("/game/:id", (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = db.games.find(g => g.id == id);
        if(game != undefined){
            var {title, price, year} = req.body;
            if (title != undefined){
                game.title = title;
            }
            if (price != undefined){
                game.price = price;
            }
            if (year != undefined){
                game.year = year;
            }
            res.sendStatus(200);


        }else{
            res.sendStatus(404);
        }
    }
})

// Rotas DELETE 
app.delete("/game/:id", (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = db.games.findIndex(g => g.id == id);  

        if(index == -1){
            res.sendStatus(404);
        }else{
            db.games.splice(index,1);
            res.sendStatus(200);
        }
    }
})





// localhost:8080/games - (get all)
app.listen(8080,()=>{console.log("API Rodando");});