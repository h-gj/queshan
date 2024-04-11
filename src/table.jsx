// Import React and Axios
import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Define your component
const Table = () => { // State to store the fetched data
  const getCurDateStr = () => {
    // Create a new Date object
    const currentDate = new Date();

    // Get the year, month, and day from the Date object
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Construct the date string in the desired format (YYYY-MM-DD)
    const currentDateStr = `${year}-${month}-${day}`;

    console.log(currentDateStr); // Output the current date string
    return currentDateStr

  }


  let [datas, setData] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectDate, setSelectDate] = useState(getCurDateStr());


  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
  
  // Function to fetch data using Axios
  const fetchData = async () => {
    // console.log(232323232, selectDate, getToken());

    const formData = new FormData();
    formData.append('client_type', 'browser');
    formData.append('sport_tag_id', '1');
    formData.append('date_str', selectDate);
    formData.append('r', 'stadia.skuList');
    console.log('form data', formData);
    // if(loading) {
    //   await sleep(2000)
    //   // return fetchData()
    // }
    console.log(222222222, formData, token);
    formData.append('access_token_wx', token);


    try { // Make a GET request using Axios
      console.log('form data', formData);

      const response = await axios.post('https://wx-api.papa.com.cn/v2', formData);
      // Update the state with the fetched data
      setData(response.data.skuList);
    } catch (error) { // Handle error
      console.error('Error fetching data:', error);
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {

    const fetchToken = async () => {
      // try { // Make a GET request using Axios
      //   const response = await axios.get('http://47.106.82.158:8001');
      //   // Update the state with the fetched data
      //   console.log('token: ', response.data.value);
      //   setToken(response.data.value)
      //   return response.data.value
      // } catch (error) { // Handle error
      //   console.error('Error get token:', error);
      //   return ''
      // }

      try {
        // 发起异步请求
        const response = await axios.get('http://47.106.82.158:8001');
        // 使用 setState 更新组件状态
        setToken(response.data.value);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


  // getToken();
  fetchToken();
  fetchData();
  }, [selectDate]); // Empty dependency array ensures the effect runs only once

  // Render the fetched data

  const handlePrevDay = () => {
    const date = new Date(selectDate);

    // Increment the date by one day
    date.setDate(date.getDate() - 1);

    // Convert the updated date back into a string in "YYYY-MM-DD" format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const resultDateStr = `${year}-${month}-${day}`;


    setSelectDate(resultDateStr)
  }

  const handleNextDay = () => {
    const date = new Date(selectDate);

    // Increment the date by one day
    date.setDate(date.getDate() + 1);

    // Convert the updated date back into a string in "YYYY-MM-DD" format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const resultDateStr = `${year}-${month}-${day}`;


    setSelectDate(resultDateStr)
  }

  const getWeekDayDisplay = () => {
    const weekDay = new Date(selectDate).getDay()

    if (selectDate === getCurDateStr()) {
      return '今天'
    } else if (weekDay === 0) {
      return '周天'
    } else {
      return `周${weekDay}`
    }
  }

  const getToken = async () => {
    try { // Make a GET request using Axios
      const response = await axios.get('http://47.106.82.158:8001');
      // Update the state with the fetched data
      console.log('token: ', response.data.value);
      setToken(response.data.value)
      return response.data.value
    } catch (error) { // Handle error
      console.error('Error get token:', error);
      return ''
    }
  }

  return (
    <div style={{textAlign: "center"}}>
      <h1>鹊山查场 - {selectDate}({getWeekDayDisplay()})</h1>
      <p>
        <span>选择日期：</span>&nbsp;&nbsp;<input type="date" onChange={e => setSelectDate(e.target.value)}></input>&nbsp;&nbsp;
        <button onClick={fetchData}>查询</button>&nbsp;&nbsp;
        <span>快捷查询：</span>
        <button onClick={handlePrevDay}>前一天</button>&nbsp;&nbsp;
        <button onClick={handleNextDay}>后一天</button>&nbsp;&nbsp;
        <button onClick={() => setSelectDate(getCurDateStr())}>今天</button>&nbsp;&nbsp;
      </p>      

      <div> {

        
        datas.map(rows => (
          <div style={{margin: "5px"}}>
          {/* {rows[0].time_str} */}

          {
            rows.filter(row => (new Date(selectDate).getDay() > 0 && new Date(selectDate).getDay() < 6) ? row.time_str.indexOf('2') === 0 : true).map((item, idx) => (
              <span key={
                item.sku
              }>

                {idx === 0 ? <span style={{color: item.time_str.indexOf('2') === 0 ? "red": "black"}}>{item.time_str}</span> : ""}&nbsp;&nbsp;


                {item.is_lock ? 
                
                  <span style={{color: "gray"}}>
                  <span>{
                    item.field_name
                  }</span>
                  &nbsp;&nbsp;
                </span>
                
                 : 
                
                <span style={{color: "white", backgroundColor: "green", borderRadius: "4px"}}>
                  <span>{
                    item.field_name
                  }</span>
                  &nbsp;&nbsp;
                </span>
                
                }
              </span>
            ))
          } 
          </div>
        ))
      } </div>
    </div>
  );
};

// Export the component
export default Table;
