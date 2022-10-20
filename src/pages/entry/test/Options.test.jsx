import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  const scoops = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoops).toHaveLength(2);

  const scoopOptions = scoops.map((scoop) => scoop.alt);

  expect(scoopOptions).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
