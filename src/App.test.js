import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date('2026-01-01T00:00:00Z'));
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

test('renders two timer controls and the time settings', () => {
  render(<App />);
  expect(screen.getByText('计时器')).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /开\s*始/ })).toHaveLength(2);
  expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: '每次切换重置时间' })).not.toBeChecked();
});

test('arrow keys switch the active timer without starting it', () => {
  const { container } = render(<App />);
  const timers = container.querySelectorAll('.countdown');
  expect(timers[0]).toHaveClass('countdown-active');
  expect(timers[1]).toHaveClass('countdown-inactive');
  fireEvent.keyDown(document.body, { key: 'ArrowRight', code: 'ArrowRight' });
  expect(timers[0]).toHaveClass('countdown-inactive');
  expect(timers[1]).toHaveClass('countdown-active');
  expect(screen.getAllByRole('button', { name: /开\s*始/ })).toHaveLength(2);
});
