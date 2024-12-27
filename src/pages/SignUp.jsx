import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SignUpAsync } from "../services/actions/AuthAction";
import { Link, useNavigate } from "react-router";


const SignUp = () => {

    const { isSignUp, isLoading } = useSelector(state => state.AuthReducer)

    const [formData, setFormData] = useState({
        displayName: '',
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
        dispatch(SignUpAsync(formData));
    };

    useEffect(() => {
        isSignUp && navigate('/signin');
    }, [isSignUp]);

    return (
        <>
            <section className="d-flex align-items-center justify-content-center" style={{ height: '100vh'}}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={4} xs={12} className="border shadow rounded-4 p-4 text-center bg-light bg-opacity-25">
                            <h2 className="text-uppercase">Sign Up</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row className="row-gap-3 my-4">
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Control type="text" name="displayName" placeholder="Enter Your Name" value={formData.displayName} onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
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
                                            'Sign Up'
                                    }
                                </Button>
                                <p className="mt-3 mb-0">Already have an account? &nbsp;<Link to="/signin">Login</Link></p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SignUp;