import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { describe, expect, vi } from 'vitest';

import store from '@/flux/store';
import theme from '@/theme/ThemeDefault';

import { EmployeeFormPresentation } from './EmployeeForm';

const setup = () => {
  const user = userEvent.setup();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  const renderResult = render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <EmployeeFormPresentation />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );

  return {
    user,
    ...renderResult,
  };
};

describe('EmployeeFormPresentation', () => {
  test('should render a H1 title ', async () => {
    const { getByRole, getByText } = setup();
    const title = 'Dados Pessoais';
    const element = getByText(title);

    expect(getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle({ marginBottom: '1.6rem' });
  });

  test('should render 3 Input`s Components ', async () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('name')).toBeInTheDocument();
    expect(queryByTestId('document')).toBeInTheDocument();
    expect(queryByTestId('email')).toBeInTheDocument();
  });

  test('should render a Select Component ', async () => {
    const { user, getByRole } = setup();

    const triggerSelectButton = getByRole('combobox');

    // Initial state
    expect(triggerSelectButton).toBeInTheDocument();
    expect(triggerSelectButton).toHaveAttribute('aria-expanded', 'false');
    expect(
      within(triggerSelectButton).getByText('Selecione...')
    ).toBeInTheDocument();

    // Select click
    await user.click(triggerSelectButton);

    expect(triggerSelectButton).toHaveAttribute('aria-expanded', 'true');
    expect(getByRole('option', { name: 'Administrador' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Coordenador' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Colaborador' })).toBeInTheDocument();

    // Select option
    await user.click(getByRole('option', { name: 'Administrador' }));

    expect(triggerSelectButton).toHaveAttribute('aria-expanded', 'false');
    expect(
      within(triggerSelectButton).getByText('Administrador')
    ).toBeInTheDocument();
  });

  test('should render a cancel button', async () => {
    const { getByText } = setup();
    const label = 'Voltar para a listagem';

    const element = getByText(label);

    expect(getByText(label)).toBeInTheDocument();
    expect(element).toHaveAttribute('id', 'cancel');
    expect(element).toHaveProperty('type', 'button');
  });

  test('should render a save button', async () => {
    const { getByText } = setup();
    const label = 'Salvar cadastro';

    const element = getByText(label);

    expect(getByText('Voltar para a listagem')).toBeInTheDocument();
    expect(element).toHaveProperty('type', 'submit');
  });

  test('should render inputs with default errors', async () => {
    const { getByText, user, getAllByRole } = setup();
    const label = 'Salvar cadastro';

    const saveButton = getByText(label);

    await user.click(saveButton);

    const errorList = getAllByRole('alert');

    expect(errorList.length).toBe(4);

    expect(errorList[0]).toHaveAttribute('id', 'error-name');
    expect(errorList[1]).toHaveAttribute('id', 'error-document');
    expect(errorList[2]).toHaveAttribute('id', 'error-email');
    expect(errorList[3]).toHaveAttribute('id', 'error-role');

    expect(errorList[0]).toHaveTextContent('Campo obrigatório.');
    expect(errorList[1]).toHaveTextContent('Você precisa informar o seu CPF.');
    expect(errorList[2]).toHaveTextContent('Campo obrigatório.');
    expect(errorList[3]).toHaveTextContent('Campo obrigatório.');
  });

  test('should render inputs Name with specific error', async () => {
    const { user, getAllByRole, queryByTestId, getByText } = setup();
    const label = 'Salvar cadastro';
    const inputName = queryByTestId('name');
    const saveButton = getByText(label);

    if (inputName) {
      fireEvent.change(inputName, { target: { value: 'Paulo' } });
      await user.click(saveButton);
      expect(getAllByRole('alert')[0]).toHaveTextContent(
        'Digite o nome completo.'
      );
    }
  });

  test('should render inputs Name with valid value', async () => {
    const { user, getAllByRole, queryByTestId, getByText } = setup();
    const label = 'Salvar cadastro';
    const inputName = queryByTestId('name');
    const saveButton = getByText(label);

    if (inputName) {
      fireEvent.change(inputName, { target: { value: 'Paulo Otavio' } });
      await user.click(saveButton);
      const errorList = getAllByRole('alert');
      errorList.forEach(error => {
        expect(error).not.toHaveAttribute('id', 'error-name');
      });
    }
  });

  test('should render inputs CPF with specific error', async () => {
    const { user, getAllByRole, queryByTestId, getByText } = setup();
    const label = 'Salvar cadastro';
    const inputCPF = queryByTestId('document');
    const saveButton = getByText(label);

    if (inputCPF) {
      fireEvent.change(inputCPF, { target: { value: '367' } });
      await user.click(saveButton);
      expect(getAllByRole('alert')[1]).toHaveTextContent('CPF inválido.');
    }
  });

  test('should render inputs CPF with valid value', async () => {
    const { user, getAllByRole, queryByTestId, getByText } = setup();
    const label = 'Salvar cadastro';
    const inputCPF = queryByTestId('document');
    const saveButton = getByText(label);

    if (inputCPF) {
      fireEvent.change(inputCPF, { target: { value: '36788116806' } });
      await user.click(saveButton);
      const errorList = getAllByRole('alert');
      errorList.forEach(error => {
        expect(error).not.toHaveAttribute('id', 'error-document');
      });
    }
  });
});
