
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteXlsxDataById } from '../../Redux/action/Service/serviceAction';

export default function Table(props) {

    const [selectItem, setSelectItem] = React.useState([]);
    const selectAll = (event) => {
        const selectedId = []
        const allData = props.TableDetail && props.TableDetail[0] && props.TableDetail[0].data

        for (let TableDetailItem of allData) {
            if (event.target.checked) {
                selectedId.push(TableDetailItem._id)

            }
        }
        setSelectItem(selectedId)
    };

    const selectCheckbox = (e, id) => {

        if (e.target.checked) {
            setSelectItem(prev => [...prev, id])
        }
        else {
            setSelectItem(prev => prev.filter(TableDetailItem => id !== TableDetailItem))
        }

    }

    const handleDelete = (id) => {
        props.handleDeleteExelUser(id);

    }

    return (
        <>
            <div className="col-xl-12 col-lg-12 p-0">
                <div className="card mb-4">
                    <div className="card-body p-0">
                        <div className="table-responsive portlet">
                            <table className="table table-bordered table-striped ">
                                <thead className="thead ">
                                    <tr className="col">
                                        <th>S No.</th>
                                        <th width="100px" scope="col" ><input type="checkbox"
                                            aria-label="Checkbox for following text input" onClick={(e) => selectAll(e)} />select All</th>
                                        <th>Name</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Contact Person</th>
                                        <th>Contact Person Phone</th>
                                        <th>Address</th>
                                        <th>Verified</th>
                                        <th>Type</th>
                                        <th>Country</th>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>Zip Code</th>
                                        <th>Status</th>
                                        <th>Contact Person's Location</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {props.TableDetail && props.TableDetail[0] && props.TableDetail[0].data.map((TableDetailItem, index) => {
                                        return (
                                            <tr className="table-row">
                                                <td>{props.pageNumber1 === undefined ? index + 1 : props.pageNumber1 + index + 1}</td>
                                                <td >
                                                    <input type="checkbox"
                                                        checked={selectItem.includes(TableDetailItem._id)}
                                                        onClick={(e) => selectCheckbox(e, TableDetailItem._id)}
                                                        aria-label="Checkbox for following text input" />
                                                </td>
                                                <td>{TableDetailItem.name}</td>
                                                <td onClick={() => navigator.clipboard.writeText(TableDetailItem.phone)}>{TableDetailItem.phone}</td>
                                                <td>{TableDetailItem.email}</td>
                                                <td>{TableDetailItem.contactPerson}</td>
                                                <td>{TableDetailItem.addedByAdmin}</td>
                                                <td>{TableDetailItem.address}</td>
                                                <td>{TableDetailItem.verified}</td>
                                                <td>{TableDetailItem.type}</td>
                                                <td>{TableDetailItem.country}</td>
                                                <td>{TableDetailItem.state}</td>
                                                <td>{TableDetailItem.city}</td>
                                                <td>{TableDetailItem.zipCode}</td>
                                                <td>{TableDetailItem.addedByAdmin}</td>
                                                <td>{TableDetailItem.contactPersonLocation}</td>
                                                {/* <td>{TableDetailItem.action}</td> */}
                                                <td>
                                                    <AiOutlineDelete onClick={() => handleDelete(TableDetailItem._id)} />
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}


