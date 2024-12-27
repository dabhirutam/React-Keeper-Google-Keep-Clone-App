import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../componants/Header";
import { SingleNotesAsync, UpdateNotesAsync } from "../services/actions/NotesAction";
import { useNavigate, useParams } from "react-router";

const EditNotes = () => {

    const { isLoading, note, isUpdated } = useSelector((state) => state.NotesReducer);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        tags: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(UpdateNotesAsync(formData));
    };

    useEffect(() => {
        note && setFormData(note);
    }, [note]);

    useEffect(() => {
        isUpdated && navigate('/');
    }, [isUpdated]);

    useEffect(() => {
       dispatch(SingleNotesAsync(id));
    }, []);

    return (
        <>
            <Header navs={[{ p: '/', i: 'house-fill' }]} />
            <Container>
                <Row className="justify-content-center pt-5">
                    <Col md={10} xs={12} className="border border-secondary rounded-3 p-4">
                        <h2 className="mb-4 text-center">Add Notes Details</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Control type="text" name="id" hidden />
                            <Row className="mb-3 row-gap-3">
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control type="text" name="title" placeholder="Enter Note Title" value={formData.title} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Select name="tags" onChange={handleChange}>
                                        <option value="">Select Notes Tag</option>
                                        <option value="work">Work Related</option>
                                        <option value="study">Study Related </option>
                                        <option value="travel">Travel Related</option>
                                    </Form.Select>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control as="textarea" rows={3} type="text" name="description" placeholder="Enter Note Description" value={formData.description} onChange={handleChange} />
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
                                        'Upadate Notes'
                                }

                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EditNotes;