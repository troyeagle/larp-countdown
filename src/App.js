import { useState, useEffect } from 'react';
import './App.css';

import Timer from './Timer';

import { Row, Col, Image, Descriptions, InputNumber, Form, Button, Checkbox } from 'antd';
function App() {

  // 目前只支持两方，多方需要改造
  const [upActive, setUpActive] = useState(true);
  const changeUpActive = (active) => {
    setUpActive(active);
  }

  const [initTime, setInitTime] = useState(90);

  const [reset, setReset] = useState(false);

  const onFinish = (values) => {
    if (values.time) {
      setInitTime(values.time);
    }
  }
  
  useEffect(() => {
    const changePlayer = (e) => {
      if ((e.target)?.tagName === 'BODY') {
        if (e.code.startsWith('Arrow')) {
          setUpActive(a => !a);
        }
      }
    }

    document.addEventListener('keydown', changePlayer);
    return () => {
      document.removeEventListener('keydown', changePlayer);
    };
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">计时器</header>
      <Row>
        <Col span={10}>
          <Image src="./break.jpg" preview={false} className={`player player-${upActive ? 'active' : 'inactive'}`} onClick={() => changeUpActive(true)}></Image>
        </Col>
        <Col span={10}
        >
          <Timer initTime={initTime} active={upActive} resetPerSwitch={reset}/>
        </Col>
      </Row>
      
      <Row>
        <Col span={10}>
        <Image src="./defence.jpg" preview={false} className={`player player-${!upActive ? 'active' : 'inactive'}`} onClick={() => changeUpActive(false)}></Image>
        </Col>
        <Col span={10}
        >
          <Timer initTime={initTime} active={!upActive} resetPerSwitch={reset}/>
        </Col>
      </Row>

      <Row>
        <Col span={10}>
          <div className='supplement'>
            <Descriptions column={1}>
              <Descriptions.Item label="空格键">
                开始 / 暂停 / 继续
              </Descriptions.Item>
              <Descriptions.Item label="R 键">
                重置时间
              </Descriptions.Item>
              <Descriptions.Item label="↑↓←→">
                切换活跃方
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Col>
        <Col>
          <div className='supplement'>
            <Form
              onFinish={onFinish}
              layout='inline'
            >
              <Form.Item
                label="设置时间"
                name={'time'}
              >
                <InputNumber />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                  确认
              </Button>
            </Form>  
          </div>
          <Checkbox value={reset} onChange={(e) => setReset(e.target.checked)}>每次切换重置时间</Checkbox>
        </Col>
        
        
      </Row>
      
    </div>
  );
}

export default App;
