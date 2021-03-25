import { Link } from 'react-router-dom'

const footer = () => {
  return (
    <footer>
      <h4>Copyright &copy; 2021</h4>
      <Link to='/about'>
        <button className='btn' style={{ backgroundColor: 'lightseagreen' }}>
          About
        </button>
      </Link>
    </footer>
  )
}

export default footer
