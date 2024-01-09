const express = require("express");
const app = express();
const morgan = require("morgan");

function getRandomInt() {
  return Math.floor(Math.random() * 666666);
}

let data = [
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
app.use(
  morgan(function (tokens, req, res) {
    if (req.method === "POST") {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        JSON.stringify({ name: req.body.name, number: req.body.number }),
      ].join(" ");
    }

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((p) => p.id === id);
  if (person) {
    return response.json(person);
  }
  response.sendStatus(404);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((p) => p.id !== id);

  response.sendStatus(204);
});

app.post("/api/persons", (request, response) => {
  const person = request.body;

  if (!person.name || !person.number) {
    return response.status(400).json({ error: "name and number is required" });
  }
  if (data.find((p) => p.name == person.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  person.id = getRandomInt();

  data = data.concat(person);
  response.json(person);
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
