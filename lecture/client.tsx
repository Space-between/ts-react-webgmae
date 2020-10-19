import * as React from 'react';
import * as ReactDOM from 'react-dom';

import GuGuDan from './GuGuDan'; //export default가 있는 파일은 불러올때 * as 이거 안 붙여도 된다.

ReactDOM.render(<GuGuDan />, document.querySelector('#root'));