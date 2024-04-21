// Import React and Axios
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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
  const [selectDate, setSelectDate] = useState(getCurDateStr());
  const [isMobile, setIsMobile] = useState(false);

  // Function to fetch data using Axios
  const fetchData = async (tk='') => {
    const formData = new FormData();
    formData.append('client_type', 'browser');
    formData.append('sport_tag_id', '1');
    formData.append('date_str', selectDate);
    formData.append('r', 'stadia.skuList');
    // console.log(222222222, formData, token);
    formData.append('access_token_wx', tk || token);

    try { // Make a GET request using Axios
      console.log('form data', formData);
      const response = await axios.post('https://wx-api.papa.com.cn/v2', formData);
      // Update the state with the fetched data
      setData(response.data.skuList);
    } catch (error) { // Handle error
      console.error('Error fetching data:', error);
    }
  };

  const checkIsMobile = () => {
        // Check if the device matches a mobile viewport
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);
    
        // Listen for changes in viewport size
        const handleResize = () => {
          setIsMobile(mediaQuery.matches);
        };
        mediaQuery.addListener(handleResize);
    
        // Clean up the event listener
        return () => {
          mediaQuery.removeListener(handleResize);
        };    
  }

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    console.log('use efffeeeeeect');
    checkIsMobile();

    const fetchToken = async () => {
      try {
        // 发起异步请求
        const response = await axios.get('http://47.106.82.158:8001');
        // 使用 setState 更新组件状态
        setToken(response.data.value);
        // console.log('get token', response.data.value);
        fetchData(response.data.value);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };


  fetchToken();
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
      return `周${numberToChinese(weekDay)}`
    }
  }

  const numberToChinese = (number) => {
    const chineseDigits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const chineseUnits = ['', '十', '百', '千', '万', '亿']; // Units for numbers up to 亿 (10^8)

    const numStr = number.toString();
    let result = '';

    for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr[i]);
        const unit = chineseUnits[numStr.length - i - 1];

        if (digit === 0) {
            // Skip if the digit is 0 unless it's the last digit
            if (i !== numStr.length - 1 && result[result.length - 1] !== '零') {
                result += chineseDigits[digit];
            }
        } else {
            result += chineseDigits[digit] + unit;
        }
    }
    return result;
  }


  return (
    <div style={{textAlign: "center"}}>
      <Link to="/z" style={{position: "fixed", right: "1rem", top: "1rem"}}>打转</Link>
      <h2 class="CuzH2">鹊山查场</h2>
      <div>{selectDate} | {getWeekDayDisplay()}</div>

      <p class={isMobile ? "MobileStyle": ""}>
        <span>
          <span style={{height: "2rem"}}>选择日期</span>
          <input 
            type="date" 
            onChange={e => setSelectDate(e.target.value)}
            style={{height: "2rem"}}
            ></input>
        </span>&nbsp;&nbsp;&nbsp;
        {/* <button style={{width: "4rem", height: "2rem"}} onClick={fetchData}>查询</button>&nbsp;&nbsp; */}
        <button style={{width: "3.7rem", height: "2rem"}} onClick={handlePrevDay}>前一天</button>&nbsp;&nbsp;
        <button style={{width: "3.7rem", height: "2rem"}} onClick={handleNextDay}>后一天</button>&nbsp;&nbsp;
        <button style={{width: "3.7rem", height: "2rem"}} onClick={() => setSelectDate(getCurDateStr())}>今天</button>&nbsp;&nbsp;
      </p>

      <div> 
      <p style={{margin: 0}}><span style={{color: "green"}}>绿色</span>: 可定&nbsp;&nbsp;<span style={{color: "gray"}}>灰色</span>: 不可定</p>
      <p style={{color: "gray", margin: 8, fontSize: 13}}>一共14个场 手机端向右滑动查看更多场次</p>
      {
        datas.map(rows => (
          <div style={{margin: "5px"}}>
          {
            /* 工作日只展示20点及以后的场次 */
            rows.filter(row => (new Date(selectDate).getDay() > 0 && new Date(selectDate).getDay() < 6) ? row.time_str.indexOf('2') === 0 : true).map((item, idx) => (
              <span 
              key={item.sku}
              class="No-Break-Line"
              >
                {/* 20点及以后的时间点表红展示 */}
                {idx === 0 
                ? <span 
                style={{
                  width: "100px", 
                  display: "inline-block"
                  // color: item.time_str.indexOf('2') === 0 ? "black": "gray",
                  }}
                >{item.time_str}</span>
                : ""}&nbsp;&nbsp;

                {/* 已定 */}
                {item.is_lock ? 
                  <span 
                  style={{color: "gray"}}
                  class="No-Break-Line"
                  >
                  <span style={{whiteSpace: "nowrap", display: "inline"}}>{
                    item.field_name
                  }</span>
                  &nbsp;&nbsp;
                </span>
                 :
                 /* 未定 */
                <span 
                style={{color: "white", backgroundColor: "green", borderRadius: "4px"}}
                class="No-Break-Line"
                >
                  <span
                  class="No-Break-Line"
                  >{
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
      } 
      <p>别翻了到底啦</p>
      {/* <br /> */}
      </div>
    </div>
  );
};

// Export the component
export default Table;
