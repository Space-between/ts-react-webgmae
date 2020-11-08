import * as React from 'react'; //* as 이방식으로 불러오면React{ useState }이렇게 한줄에는 못쓴다.
import { useState, useRef, useCallback, useMemo, useEffect, FC } from 'react';


const Ball: FC<{number: number}> = ({ number }) => { //리액트 컴포넌트의 타입을 지정할때 FunctionComponent가 길기 때문에 FC라고 해도 된다. 옆에있는 <{number: number}>는 number라는 프롭스의 타입을 지정한것이다.
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{ background }}>{number}</div>
    );
}

export default Ball;