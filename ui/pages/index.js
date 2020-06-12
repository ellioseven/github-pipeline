import React, { useState, useEffect } from "react"

const taskFetch = () => {
  const endpoint = "http://localhost:4000/tasks/all"
  return fetch(endpoint)
    .then(res => res.json())
    .then(({ tasks }) => tasks)
    .catch(e => console.log(e))
}

const taskPatch = ({ label }) => {
  const endpoint = "http://localhost:4000/tasks/new"

  const options = {
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `label=${label}`
  }

  return fetch(endpoint, options)
    .then(res => res.json())
    .then(({ tasks }) => tasks)
    .catch(e => console.log(e))
}

const Index = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    taskFetch().then(tasks => setTasks(tasks))
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const { value } = event.target.elements.task
    taskPatch({ label: value})
      .then(() => {
        taskFetch().then(tasks => setTasks(tasks))
      })
  }

  return (
    <div>
      <ul>
        { tasks.map(task => <li key={ task.label }>{ task.label }</li>) }
        <form onSubmit={ handleSubmit }>
          <input name="task" />
          <button>Add Task</button>
        </form>
      </ul>
    </div>
  )
}

export default Index
