import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <Link to='/'>
        <button className='btn' style={{ backgroundColor: 'lightBlue' }}>
          Go Home
        </button>
      </Link>
      <h3> Task Tracker App</h3>
      <p>app built using react, react router dom, and useState hooks. </p>
      <p>
        user can add a task name, date & time, and toggle reminder(which will
        add a green border on the left side)
      </p>
      <p>the task form toggles to give a better view of the task list</p>
    </div>
  )
}

export default About
