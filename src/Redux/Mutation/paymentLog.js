export const paymentLogsQuery = (userId) => {
  return `
    query {
      getOnetimePaymentAvail(userId: "${userId}") {
        razorpay_payment_id_oneTime
        typeOfPayment_oneTime
        access_oneTime_amberAlert
        userId
        createdAt
        typeOfPayment_subscription
        razorpay_payment_id_subscription
        razorpay_signature
        subscription_id
        access_monthly
        access_yearly
        access_FullServices
        Subscription_Plan_Name
        Subscription_Amount
        start_date
        end_date
      }
    }
    `
}
export const addCouponMutation = (data) => {
  return `
  mutation{
  createCoupon(couponData:{
     couponCode:"${data?.coupon}"
    period:"${data?.couponPeriod}"
  })
  {
    couponCode
    period
  }
}
  `
}
export const getAllCouponQuery = () => {
  return `
query{
  getAllCoupon{
    _id
    couponCode
    period
    isActive
  }
}
  `
}
export const deleteCouponMutation = (couponId) => {
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk", couponId)
  return `
mutation{
  deleteCoupon(couponId:"${couponId}")
}
`
}