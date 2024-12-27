import { Button, Col, Container, Row } from "react-bootstrap";
import Header from "../componants/Header";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteNotesAsync, ViewNotesAsync } from "../services/actions/NotesAction";
import { FindUserAsync } from "../services/actions/AuthAction";

const ViewTagsNotes = () => {

    const { notes } = useSelector(state => state.NotesReducer);
    const { user } = useSelector(state => state.AuthReducer);

    const { tag } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(ViewNotesAsync(tag));
    }, [])

    useEffect(() => {
            !user && navigate('/signin');
            dispatch(FindUserAsync());
        }, [user]);
    return (
        <>
            <Header navs={[{ p: '/', i: 'house-fill' }, { p: '/add', i: 'clipboard-plus-fill' }]} />
            <section className="py-5">
                <Container>
                    <Row className="row-gap-4">
                        <h2 className="text-uppercase text-center mb-4">{tag} Notes</h2>
                        {
                            notes.map(note => {
                                return (
                                    <Col md={4} key={note.id}>
                                        <div className={`p-4 rounded-4 text-white shadow text-center bg-opacity-75 ${tag === 'work' ? 'bg-danger' : tag === 'study' ? 'bg-primary' : 'bg-success'}`}>
                                            <h4 className="text-uppercase my-4">{note.title}</h4>
                                            <p>{note.description}</p>
                                            <div className="d-flex justify-content-center align-items-center gap-3">
                                                <Button variant="light" onClick={() => navigate(`/edit/${note.id}`)}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </Button>
                                                <Button variant="light" onClick={() => dispatch(DeleteNotesAsync(note.id, tag))}>
                                                    <i className="bi bi-trash3-fill"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ViewTagsNotes;