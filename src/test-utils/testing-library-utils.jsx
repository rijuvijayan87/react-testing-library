import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

//https://testing-library.com/docs/react-native-testing-library/setup#custom-render
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

//reexport everything
export * from '@testing-library/react';

//Override render method
export { renderWithContext as render };
