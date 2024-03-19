
import React from 'react'
import LeftMenu from '../../components/LeftMenu/leftmenu';
import Header from '../../components/LeftMenu/header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from '../../Redux/action/razorPay/paymentLog';
import { Button } from 'react-bootstrap';
import AllCoupon from './allCoupon';
import loaderImg from '../../loading.gif';

const Coupon = () => {
    const dispatch = useDispatch();
    const [isActive, setActive] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [couponPeriod, setCouponPeriod] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setCoupon(null);
        setCouponPeriod(null);
        // setLoader(false)
    }, [])

    const toggleClass = () => {
        setActive(!isActive);
    };
    const funGenerateCoupon = () => {
        const randomCode = generateString(6)
        setCoupon(randomCode);
    }
    const funSubmit = () => {
        const coupanData = {
            coupon,
            couponPeriod
        }
        setLoader(true)
        dispatch(addCoupon(coupanData)).then(() => {
            setCoupon(null);
            setCouponPeriod(null);
            setLoader(false)
        })

    }
    const funCouponPeriod = (coupanPeriod) => {
        setCouponPeriod(coupanPeriod)
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    return (
        <>
            <LeftMenu isActive={isActive} />
            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain">
                    <p className="m-0">Coupon</p>
                </div>
                {
                    loader ?
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '45vh', position: 'absolute', left: '40%' }}><img src={`${loaderImg}`} alt="Document" /></div>
                        :
                        <>
                            <div>
                                <div style={{ display: 'flex', margin: 10, justifyContent: 'space-around', height: '40px', }}>
                                    <input type="text" name="coupen" style={{ width: '80%', height : "150%" }} value={coupon} disabled={true}  />
                                    <Button style={{ backgroundColor: '#015CE8', color: 'white', marginLeft: 10, width: '30%', }} onClick={() => { funGenerateCoupon() }}>Generate coupon</Button>
                                </div>
                                <div className='mt-5' style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                    <p className='mr-5' style={{ fontSize: 17, fontWeight: 'bold' }} >select coupon period: </p>
                                    <div>
                                        <input type="radio" value="weekly" name="gender" onClick={() => { funCouponPeriod('weekly') }} /> weekly
                                    </div>
                                    <div className="ml-3">
                                        <input type="radio" value="montthly" name="gender" onClick={() => { funCouponPeriod('monthly') }} /> monthly
                                    </div>
                                </div>

                                <div className='mt-5' style={{ display: 'flex', justifyContent: 'center', marginRight: 10 }} >
                                    <Button style={{ backgroundColor: '#015CE8', width: '15%' }} disabled={!couponPeriod} onClick={() => { funSubmit() }}>SUBMIT</Button>
                                </div>
                            </div>
                            <AllCoupon />
                        </>
                }
            </div>



        </>
    )
}

export default Coupon