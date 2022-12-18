import { useNavigate } from "react-router-dom"


export default function AccountAddBox(props) {

    let navigate = useNavigate()

    const returnId = () => {
        console.log(props.info)

        navigate('/ad', {state: props.info})
    }

    return (

    <div className="acc_add_box" onClick={returnId} id={props.info?.id}>
        <img src={props.info?.image}></img>
        <div className="ad_main_info_box">
            <h1>{props.info?.name}</h1>
            <p>{props.info?.description}</p>
            <div className="acc_add_extra_info_box">
                <div style={{display: 'flex', flexDirection: 'column-reverse', width: "20rem"}}>
                    <span>Адрес: {props.info?.address} </span>
                    <span>Цена: {props.info?.price} $</span>
                </div>
                
                <span>Дата объявления: {props.info?.date}</span>
            </div>        
        </div>
    </div>
  )

}


