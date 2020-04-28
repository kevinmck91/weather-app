const path = require('path')        // core module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocodeFinder')
const weather = require('./utils/weatherFinder')

// Doenst take arguments. Configured by functions
const app = express();

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(partialsPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directiory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.static(viewsPath))

// Enviornment variables
const port = process.env.PORT || 3000



app.get('', (req, res) => {


    if(!req.query.address){
         return res.render('index', {
            title:'Home Page',
            name: 'Kevin Mckeon',
            
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({error})
        }
        
        weather(latitude, longitude, (error, {summary, temperature, precipProbability} = {}) => {

            if(error){
                return res.send({error})
            }

            res.render('index', {
                title:'Home Page',
                name: 'Kevin Mckeon',
                data : {
                    latitude,
                    longitude,
                    location,
                    summary,
                    temperature,
                    precipProbability
                }
            })
        })
    })
})

app.get('/api', (req, res) => {


    if(!req.query.address){
        return res.send({
            error : 'Please provide an address to the query String'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({error})
        }
        
        weather(latitude, longitude, (error, {summary, temperature, precipProbability} = {}) => {

            if(error){
                return res.send({error})
            }

            return res.send({
                
                    latitude,
                    longitude,
                    location,
                    summary,
                    temperature,
                    precipProbability
                
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Page',
        name: 'Kevin Mckeon',

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help Page',
        name: 'Kevin Mckeon'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404 - Page Not Found',
        details: 'Help Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404 - Page Not Found',
    })
})


app.listen(port, () => {
    console.log('Server is up on port 3000')
})

