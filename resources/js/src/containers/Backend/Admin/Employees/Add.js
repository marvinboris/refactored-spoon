import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faUserTie, faUser, faCheckCircle, faUserTag, faAt, faPhone, faCalendar, faFlag, faLocationArrow, faUsers, faIdCard, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
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
        first_name: '',
        last_name: '',
        job: '',
        matricule: '',
        gender: '',
        email: '',
        phone: '',
        birthdate: '',
        country: '',
        address: '',
        diploma: '',
        marital: '',
        number_children: '',
        languages: '',
        driving_licenses: '',
        photo: null,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.employees.employee && prevState.first_name === '') {
            const { backend: { employees: { employee } } } = nextProps;
            return updateObject(prevState, { ...employee });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.show(this.props.match.params.employeeId);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = async e => {
        e.preventDefault();
        if (this.props.edit) await this.props.patch(this.props.match.params.employeeId, e.target);
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
                    pages: { components: { form: { save, selected_file } }, backend: { pages: { employees: { title, add, edit, index, form } } } }
                }
            },
            backend: { employees: { loading, error, message, employee } },
        } = this.props;
        let { first_name, last_name, job, matricule, address, birthdate, country, diploma, driving_licenses, email, languages, number_children, phone, photo, marital, gender } = this.state;
        let content = null;
        let errors = null;

        const gendersOptions = Object.keys(form.gender_list).map(id => ({ id, name: form.gender_list[id] })).sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);
        const maritalsOptions = Object.keys(form.marital_list).map(id => ({ id, name: form.marital_list[id] })).sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

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
                        <Form onSubmit={this.submitHandler} icon={faUserTie} title={this.props.edit ? edit : add} list={index} link="/admin/employees" innerClassName="row" className="shadow-sm">
                            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

                            <Col lg={8}>
                                <Feedback message={message} />
                                <Row>
                                    <FormInput type="text" className="col-md-6" icon={faUser} onChange={this.inputChangeHandler} value={first_name} name="first_name" required placeholder={form.first_name} />
                                    <FormInput type="text" className="col-md-6" icon={faUser} onChange={this.inputChangeHandler} value={last_name} name="last_name" required placeholder={form.last_name} />
                                    <FormInput type="text" className="col-md-6" icon={faUser} onChange={this.inputChangeHandler} value={matricule} name="matricule" required placeholder={form.matricule} />
                                    <FormInput className="col-lg-6" type="select" name="gender" placeholder={form.gender} onChange={this.inputChangeHandler} icon={faUser} validation={{ required: true }} required value={gender}>
                                        <option>{form.select_gender}</option>
                                        {gendersOptions}
                                    </FormInput>
                                    <FormInput type="email" className="col-md-6" icon={faAt} onChange={this.inputChangeHandler} value={email} name="email" required placeholder={form.email} />
                                    <FormInput type="tel" className="col-md-6" icon={faPhone} onChange={this.inputChangeHandler} value={phone} name="phone" required placeholder={form.phone} />
                                    <FormInput type="text" className="col-md-6" icon={faUserTag} onChange={this.inputChangeHandler} value={job} name="job" required placeholder={form.job} />
                                    <FormInput type="date" className="col-md-6" icon={faCalendar} onChange={this.inputChangeHandler} value={birthdate} name="birthdate" required placeholder={form.birthdate} />
                                    <FormInput type="text" className="col-md-6" icon={faFlag} onChange={this.inputChangeHandler} value={country} name="country" required placeholder={form.country} />
                                    <FormInput type="text" className="col-md-6" icon={faLocationArrow} onChange={this.inputChangeHandler} value={address} name="address" required placeholder={form.address} />
                                    <FormInput type="text" className="col-md-6" icon={faGraduationCap} onChange={this.inputChangeHandler} value={diploma} name="diploma" required placeholder={form.diploma} />
                                    <FormInput className="col-lg-6" type="select" name="marital" placeholder={form.marital} onChange={this.inputChangeHandler} icon={faUser} validation={{ required: true }} required value={marital}>
                                        <option>{form.select_marital}</option>
                                        {maritalsOptions}
                                    </FormInput>
                                    <FormInput type="number" className="col-md-6" icon={faUsers} onChange={this.inputChangeHandler} value={number_children} name="number_children" required placeholder={form.number_children} />
                                    <FormInput type="text" className="col-md-6" icon={faFlag} onChange={this.inputChangeHandler} value={languages} name="languages" required placeholder={form.languages} />
                                    <FormInput type="text" className="col-md-6" icon={faIdCard} onChange={this.inputChangeHandler} value={driving_licenses} name="driving_licenses" required placeholder={form.driving_licenses} />

                                    <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />

                                    <div className="col-12">
                                        <FormButton color="green" icon={faSave}>{save}</FormButton>
                                    </div>
                                </Row>
                            </Col>

                            <Col lg={4}>
                                <div className="embed-responsive embed-responsive-1by1 bg-soft border d-flex justify-content-center align-items-center w-60 mx-auto" style={{ cursor: 'pointer' }} onClick={this.fileUpload}>
                                    {(this.props.edit ? (photo && (photo !== employee.photo)) : photo) && <div className="text-center text-green">
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
                    <Breadcrumb items={this.props.edit && [{ to: '/admin/employees', content: index }]} main={this.props.edit ? edit : add} icon={faUserTie} />
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
    show: id => dispatch(actions.getEmployee(id)),
    post: data => dispatch(actions.postEmployees(data)),
    patch: (id, data) => dispatch(actions.patchEmployees(id, data)),
    reset: () => dispatch(actions.resetEmployees()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));