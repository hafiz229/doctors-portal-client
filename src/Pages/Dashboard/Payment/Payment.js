import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CheckoutForm from "./CheckoutForm";

// Use Publishable Keys Here
const stripePromise = loadStripe(
  "pk_test_51Jvxw0A1KwzgcZfaqX2VEK7p92Sx8IGVYHKo1g5tbD1AlKLfbONPi2vcZemX9eWTcWHRTlt60VtdwVrbsjno40jh00fpmyqjmg"
);

const Payment = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState({});
  useEffect(() => {
    fetch(
      `https://still-sands-25307.herokuapp.com/appointments/${appointmentId}`
    )
      .then((res) => res.json())
      .then((data) => setAppointment(data));
  }, [appointmentId]);
  return (
    <div>
      <h2>
        {appointment.patientName}, Please Pay for {appointment.serviceName}{" "}
      </h2>
      <h4>Pay: ${appointment.price}</h4>
      {/* from strip git repository */}
      {/* make sure appointment has price property with conditional statement */}
      {appointment?.price && (
        <Elements stripe={stripePromise}>
          <CheckoutForm appointment={appointment} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;

/*
1. install stripe and stripe-react
2. set publishable key
3. Elements
4. Checkout Form
-----
5. Create payment method
6. server: create payment Intent api
7. Load client secret
8. ConfirmCard payment
9. handle user error
*/
