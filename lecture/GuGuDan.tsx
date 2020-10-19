import * as React from 'react'; //* as 이방식으로 불러오면React{ useState }이렇게 한줄에는 못쓴다.
import { useState, useRef } from 'react';

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = useRef<HTMLInputElement>(null);

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = inputEl.current; //useRef는 current로 접근한다. 
        if (parseInt(value) === first * second) { //정답일때
            setResult('정답');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            if (input) {
                input.focus();
            }
        } else {
            setResult('땡');
            setValue('');
            if (input) {
                input.focus();
            }
        }
    }

    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl} //위에서 inputEl.current를 하면 여기서 inputEl가 useRef에 등록된다.
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}//여기서 매개변수 e한테 마우스를 올리면 e의 타입을 지정하지 않아도 타입을 알 수 있다. 이렇게 함수를 분리하지않고 한번에 만들면 매개변수의 타입을 지정하지 않아도 타입이 추론 가능하다. 
                />
            </form>
            <div>{result}</div>
        </>
    )
}

export default GuGuDan;