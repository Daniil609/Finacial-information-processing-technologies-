 
// App.js
import NavigationBar from "../components/NavigationBar";
import '../styles/add.css'
import logo from '../img/logo.png'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/payment.css'
import Payment from "../components/Payment";
import { useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../config/config";




const payments = [
   
]

function PaymentPage(props) {

  let location = useLocation() 
  let navigate = useNavigate()
  let [transactionData, setTransactionData] = useState() 


    async function getPaymentData() {
        const response = await fetch(`${BACKEND_API_URL}/v1/payment/history`, {
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
          },  
          })
          .then(response => response.json())
          .catch(err => console.log(err))

          setTransactionData(response)
    }


   

    useEffect ( () => {



      if (!localStorage.getItem('TOKEN')) {
        navigate('/signup')
      }
      getPaymentData()
     
    }, [])

  return (
    <>
       <NavigationBar/>
       <div className="payment_container">
            <div id="transaction_div">
              <h1>История транзакций</h1>
            </div>
            {
                transactionData?.map((payment) => {
                    return <Payment payment={payment}></Payment>
                })
            }

       </div>
    </>
  );
}

export default PaymentPage;