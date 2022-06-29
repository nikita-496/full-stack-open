const express = require('express')
const app = express()

app.use(express.json())

let contacts = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const getContact = () => {
 return contacts
}

const updateContact = (payload) => {
  getContact(payload)
}

const generateID = () => {
  const maxId = getContact().length > 0
    ? Math.max(...getContact().map(person => person.id))
    : 0
  return maxId + 1
}

 app.get('/', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  const responseData = getContact()
  response.end(JSON.stringify(responseData))
})

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${getContact().length} people</p>
    <p>${new Date()}</p>
    `
    )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = getContact().find(person => person.id === Number(id))
  if (!person) {
    return response.status(404).end()
  }
  response.send(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const persons = getContact()
  persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const req = request.body
 
  if (!Object.keys(req).length) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  const newPerson = req
  newPerson.id = generateID()
  contacts = contacts.concat(newPerson)
  response.json(newPerson)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)