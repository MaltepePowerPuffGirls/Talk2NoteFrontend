import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../CommonComponents/Loading/Loading';

describe('LoadingSpinner', () => {
    test('renders without crashing', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container).toBeInTheDocument();
    });
  
    test('renders three bouncing divs', () => {
      const { container } = render(<LoadingSpinner />);
      const bouncingDivs = container.querySelectorAll('.animate-bounce');
      expect(bouncingDivs.length).toBe(3);
    });
  
    test('each div has correct class names', () => {
      const { container } = render(<LoadingSpinner />);
      const bouncingDivs = container.querySelectorAll('.animate-bounce');
  
      expect(bouncingDivs[0]).toHaveClass('h-4 w-4 bg-[#A899D9] rounded-full animate-bounce');
      expect(bouncingDivs[1]).toHaveClass('h-4 w-4 bg-[#A899D9] rounded-full animate-bounce');
      expect(bouncingDivs[2]).toHaveClass('h-4 w-4 bg-[#A899D9] rounded-full animate-bounce');
    });
});
