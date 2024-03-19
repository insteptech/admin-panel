import React from 'react'
import LeftMenu from '../../components/LeftMenu/leftmenu';
import Header from '../../components/LeftMenu/header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { leadsDetail } from '../../Redux/action/razorPay/leads&Subscription';
import loaderImg from '../../loading.gif'
import moment from 'moment';
// import UserNotify from '../../components/commanTables/UserNotiofDashboard';

const Subscription = () => {
    const [isActive, setActive] = useState(false);
    const [loader, setLoader] = useState(false);
    const [leadsData, setLeadsData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // const [selectItem, setSelectItem] = React.useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        getLeadsDetail();
    }, [])
    const getLeadsDetail = async () => {
        setLoader(true)
        await dispatch(leadsDetail()).then((result) => {
            setLeadsData(result);
            setLoader(false)
        }).catch((err) => {
            setLoader(false)
            console.log("eeeeeee", err)
        })
    }
    // const selectCheckbox = (e, item, id) => {
    //     if (e.target.checked) {
    //         setSelectItem(prev => [...prev, item?._id])
    //     }
    //     else {
    //         setSelectItem(prev => prev.filter(item => id !== item))
    //     }

    // }
    const toggleClass = () => {
        setActive(!isActive);
    };
    const selectStartDate = (e) => {
        var startDate = document.getElementById("startDate").value;
        setStartDate(startDate);
        console.log((new Date(startDate)).getTime() / 1000.0, ">>")
    }
    const selectEndDate = () => {
        var startDate = document.getElementById("startDate").value;
        var endDate = document.getElementById("endDate").value;
        setStartDate(startDate);
        setEndDate(endDate)
        console.log((new Date(endDate)).getTime() / 1000.0, "<<")
    }

    return (
        <>
            <LeftMenu isActive={isActive} />
            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain">
                    <p className="m-0">Leads</p>
                </div>


                <div className="mr-4 mb-4 mt-4" style={{ display: 'flex', justifyContent: 'flex-end', margin: "4px" }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", fontWeight: "bold", }} >
                        From: <input type="date" id="startDate" className='form-control' onChange={(e) => { selectStartDate(e) }}></input>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", fontWeight: "bold", }}   >

                        To: <input type="date" id="endDate" className='form-control' onChange={(e) => { selectEndDate(e) }} ></input>
                        <button className='form-control btn-primary '  >EXPORT</button>
                    </div>
                </div>
                {
                    loader ?
                        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} >
                            <tr>< img src={`${loaderImg}`} alt="Document" /></tr>
                        </div>
                        :
                        <table className="table table-striped table-bordered table-sm table-responsive">
                            <thead class="text-center">
                                <tr>
                                    <th scope="col">S.No</th>
                                    {/* <th scope="col">All</th> */}
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">UTM</th>
                                    <th scope="col">Plan Clicked</th>
                                    <th scope="col">uniqueId</th>
                                </tr>
                            </thead>

                            <tbody className='leadss'>
                                {
                                    leadsData?.length > 0 ? leadsData?.map((item, index) => {
                                        const keys = []
                                        // console.log(keys[index], "dummyDatadummyData", index)
                                        // console.log(keys, "dummyDatadummyData", Object.entries(leadsData))
                                        // console.log(keys, "dummyDatadummyData", values)
                                        for (const [key, value] of Object.entries(item?.UTM)) {
                                            keys.push(`::${key}\n = ${value}::`)
                                            // console.log(`${key}: ${value}`);
                                        }
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                {/* <td ><input type="checkbox" checked={selectItem.includes(item._id)} onClick={(e) => selectCheckbox(e, item, item?._id)} aria-label="Checkbox for following text input" /></td> */}
                                                <td>{item?.name}</td>
                                                <td>{item?.mobile}</td>
                                                <td>{item?.email}</td>
                                                <td>{keys}</td>
                                                <td>{item?.planClicked}</td>
                                                <td>{item?.uniqueId}</td>
                                            </tr>
                                        )
                                    })
                                        :
                                        <div>
                                            No Data!!!
                                        </div>
                                }
                            </tbody>
                        </table>
                }
            </div>
        </>
    )
}

export default Subscription;