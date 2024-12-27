import { Button, Col, Container, Row } from "react-bootstrap";
import Header from "../componants/Header";
import workImg from '../images/work.png'
import studyImg from '../images/study.png'
import travelImg from '../images/travel.png'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FindUserAsync } from "../services/actions/AuthAction";


const ViewNotes = () => {

    const {user} = useSelector(state => state.AuthReducer)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        !user && navigate('/signin');
        dispatch(FindUserAsync());
    }, [user]);
    return (
        <>
            <Header navs={[{ p: '/add', i: 'clipboard-plus-fill' }]} />
            <section className="py-5">
                <Container>
                    <Row>
                        <Col md={4}>
                            <div className="p-4 border border-secondary rounded-4 shadow text-center">
                                <img src={workImg} style={{ width: '100px' }} alt="" />
                                <h4 className="text-uppercase my-4">Work Notes</h4>
                                <Button variant="danger" className="px-5" onClick={() => navigate('/viewtags/work')}>View</Button>
                            </div>
                        </Col>  
                        <Col md={4}>
                            <div className="p-4 border border-secondary rounded-4 shadow text-center">
                                <img src={studyImg} style={{ width: '100px' }} alt="" />
                                <h4 className="text-uppercase my-4">Study Notes</h4>
                                <Button variant="primary" className="px-5" onClick={() => navigate('/viewtags/study')}>View</Button>
                            </div>
                        </Col>  
                        <Col md={4}>
                            <div className="p-4 border border-secondary rounded-4 shadow text-center">
                                <img src={travelImg} style={{ width: '100px' }} alt="" />
                                <h4 className="text-uppercase my-4">Travel Notes</h4>
                                <Button variant="success" className="px-5" onClick={() => navigate('/viewtags/travel')}>View</Button>
                            </div>
                        </Col>  
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ViewNotes;