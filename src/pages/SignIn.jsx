import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CloaseSignUp, SignInAsync, SignInGoogleAsync } from "../services/actions/AuthAction";
import { Link, useNavigate } from "react-router";


const SignIn = () => {

    const { isLoading, user } = useSelector(state => state.AuthReducer)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(SignInAsync(formData));
    };

    useEffect(() => {
       user && navigate('/');
    }, [user]);

    useEffect(() => {
        dispatch(CloaseSignUp());
    }, []);

    return (
        <>
            <section className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={4} xs={12} className="border shadow rounded-4 p-4 text-center bg-light bg-opacity-25">
                            <h2 className="text-uppercase">Login</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row className="row-gap-3 my-4">
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Control type="email" name="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Control type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                                    {
                                        isLoading ?
                                            <div>
                                                <span className="spinner-border text-light me-2" style={{ width: '1rem', height: '1rem', borderWidth: '3px' }} role="status"></span>
                                                Uploading...
                                            </div>
                                            :
                                            'Sign In'
                                    }
                                </Button>

                                <Button variant="danger" className="w-100 my-3 fw-medium" onClick={() => dispatch(SignInGoogleAsync())}><i className="bi bi-google me-1"></i> Google</Button>
                            </Form>
                            <p className="mb-0">Dont have an account? &nbsp;<Link to="/signup">Sign Up</Link></p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SignIn;