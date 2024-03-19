export const SendOtpMutation= (phone) =>{
    return `
    mutation{adminLogin(Mobile:"${phone}"){
      _id
    }}`
  };

 
  export const ConfirmOtpMutation=(data)=>{
    const otp =Number(data.otp)


    return` mutation{
        confirmOtp(otp:${otp},id:"${data.UserId}",deviceToken:"jhjhjhjhjh")
      }`
  }
  