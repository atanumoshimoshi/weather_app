import axios from 'axios'
import React, { useState } from 'react'

const Home = () => {
    const [data, setData]=useState({
        celcius:10,
        name:"Kolkata",
        humidity:10,
        speed:2,
        image:'/Images/cloudsnew.png' ,
    })
    const [name1,setName]=useState('')

    const handleClick = () =>{
        if( name1!== ""){
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name1}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`;
            axios.get(apiUrl)
            .then(result=>{
                let imagePath:'';
                if(result.data.weather[0].main==="Clouds"){
                    imagePath='/Images/cloudsnew.png' 
                }else if(result.data.weather[0].main==="Clear"){
                    imagePath='/Images/clearsky.png' 
                }
                else if(result.data.weather[0].mai==="Mist"){
                    imagePath='/Images/mist.png' 
                }
                else if(result.data.weather[0].main==="Rain"){
                    imagePath='/Images/rain.png' 
                }
                else if(result.data.weather[0].main==="Drizzle"){
                    imagePath='/Images/drizzle.png' 
                }
                else{
                    imagePath='/Images/cloudsnew.png' 
                }

                console.log(result,"atanu");
                setData({...data, celcius:result.data.main.temp, name: result.data.name, 
                    humidity:result.data.main.humidity, speed:result.data.wind.speed, image:imagePath})
            })
            .catch(err=> console.log(err))
        }
    }

    

   

  
    return (
        <div className='container'>
            <div className='weather'>
                <div className='serach'>
                    <input type='text' placeholder='Enter city Name' onChange={(e)=>{
                        setName(e.target.value)
                    }} />
                    <button><img src='/Images/search.jpg' alt='search' onClick={handleClick} /></button>
                </div>
                <div className='winfo'>
                    <img src={data.image} alt='clouds'  className='icon'/>
                    <h1>{data.celcius}°c</h1>
                    <h2>{data.name}</h2>
                    <div className='details'>
                    <div className='col'>
                    <img src='/Images/humidity.webp' alt='humidity'/>
                    <div className='humidity'>
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                    </div>
                    </div>
                    <div className='col'>
                    <img src='/Images/wind-icon.webp' alt=''/>
                    <div className='wind'>
                    <p>{Math.round(data.speed)}km/h</p>
                    <p>wind</p>
                    </div>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
