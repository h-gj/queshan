// Import React and Axios
import React, {useState, useEffect, useRef} from 'react';
import { Link } from "react-router-dom";
import copy from 'copy-to-clipboard';


// Define your component
const Zhuan = () => { // State to store the fetched data
  const [inputValue, setInputValue] = useState('');
  const [battleInfo, setBattleInfo] = useState('');
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
    const values = inputValue.split(/[ ,\n]+/);
    const [a, b, c, d, e, f] = values;
    setA(a)
    setB(b)
    setC(c)
    setD(d)
    setE(e)
    setF(f)
    console.log(22222, values, battleRef.current.innerText, battleRef.current);
    const changDi = chang ? `${guan}馆${chang}号场`: `${guan}馆`
    const text = `对阵表 - ${changDi}
【第1场】${a} & ${b} 🆚 ${c} & ${d}
【第2场】${a} & ${e} 🆚 ${c} & ${f}
【第3场】${b} & ${e} 🆚 ${f} & ${d}
【第4场】${b} & ${c} 🆚 ${a} & ${f}
【第5场】${a} & ${d} 🆚 ${c} & ${e}
【第6场】${f} & ${e} 🆚 ${d} & ${b}
【第7场】${a} & ${c} 🆚 ${b} & ${f}
【第8场】${e} & ${d} 🆚 ${a} & ${c}
【第9场】${b} & ${f} 🆚 ${e} & ${d}
    `
    copy(text)


  }
  return (
    <div style={{textAlign: "center"}}>
      <h1>打转 - 生成对阵</h1>

      <Link to="/">查场</Link>
      <p> 
        <textarea 
        // style={{textAlign: " center"}}
        placeholder="请输入参赛人员，空格分割" 
        rows={10}
        cols={40}
        onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
      </p>
      <p>
      <input placeholder="场馆" value={guan} onChange={(e) => setGuan(e.target.value)}></input>馆
      <input onChange={(e) => setChang(e.target.value)}></input>号场
      </p>
      <button onClick={handleClick}>生成并复制对战表</button>
      {/* a: 子腾   b：老万  c : v   d:  Melody  e: jian  f: hao */}
      <div ref={battleRef}>
      <p>【第1场】{a} & {b} 🆚 {c} & {d}</p>
      <p>【第2场】{a} & {e} 🆚 {c} & {f}</p>
      <p>【第3场】{b} & {e} 🆚 {f} & {d}</p>
      <p>【第4场】{b} & {c} 🆚 {a} & {f}</p>
      <p>【第5场】{a} & {d} 🆚 {c} & {e}</p>
      <p>【第6场】{f} & {e} 🆚 {d} & {b}</p>
      <p>【第7场】{a} & {c} 🆚 {b} & {f}</p>
      <p>【第8场】{e} & {d} 🆚 {a} & {c}</p>
      <p>【第9场】{b} & {f} 🆚 {e} & {d}</p>
      </div>

    </div>
  );
}

// Export the component
export default Zhuan;
