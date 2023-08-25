import { useState } from 'react';
import './App.css';

import Timer from './Timer';

import { Row, Col, Image } from 'antd';
function App() {

  const [upActive, setUpActive] = useState(true);
  const changeUpActive = (active) => {
    setUpActive(active);
  }
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Row>
        <Col span={10}>
          <Image src="./break.jpg" preview={false} className={`player player-${upActive ? 'active' : 'inactive'}`} onClick={() => changeUpActive(true)}></Image>
        </Col>
        <Col span={10}
        >
          <Timer initTime={90} active={upActive}/>
        </Col>
      </Row>
      
      <Row>
        <Col span={10}>
        <Image src="./defence.jpg" preview={false} className={`player player-${!upActive ? 'active' : 'inactive'}`} onClick={() => changeUpActive(false)}></Image>
        </Col>
        <Col span={10}
        >
          <Timer initTime={90} active={!upActive}/>
        </Col>
      </Row>
      
    </div>
  );
}

export default App;
