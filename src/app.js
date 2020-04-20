const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'jhonny'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'marselo'
    })
})

app.get('/help', (req, res) =>
    res.render('help', {
        title: 'Help',
        name: 'peepee'
    })
)
   
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Debes poner un address'
        })
    }
    geocode(req.query.address, (message, data) => {
        if (message) {
            return res.send({
                error: message
            })
        }
        forecast(data.location, (message, forecast) => {
            if (message) {
                return res.send({
                    error: message
                })
            }
            return res.send({
                'forecast': forecast,
                address: req.query.address,
                location: data.location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Debes poner un query'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => { //404
    res.render('404', {
        title: '404',
        name: ':(',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => { //404
    res.render('404', {
        title: '404',
        name: ':('
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})