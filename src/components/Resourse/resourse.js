import React from 'react';
import SearchBarForuser from '../../components/SearchBar/SearchBarForuser';
import LeftMenu from '../../components/LeftMenu/leftmenu';
import Header from '../../components/LeftMenu/header';
import { useSelector, useDispatch } from 'react-redux';
import { resourseMut, resourseQuer, removeRes } from '../../Redux/action/Service/serviceAction';
import './style.css'
import loaderImg from '../../loading.gif';

const Resourse = (props) => {

    const [isActive, setActive] = React.useState(false);
    const [all1, setAll] = React.useState([]);
    const [allValues, setAllValues] = React.useState({
        title: "",
        description: "",
        link: "",
    });
    const [loader, setLoader] = React.useState(true)

    const dispatch = useDispatch();
    const all = useSelector(state => state?.services?.addResourses)
    React.useEffect(async () => {
        await dispatch(resourseQuer()).then(() => {
            setLoader(false)
        })
        setAll(all?.getResources)

    }, [props])

    const toggleClass = () => {
        setActive(!isActive);
    };

    const changeHandler = (e) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    }


    const submit = async () => {
        setLoader(true)
        await dispatch(resourseMut(allValues)).then(async () => {
            await dispatch(resourseQuer()).then(() => {
                setLoader(false)
            })
            setLoader(false)
        })

    }
    const deleteResourse = (resourseId) => {
        dispatch(removeRes(resourseId))
    }
    return (
        <>
            <LeftMenu isActive={isActive} />
            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain">
                    <p className="m-0">Resources</p>
                </div>
                <div className=" my-4">
                    <form className="form searchForm">
                        <div className="form-row w-100">
                            <div className="col-md-12">
                                <div className="form-row">
                                    <div className="col-6 col-md-4">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                // type="search"
                                                placeholder="Title"
                                                aria-label="Search"
                                                value={allValues.title}
                                                // disabled={allValues.address}
                                                onChange={changeHandler}
                                                name="title"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                // type="search"
                                                placeholder="Description"
                                                aria-label="Search"
                                                value={allValues.description}
                                                // disabled={allValues.address}
                                                onChange={changeHandler}
                                                name="description"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                // type="search"
                                                placeholder="Youtube link"
                                                aria-label="Search"
                                                value={allValues.link}
                                                // disabled={allValues.address}
                                                onChange={changeHandler}
                                                name="link"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="  col-lg-6 offset-lg-5 col-sm-12 mt-5">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <button type="button" className="form-control btn btn-info" onClick={() => { submit() }}>
                                                submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-12">
                    <table className="table">
                        <thead style={{ backgroundColor: "#17a2b8" }}>
                            <tr style={{ backgroundColor: "#17a2b8" }}>
                                <th style={{ backgroundColor: "#17a2b8" }}>Title</th>
                                <th style={{ backgroundColor: "#17a2b8" }}>Desciption</th>
                                <th style={{ backgroundColor: "#17a2b8" }}>Link</th>
                                <th style={{ backgroundColor: "#17a2b8" }}>Delete</th>
                            </tr>
                        </thead>
                        {loader ?
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '45vh', position: 'absolute', left: '40%' }}><img src={`${loaderImg}`} alt="Document" /></div>

                            : all.getResources?.map((item, index) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>{item.Title}</td>
                                            <td>{item.Description}</td>
                                            <td>{item.youtubeUrl}</td>
                                            <td> <a style={{ color: '#015CE8' }} href='#' onClick={() => deleteResourse(item._id)}>Delete</a></td>
                                        </tr>

                                    </tbody>
                                )
                            })}
                    </table>
                    {/* {
                            all.getResources?.map((item, index) => {
                                return (
                                    <>
                                        <tbody>
                                            <tr>
                                                <td>{item.Title}</td>
                                                <td>{item.Description}</td>
                                                <td>{item.youtubeUrl}</td>
                                            </tr>
                                        </tbody>
                                    </>
                                )
                            })
                        } */}
                    {/* </table> */}


                </div>
            </div>

        </>
    )

}

export default Resourse;