import { Button, Space } from 'antd';
import './Timer.css';
import Countdown from 'react-countdown';
import { useEffect, useRef, useState, useCallback } from 'react';
import dayjs from 'dayjs';

function Timer({ initTime, active, resetPerSwitch = true }) {

  const initInMili = (initTime || 60) * 1000;

  const cdRef = useRef();

  const apis = cdRef?.current?.getApi();

  const [date, setDate] = useState(Date.now() + initInMili);

  const [allTime, setAllTime] = useState(initInMili);

  const [running, setRunning] = useState(false);

  const [rest, setRest] = useState(allTime);

  const start = useCallback(() => {
    setDate(Date.now() + allTime);
    setRunning(true);

    // start 时还没有这些接口，需要现获取
    cdRef.current.getApi()?.start();

    // 设置
  }, [allTime])


  useEffect(() => {
    const mili = initTime * 1000;
    setDate(Date.now() + mili);
    setAllTime(mili);
    setRest(mili); //
  }, [initTime])

  const pause = useCallback(() => {
    setRunning(false);
    apis?.pause();
  }, [apis])
  
  const reset = useCallback(() => {
    apis?.stop();
    setRunning(false);
    setDate(Date.now() + allTime);
    setRest(allTime);
  }, [allTime, apis, initTime])

  const resume = useCallback(() => {
    setDate(Date.now() + rest);
    setRunning(true);
    apis?.start();
  }, [apis, rest])

  useEffect(() => {
    if (!active) {
      if (resetPerSwitch) reset();
      else pause();
    }
  }, [active, reset, resetPerSwitch, pause, start, resume]);


  useEffect(() => {
    const listener = (e) => {
      if ((e.target)?.tagName === 'BODY') {
        if (e.code === 'Space') {
          running ? pause() : (rest === allTime ? start() : resume());
        } else if (e.code === 'KeyR') {
          reset();
        }
      }
    }
    if (active) {
      document.addEventListener('keypress', listener);
      return () => {
        document.removeEventListener('keypress', listener);
      };
    }
  }, [active, running, allTime, rest, pause, resume, start, reset])

  return (
    <div className={`countdown countdown-${active ? 'active' : 'inactive'}`}>
      <div className='countdown-mask'></div>
      <Countdown 
        ref={cdRef}
        autoStart={false}
        date={date}
        intervalDelay={0}
        precision={2}
        onPause={(timeDelta) => setRest(timeDelta.total)}
        renderer={({ minutes, seconds, completed, total}) => {
          if (completed) {
            return <div className='countdown-end'>Timeup!</div>
          } else if (minutes === 0 && seconds < 10) {
            return <div className='countdown-danger'>{dayjs(total).format('mm:ss.SSS')}</div>
          } else if (minutes === 0 && seconds < 20) {
            return <div className='countdown-warning'>{dayjs(total).format('mm:ss.SSS')}</div>
          } else {
            return <div className='countdown-normal'>{dayjs(total).format('mm:ss.SSS')}</div>
          }
        }}
      />
      <Space>
        {!running && (rest === allTime ? <Button onClick={start} size='large' type='primary'>开始</Button> : <Button onClick={resume} size='large' type='primary'>继续</Button>)}
        {running && <Button onClick={pause} size='large'>暂停</Button>}
        <Button onClick={reset} size='large' danger>重置</Button>
      </Space>

    </div>
  );
}

export default Timer;
