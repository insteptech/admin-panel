import React from 'react'
import request from "request"
const UserActivity = (props) => {
    console.log("UserActivity_props", props)

    const [RequesterLocation, setRequesterLocation] = React.useState()
    const [showRequesterAddress, setshowRequesterAddress] = React.useState();
    const [getRequesterAddress, setGetRequesterAddress] = React.useState()
    const [showHelperAddress, setShowHelperAddress] = React.useState()
    const [getHelperAddress, setHelperAddress] = React.useState()
    const helprequest = props.helprequest ? props.helprequest.reverse() : []
    const location = props.Location1 ? props.Location1 : []


    function compare(a, b) {
        if (a.createdAt < b.createdAt) {
            return -1;
        }
        if (a.createdAt > b.createdAt) {
            return 1;
        }
        return 0;
    }

    const data = helprequest.sort(compare);
    data.reverse()

    const doRequest = (options) => {
        try {
            return new Promise(function (resolve, reject) {
                request(options, function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(body);
                    } else {
                        reject(error);
                    }
                });
            });
        } catch (err) {
            console.log("error in doRequest: ", err)
            throw err;
        }
    }

    const getRequestAddressFun = async (index, item) => {
        // console.log(item.requesterLocation.lat, item.requesterLocation.long);
        if (item && item.requesterLocation && item.requesterLocation.lat) {
            let lat = item && item.requesterLocation && item.requesterLocation.lat;
            let long = item && item.requesterLocation && item.requesterLocation.long;
            var options = {
                'method': 'GET',
                'url': `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU`,
                'headers': {
                }
            };
            let res = await doRequest(options);
            var addressResult = JSON.parse(res);
            if (addressResult && addressResult.results[0] && addressResult.results[0].formatted_address) {
                setGetRequesterAddress(addressResult.results[0].formatted_address)
            }
        }
        setshowRequesterAddress(index);

    }
    const getHelperAddressFun = async (index, item) => {
        // console.log(item.helperLocation.lat, item.helperLocation.long);
        if (item && item.helperLocation && item.helperLocation.lat) {
            let lat = item && item.helperLocation && item.helperLocation.lat;
            let long = item && item.helperLocation && item.helperLocation.long;
            var options = {
                'method': 'GET',
                'url': `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU`,
                'headers': {
                }
            };
            let res = await doRequest(options);
            var addressResult = JSON.parse(res);
            if (addressResult && addressResult.results[0] && addressResult.results[0].formatted_address) {
                setHelperAddress(addressResult.results[0].formatted_address)
            }
        }
        setShowHelperAddress(index);

    }

    return (
        <>
            <h6 className="text-green font-weight-bold text-center">Activity</h6>
            <div className="table-responsive portlet">
                <table className="table table-bordered table-striped">
                    <thead className="col">
                        <tr className="col">
                            <th scope="col">Type Of Help </th>
                            <th scope="col">Requested Date</th>
                            <th scope="col">Location</th>
                            <th scope="col">Receiver/Provider Location</th>
                            <th scope="col">Realtime Distance</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            helprequest && helprequest.length > 0 && helprequest.map((item, index) => {
                                // console.log(item, "vvvvvvvvv");

                                const date = new Date(item.createdAt);
                                var date1 = date.toLocaleDateString() + ' ' + date.toTimeString().substring
                                    (0, date.toTimeString().indexOf("GMT"));
                                return (
                                    <tr className="table-row">
                                        <td>{item.requestType}</td>
                                        <td>{date1}</td>

                                        <td onClick={() => getRequestAddressFun(index, item)}>
                                            {showRequesterAddress === index ? getRequesterAddress :
                                                <button className="btn btn-primary" style={{ width: "80%", height: "30px", fontSize: "8px" }}>get requester address</button>}
                                        </td>
                                        {
                                            item.status === "accepted" ? <td onClick={(e) => getHelperAddressFun(index, item)}>
                                                {showHelperAddress === index ? getHelperAddress :
                                                    <button className="btn btn-primary" style={{ width: "80%", height: "30px", fontSize: "8px" }}>get helper address</button>}</td>
                                                : <p className="text-center">_ _ _</p>
                                        }

                                        <td >{item.distance ? item.distance : null}</td>
                                        <td >{item.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default UserActivity
