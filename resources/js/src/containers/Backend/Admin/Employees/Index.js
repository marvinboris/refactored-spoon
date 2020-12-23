import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faUserTie } from '@fortawesome/free-solid-svg-icons';

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
import { updateObject, convertDate } from '../../../../shared/utility';

class Index extends Component {
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { employees: { title, add, index, form: { name, job, email, gender, diploma, birthdate, country, address, phone, marital, number_children, languages, driving_licenses, matricule, photo, employee_photo } } } } }
                }
            },
            backend: { employees: { loading, error, message, employees, total } },
        } = this.props;

        const errors = <>
            <Error err={error} />
        </>;
        const feedback = <Feedback message={message} />;

        if (!employees) employees = [];
        const data = employees.map(employee => {
            return updateObject(employee, {
                photo: employee.photo && <div className="d-flex">
                    <span>{see}</span>

                    <span className="ml-auto">
                        <View title={`${employee_photo}: ${employee.matricule}`} content={<img src={employee.photo} className="w-100" />}>
                            <FontAwesomeIcon icon={faEye} className="text-green mr-2" fixedWidth />
                        </View>
                    </span>
                </div>,
                action: <div className="text-center">
                    <Link to={`/admin/employees/${employee.id}`} className="mr-2">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    <Link to={`/admin/employees/${employee.id}/edit`} className="mx-1">
                        <FontAwesomeIcon icon={faEdit} className="text-brokenblue" fixedWidth />
                    </Link>
                    <span className="mx-1"><Delete deleteAction={() => this.props.delete(employee.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>
                </div>,
            });
        });

        const content = (
            <>
                <Row>
                    <List array={data} loading={loading} data={JSON.stringify(employees)} get={this.props.get} total={total} bordered add={add} link="/admin/employees/add" icon={faUserTie} title={index} className="shadow-sm"
                        fields={[
                            { name, key: 'name' },
                            { name: matricule, key: 'matricule' },
                            { name: email, key: 'email' },
                            { name: phone, key: 'phone' },
                            { name: gender, key: 'gender' },
                            { name: job, key: 'job' },
                            { name: birthdate, key: 'birthdate' },
                            { name: country, key: 'country' },
                            { name: diploma, key: 'diploma' },
                            { name: address, key: 'address' },
                            { name: marital, key: 'marital' },
                            { name: number_children, key: 'number_children' },
                            { name: languages, key: 'languages' },
                            { name: driving_licenses, key: 'driving_licenses' },
                            { name: photo, key: 'photo' },
                            { name: action, key: 'action', fixed: true }
                        ]} />
                </Row>
            </>
        );

        return (
            <>
                <div className="bg-soft py-4 pl-5 pr-4 position-relative">
                    <Breadcrumb main={index} icon={faUserTie} />
                    <SpecialTitle user icon={faUserTie}>{title}</SpecialTitle>
                    <Subtitle user>{index}</Subtitle>
                </div>
                <div className="p-4 pb-0">
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
    get: (page, show, search) => dispatch(actions.getEmployees(page, show, search)),
    delete: id => dispatch(actions.deleteEmployees(id)),
    reset: () => dispatch(actions.resetEmployees()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));