//* Variables 
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
const titulo = document.querySelector('h2')
let tweets = []


//* Funciones
const agregarTweet = (e) => {
    e.preventDefault()

    // TextArea donde el usuario escribe 
    const tweet = document.querySelector('#tweet').value

    // Validando que se envie un valor 
    if ( tweet === '' ){
        mostrarError('Un mensaje no puede ir vacío')
        return // Evita que se ejecute más lineas de codigo 
    }

    const tweetObj = {
        id: Date.now(),
        tweet 
    }

    // Añadir al arreglo de tweets
    // Agregando una copia de lo que hay en el arreglo y se agrega el nuevo que se está escribiendo  
    tweets = [ ...tweets, tweetObj ]

    // Una vez agregado el valor al arreglo se crea el HTML
    crearHTML()


    // Reiniciar formulario 
    formulario.reset()
    
}



//* Mostrar mensaje de error
const mostrarError = ( error ) => {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild( mensajeError )

    // Eliminando alerta después de 1.5 segundos
    setTimeout(() => {
        mensajeError.remove()
    }, 1500);
}


//* Mostrar listado de tweets
const crearHTML = () => {

    limpiarHTML()

    if ( tweets.length > 0 ){
        tweets.forEach( tweet => {
            titulo.innerText = 'Mis Tweets'

            // Agregar botón de eliminar
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerText = 'X'

            //Añadiendo función de eliminar
            btnEliminar.onclick = () => borrarTweet(tweet.id)

            // Crear HTML
            const li = document.createElement('li')
            // Añadiendo texto
            li.innerText = tweet.tweet

            // Asignar botón en la lista 
            li.appendChild(btnEliminar)
            // Insertando la lista en el HTML
            listaTweets.appendChild(li) 
        })
    } else {
        titulo.innerText = 'Sin Tweets'
    }

    sincronizarStorage()
}



//* Eliminar Tweets
const borrarTweet = (id) => {
    tweets = tweets.filter( tweet => tweet.id !== id )
    crearHTML()
}


//* Agrega los tweets actuales al localstorage
const sincronizarStorage = () => {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}


//* Limpiar HTML 
const limpiarHTML = () => {
    while ( listaTweets.firstChild ){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}



//* Event listeners
const eventListeners = () => {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        // Si no tiene nada en localStorage se asignará como arreglo vacío en vez de null
        tweets = JSON.parse(localStorage.getItem('tweets')) || []
        crearHTML()
    })
}

eventListeners()

