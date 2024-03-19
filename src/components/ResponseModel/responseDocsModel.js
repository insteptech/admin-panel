import React from 'react'
import { Accordion, Card, Button, Modal, CloseButton } from "react-bootstrap";
export default function responseDocsModel(props) {
    const handleClose = () => props.getDocument();
    return (
        <>
            <Modal show={props.getDocument} onHide={props.getDocument} centered  >
                <Modal.Header className='bg-primary text-white' >
                    <Modal.Title>Response images</Modal.Title>
                    <button type="button" className="btn-close bg-light" data-dismiss="modal" onClick={handleClose}>&times; </button>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', scrollBehavior: 'auto' }}>
                        {props && props.docs && props.docs.map((item, index) => {
                            return (
                                <>
                                    <div className="modal-body" style={{ minHeight: '150px', }}>
                                        <img style={{ width: "100%", height: "100%", }} src={`${item.url}`} alt="Document" />
                                    </div>
                                </>
                            )

                        })}
                    </div>

                </Modal.Body>



            </Modal>
        </>
    )
}
