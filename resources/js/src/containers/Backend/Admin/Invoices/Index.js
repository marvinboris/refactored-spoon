import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faFileInvoice, faPrint } from '@fortawesome/free-solid-svg-icons';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import List from '../../../../components/Backend/UI/List/List';
import Error from '../../../../components/Error/Error';
import Feedback from '../../../../components/Feedback/Feedback';
import Delete from '../../../../components/Backend/UI/Delete/Delete';
import View from '../../../../components/Backend/UI/View/View';


import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';

class Index extends Component {
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    exportData = async (url, name) => {
        const token = localStorage.getItem('token');

        try {
            const formData = new FormData();

            formData.append('name', name);

            const res = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: token
                }
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
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { invoices: { title, add, index, form: { no, date, customer, paid_amount, discount, tax, total_amount, photo, print, invoice_photo } } } } }
                }
            },
            backend: { invoices: { loading, error, message, invoices, total } },
        } = this.props;

        const errors = <>
            <Error err={error} />
        </>;
        const feedback = <Feedback message={message} />;

        if (!invoices) invoices = [];
        const data = invoices.map(invoice => {
            return updateObject(invoice, {
                photo: invoice.photo && <div className="d-flex">
                    <span>{see}</span>

                    <span className="ml-auto">
                        <View title={`${invoice_photo}: ${invoice.name}`} content={<img src={invoice.photo} className="w-100" />}>
                            <FontAwesomeIcon icon={faEye} className="text-green mr-2" fixedWidth />
                        </View>
                    </span>
                </div>,
                print: <Button color="primary" size="sm" className="rounded-2" onClick={() => this.exportData(`/api/user/invoices/${invoice.id}/print`, `${invoice.no} - ${Date.now()}.pdf`)}>
                    Print
                    <FontAwesomeIcon icon={faPrint} fixedWidth className="ml-1" />
                </Button>,
                action: <div className="text-center">
                    <Link to={`/admin/invoices/${invoice.id}`} className="mr-2">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    <Link to={`/admin/invoices/${invoice.id}/edit`} className="mx-1">
                        <FontAwesomeIcon icon={faEdit} className="text-brokenblue" fixedWidth />
                    </Link>
                    <span className="mx-1"><Delete deleteAction={() => this.props.delete(invoice.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>
                </div>,
            });
        });

        const content = (
            <>
                <Row>
                    <List array={data} loading={loading} data={JSON.stringify(invoices)} get={this.props.get} total={total} bordered add={add} link="/admin/invoices/add" icon={faFileInvoice} title={index} className="shadow-sm"
                        fields={[
                            { name: no, key: 'no' },
                            { name: date, key: 'date' },
                            { name: customer, key: 'customer' },
                            { name: paid_amount, key: 'paid_amount' },
                            { name: discount, key: 'discount' },
                            { name: tax, key: 'tax' },
                            { name: total_amount, key: 'total_amount' },
                            { name: print, key: 'print' },
                            { name: photo, key: 'photo' },
                            { name: action, key: 'action', fixed: true }
                        ]} />
                </Row>
            </>
        );

        return (
            <>
                <div className="bg-soft py-4 pl-5 pr-4 position-relative">
                    <Breadcrumb main={index} icon={faFileInvoice} />
                    <SpecialTitle user icon={faFileInvoice}>{title}</SpecialTitle>
                    <Subtitle user>{index}</Subtitle>
                </div>
                <div className="p-4 pb-0">
                    {redirect}
                    {errors}
                    {feedback}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: (page, show, search) => dispatch(actions.getInvoices(page, show, search)),
    delete: id => dispatch(actions.deleteInvoices(id)),
    reset: () => dispatch(actions.resetInvoices()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));