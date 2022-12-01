import { useNavigate } from "react-router-dom"
import visaLogo from '../img/Visa_Logo.png'
import masterCardLogo from '../img/Mastercard-logo.svg.png'

export default function Payment(props) {

    let navigate = useNavigate()


    return (

    <div className="payment_transaction">
        <img src={props.payment?.type === 'Visa'? visaLogo: masterCardLogo}></img>
        <div className="payment_info">
            <h1>{props.payment?.name}</h1>
            <br></br>
            <h2 style={{paddingLeft: '1rem'}}>{props.payment?.sum}$</h2>
            <h2 style={{paddingLeft: '1rem'}}>************{props.payment?.card}</h2>
        </div>
        <div style={{ alignSelf: 'flex-end', marginLeft: '20rem', marginBottom: '0.5rem'}}>
            <h2>{props.payment?.date}</h2>
        </div>
    </div>
  )

}
