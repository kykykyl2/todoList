import './styles.css'

const Title = ({ title }) => {
  return(<h1 className='title'>{title}</h1>)
} 

Title.propTypes = {
  title: String
}

Title.defaultProps = {
  title: ''
}

export default Title
