// Import React and Axios
import React, {useState, useEffect, useRef} from 'react';
import { Link } from "react-router-dom";
import copy from 'copy-to-clipboard';
import {toPng} from 'html-to-image';


// Define your component
const Zhuan = () => { // State to store the fetched data
  const [inputValue, setInputValue] = useState('');
  const [guan, setGuan] = useState('鹊山');
  const [chang, setChang] = useState('');
  const [a, setA] = useState('a');
  const [b, setB] = useState('b');
  const [c, setC] = useState('c');
  const [d, setD] = useState('d');
  const [e, setE] = useState('e');
  const [f, setF] = useState('f');
  const battleRef = useRef(null);

  const handleClick = () => {
    const values = inputValue.split(/[,\n]+/);
    const [a, b, c, d, e, f] = values;
    setA(a)
    setB(b)
    setC(c)
    setD(d)
    setE(e)
    setF(f)
    const changDi = chang ? `${guan}馆${chang}号场`: `${guan}馆`
    const text = `对阵表 - ${changDi}
1. ${a} & ${b} 🆚 ${c} & ${d}
2. ${a} & ${e} 🆚 ${c} & ${f}
3. ${b} & ${e} 🆚 ${f} & ${d}
4. ${b} & ${c} 🆚 ${a} & ${f}
5. ${a} & ${d} 🆚 ${c} & ${e}
6. ${f} & ${e} 🆚 ${d} & ${b}
7. ${a} & ${c} 🆚 ${b} & ${f}
8. ${e} & ${d} 🆚 ${a} & ${c}
9. ${b} & ${f} 🆚 ${e} & ${d}
    `
    copy(text)


  }

  const handleJieLongInput = (e) => {
    const jieLongText = e.target.value;
    // Regular expression to match names (assuming they start after a number followed by a period)
    const regex = /\d+\.\s*([^\n【（]+)/g;

    // Array to store the extracted names
    const names = [];

    let match;
    while ((match = regex.exec(jieLongText)) !== null) {
      names.push(match[1].trim());
    }

    // Output the extracted names
    console.log("Names extracted from the text:");
    names.forEach((name, index) => {
      console.log(`${name}`);
    });
    setInputValue(names.join('\n'))
    return names

  }

  const handleConvertToImage = () => {
    const values = inputValue.split(/[,\n]+/);
    const [a, b, c, d, e, f] = values;
    setA(a)
    setB(b)
    setC(c)
    setD(d)
    setE(e)
    setF(f)

    toPng(battleRef.current)
      .then(function (dataUrl) {
        // 创建一个临时链接
        const link = document.createElement('a');
        link.href = dataUrl;
        // link.textAlign = "center";
        link.download = 'battle.png'; // 下载文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(function (error) {
        console.error('转换图像时出错:', error);
      });
  };

  return (
    <div style={{textAlign: "center"}}>
      <h1>打转 - 生成对阵表</h1>

      <Link to="/">查场</Link>
      
      <p> 
        <textarea 
        // style={{textAlign: " center"}}
        placeholder="请粘贴群接龙" 
        rows={5}
        cols={40}
        onChange={handleJieLongInput}
        ></textarea>
      </p>

      <p> 
        <textarea 
        // style={{textAlign: " center"}}
        placeholder="请输入参赛人员，一行一个" 
        rows={10}
        cols={40}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        ></textarea>
      </p>
      <p>
      <input placeholder="场馆" value={guan} onChange={(e) => setGuan(e.target.value)}></input>馆
      <input onChange={(e) => setChang(e.target.value)}></input>号场
      </p>
      <button onClick={handleClick}>生成并复制对阵表</button>
      <button onClick={handleConvertToImage}>生成并导出对阵表</button>
      <div ref={battleRef}>
        <p>1. {a} & {b} 🆚 {c} & {d}</p>
        <p>2. {a} & {e} 🆚 {c} & {f}</p>
        <p>3. {b} & {e} 🆚 {f} & {d}</p>
        <p>4. {b} & {c} 🆚 {a} & {f}</p>
        <p>5. {a} & {d} 🆚 {c} & {e}</p>
        <p>6. {f} & {e} 🆚 {d} & {b}</p>
        <p>7. {a} & {c} 🆚 {b} & {f}</p>
        <p>8. {e} & {d} 🆚 {a} & {c}</p>
        <p>9. {b} & {f} 🆚 {e} & {d}</p>
      </div>

    </div>
  );
}

export default Zhuan;
