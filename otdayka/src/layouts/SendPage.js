 
// App.js
import NavigationBar from "../components/NavigationBar";
import logo from '../img/logo.png'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import '../styles/send.css'
import { useState } from "react";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useMemo } from "react";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { height } from "@mui/system";

import { useNavigate } from "react-router-dom";

function SendPage(props) {

    let location = useLocation() 
    let navigate = useNavigate()

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [country, setCountry] = useState('')
    const [type, setType] = useState()
    const [quality, setQuality] = useState()

    const options = useMemo(() => countryList().getData(), [])
    const [typeOptions, setTypeOptions] = useState({})


    useEffect(() => {

        const getTypes = async () => {
            const response = await fetch('/api/v1/product-type', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
                    'Content-Type': 'application/json',
                },  
            }).then((response) => response.json())



            let types = []
            
            for (let type of response) {
                types.push({value: type.id, label: type.name})
            } 

            setTypeOptions(types)
        }
       
        getTypes()

    }, [])

    
            



    const qualityOptions = useMemo(()=> {
        return [
            { value: 'Б/У', label: 'Б/У' },
            { value: 'Новый', label: 'Новый' },
          ]
    }, [])

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {

        


        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    useEffect ( () => {

        if (!localStorage.getItem('TOKEN')) {
            navigate('/signup')
        }

        console.log(location.state)
    })

    const changeHandler = object => {
        setCountry(object.label)
    }

    const changeTypeHandler = object => {
        setType(object.value)
    }

    const changeQualityHandler = object => {
        setQuality(object.value)
    }
    

    const sendAd = async (e) => {
        e.preventDefault()
        console.log(e.target.file.value)

        let file = document.getElementById('file_input').files[0]
        const now = new Date()


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('TOKEN')}`);
        
        
        var formdata = new FormData();
        formdata.append("name", e.target.name?.value);
        formdata.append("condition", e.target.quality?.value);
        formdata.append("image", file, file?.name);
        formdata.append("manufactureDate", now.toISOString());
        formdata.append("price", e.target.price?.value);
        formdata.append("type_id", e.target.type?.value);
        formdata.append("minAge", "3");
        formdata.append("maxAge", "10");
        formdata.append("address", e.target.regions?.value + ", " + e.target.address?.value);
        formdata.append("userId", localStorage.getItem("ID"));
        formdata.append("description", e.target.description?.value)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch("/api/v1/product", requestOptions)
        .then(response => response.json())
        .catch(error => alert(error));
        
        if (response.message) {
            alert(response.message)
        }
        else {
            navigate('/')
        }
    }

  return (
    <>
       <NavigationBar/>
       <div className="send_ad_container">
            <div className="send_ad_image_container">
                <figure>
                    {selectedFile? <img src={preview} className="send_ad_image"/> : <img src={logo} className="send_ad_image"/> }
                    <figcaption><h1>Изображение объявления</h1></figcaption>
                </figure>
            </div>
            <form className="send_ad_container_info" onSubmit={sendAd}>
                <div className="send_ad_container_row">  
                        <h1>Название: </h1>
                        <input className="send_input_text_name" name="name" type='text' placeholder="Название"/>
                </div>
                <div className="send_ad_container_row">  
                        <h1>Цена: </h1>
                        <input className="send_input_text_price" placeholder="Цена в бел. руб." name="price" type='text'/>
                </div>
                <div className="send_ad_container_row" style={{overflowX: "hidden"}}>  
                        <h1>Изображение:</h1>
                        <input type='file' id="file_input" name="file" onChange={onSelectFile} />
                </div>
                <div className="send_ad_container_row">  
                        <h1>Область: </h1>
                        <select name="regions" id="pet-select" style={{color: "grey", fontSize: "x-large", height: "80%", margin: "5px 0 0 40px"}}>
                            <option value="">Выберите область</option>
                            <option value="Минск">Минск</option>
                            <option value="Минская">Минская</option>
                            <option value="Гродненская">Гродненская</option>
                            <option value="Брестская">Брестская</option>
                            <option value="Гомельская">Гомельская</option>
                            <option value="Могилевская">Могилевская</option>
                            <option value="Витебская">Витебская</option>
                        </select>
                </div>
                <div className="send_ad_container_row">  
                        <h1>Адрес: </h1>
                        <input className="send_input_text" name="address" type='text' placeholder="Пример: 'Солигорск, ул.Понамарева, д.3'"/>
                </div>
                <div className="send_ad_container_row">  
                        <h1>Тип: </h1>
                        <Select  placeholder="Выбрать тип товара" className="type_select" name="type" options={typeOptions} onChange={changeTypeHandler} />
                </div>
                <div className="send_ad_container_row">  
                        <h1>Состояние: </h1>
                        <Select  placeholder="Выбрать состояние товара" className="quality_select" name="quality"  options={qualityOptions} onChange={changeQualityHandler} />
                </div>
                <div className="send_ad_container_row">  
                        <h1>Описание: </h1>
                        <textarea className="send_input_text" name="description" type='text' style={{margin: '20px 0px 20px 20px', height: "40vh", minWidth: '550px'}}/>
                </div>
                <button className="btn btn-warning btn-ad" type="submit">
                            Отправить
                </button>
            </form>
       </div>
    </>
  );
}

export default SendPage;