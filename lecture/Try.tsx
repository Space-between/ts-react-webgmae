import * as React from 'react';
import { FunctionComponent } from 'react';
import { TryInfo } from './types';

const Try: FunctionComponent<{ tryInfo: TryInfo }> = ({ tryInfo })  => { //FunctionComponent<{}> 이거는 함수형 방식이고 함수형은 props, state이렇게 두가지를 타입 지정할 필요가 없다.(state는 useState가 대체하기 때문) 그래서 props만 지정해주면 된다. 
    return ( //<{ tryInfo: TryInfo }>이거의 뜻은 tryInfo의 타입으로 TryInfo라는 interface형식의 타입을 지정해주는 것이다.
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
};

export default Try;