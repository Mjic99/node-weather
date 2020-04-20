const request = require('request')

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=52dd3cd805733607b14889d2b4762bcc&query=' + encodeURI(location)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degress out. There is a precipitation of ' + body.current.precip + '.')
        }
    })
}

module.exports = forecast