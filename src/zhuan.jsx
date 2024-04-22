// Import React and Axios
import React, {useState, useEffect, useRef} from 'react';
import { Link } from "react-router-dom";
import copy from 'copy-to-clipboard';
import {toPng} from 'html-to-image';
import AutoCompleteInput from './sug'


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
  const [displayBattleInfo, setDisplayBattleInfo] = useState(false);
  const [changDiOptions, setChangDiOptions] = useState(Array.from(Array(14).keys(), n => n + 1));
  const [names, setNames] = useState([]);

  const handleClick = () => {
    // if (inputValue === '') {
    //   alert('请先导入接龙或手动填写参赛人员')
    //   return
    // }
    setDisplayBattleInfo(true)
    // const values = inputValue.split(/[,\n]+/);
    const [a, b, c, d, e, f] = names;
    setA(a)
    setB(b)
    setC(c)
    setD(d)
    setE(e)
    setF(f)
    const changDi = chang ? `${guan}${chang}号场`: `${guan}`
    const text = `【${changDi}】6人转对阵表
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
    console.log('copppppppppp', names);
    alert('复制成功')
  }

  const handleJieLongInput = (e) => {
    const jieLongText = e.target.value;
    // Regular expression to match names (assuming they start after a number followed by a period)
    const regex = /\d+\.\s*([^\n【（\-\.]+)/g;

    // Array to store the extracted names
    const names = [];

    let match;
    while ((match = regex.exec(jieLongText)) !== null) {
      names.push(match[1].trim().slice(0, 5));
    }

    // Output the extracted names
    console.log("Names extracted from the text:");
    names.forEach((name, index) => {
      console.log(`${name}`);
    });
    setInputValue(names.join('\n'))
    setNames(names);
    return names

  }

  const handleConvertToImage = () => {
    if (inputValue === '') {
      alert('请先导入接龙或手动填写参赛人员')
      return
    }
    setDisplayBattleInfo(true);
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

  const handleSelectGuan = (e) => {
    const guan = e.target.value;
    setGuan(e.target.value);
    if (guan === '鹊山') {
      const changs = Array.from(Array(14).keys(), n => n + 1);
      setChangDiOptions(changs)
    } else if(guan === '钓鱼台') {
      const changs = Array.from(Array(9).keys(), n => n + 1);
      setChangDiOptions(changs)
    } else if(guan === '百川') {
      const normalChangs = Array.from(Array(12).keys(), n => n + 1);
      const changs = normalChangs.concat(['VIP1', 'VIP2'])
      setChangDiOptions(changs)
    } else if(guan === '早程') {
      const changs = Array.from(Array(5).keys(), n => n + 1);
      setChangDiOptions(changs)
    } else if(guan === '简上') {
      const changs = Array.from(Array(27).keys(), n => n + 1);
      setChangDiOptions(changs)
    } else if(guan === '陶羽') {
      const changs = Array.from(Array(12).keys(), n => n + 1);
      setChangDiOptions(changs)
    } else if(guan === '龙兴') {
      const normalChangs = Array.from(Array(9).keys(), n => n + 1);
      const vipChangs = Array.from(Array(17).keys(), n => `v${n + 1}`);
      const changs = normalChangs.concat(vipChangs)
      setChangDiOptions(changs)
    } 
  }

  // useEffect(() => {

  // }, [changDiOptions])

  return (
    <div 
    style={{
      // textAlign: "center",
      display: "flex",
      // justifyContent: "center", /* Horizontal centering */
      alignItems: "center", /* Vertical centering */
      height: "100vh", /* Adjust as needed */
      flexDirection: "column"
      }}
    >
      <h2 class="CuzH2">打转</h2>
      {/* <div>生成对阵表</div> */}
      <Link to="/" style={{position: "fixed", right: "1rem", top: "1rem"}}>查场</Link>

      <p class="ZhuanP">
        <select class="ZhuanLocationInput" onChange={handleSelectGuan}>
          <option>鹊山</option>
          <option>钓鱼台</option>
          <option>百川</option>
          <option>早程</option>
          <option>简上</option>
          <option>龙兴</option>
          <option>陶羽</option>
        </select>&nbsp;

        <select class="ZhuanLocationInput" onChange={e => setChang(e.target.value)}>
        <option value="">可以不选</option>
        {changDiOptions.map(item => (
          <option value={item}>{item}</option>
        ))}
        </select>号场
      </p>
      
      <p class="ZhuanP"> 
        <textarea 
        placeholder="请粘贴群接龙" 
        rows={5}
        cols={40}
        onChange={handleJieLongInput}
        ></textarea>
      </p>

      <p class="ZhuanP">
        <AutoCompleteInput preSelectedItems={names} setNames={setNames}/>
      </p>
      {/* <p class="ZhuanP"> 
        <textarea 
        // style={{textAlign: " center"}}
        placeholder="请输入参赛人员，一行一个，目前只支持6人转" 
        rows={10}
        cols={40}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        ></textarea>
      </p> */}
      
      <p class="ZhuanP">
        <button class="ZhuanFuncButton" onClick={handleConvertToImage}>生成并导出对阵表</button>
        <button class="ZhuanFuncButton" onClick={handleClick}>生成并复制对阵表</button>&nbsp;&nbsp;
      </p>
      {displayBattleInfo ? <div ref={battleRef}>
        <p>1. {a} & {b} 🆚 {c} & {d}</p>
        <p>2. {a} & {e} 🆚 {c} & {f}</p>
        <p>3. {b} & {e} 🆚 {f} & {d}</p>
        <p>4. {b} & {c} 🆚 {a} & {f}</p>
        <p>5. {a} & {d} 🆚 {c} & {e}</p>
        <p>6. {f} & {e} 🆚 {d} & {b}</p>
        <p>7. {a} & {c} 🆚 {b} & {f}</p>
        <p>8. {e} & {d} 🆚 {a} & {c}</p>
        <p>9. {b} & {f} 🆚 {e} & {d}</p>
      </div>: null}

    </div>
  );
}

export default Zhuan;
