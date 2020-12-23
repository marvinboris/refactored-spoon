import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, Input, Row } from 'reactstrap';
import { faUserTie, faCheckCircle, faPlus, faMinus, faCalendar, faMoneyBill, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
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
        customer_id: '',
        date: '',
        paid_amount: '',
        total_amount: '',
        discount: '',
        tax: '',
        prices: [0],
        quantities: [0],
        tasks: [""],
        photo: null,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.invoices.invoice && prevState.customer_id === '') {
            const { backend: { invoices: { invoice } } } = nextProps;
            return updateObject(prevState, { ...invoice });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.show(this.props.match.params.invoiceId);
        else this.props.info();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = async e => {
        e.preventDefault();
        if (this.props.edit) await this.props.patch(this.props.match.params.invoiceId, e.target);
        else await this.props.post(e.target);
    }

    totalAmount = () => +this.state.prices.reduce((a, b, i) => +a + +b * +this.state.quantities[i], 0) + +this.state.tax - +this.state.discount;

    inputChangeHandler = e => {
        const { name, value, files, tabIndex } = e.target;
        if (name.includes('[]')) {
            const prefix = name.split('[]')[0];
            const element = this.state[prefix];
            element[tabIndex] = value;
            return this.setState({ [prefix]: element }, () => {
                this.setState({ total_amount: this.totalAmount() })
                setTimeout(() => {
                    const element = document.getElementsByClassName(prefix)[tabIndex];
                    element.focus();
                    element.selectionStart = element.selectionEnd = element.value.length;
                }, 0);
            });
        }
        if (['discount', 'tax'].includes(name)) return this.setState({ [name]: value }, () => this.setState({ total_amount: this.totalAmount() }));
        this.setState({ [name]: files ? files[0] : value });
    }

    fileUpload = () => document.getElementById('photo').click()

    plusBtnClickedHandler = () => {
        const { prices, quantities, tasks } = this.state;
        this.setState({
            prices: [...prices, 0],
            quantities: [...quantities, 0],
            tasks: [...tasks, ""],
        });
    }

    minusBtnClickedHandler = index => {
        const { prices, quantities, tasks } = this.state;
        this.setState({
            prices: prices.filter((p, i) => +i !== +index),
            quantities: quantities.filter((q, i) => +i !== +index),
            tasks: tasks.filter((t, i) => +i !== +index),
        }, () => this.setState({ total_amount: this.totalAmount() }));
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { form: { save, selected_file } }, backend: { pages: { invoices: { title, add, edit, index, form } } } }
                }
            },
            backend: { invoices: { loading, error, message, customers, tasks, invoice } },
            auth: { data: { role: { features } } }
        } = this.props;
        let { customer_id, date, discount, paid_amount, total_amount, tax, prices, quantities, tasks: tasks_, photo } = this.state;
        let content = null;
        let errors = null;

        const feature = features.find(f => f.prefix === 'invoices');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

        if (!customers) customers = [];
        const customersOptions = customers.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        if (!tasks) tasks = [];

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
                        <Form onSubmit={this.submitHandler} icon={faFileInvoice} title={this.props.edit ? edit : add} list={index} link="/user/invoices" innerClassName="row" className="shadow-sm">
                            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

                            <Col lg={8}>
                                <Feedback message={message} />
                                <Row>
                                    <FormInput type="date" className="col-md-6" icon={faCalendar} onChange={this.inputChangeHandler} value={date} name="date" required placeholder={form.date} />
                                    <FormInput type="select" className="col-md-6" icon={faUserTie} onChange={this.inputChangeHandler} value={customer_id} name="customer_id" required placeholder={form.select_customer}>
                                        <option>{form.select_customer}</option>
                                        {customersOptions}
                                    </FormInput>
                                    <FormInput type="number" className="col-md-6" icon={faMoneyBill} onChange={this.inputChangeHandler} value={paid_amount} name="paid_amount" required placeholder={form.paid_amount} />
                                    <FormInput type="number" className="col-md-6" icon={faMoneyBill} onChange={this.inputChangeHandler} value={discount} name="discount" required placeholder={form.discount} />
                                    <FormInput type="number" className="col-md-6" icon={faMoneyBill} onChange={this.inputChangeHandler} value={tax} name="tax" required placeholder={form.tax} />
                                    <FormInput type="number" className="col-md-6" icon={faMoneyBill} onChange={this.inputChangeHandler} value={total_amount} name="total_amount" readonly placeholder={form.total_amount} />

                                    <Col xs={12} className="pb-2 text-large text-700 d-flex justify-content-between border-bottom">
                                        <div>{form.tasks}</div>
                                        <div>
                                            <Button type="button" color="green" onClick={this.plusBtnClickedHandler}>
                                                <FontAwesomeIcon icon={faPlus} className="mr-2" />Add
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col xs={12} className="pb-2 border-bottom">
                                        <Row className="border-bottom">
                                            <Col xs={6} className="d-flex py-2 border-right">Task</Col>
                                            <Col xs={2} className="py-2 border-right text-center">Price</Col>
                                            <Col xs={2} className="py-2 border-right text-center">Quantity</Col>
                                            <Col xs={2} className="py-2 text-center">Total</Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12} className="mb-4">
                                        {prices.map((price, index) => {
                                            const tasksOptions = tasks.filter(task => !tasks_.map(t => +t).includes(+task.id) || (tasks_.map(t => +t).includes(+task.id) && +task.id === +tasks_[index])).sort((a, b) => a.title > b.title).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.title}</option>);

                                            return <Row key={Math.random()} className="border-bottom">
                                                <Col xs={6} className="d-flex py-2 border-right">
                                                    <div className="pr-2">
                                                        <Button type="button" color="pink" onClick={() => this.minusBtnClickedHandler(index)}>
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </Button>
                                                    </div>

                                                    <div className="flex-fill">
                                                        <Input type="select" name="tasks[]" onChange={this.inputChangeHandler} value={tasks_[index]} tabIndex={index} className="tasks" required>
                                                            <option>{form.select_task}</option>
                                                            {tasksOptions}
                                                        </Input>
                                                    </div>
                                                </Col>
                                                <Col xs={2} className="py-2 border-right">
                                                    <Input type="number" name="prices[]" onChange={this.inputChangeHandler} value={price} tabIndex={index} required className="prices text-center" />
                                                </Col>
                                                <Col xs={2} className="py-2 border-right">
                                                    <Input type="number" name="quantities[]" onChange={this.inputChangeHandler} value={quantities[index]} tabIndex={index} required className="quantities text-center" />
                                                </Col>
                                                <Col xs={2} className="py-2 d-flex justify-content-center align-items-center">{price * quantities[index]}</Col>
                                            </Row>;
                                        })}
                                    </Col>

                                    <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />

                                    <div className="col-12">
                                        <FormButton color="green" icon={faSave}>{save}</FormButton>
                                    </div>
                                </Row>
                            </Col>

                            <Col lg={4}>
                                <div className="embed-responsive embed-responsive-1by1 bg-soft border d-flex justify-content-center align-items-center w-60 mx-auto" style={{ cursor: 'pointer' }} onClick={this.fileUpload}>
                                    {(this.props.edit ? (photo && (photo !== invoice.photo)) : photo) && <div className="text-center text-green">
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
                    <Breadcrumb items={this.props.edit && [{ to: '/user/invoices', content: index }]} main={this.props.edit ? edit : add} icon={faFileInvoice} />
                    <SpecialTitle user icon={faFileInvoice}>{title}</SpecialTitle>
                    <Subtitle user>{this.props.edit ? edit : add}</Subtitle>
                </div>
                <div className="p-4 pb-0">
                    {redirect}
                    {errors}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    show: id => dispatch(actions.getInvoice(id)),
    info: () => dispatch(actions.getInvoicesInfo()),
    post: data => dispatch(actions.postInvoices(data)),
    patch: (id, data) => dispatch(actions.patchInvoices(id, data)),
    reset: () => dispatch(actions.resetInvoices()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));