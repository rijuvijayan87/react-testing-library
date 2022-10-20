import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('Initial Conditions', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test('Checkbox disables button on first click and enables on second click', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test('popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  // default - no popover
  const nopopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nopopover).not.toBeInTheDocument();

  // popover appears upon hovering
  const termsandconditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsandconditions);
  const popover = await screen.findByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();

  // popover dissapear when unhover
  await user.unhover(termsandconditions);
  const nopopoverAgain = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nopopoverAgain).not.toBeInTheDocument();
});
