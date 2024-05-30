import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import RecordBlock from '../NoteComponents/RecordBlock/RecordBlock';

describe('RecordBlock', () => {
  const mockSetValue = vi.fn();
  const mockStartStopListening = vi.fn();
  const mockSendBlock = vi.fn();
  const mockChangeStatus = vi.fn();

  const setup = (props = {}) => {
    const defaultProps = {
      isListening: false,
      value: '',
      setValue: mockSetValue,
      startStopListening: mockStartStopListening,
      sendBlock: mockSendBlock,
      changeStatus: mockChangeStatus,
    };
    return render(<RecordBlock {...defaultProps} {...props} />);
  };

  test('renders without crashing', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  test('displays correct initial text', () => {
    const { getByText } = setup();
    expect(getByText("Start Speaking")).toBeInTheDocument();
  });



  test('displays correct text when listening and value is empty', () => {
    const { getByText } = setup({ isListening: true, value: '' });
    expect(getByText("Go ahead, we're listening")).toBeInTheDocument();
  });



  test('displays correct character count', () => {
    const { getByText } = setup({ value: 'Hello' });
    expect(getByText('5/1000')).toBeInTheDocument();
  });
});
