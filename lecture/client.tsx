import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import WordRelay from './WordRelay'; //export default가 있는 파일은 불러올때 * as 이거 안 붙여도 된다.

const Hot = hot(WordRelay); //이걸 하이오더컴포넌트라고 한다. 줄여서 HOC라고 부른다. 컴포넌트를 다른 컴포넌트로 감싸는 역할을 하고 있다. 이것을 해야지만 react핫로더가 적용된다.

ReactDOM.render(<WordRelay />, document.querySelector('#root'));