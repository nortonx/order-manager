import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { describe, it, expect } from '@jest/globals';

describe('HomePage', () => {
  it('renders the home page', async () => {
    const { container } = render(<HomePage />);
    const homePage = screen.getByTestId('home-page');
    expect(homePage).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
