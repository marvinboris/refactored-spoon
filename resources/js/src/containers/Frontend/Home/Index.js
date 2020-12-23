import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import AbsoluteButton from '../../../components/UI/Button/AbsoluteButton/AbsoluteButton';

import ByBriluce from '../../../assets/images/Group 819@2x.png';
import HomeImg from '../../../assets/images/Group 823@2x.png';
import Bg from '../../../assets/images/Group 822@2x.png';

class Home extends Component {
    render() {
        return (
            <Col xs={12} className="d-flex flex-column flex-fill" style={{ background: `url("${Bg}") no-repeat center` }}>
                <div>
                    <Link className="text-decoration-none" to="/"><img src={ByBriluce} alt="By Briluce" style={{ height: 54 }} /></Link>
                </div>

                <Row className="flex-fill align-items-center">
                    <Col lg={7} className="text-center text-secondary pb-5">
                        <div className="pb-5 text-500 display-4">Welcome</div>

                        <div className="text-scarlet text-700 display-3">Check your payout calendar</div>

                        <div className="py-4 text-small text-large text-300 w-50 mx-auto">Check when next is your liyeplimal pack payout.</div>

                        <Link to="/calculation" className="text-reset">
                            <AbsoluteButton color="scarlet" icon={faAngleRight} size="lg" className="rounded-pill text-x-large py-3 px-4">Check Now</AbsoluteButton>
                        </Link>
                    </Col>

                    <Col lg={5}>
                        <img src={HomeImg} alt="Home image" className="img-fluid" />
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Home;
