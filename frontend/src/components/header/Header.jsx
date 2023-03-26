import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../logo/Logo';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <Navbar className="header__nav" collapseOnSelect expand="lg" variant="dark" fixed="top">
          <Logo />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className='justify-content-end header__links' id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/zakazat-spisok-literatury">Заказать список литературы</Nav.Link>
              <Nav.Link href="/spisok-literatury">Посмотреть список литературы</Nav.Link>
              <Nav.Link href="/search">Поиск</Nav.Link>
              <Nav.Link href="/account">Личный кабинет</Nav.Link>
              <Nav.Link href="/about">О сайте</Nav.Link>
              <NavDropdown title="Другое" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/kontakty">
                  Контакты
                </NavDropdown.Item>
                <NavDropdown.Item href="/pravovaya-informaciya">
                  Правовая информация
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;