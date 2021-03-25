import Header from './components/Header.js'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Footer from './components/Footer'
import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'work out',
      day: 'Feb 5th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'grocery shopping',
      day: 'Feb 6th at 2:30pm',
      reminder: true,
    },
  ])

  //Add task
  const addTask = task => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }
  //delete task
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  //toggle reminder
  const toggleReminder = id => {
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
