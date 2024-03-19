
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExcalUplod from '../../containers/DataUploadFromExcel/index';
import Geocode from "react-geocode";
import Modal from '../modal';
import './SearchBar.css';


const SearchBarForService = (props) => {
    const [allValues, setAllValues] = useState({
        mobile: '',
        verified: '',
        radius: '',
        status: '',
        address: '',
        city: '',
        state: '',
        type: '',
    });
    const changeHandler = (e) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        if (allValues.address) {
            Geocode.setApiKey("AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU");
            await Geocode.fromAddress(allValues.address)
                .then((response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    var data = {
                        mobile: allValues.mobile,
                        radius: allValues.radius,
                        verified: allValues.verified,
                        status: allValues.status,
                        city: allValues.city,
                        state: allValues.state,
                        type: allValues.type,
                        address: { lat: lat, long: lng }
                    };
                    props.handleSearch(data);
                },
                    (error) => {
                        console.error('error:::', error);
                    }
                );
        }
        else {
            let data = {
                mobile: allValues.mobile,
                radius: allValues.radius,
                verified: allValues.verified,
                status: allValues.status,
                city: allValues.city,
                state: allValues.state,
                type: allValues.type,
            };
            props.handleSearch(data);
        }
    };
    return (
        <div className=" my-4">
            <form className="form" >
                <div className="form-row w-100">
                    <div className=" col-md-12">
                        <div className="form-row">
                            <div className=" col-md-3">
                                <div className="form-group">
                                    <input className="form-control"
                                        type="search"
                                        placeholder="phone"
                                        aria-label="Search"
                                        value={allValues.mobile}
                                        name='mobile'
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="form-control"
                                        type="search"
                                        value={allValues.address}
                                        placeholder="address"
                                        aria-label="Search"
                                        name='address'
                                        onChange={changeHandler}
                                    />
                                </div>

                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <input className="form-control"
                                        type="search"
                                        value={allValues.state}
                                        placeholder="state"
                                        aria-label="Search"
                                        name='state'
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="form-control"
                                        type="search"
                                        placeholder="Type"
                                        aria-label="Search"
                                        value={allValues.type}
                                        name='type'
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className=" col-md-3">
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        value={allValues.verified}
                                        name='verified'
                                        onChange={changeHandler}
                                    >
                                        <option>Verified</option>
                                        <option value={true}>accept</option>
                                        <option value={false}>Rejected</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input className="form-control"
                                        // disabled={allValues.verified ? false : true}
                                        type="search"
                                        placeholder="Radius"
                                        aria-label="Search"
                                        value={allValues.radius}
                                        name='radius'
                                        onChange={changeHandler}
                                    />
                                </div>

                            </div>
                            <div className="col-6 col-md-3">
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        value={allValues.status}
                                        name='status'
                                        onChange={changeHandler}
                                    >
                                        <option>Status</option>
                                        <option value={true}>Enabled</option>
                                        <option value={false}>desabled</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input className="form-control"
                                        type="search"
                                        value={allValues.city}
                                        placeholder="city"
                                        aria-label="Search"
                                        name='city'
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="  col-lg-8 offset-lg-2 col-sm-12 mt-4">
                        <div className="row">
                            <div className=" col-md-3">
                                <div className="form-group">
                                    <button className="btn btn-success btnSearch"
                                        type='submit'
                                        onClick={(e) => handleSearch(e)}
                                    > Search
                                    </button>
                                </div>

                            </div>
                            <div className=" col-md-3">
                                <div className="form-group">
                                    <Modal />
                                </div>
                            </div>
                            <div className=" col-md-3">
                                <div className="form-group">
                                    <button className="btn btn-info btnNotification"
                                    >Send Notification</button>
                                </div>
                            </div>
                            <div className=" col-md-3">
                                <ExcalUplod xlsxUploadResponse={(workDivisionId) => props.xlsxUploadResponse(workDivisionId)} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBarForService