import * as React from 'react'; //* as 이방식으로 불러오면React{ useState }이렇게 한줄에는 못쓴다.
import { useState, useRef, useCallback } from 'react';

const WordRelay = () => {
    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = useRef<HTMLInputElement>(null);

    const onSubmitForm = useCallback<(e: React.FormEvent) => void>((e) => { //제네릭안에다가 함수를 정의하고 그 함수의 매개변수에다가 타입을 지정했다. 이렇게 해도 되고 아니면 그냥 매개변수에다가 타입지정을 해도 된다.
        e.preventDefault();
        const input = inputEl.current;
        if (word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
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
    }, [word, value]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { //usecallback의 매개변수에다가 타입을 지정했다. 이렇게 해도 되고 아니면 위에처럼 제네릭으로 해도된다.
        setValue(e.currentTarget.value)
    }, []);

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    value={value}
                    onChange={onChange}
                />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
};

export default WordRelay;