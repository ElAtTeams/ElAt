import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByPlaceholderText('E-posta adresi')).toBeTruthy();
    expect(getByPlaceholderText('Şifre')).toBeTruthy();
    expect(getByText('Giriş Yap')).toBeTruthy();
  });

  it('shows error on empty submit', () => {
    const { getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    fireEvent.press(getByText('Giriş Yap'));
    expect(getByText(/Lütfen geçerli bir e-posta adresi giriniz.|Lütfen şifrenizi giriniz./)).toBeTruthy();
  });
});