const express = require("express");
const {places} = require("./data/places");
const app = express();

app.get("/home",(req,res)=>{
    res.status(200).json({places: places});
})

app.get("/search",(req,res)=>{
    const {searchStr} = req.query;
    if(!searchStr) {
        return res.status(400).json({error: "Search query params not provided"});
    }

    const states = places.state;
    const searchResults = [];
    states.forEach((state) => {
        state.tourist.forEach((touristPlace) => {
            const placeName = touristPlace.name;
            if(placeName.search(searchStr)) {
                searchResults.push(placeName);
            }
        })
    })

    res.status(200).json({places: searchResults});
})

app.listen(5000,() => {
    console.log("Server started");
})

// home
//search
