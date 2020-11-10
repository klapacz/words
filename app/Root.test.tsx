import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { render } from '@testing-library/react';

import Root from './Root';

it('renders without crashing', () => {
    render(<Root menuData={[]} />);
});
