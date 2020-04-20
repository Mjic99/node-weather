document.getElementById('search').onclick = () => {
    var query = document.getElementById('q').value
    fetch('/weather?address=' + query).then( response => {
        response.json().then( data => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                document.getElementById('location').innerHTML = data.location
                document.getElementById('forecast').innerHTML = data.forecast
            }
        })
    })
}