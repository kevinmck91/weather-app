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

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directiory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.static(viewsPath))

// Enviornment variables (local / live)
const port = process.env.PORT || 3000

app.get('', (req, res) => {

    // Request to access the root directory
    if(!req.query.address){
         return res.render('index', {
            title:'Home Page',
            name: 'Kevin Mckeon',        
        })
    }

    // In case of an error, set undefined data for deconstruction
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({error})
        }
        
        weather(latitude, longitude, (error, {summary, temperature, precipProbability, string} = {}) => {

            if(error){
                return res.send({error})
            }

            res.render('index', {
                title:'Home Page',
                name: 'Kevin Mckeon',
                data: {
                    latitude,
                    longitude,
                    location,
                    summary,
                    temperature,
                    precipProbability,
                    string  //taken from data deconstruction above, which is taken from weatherfinder.js                     
                }
            })
        })
    })
})

// Response is returned in JSON for debugging purposes 
app.get('/api', (req, res) => {

    if(!req.query.address){
        return res.send({
            error : 'Enter a Query String parameter',
            example_PROD : 'https://mckeon-weather-app.herokuapp.com/api?address=mullingar',
            example_DEV : 'http://192.168.0.38:3000/api?address=mullingar'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({error})
        }
        
        weather(latitude, longitude, (error, {summary, temperature, precipProbability, string} = {}) => {

            if(error){
                return res.send({error})
            }

            return res.send({          
                    latitude,
                    longitude,
                    location,
                    summary,
                    temperature,
                    precipProbability,
                    string
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

// The port uses the env variables above to determin DEV/PROD
app.listen(port, () => {
    console.log('Server is up on port : ' + port)
})