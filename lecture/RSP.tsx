import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
} as const;

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
} as const;

type a = typeof rspCoords; //이거의 뜻은 a라는 타입은 rspCoords가 된다.
type abc = keyof typeof rspCoords; //이거의 뜻은 abc라는 타입은 rspCoords의 키값중 하나가 된다.
type ImgCoords = typeof rspCoords[keyof typeof rspCoords]; //이거의 뜻은 ImgCoords라는 타입은 rspCoords의 벨류값중 하나가 된다.
// type imgCoords = '0' | '-142px' | '-284px'; //이거의 뜻은 imgCoords의 타입으로 '0', '-142px', '-284px'중 하나가 될 수 있다 이런뜻이다.
// 이렇게 앞에 type을 붙이고 변수처럼 타입을 정의한것은 interface로 타입을 지정한 것과 또 다른 방식이라고 볼 수 있다.

const computerChoice = (imgCoords:ImgCoords) => {
    return (Object.keys(rspCoords) as ["바위" , "가위" , "보"]).find((k) => {
        return rspCoords[k] === imgCoords;
    })!
}

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState<ImgCoords>(rspCoords.바위); //setState로 값이 바뀌는 것들이 전부 rspCoords객체안에있는 벨류값이기 때문에 제네릭에다가 위에서 지정한 ImgCoords을 타입지정 했다.
    const [score, setScore] = useState(0);
    const interval = useRef<number>();

    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        console.log('다시 실행');
        interval.current = window.setInterval(changeHand, 100);
        return () => { // componentWillUnmount 역할
          console.log('종료');
          clearInterval(interval.current);
        }
      }, [imgCoord]);

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
          setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
          setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
          setImgCoord(rspCoords.바위);
        }
      };

    const onClickBtn = (choice: keyof typeof rspCoords) => () => { //이런식으로 하나의 함수에 () =>가 두번씩 연속으로 있는 것을 고차함수라고 하는데 컴포넌트에서 onClick={onClickBtn('바위')}이런식으로 인자를 받는다면 고차함수를 사용해서 매개변수가 인자를 받을 수 있도록 해야한다. 
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다!');
          } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
          } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
          }
          setTimeout(() => {
            interval.current = window.setInterval(changeHand, 100);
          }, 1000);
    }
    return (
        <>
          <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
          <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
          </div>
          <div>{result}</div>
          <div>현재 {score}점</div>
        </>
      );
}

export default RSP;