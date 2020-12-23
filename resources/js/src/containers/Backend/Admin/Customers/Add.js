import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faUserTie, faUser, faCheckCircle, faPhone, faEnvelope, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import Error from '../../../../components/Error/Error';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';
import Form from '../../../../components/Backend/UI/Form/Form';
import FormInput from '../../../../components/Backend/UI/Input/Input';
import FormButton from '../../../../components/UI/Button/BetweenButton/BetweenButton';
import Feedback from '../../../../components/Feedback/Feedback';

import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';

class Add extends Component {
    state = {
        name: '',
        address: '',
        country: '',
        phone: '',
        email: '',
        photo: null,

        countries: [],
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.customers.customer && prevState.name === '') {
            const { backend: { customers: { customer } } } = nextProps;
            return updateObject(prevState, { ...customer });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.show(this.props.match.params.customerId);

        const cors = 'https://cors-anywhere.herokuapp.com/';

        const phoneRes = await fetch(cors + 'http://country.io/phone.json', { method: 'GET', mode: 'cors' });
        const namesRes = await fetch(cors + 'http://country.io/names.json', { method: 'GET', mode: 'cors' });

        const phone = await phoneRes.json();
        const names = await namesRes.json();

        const countries = Object.keys(phone).map(key => ({ country: key, code: phone[key], name: names[key] })).sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);

        this.setState({ countries });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = async e => {
        e.preventDefault();
        if (this.props.edit) await this.props.patch(this.props.match.params.customerId, e.target);
        else await this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    fileUpload = () => document.getElementById('photo').click()

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { form: { save, selected_file } }, backend: { pages: { customers: { title, add, edit, index, form } } } }
                }
            },
            backend: { customers: { loading, error, message, customer } },
        } = this.props;
        let { name, address, phone, email, photo, country, countries } = this.state;
        let content = null;
        let errors = null;

        const countriesOptions = countries.map(({ country, code, name }) => <option key={country} value={country} code={code}>{name}</option>);

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else {
            errors = <>
                <Error err={error} />
            </>;
            content = (
                <>
                    <Row>
                        <Form onSubmit={this.submitHandler} icon={faUserTie} title={this.props.edit ? edit : add} list={index} link="/admin/customers" innerClassName="row" className="shadow-sm">
                            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

                            <Col lg={8}>
                                <Feedback message={message} />
                                <Row>
                                    <FormInput type="text" className="col-md-6" icon={faUser} onChange={this.inputChangeHandler} value={name} name="name" required placeholder={form.name} />
                                    <FormInput className="col-md-6" type="select" addon={<span className="text-secondary text-small d-inline-flex">
                                        <div className="rounded-circle overflow-hidden position-relative d-flex justify-content-center align-items-center" style={{ width: 30, height: 30 }}>
                                            <span className={`flag-icon text-xx-large position-absolute flag-icon-${country.toLowerCase()}`} />
                                        </div>
                                    </span>} onChange={this.inputChangeHandler} value={country} validation={{ required: true }} name="country" required placeholder={form.select_country}>
                                        <option>{form.select_country}</option>
                                        {countriesOptions}
                                    </FormInput>
                                    <FormInput type="text" className="col-md-6" icon={faPhone} onChange={this.inputChangeHandler} value={phone} name="phone" required placeholder={form.phone} />
                                    <FormInput type="email" className="col-md-6" icon={faEnvelope} onChange={this.inputChangeHandler} value={email} name="email" required placeholder={form.email} />
                                    <FormInput type="textarea" className="col-md-6" icon={faLocationArrow} onChange={this.inputChangeHandler} value={address} name="address" required placeholder={form.address} />

                                    <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />

                                    <div className="col-12">
                                        <FormButton color="green" icon={faSave}>{save}</FormButton>
                                    </div>
                                </Row>
                            </Col>

                            <Col lg={4}>
                                <div className="embed-responsive embed-responsive-1by1 bg-soft border border-light d-flex justify-content-center align-items-center w-60 mx-auto" style={{ cursor: 'pointer' }} onClick={this.fileUpload}>
                                    {(this.props.edit ? (photo && (photo !== customer.photo)) : photo) && <div className="text-center text-green">
                                        <div><FontAwesomeIcon icon={faCheckCircle} fixedWidth size="5x" /></div>
                                        <div className="mt-3">{selected_file}</div>
                                    </div>}
                                </div>
                            </Col>
                        </Form>
                    </Row>
                </>
            );
        }

        return (
            <>
                <div className="bg-soft py-4 pl-5 pr-4 position-relative">
                    <Breadcrumb items={this.props.edit && [{ to: '/admin/customers', content: index }]} main={this.props.edit ? edit : add} icon={faUserTie} />
                    <SpecialTitle user icon={faUserTie}>{title}</SpecialTitle>
                    <Subtitle user>{this.props.edit ? edit : add}</Subtitle>
                </div>
                <div className="p-4 pb-0">
                    {errors}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    show: id => dispatch(actions.getCustomer(id)),
    post: data => dispatch(actions.postCustomers(data)),
    patch: (id, data) => dispatch(actions.patchCustomers(id, data)),
    reset: () => dispatch(actions.resetCustomers()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));