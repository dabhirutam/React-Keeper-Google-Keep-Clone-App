/* eslint-disable react/prop-types */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { LogOutAsync } from '../services/actions/AuthAction';

function Header({ navs }) {

    const dispatch = useDispatch();

    return (
        <Navbar className="px-2 p-0 bg-primary" style={{ height: '62px' }}>
            <Container>
                <Navbar style={{ width: '100%' }}>
                    <Nav className="column-gap-2 align-items-center">
                        <Nav.Link className="text-white d-flex align-items-center d-none d-md-flex">
                            <img src={logo} alt="logo" style={{ width: '30px' }} />
                            <span className='ms-2 fw-bold fs-4'>Keeper</span>
                        </Nav.Link>
                    </Nav>
                    <Nav className="column-gap-2 align-items-center ms-auto text-white">
                        {
                            navs.map(nav => {
                                return (
                                    <Link to={nav.p} className="fs-5 btn btn-light" key={nav.i} >
                                        <i className={`bi bi-${nav.i}`}></i>
                                    </Link>
                                )
                            })
                        }
                        |
                        <Button className="btn btn-danger py-2 fw-medium" onClick={() => dispatch(LogOutAsync())}>Log Out</Button>
                    </Nav>
                </Navbar>
            </Container>
        </Navbar>
    );
}

export default Header;