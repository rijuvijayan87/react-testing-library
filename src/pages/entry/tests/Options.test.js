import { render, screen } from '../../../test-utils/testing-library-utilsp';

import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoops', 'Vanilla scoops']);
});

test('displays image for each topping option from server', async () => {
  render(<Options optionType='toppings' />);

  const toppingsImages = await screen.findAllByRole('img', {
    name: /topping/i,
  });
  expect(toppingsImages).toHaveLength(3);

  const altText = toppingsImages.map((element) => element.alt);
  expect(altText).toEqual([
    'Cherries toppings',
    'M&Ms toppings',
    'Hot fudge toppings',
  ]);
});
