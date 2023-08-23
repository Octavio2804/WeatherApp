document.getElementById('container-boton').addEventListener('click', function(){
    let city = document.getElementById('input').value;

    conseguirClima(city)
        .then(data => {
            document.getElementById('info').innerHTML = `
            <h1>${data.name.toUpperCase()}</h1>
                <p>${data.weather[0].description.toUpperCase()}</p>
                <p>Temperatura: ${data.main.temp}°C</p>
            `;
        })
        .catch(err => {
            Swal.fire(
                'Algo salió mal al cargar los datos',
                'error'
              );
            document.getElementById('info').innerHTML = 'Ocurrió un error, por favor intente de nuevo más tarde';
        });
});





function conseguirClima (city) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let apiKey = '57614e57ea69edb19996ac9f6588388a';
        let link = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        xhr.open('GET', link, true);
        xhr.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200) {
                let respuesta = JSON.parse(this.responseText);
                resolve(respuesta);
            } else if (this.readyState === 4) {
                reject('Ocurrió un error al cargar los datos');
            }
        };
        xhr.send();
    });
}