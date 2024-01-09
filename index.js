const express = require("express");
const app = express();

const data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/info", (request, response) => {
  const date = new Date().toString();
  const html = `
  <p>Phonebook has info for ${data.length} people</p>
  <p>${date}</p>
  `;
  response.status(200).send(html);
});

const PORT = 3001;
app.listen(PORT);
