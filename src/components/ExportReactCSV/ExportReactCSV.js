import React from 'react'
import { CSVLink } from 'react-csv'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { exportData } from '../../Redux/action/user/userAction';

export const ExportReactCSV = (props) => {
    // console.log("pppppppppppppp", props)

    const [data, setData] = React.useState([]);
    const dispatch = useDispatch();
    React.useEffect(async () => {
        var data = {
            pageNumber: props?.pageNumber ? props?.pageNumber : 1,
        }
        const data2 = await dispatch(exportData(data))
        setData(data2);
    }, [])


    const arr = [];
    data.forEach(element => {

        const data = {
            Id: element?._id,
            Name: element?.personalprofile?.fullName,
            Gender: element?.personalprofile?.gender,
            BloodGroup: element?.personalprofile?.bloodGroup,
            Email: element?.personalprofile?.email,
            Mobile: element?.Mobile,
            Age: element?.personalprofile?.age,
            Address: element?.address?.presentAddress,
            Active: element?.Active,
            Verified: element?.Verified,
            createdAt: moment(element?.createdAt).format('YY-DD-MM-hh:mm:ss:a'),
            workDivision: element?.workDivision?.name,
            EmergencyContactCount: element?.EmergencyContact.length,
            ContactName: element?.EmergencyContact[0]?.fullName ? element?.EmergencyContact[0]?.fullName : null,
            Relation: element?.EmergencyContact[0]?.relation ? element?.EmergencyContact[0]?.relation : null,
            ContactNumber: element?.EmergencyContact[0]?.phone ? element?.EmergencyContact[0]?.phone : null,

            ContactName2: element?.EmergencyContact[1]?.fullName ? element?.EmergencyContact[1]?.fullName : null,
            Relation2: element?.EmergencyContact[1]?.relation ? element?.EmergencyContact[1]?.relation : null,
            ContactNumber2: element?.EmergencyContact[1]?.phone ? element?.EmergencyContact[1]?.phone : null,

            ContactName3: element?.EmergencyContact[2]?.fullName ? element?.EmergencyContact[2]?.fullName : null,
            Relation3: element?.EmergencyContact[2]?.relation ? element?.EmergencyContact[2]?.relation : null,
            ContactNumber3: element?.EmergencyContact[2]?.phone ? element?.EmergencyContact[2]?.phone : null,

            ContactName4: element?.EmergencyContact[3]?.fullName ? element?.EmergencyContact[3]?.fullName : null,
            Relation4: element?.EmergencyContact[3]?.relation ? element?.EmergencyContact[3]?.relation : null,
            ContactNumber4: element?.EmergencyContact[3]?.phone ? element?.EmergencyContact[3]?.phone : null
        }
        arr.push(data)

    });
    // console.log("datdatadatdatadta", emergencyArr)


    return (
        <Button >
            <CSVLink style={{ color: 'white' }} data={arr} filename={props.fileName}>Export To Excel</CSVLink>
        </Button>
    )
}