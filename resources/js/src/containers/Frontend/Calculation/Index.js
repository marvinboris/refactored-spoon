import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Col, CustomInput, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faDownload, faEnvelope, faFlag, faIdCard, faPhone, faPrint } from "@fortawesome/free-solid-svg-icons";
import OwlCarousel from 'react-owl-carousel2';

import AbsoluteButton from '../../../components/UI/Button/AbsoluteButton/AbsoluteButton';
import BetweenButton from "../../../components/UI/Button/BetweenButton/BetweenButton";
import CustomSpinner from "../../../components/UI/CustomSpinner/CustomSpinner";
import Feedback from "../../../components/Feedback/Feedback";

import * as actions from '../../../store/actions';

import ByBriluce from '../../../assets/images/Group 819@2x.png';
import Bg from '../../../assets/images/Group 822@2x.png';
import GrayBg from '../../../assets/images/Group 824@2x.png';
import GreenBg from '../../../assets/images/Group 825@2x.png';

const ResultCard = ({ no, date, payout }) => {
    let dateInstance, periodDate, monthDay, weekDay, month;

    if (date) {
        dateInstance = new Date(date);
        periodDate = dateInstance.getTime() > Date.now() ? 'Upcoming' : (Date.now() < dateInstance.getTime() + 86400000 ? 'Today\'s' : 'Earned');
        monthDay = dateInstance.getDate();
        weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateInstance.getDay()];
        month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][dateInstance.getMonth()];
    }

    return <Col lg={no ? 4 : 12}>
        <div className="embed-responsive embed-responsive-1by1 position-relative" style={{ background: `url("${no ? GrayBg : GreenBg}") no-repeat center`, backgroundSize: '107% 107%' }}>
            <div className="w-100 h-100 d-flex flex-column justify-content-center text-center py-3 px-4 position-absolute" style={{ top: 0, left: 0 }}>
                {no ? <div className="text-blue">No info displayed yet</div> : <>
                    <div className="d-flex justify-content-between pt-3 pr-3 text-small text-dark mb-auto">
                        <div className="text-blue text-700">{month}</div>
                        <div>{periodDate} payout</div>
                    </div>

                    <div className="mt-auto pb-4">
                        <div className="text-green display-4 text-500">{monthDay}</div>
                        <div className="text-secondary text-x-large text-500">{weekDay}</div>
                        <div className="text-dark">${payout} Limo</div>
                    </div>
                </>}
            </div>
        </div>
    </Col>;
};

class Calculation extends Component {
    state = {
        pack_id: '',
        amount: '',
        date: '',
        email: '',
        phone: '',
    }

