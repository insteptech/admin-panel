import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router';
import { ConfirmOtpAction, loginAction } from '../../Redux/action';
const ConformOtp = () => {
  const auth = useSelector(state => state.auth)
  const [loginError, setLoginError] = React.useState(false)
    ;
  const dispatch = useDispatch()

  const [UserId, setUserId] = React.useState(auth.userId._id)
  const [counter, setCounter] = React.useState(30);
  const [timer, setTimer] = React.useState(true);
  const [otp, setOtp] = React.useState("")

  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter])


  // if (counter === "0") {
  //   ResendOTP();
  // }
  const ResendOTP = () => {
    const mobile = localStorage.getItem('mobile')
    setTimer(true);
    setCounter(30);
    dispatch(loginAction(mobile))
      .then((response) => {

      })
      .catch(() => {
        // console.log("hellodsndmncncnmcnmcnmcmcmcnm");
      })

  }

  const ConfirmOtpFunction = () => {
    if (otp === undefined) {
      alert("please enter your otp")
    }
    let data = {
      otp,
      UserId
    }
    dispatch(ConfirmOtpAction(data))
      .then((response) => {
        if (response && response.data && response.data.errors && response.data.data.confirmOtp === null) {
          alert("Otp is invalid")
        }
        else {
          setLoginError(true)
        }

      }).catch((err) => {
        console.log(err)
      })
  }



  if (loginError) {
    return <Redirect to={'/home'} />
  }
  const onKeyUp = (e) => {
    if (e.key >= 'Enter') {
      e.preventDefault()
      ConfirmOtpFunction();
    }
  }

  return (
    <div className="wrapper fadeInDown">
      <div className="container">
        {/* <div className="col-lg-2 mx-auto"><img src={logoImg} /></div> */}
        <div className="form-inner">
          <div className="row">

            <div className="w-100">
              <div className="fadeIn first">
                <h4>Confirm OTP</h4>
              </div>
              <div id="formContent">
                <form>
                  <input className="input my-4"
                    placeholder="Please enter your otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onKeyPress={onKeyUp}
                  />
                </form>
                <div>
                  <button className='btn btn-success w-25'
                    onClick={ConfirmOtpFunction}  >Confirm OTP</button>
                  {
                    timer === false || counter === 0 ?
                      <button onClick={ResendOTP} className='btn btn-info w-25'
                      >Resend OTP</button>
                      :

                      <button className='btn btn-success w-50'>
                        Resend Otp In 00:{counter} s
                      </button>

                  }
                </div>



              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConformOtp
