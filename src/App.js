import Header from './components/Header.js'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Button from './components/Button.js'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
  //fetch tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()

    return data
  }
  //fetch tasks
  const fetchTask = async id => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()

    return data
  }
  //Add task
  const addTask = async task => {
    // const res = await fetch
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
    const res = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }
  //delete task
  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter(task => task.id !== id))
  }
  //toggle reminder
  const toggleReminder = async id => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })
    const data = await res.json()
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          title='Task Tracker'
          showAdd={showAddTask}
          onAdd={() => {
            setShowAddTask(!showAddTask)
          }}
        />
        <Route
          exact
          path='/'
          render={props => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No tasks'
              )}
            </>
          )}
        />
        <Route path='/about' component={About}></Route>
        <Footer />
      </div>
    </Router>
  )
}

export default App
