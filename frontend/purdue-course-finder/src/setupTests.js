// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

function testDeletePage() {
    // On page normally
    expect(getByText('delete_parent')).toBeVisible();
    expect(getByText('delete_header')).toBeVisible();
    expect(getByText('delete_back_button')).toBeVisible();
    expect(getByText('delete_delete_button')).toBeVisible();

    // Not originally on page
    expect(getByText('delete_confirm_window')).not.toBeVisible();
}