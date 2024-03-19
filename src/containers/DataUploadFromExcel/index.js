

import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'bootstrap';
import axiosInstance from "../../../src/Redux/config";
import { Spinner } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

function FileUpload(props) {

    const [allValues, setAllValues] = useState({
        loader: false,
    });

    const axiosUploadFile = (fromData) => {
        // return axios.post("http://54.241.206.57/graphql", fromData); //Live api
        return axiosInstance.post('', fromData);
    }

    const uploadImage = (formData) => {
        try {
            return axiosUploadFile(formData);
        } catch (error) {
            console.log(error, 'upload image errror');
        }
    }

    const handleUpload = (e) => {
        e.preventDefault()
        handleFileInput(e.target.files[0]);
        setAllValues({ ...allValues, 'loader': true });

    };

    const handleFileInput = (file) => {
        let operations = {
            query: `
              mutation($file: Upload!) {
                uploadFile(file: $file) {
                    message
                    workDivision
                }
              }
            `,
            variables: {
                file: null,
            },
        };
        let _map = {
            file: ['variables.file'],
        };
        var fromData = new FormData();
        fromData.append('operations', JSON.stringify(operations));
        fromData.append('map', JSON.stringify(_map));
        fromData.append('file', file);
        uploadImage(fromData).then((res) => {
            setAllValues({ ...allValues, 'loader': false });
            if (res.data.errors && res.data.errors.length > 0) {
                alert(res.data.errors[0].message);
            }
            else if (res.data && res.data.data && res.data.data.uploadFile && res.data.data.uploadFile.message) {
                alert(res.data.data.uploadFile.message);
                props.xlsxUploadResponse(res.data.data.uploadFile.workDivision);

            };

        }).catch((err) => {
            setAllValues({ ...allValues, 'loader': false });
            console.log('Err:::::', err)
        })
    }

    const hiddenFileInput = React.useRef(null);

    // const handleClick = event => {
    //     event.preventDefault()
    //     hiddenFileInput.current.click();
    // };
    return (
        <form >
            <div className="form-group">
                <input type="file" disabled={allValues.loader} name="file" onChange={handleUpload} required id="fileUpload" className="d-none" />
                {allValues.loader ?
                    <label for="fileUpload" className="btn text-center btn-info downldExcl"><Spinner animation="grow" /> Uploading</label> :
                    <label for="fileUpload" className="d-flex align-items-center btn text-center btn-info downldExcl"> Upload by excel</label>

                }
            </div>

        </form>
    );
}

export default FileUpload;