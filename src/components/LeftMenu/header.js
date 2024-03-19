import React from 'react';
import {GiHamburgerMenu} from "react-icons/gi";
// GrRefresh
const Header = (props) => {
  
return(
    <>

<nav className="navbar navbar-static-top myNavBar">
<div className="toggle-area">
                <button className="btn btn-primary toggle-button" onClick={props.toggleClass}>
                    <GiHamburgerMenu/>
                </button>

            </div>
    </nav>

</>
)

}

export default Header;


// const getLatLng = (e) => {
    //     e.preventDefault();
    //     if (!address && mobile) {
           
    //         if (!Radius) {
    //             alert('please enter Radius')

    //         } else {
    //             let bloodGroup = BloodGroup === undefined ? "" : BloodGroup
    //             let varified = Verified === undefined ? "" : Verified
    //             let status = Status === undefined ? "" : Status
    //             let Gender = gender === undefined ? "" : gender

    //             var SearchByMobile = {
    //                 "mobile": mobile,
    //                 "Radius": Radius,
    //                 "bloodGroup": bloodGroup,
    //                 "varified": varified,
    //                 "status": status,
    //                 "Gender": Gender
    //             };
    //             dispatch(getAllUserAction(SearchByMobile))
    //         }

    //     }
    //     else if (address && !mobile) {
    //         if (!Radius) {
    //             alert('please enter Radius')
    //         } else {
    //             Geocode.setApiKey("AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU");
    //             Geocode.fromAddress(address).then(
    //                 (response) => {
    //                     const { lat, lng } = response.results[0].geometry.location;
    //                     setLng(lng)
    //                     setLat(lat)
    //                     let bloodGroup = BloodGroup === undefined ? "" : BloodGroup
    //                     let varified = Verified === undefined ? "" : Verified
    //                     let status = Status === undefined ? "" : Status
    //                     let Gender = gender === undefined ? "" : gender
                      
    //                     const SearchByAddress = {
    //                         lat, lng, Radius, bloodGroup, varified, status, Gender
    //                     }
                      
    //                     dispatch(getAllUserAction(SearchByAddress))
    //                 },
    //                 (error) => {
    //                     console.error(error);
    //                 }
    //             );
    //         }

    //     } else {
    //         alert("please search by mobile number or address")
    //     }

    // }