import { useNavigate } from "react-router-dom"
import visaLogo from '../img/Visa_Logo.png'
import masterCardLogo from '../img/Mastercard-logo.svg.png'
import { useEffect } from "react"

export default function Payment(props) {

    let navigate = useNavigate()

    useEffect (() => {
        console.log(props.payment)
    }, [])

    return (

    <div className="payment_transaction">
        <img src={visaLogo}></img>
        <div className="payment_info">
            <h1>ID операции: {props.payment?.id}</h1>
            <br></br>
            <h2 style={{paddingLeft: '1rem'}}>Стоимость операции: <strong>{props.payment?.amount / 100}$</strong></h2>
            <h2 style={{paddingLeft: '1rem'}}>Статус операции: {props.payment?.status == 'complete'? <strong style={{color: 'green'}}>Успешно</strong>:"Отклонено" }</h2>
        </div>
        {/* <div style={{ alignSelf: 'flex-end', marginLeft: '20rem', marginBottom: '0.5rem'}}>
            <h2>Тип платежа: {props.payment?.type == 'deposit'? "Депозит":"Кредит" }</h2>
        </div> */}
    </div>
  )

}
