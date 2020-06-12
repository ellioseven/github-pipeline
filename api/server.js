const express = require("express")
const lowdb = require("lowdb")
const cors = require("cors")
const Memory = require("lowdb/adapters/Memory")
const data = require("./data.json")

// Pass in-memory database to context.
const storage = new Memory()
const db = lowdb(storage)
db.defaults(data).write()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/tasks/all", (req, res) => {
  const tasks = db.get("tasks").value()
  res.json({ tasks })
})

app.post("/tasks/new", (req, res) => {
  const { label } = req.body

  if (label) {
    const task = { label }
    db.get("tasks").push(task).write()
  }

  res.json({ tasks: db.get("tasks").value() })
})

// Boot application.
app.listen(4000, () => {
  console.log("Listening on port 4000")
})
