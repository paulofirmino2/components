import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';
import { Button } from '../Button';

import { ToastVariants } from './Toast.types';
import { Toast as ToastComponent, ToastProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Toast',
  component: ToastComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: ToastProps = { variant: 'success' };

export default meta;

const Template: StoryFn<ToastProps> = args => {
  const [toastVariant, setToastVariant] = useState<ToastVariants>('success');

  const message = {
    success: 'Mensagem sucesso!',
    error: 'Mensagem erro!',
    warning: 'Mensagem alerta!',
  };

  const handleClick = (type: ToastVariants) => {
    setToastVariant(type);
    toast(message[type], { id: type });
  };
  return (
    <Canvas>
      <Title> Toast (success, error, warning)</Title>
      <Container>
        <div style={{ display: 'flex', width: '100%', marginLeft: 20 }}>
          <Button
            onClick={() => handleClick('success')}
            style={{ backgroundColor: '#1F9958', marginRight: '20px' }}
          >
            Success
          </Button>
          <Button
            onClick={() => handleClick('error')}
            style={{ backgroundColor: '#FF3A29', marginRight: '20px' }}
          >
            Error
          </Button>
          <Button
            onClick={() => handleClick('warning')}
            style={{ backgroundColor: '#FFB200', marginRight: '20px' }}
          >
            Warning
          </Button>
        </div>
        <Row>
          <ToastComponent {...args} variant={toastVariant} id={toastVariant} />
        </Row>
      </Container>
      <Container style={{ marginTop: 50 }}>
        <Title>
          This Toast use the <strong>react-hot-toast</strong>, see documentation
          at the link below
        </Title>
      </Container>
      <Container>
        <Title>
          <a
            href="https://react-hot-toast.com/"
            target="_blank"
            rel="noreferrer"
          >
            https://react-hot-toast.com/
          </a>
        </Title>
      </Container>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
