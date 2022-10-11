// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

function testSignupPage() {
    // On page normally
    expect(getByText('signup_container')).toBeVisible();
    expect(getByText('signup_head')).toBeVisible();
    expect(getByText('signup_form')).toBeVisible();
    expect(getByText('signup_email')).toBeVisible();
    expect(getByText('signup_password1')).toBeVisible();
    expect(getByText('signup_password2')).toBeVisible();
    expect(getByText('signup_signup_button')).toBeVisible();

    // Nesting items
    const signup_container = getByTestId('signup_container');
    const signup_head = getByTestId('signup_head');
    const signup_form = getByTestId('signup_form');
    const signup_email = getByTestId('signup_email');
    const signup_password1 = getByTestId('signup_password1');
    const signup_password2 = getByTestId('signup_password2');
    const signup_signup_button = getByTestId('signup_signup_button');

    // Cofirming nesting
    expect(signup_container).toContainElement(signup_head);
    expect(signup_container).toContainElement(signup_form);
    expect(signup_container).toContainElement(signup_email);
    expect(signup_container).toContainElement(signup_password1);
    expect(signup_container).toContainElement(signup_password2);
    expect(signup_container).toContainElement(signup_signup_button);
    expect(signup_head).not.toContainElement(signup_container);
    expect(signup_head).not.toContainElement(signup_form);
    expect(signup_head).not.toContainElement(signup_signup_button);
    expect(signup_form).toContainElement(signup_email);
    expect(signup_form).toContainElement(signup_password1);
    expect(signup_form).toContainElement(signup_password2);
    expect(signup_form).toContainElement(signup_signup_button);
    expect(signup_password1).not.toContainElement(signup_password1);

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