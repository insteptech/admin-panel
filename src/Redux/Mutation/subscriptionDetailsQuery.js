export const subscriptionDetailQuery = (id) => {
  return (
    `
        query{
  getOnetimePaymentAvail(userId:"${id}"){
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
  )
}