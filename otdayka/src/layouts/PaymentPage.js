 
// App.js
import NavigationBar from "../components/NavigationBar";
import '../styles/add.css'
import logo from '../img/logo.png'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import '../styles/payment.css'
import Payment from "../components/Payment";


const payments = [
    {
        type: 'Visa',
        name: 'Платеж1',
        sum: 100,
        card: '9343',
        date: '28.06.2002'
    },
    {
        type: 'MasterCard',
        name: 'Платеж1',
        sum: 100,
        card: '9343',
        date: '28.06.2002'
    }
]

function PaymentPage(props) {

  let location = useLocation() 

    useEffect ( () => {
        console.log(location.state)
    })

  return (
    <>
       <NavigationBar/>
       <div className="payment_container">
            <h1>Мои платежи</h1>

            {
                payments.map((payment) => {
                    return <Payment payment={payment}></Payment>
                })
            }

       </div>
    </>
  );
}

export default PaymentPage;