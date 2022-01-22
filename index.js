const mockdata = require('./data');
const mongoose = require("mongoose");
const express = require('express');
const DataSource = require('./models/data-sources');
const app = express();
const dbURI = "mongodb+srv://quocvinguyen:zsqRZXyq2n0yA5ki@cluster-basic.levl5.mongodb.net/Klipfolio?retryWrites=true&w=majority";
const cors =  require('cors');

//#region DB connection
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result)=>{
    console.log("DB connected");
}).catch((error)=>{
    console.log("error: " + error);
})

app.use(cors());

app.listen(4000);

app.get("/add-data", async (req, res)=>{
    const newDataSource = new DataSource({
        service: "dropbox",
        metrics: ['pie'],
        title: "Dropbox employee's favourite pizza flavour 2021",
        data: mockdata
    });

    newDataSource.save()
    .then((result) => {
        res.send("new data added");
    })
    .catch((error) => {
        res.send(error);
    });
})

app.get("/getDataSources", async (req, res) =>{
    var serviceName = req.query.serviceName;
    console.log(serviceName);
    DataSource.find({'service':serviceName}).then((result)=>{
        console.log(result);
        res.send(result);
    })
})