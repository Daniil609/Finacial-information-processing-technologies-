 
// App.js
import NavigationBar from "../components/NavigationBar";
import '../styles/add.css'
import logo from '../img/logo.png'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import '../styles/payment.css'
import Payment from "../components/Payment";
import { useNavigate } from "react-router-dom";

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
    },
    {
      type: 'MasterCard',
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
  let navigate = useNavigate()


    useEffect ( () => {
      if (!localStorage.getItem('TOKEN')) {
        navigate('/signup')
      }
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