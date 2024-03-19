import React from 'react'
import './style.css'
import Table from './Tables';
import { useDispatch, useSelector } from 'react-redux';
import { serviceAction, getAllServiceDataAction, deleteXlsxDataById } from '../../Redux/action/Service/serviceAction';
import SearchBarForService from '../../components/SearchBar/SearchBarForService';
import LeftMenu from '../../components/LeftMenu/leftmenu';
import Header from '../../components/LeftMenu/header';

import PaginationFun from '../../components/pagination';
import { GrRefresh } from "react-icons/gr";



const SuperAdminConfiguration = () => {


    const [selectedTab, setSelectedTab] = React.useState("");
    const [pageNumber1, setPageNumber] = React.useState();

    const dispatch = useDispatch();
    const services = useSelector(state => state.services);
    const AllServicedata = useSelector(state => state.services.AllServiceDataByServiceId);
    const metadata = AllServicedata && AllServicedata[0] && AllServicedata[0].metadata && AllServicedata[0].metadata.total ? AllServicedata[0].metadata.total : null
    const serviceData = AllServicedata && AllServicedata[0] && AllServicedata[0].data ? AllServicedata[0].data : []

    React.useEffect(() => {
        getallServices();
    }, []);

    const getallServices = async () => {
        dispatch(serviceAction())
            .then((d) => {

                if (d.data.data && d.data.data.services && d.data.data.services[0] && d.data.data.services[0]._id) {

                    let id = d.data.data.services[0]._id;
                    getServicedataByID(id);
                    setSelectedTab(id);
                }
            })
            .catch((err) => { })

    };



    const handleServiceClick = (servicId) => {
        setSelectedTab(servicId);
        getServicedataByID(servicId);
    };

    const getServicedataByID = (serviceId) => {
        // setPageNumber(1);

        var data = {
            workDivisionId: serviceId,
            pageNumber: 1
        };
        dispatch(getAllServiceDataAction(data));
    };

    const handleSearch = (data) => {

        data["workDivisionId"] = selectedTab;
        data['pageNumber'] = 1;
        dispatch(getAllServiceDataAction(data));
    };

    const hendleResponse = (id) => {

        getServicedataByID(selectedTab);
    };

    const pageChangeFun = (pageNumber) => {
        const lenght1 = serviceData.length < 20 ? 20 : 20
        setPageNumber(pageNumber * lenght1 - 20);
        var data = {
            workDivisionId: selectedTab,
            pageNumber: pageNumber,
        };
        dispatch(getAllServiceDataAction(data))

    };

    const handleDeleteExelUser = (id) => {
        dispatch(deleteXlsxDataById(id))
            .then((res) => {
                getServicedataByID(selectedTab);
                if (res.data.errors && res.data.errors.length > 0) {
                    alert(res.data.errors[0].message);
                }
                else if (res.data && res.data.data && res.data.data.xslsDataDeleteById && res.data.data.xslsDataDeleteById.message) {
                    alert(res.data.data.xslsDataDeleteById.message);

                };
            })
            .catch((err) => { })
    };
    const [isActive, setActive] = React.useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };


    return (
        <React.Fragment>
            <LeftMenu isActive={isActive} />
            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain">Super Admin Configuration</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 p-0">
                            <div className="card mb-4">
                                <div className="card-header py-2">
                                    {/* < SearchBarForService /> : */}
                                    < SearchBarForService handleSearch={handleSearch}
                                        xlsxUploadResponse={(workDivisionId) => hendleResponse(workDivisionId)} />

                                </div>
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between customTabs ">
                                        {services.services.map((item, index) => {
                                            return (
                                                <>
                                                    <button key={index}
                                                        className="hello"
                                                        style={selectedTab === item._id ? { backgroundColor: '#E0A800' } : {}}
                                                        onClick={() => handleServiceClick(item._id)} >
                                                        {item.name}
                                                    </button>
                                                </>
                                            )
                                        })}
                                    </div>
                                    <Table pageNumber1={pageNumber1} TableDetail={AllServicedata} handleDeleteExelUser={handleDeleteExelUser} />
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <p className="m-0" style={{ fontSize: "14px" }}> Total item {metadata}</p>
                                        <p className="m-0" style={{ fontSize: "14px" }}> Total Page  {metadata / 20}</p>
                                        <PaginationFun totalPage={metadata} pageChangeFun={pageChangeFun} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}

export default SuperAdminConfiguration