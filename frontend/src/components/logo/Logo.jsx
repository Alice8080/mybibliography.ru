import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logoIcon.png';
import './logo.scss';
const Logo = () => {
    return (
        <Navbar.Brand href="/" className="logo">
            <img className="logo__img" src={logo} alt="My Bibliography" />
            <span className="logo__text">My Bibliography</span>
        </Navbar.Brand>
    )
}
export default Logo;