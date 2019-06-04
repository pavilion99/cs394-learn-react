import React from 'react';
import Size from './Size';
import { render, fireEvent } from '@testing-library/react';

it('responds to clicks', () => {
    var size = "S";

    let changeSize = jest.fn(e => {size = e;});

    let inventory = {
        "L": 2,
        "M": 2,
        "S": 3,
        "XL": 2
    };

    const comp = render(<Size changeSize={changeSize} size={size} inventory={inventory} inCart={[]} />);
    let large = comp.getByTestId("click");

    fireEvent.click(large);

    expect(changeSize).toBeCalled();
    expect(size).toBe("L");
});