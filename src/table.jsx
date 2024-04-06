import axios from 'axios'
import {useState} from 'react'

function query(setData) {
  // client_type=browser&sport_tag_id=1&date_str=2024-04-05&r=stadia.skuList&access_token_wx=8bf2ab869f18890da0417b02b6c747fd
   const formData = new FormData();
   formData.append('client_type', 'browser');
   formData.append('sport_tag_id', '1');
   formData.append('date_str', '2024-04-05');
   formData.append('r', 'stadia.skuList');
   formData.append('access_token_wx', '8bf2ab869f18890da0417b02b6c747fd');
  
   console.log(2222);
 
 
   axios.post('https://wx-api.papa.com.cn/v2', formData).then(res => console.log(22222222, setData(res.data.skuList)))
 }

function Table() {
  // const [data, setData] = useState([]);
  let data = []
  
  const formData = new FormData();
  formData.append('client_type', 'browser');
  formData.append('sport_tag_id', '1');
  formData.append('date_str', '2024-04-05');
  formData.append('r', 'stadia.skuList');
  formData.append('access_token_wx', '8bf2ab869f18890da0417b02b6c747fd');
 
  console.log(2222, data);
  
  
  axios.post('https://wx-api.papa.com.cn/v2', formData).then((res) => 
    { 
      console.log(43434);
      data = res.data.skuList
    }
  )
  
  console.log(2222223, data);
  return <h1>{ 1 + 1 }</h1>
  
}


export default Table
