export const leadsDetailQuery = () => {
  return `
    query{
  getLeadsData{
    _id
    about
    name
    email
    mobile
    UTM{
      utm_source
      utm_medium
      utm_campaign
      utm_term
      utm_content
    }
    planClicked
    uniqueId
  }
}
    `
}
export const subscriptionDetailQuery = () => {
  return `
 query{
  getSubscriptionData{
     _id
    razorpay_payment_id_oneTime
    razorpay_payment_id_lifeTime
    typeOfPayment_oneTime
    access_oneTime_amberAlert
    userId
    createdAt
    typeOfPayment_subscription
    razorpay_payment_id_subscription
    razorpay_signature
    subscription_id
    subscription_id
    access_monthly
    access_yearly
    access_FullServices
    Subscription_Plan_Name
    Subscription_Amount
    start_date
    end_date
    couponId
      usersDetail{
      _id
      Mobile
      Role
      Role
      deviceToken
    }
    personalInformation{
      userId
      fullName
      gender
      bloodGroup
      avatar
      age
      email
    }
  }
}
    `
}