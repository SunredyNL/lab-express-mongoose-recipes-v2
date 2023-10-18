const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


app.post("/recipes", (request, response) => {
    Recipe.create({
        title: request.body.title,
        level: request.body.level,
        ingredients: request.body.ingredients,
        cuisine: request.body.cuisine,
        dishType: request.body.dishType,
        image: request.body.image,
        duration: request.body.duration,
        creator: request.body.creator
    })
        .then((createdRecipe) => {
            response.status(201).json(createdRecipe)
        })
        .catch((error) => {
            response.status(500).json({ message: "Error while creating a new recipe" });
        })
})


app.get("/recipes", (request, response) => {
    Recipe.find()
        .then((allRecipes) => {
            response.status(200).json(allRecipes);
        })
        .catch((error) => {
            response.status(500).json({ message: "Error While getting all recipes" });
        })
})

app.get("/recipes/:id", (request, response) => {
    Recipe.findById(request.params.id)
        .then((recipe) => {
            response.status(200).json(recipe)
        })
        .catch((error) => {
            response.status(500).json({ message: "Error While getting a single recipe" });
        })
})

app.put("/recipes/:id", (request, response) => {
    Recipe.findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then((updatedRecipe) => {
            response.status(200).json(updatedRecipe)
        })
        .catch((error) => {
            response.status(500).json({ message: "Error While updating the recipe" });
        })
})

app.delete("/recipes/:id", (request, response) => {
    Recipe.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).send();
        })
        .catch((error) => {
            response.status(500).json({ message: "Error While deleting the recipe" });
        })
})


// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route


//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route


//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;