    componentDidMount() {
        this.props.reset();
        this.props.info();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.calculate(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    exportData = async (url, name, data) => {
        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('data', data);

            const res = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const resData = await res.blob();

            const downloadLink = URL.createObjectURL(resData);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadLink;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadLink);
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        let {
            frontend: { calculation: { loading, message, calculation, packs } },
        } = this.props;
        let { pack_id, amount, date, email, phone } = this.state;
        let content = null;

        if (!packs) packs = [];
        const packsOptions = packs.sort((a, b) => a.amount < b.amount).map(pack => <option key={JSON.stringify(pack)} value={pack.id}>{pack.name}</option>);

        const pack = packs.find(p => +p.id === +pack_id);
        if (pack) amount = pack.amount;

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else if (calculation) {
            const calculationResult = calculation.result.map(date => <ResultCard key={Math.random() * Math.random()} date={date} payout={calculation.pack.payout} />);
            let payoutsRemaining = 0;
            calculation.result.forEach(date => {
                const dateInstance = new Date(date);
                if (dateInstance.getTime() > Date.now()) payoutsRemaining++;
            });

            content = <>
                <Row>
                    <Col xs={12} className="p-0">
                        <OwlCarousel ref="Calculation result" options={{ responsive: { 0: { items: 1 }, 1100: { items: 3 } }, loop: false, dots: false }}>
                            {calculationResult}
                        </OwlCarousel>
                    </Col>
                </Row>

                <div className="row pt-4">
                    <Col lg={4}>
                        <div className="bg-orange-50 py-2 px-4 text-center text-large text-secondary rounded-sm">
                            <span className="text-700">{payoutsRemaining}</span> Payouts remaining
                        </div>
                    </Col>

                    <Col lg={8}>
                        <div className="d-flex justify-content-end">
                            <div className="pr-3">
                                <BetweenButton color="orange" className="rounded" size="lg" icon={faDownload} onClick={() => this.exportData('/api/calculation/pdf', `Payout Calendar Checker - ${Date.now()}.pdf`, calculation.exportableData)}>Get PDF</BetweenButton>
                            </div>

                            <div className="pr-3">
                                <BetweenButton color="green" className="rounded" size="lg" icon={faEnvelope}>Send by mail</BetweenButton>
                            </div>

                            <div>
                                <BetweenButton color="blue" className="rounded" size="lg" icon={faPrint}>Print Now</BetweenButton>
                            </div>
                        </div>
                    </Col>
                </div>
            </>;
        }
        else content = <Row>
            <ResultCard no />
            <ResultCard no />
            <ResultCard no />
        </Row>;

        return (
            <Col xs={12} className="d-flex flex-column flex-fill justify-content-center" style={{ background: `url("${Bg}") no-repeat center` }}>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="py-4 px-5">
                            <div className="d-flex justify-content-between mb-4">
                                <div>
                                    <Link className="text-decoration-none" to="/"><img src={ByBriluce} alt="By Briluce" style={{ height: 54 }} /></Link>
                                </div>

                                <div className="text-right">
                                    <div className="text-700 text-large text-blue">Payout Calendar Checker</div>

                                    <div className="text-secondary text-300">For Liyeplimal users only</div>
                                </div>
                            </div>

                            <Form className="row" onSubmit={this.submitHandler}>
                                <FormGroup className="col-lg-4">
                                    <InputGroup className="rounded-sm">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><FontAwesomeIcon fixedWidth icon={faIdCard} /></InputGroupText>
                                        </InputGroupAddon>
                                        <CustomInput id="pack_id" required onChange={this.inputChangeHandler} type="select" name="pack_id" value={pack_id}>
                                            <option>Select Pack</option>
                                            {packsOptions}
                                        </CustomInput>
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup className="col-lg-4">
                                    <InputGroup className="rounded-sm">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><FontAwesomeIcon fixedWidth icon={faFlag} /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input required onChange={this.inputChangeHandler} type="text" name="amount" value={amount} readOnly placeholder="Pack Amount" />
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup className="col-lg-4">
                                    <InputGroup className="rounded-sm">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><FontAwesomeIcon fixedWidth icon={faCalendar} /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input required onChange={this.inputChangeHandler} type="date" name="date" value={date} placeholder="Invest Date" />
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup className="col-lg-4">
                                    <InputGroup className="rounded-sm">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><FontAwesomeIcon fixedWidth icon={faEnvelope} /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input required onChange={this.inputChangeHandler} type="email" name="email" value={email} placeholder="E-Mail Address" />
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup className="col-lg-4">
                                    <InputGroup className="rounded-sm">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><FontAwesomeIcon fixedWidth icon={faPhone} /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input required onChange={this.inputChangeHandler} type="tel" name="phone" value={phone} placeholder="Phone" />
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup className="col-lg-4">
                                    <AbsoluteButton color="green" icon={faCalendar} className="btn-block">Check Payout Calendar</AbsoluteButton>
                                </FormGroup>
                            </Form>

                            <Feedback message={message} />
                            {content}
                        </Card>
                    </Col>
                </Row>
            </Col>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    calculate: data => dispatch(actions.postCalculation(data)),
    info: () => dispatch(actions.getCalculationInfo()),
    reset: () => dispatch(actions.resetCalculation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculation);
