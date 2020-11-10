import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Root from './Root';

import { default as menuData } from '@/generated/menu.json';

ReactDOM.render(<Root menuData={menuData} />, document.getElementById('root'));
