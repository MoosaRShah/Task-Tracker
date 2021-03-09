//impt snippet
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()
  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={!showAdd ? 'green' : 'red'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
    </header>
  )
}

//add in default values for props incase nothing is passed down from parent component
//defaults placed inside an object
Header.defaultProps = {
  title: 'default title',
}

//need to import PropTypes to use this method
//require props to be of a particular type eg string, function, number.. etc
//only throws error to console, will still compile
Header.propTypes = {
  title: PropTypes.string.isRequired,
}

//inline css styling requires double {{}}
//syntax is property: 'value'
//properties with a space are converted to camelCase: background color = backgroundColor
//can also pass in css styling as a variable and do styling as shown below
//the variable will only need single {}
// const headerStyle = {
//   color: 'black',
//   backgroundColor: 'white',
// };
export default Header
