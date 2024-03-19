import Pagination from "react-js-pagination";
import React from 'react'
import { useHistory, useLocation } from "react-router-dom";

const PaginationFun = (props) => {
    let history = useHistory();
    const location = useLocation();
    // console.log("paginationPropsssss", props)


    const [activePage, setActivePage] = React.useState(Number(props?.pagenumber))

    const { totalPage } = props
    const handlePageChange = (pageNumber) => {
        if (location.pathname.includes("/OtherServicesType")) {
            history.push(`/OtherServicesType/${pageNumber}`);
        }
        if (location.pathname.includes("/users")) {
            history.push(`/users/${pageNumber}`);
        }
        if (location.pathname.includes("/AmberAlertsType")) {
            if (props?.userNotify) {
                history.push(`/AmberAlertsType/${pageNumber}`);
            }
        }
        // if (location.pathname.includes("/Live_Requests")) {
        //     history.push(`/Live_Requests/${pageNumber}`);
        // }
        // history.push(`/users/${pageNumber}`);
        console.log(`active page is ${activePage}`);
        setActivePage(pageNumber)

        const { pageChangeFun } = props;
        pageChangeFun(pageNumber)

    }
    return (
        <div>
            <Pagination style={{ margin: "left" }}
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={100}
                totalItemsCount={totalPage}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default PaginationFun
