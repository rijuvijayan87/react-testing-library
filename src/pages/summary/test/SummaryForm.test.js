import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

describe('Summary form', () => {
  test('inital condition', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    const orderButton = screen.getByRole('button', { name: 'Confirm order' });
    expect(orderButton).toBeDisabled();
  });

  test('Confirm order button is enabled only when t&c checkbox is checked', async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox');
    const orderButton = screen.getByRole('button', { name: 'Confirm order' });

    await user.click(checkbox);
    expect(orderButton).toBeEnabled();

    await user.click(checkbox);
    expect(orderButton).toBeDisabled();
  });
});

test('popover response to hover', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  //popver starts out hidden
  const nullPopOver = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopOver).not.toBeInTheDocument();

  //popover appears upon mouse of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover dissapears when we mouse out
  await user.unhover(termsAndConditions);
  const nullPopOverAgain = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopOverAgain).not.toBeInTheDocument();
});
