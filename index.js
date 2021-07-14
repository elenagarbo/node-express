const express = require('express') 
const app = express()  //creamos aplicacion express

// la app tiene que utilizar el modulo que esta en express
// soportar la request cuando se pasa un objeto y lo parse en req.body
app.use(express.json()) // parsear objetos json
 
let personas = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Elena García",
        number: "657115131",
        id: 4
      },
      {
        name: "Sara",
        number: "646639276",
        id: 5
      }
]

//cuando se haga peticion get - path a la raiz- 
//request: contiene toda la informacion de la solicitud http
// response se utiliza para definir como se esponde a la solicitud
app.get('/', (request, response) => {
    response.send('<h1>Hello Worldddd eah</h1>')
})

app.get('/api/personas', (request, response) => {
    response.json(personas)
}) 

//recuperar un segmento del path con :id
app.get('/api/personas/:id', (request, response) => {
    const id = Number(request.params.id)
    const persona = personas.find(person => person.id === id)

    if(persona) {
        response.json(persona)
    } else {
        response.status(404).end()
    }
})  

// se guardan todas las personas menos la que queremos eliminar
app.delete('/api/personas/:id', (request, response) => {
    const id = Number(request.params.id)
    personas = personas.filter(person => person.id !== id) 
    response.status(204).end()
})  

app.post('/api/personas', (request, response) => {
  const person = request.body

  if(!person || !person.name){
    return response.status(400).json({
        error: 'person.name is missing'
    })
  }

  const ids = personas.map(person => person.id)
  const maxId = Math.max(...ids)

  const newPerson = {
      id: maxId + 1,
      name: person.name,
      number: person.number
  }

  personas = [...personas, newPerson]
  response.status(201).json(newPerson)
}) 


// va a estar escuchando puerto
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


// import http from 'http'   ecmascript moduls

// const http = require('http') // commonJS http nativo de nodejs: para poder crear un nuevo servidor

// a createserver le pasamos 1 parametro: 1 callback, funcion que se va a ejecutar cada vez que le llegue un request (solicitud http)

// la respuesta es un objeto: y tiene varios metodos para que devuelvas  la info que quieras

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' }) // cabcecer
//   response.end(JSON.stringify(notes))  //para terminar la respuest devuelve 
// })

// json.stringify convierte un objeto en cadena de texto

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)