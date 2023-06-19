import { render, screen, fireEvent } from '@testing-library/react';
import RemovePopUp from './RemovePopUp';

test('displays success message and calls closepopup on button click', () => {
  // Create a mock function for the closepopup prop
  const closepopupMock = jest.fn();

  // Render the component
  render(<RemovePopUp closepopup={closepopupMock} />);

  // Assert that the success message is displayed
  const successMessage = screen.getByText('Berhasil Dihapus');
  expect(successMessage).toBeInTheDocument();

  // Simulate a button click
  const closeButton = screen.getByText('Close');
  fireEvent.click(closeButton);

  // Assert that the closepopup function is called
  expect(closepopupMock).toHaveBeenCalled();
});
