import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faCheckCircle, faEdit, faFill, faFireAlt, faLink } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

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
        description: '',
        popular: 0,
        details: '',
        color: '',
        link: '',
        logo: null,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.products.product && prevState.name === '') {
            const { backend: { products: { product } } } = nextProps;
            return updateObject(prevState, { ...product });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.show(this.props.match.params.productId);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = async e => {
        e.preventDefault();
        if (this.props.edit) await this.props.patch(this.props.match.params.productId, e.target);
        else await this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    fileUpload = () => document.getElementById('logo').click()

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { form: { save, selected_file } }, backend: { pages: { products: { title, add, edit, index, form } } } }
                }
            },
            backend: { products: { loading, error, message, product } },
            auth: { data: { role: { features } } }
        } = this.props;
        let { name, description, color, details, logo, link, popular } = this.state;
        let content = null;
        let errors = null;

        const feature = features.find(f => f.prefix === 'products');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

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
                        <Form onSubmit={this.submitHandler} icon={faProductHunt} title={this.props.edit ? edit : add} list={index} link="/user/products" innerClassName="row" className="shadow-sm">
                            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

                            <Col lg={8}>
                                <Feedback message={message} />
                                <Row>
                                    <FormInput type="text" className="col-md-6" icon={faProductHunt} onChange={this.inputChangeHandler} value={name} name="name" required placeholder={form.name} />
                                    <FormInput type="text" className="col-md-6" icon={faEdit} onChange={this.inputChangeHandler} value={description} name="description" required placeholder={form.description} />
                                    <FormInput type="text" className="col-md-6" icon={faEdit} onChange={this.inputChangeHandler} value={details} name="details" required placeholder={form.details} />
                                    <FormInput type="text" className="col-md-6" icon={faLink} onChange={this.inputChangeHandler} value={link} name="link" required placeholder={form.link} />
                                    <FormInput type="text" className="col-md-6" icon={faFill} onChange={this.inputChangeHandler} value={color} name="color" required placeholder={form.color} />
                                    <FormInput type="text" className="col-md-6" icon={faFireAlt} onChange={this.inputChangeHandler} value={popular} name="popular" required placeholder={form.popular} />

                                    <div className="col-12">
                                        <FormButton color="green" icon={faSave}>{save}</FormButton>
                                    </div>
                                </Row>
                            </Col>

                            <Col lg={4}>
                                <div className="embed-responsive embed-responsive-1by1 bg-soft border border-light d-flex justify-content-center align-items-center w-60 mx-auto" style={{ cursor: 'pointer' }} onClick={this.fileUpload}>
                                    {(this.props.edit ? (logo && (logo !== product.logo)) : logo) && <div className="text-center text-green">
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
                    <Breadcrumb items={this.props.edit && [{ to: '/user/products', content: index }]} main={this.props.edit ? edit : add} icon={faProductHunt} />
                    <SpecialTitle user icon={faProductHunt}>{title}</SpecialTitle>
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
    show: id => dispatch(actions.getProduct(id)),
    post: data => dispatch(actions.postProducts(data)),
    patch: (id, data) => dispatch(actions.patchProducts(id, data)),
    reset: () => dispatch(actions.resetProducts()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));