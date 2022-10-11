// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

function testSignupPage() {
    // On page normally



}

function testDeletePage() {
    // On page normally
    expect(getByText('delete_parent')).toBeVisible();
    expect(getByText('delete_header')).toBeVisible();
    expect(getByText('delete_back_button')).toBeVisible();
    expect(getByText('delete_delete_button')).toBeVisible();

    // Nesting items
    const delete_parent = getByTestId('delete_parent');
    const delete_header = getByTestId('delete_header');
    const delete_back_button = getByTestId('delete_back_button');
    const delete_delete_button = getByTestId('delete_delete_button');
    const delete_confirm_window = getByTestId('delete_confirm_window');
    const delete_popup = getByTestId('delete_popup');
    
    // Confirming nesting
    expect(delete_parent).toContainElement(delete_header);
    expect(delete_parent).toContainElement(delete_back_button);
    expect(delete_parent).toContainElement(delete_delete_button);
    expect(delete_parent).toContainElement(delete_popup);
    expect(delete_header).not.toContainElement(delete_back_button);
    expect(delete_back_button).not.toContainElement(delete_header);
    expect(delete_delete_button).not.toContainElement(delete_confirm_window);
    expect(delete_confirm_window).toContainElement(delete_popup);
}