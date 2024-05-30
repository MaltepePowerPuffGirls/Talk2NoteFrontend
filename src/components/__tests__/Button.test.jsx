import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Button from '../AuthComponents/Button';
import { fireEvent } from '@testing-library/react';

test('Button calls onClick function when clicked', () => {
  const onClickMock = vi.fn();
  const { getByText } = render(<Button onClick={onClickMock} text="Click me" />);
  const button = getByText('Click me');

  fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalled();
});