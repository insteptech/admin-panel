import React from 'react'
import "./modal.css";
import { useDispatch, useSelector } from 'react-redux'
import { addUserFromAdminAction } from '../../Redux/action';
const Modal = () => {
    const [name, setName] = React.useState()
    const [email, setEmail] = React.useState()
    const [mobile, setMobile] = React.useState()
    const [address, setAddress] = React.useState()
    const [wordDivision, setWordDivision] = React.useState()
    const services = useSelector(state => state.services)

    const dispatch = useDispatch()
    const addUser = (e) => {
        // e.preventDefault()
        const data = {
            name, email, mobile, address, wordDivision
        }
        dispatch(addUserFromAdminAction(data))
    }
    return (

        <>
            <button type="button" className="btn btn-info category-button" data-toggle="modal" data-target="#exampleModalCenter">
                Add User
            </button>

            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered customModal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLongTitle">Add User</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            className="form-control"
                                            placeholder="Name"
                                            onChange={(e) => setName(e.target.value)}
                                        /> </div>
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            value={email}
                                            className="form-control"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Mobile</label>
                                        <input
                                            type="text"
                                            value={mobile}
                                            className="form-control"
                                            placeholder="Mobile"
                                            onChange={(e) => setMobile(e.target.value)}
                                        // onChange={}
                                        /></div>
                                    <div className="form-group col-6">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            value={address}
                                            className="form-control"
                                            placeholder="Address"
                                            onChange={(e) => setAddress(e.target.value)}
                                        // onChange={}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label> wordDivision</label>
                                        <select
                                            className="form-control"
                                            value={wordDivision}
                                            onChange={(e) => setWordDivision(e.target.value)}

                                        >
                                            <option>select wordDivision</option>
                                            {services.services.map(option =>
                                                <option key={option._id} value={option._id}>{option.name}</option>
                                            )}

                                        </select>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={(e) => addUser(e)}>submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Modal
{/* <div className="form-group col-md-6">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        value=""
                                        className="form-control"
                                        placeholder="Address"
                                       
                                    /> </div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">

                                    <label>Type</label>
                                    <input
                                        type="text"
                                        value=""
                                        className="form-control"
                                        placeholder="Type"
                                        // onChange={()=>()}
                                    /></div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">

                                    <label>Country</label>
                                    <input
                                        type="text"
                                        value=""
                                        className="form-control"
                                        placeholder="Country"
                                       
                                    />
                                    </div>
                                    <div className="form-group col-md-6">

                                      <label>State</label>
                                    <input
                                        type="text"
                                        value=""
                                        className="form-control"
                                        placeholder="State"
                                        // onChange={}
                                    />  </div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">

                                    <label>city</label>
                                    <input
                                        type="text"
                                        value=""
                                        className="form-control"
                                        placeholder="city"
                                        // onChange={()=>()}
                                    /></div>
                                    <div className="form-group col-md-6">

                                    <label>Zip Code	</label>
                                    <input
                                        type="text"
                                        value=""
                                        className="form-control"
                                        placeholder="Zip Code	"
                                       
                                    />
                                    </div> */}