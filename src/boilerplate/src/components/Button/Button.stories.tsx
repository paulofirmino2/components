import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { Button as ButtonComponent, ButtonProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Button',
  component: ButtonComponent,
  argTypes: {
    fullWidth: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    variant: {
      control: {
        type: 'radio',
        options: ['primary', 'secondary'],
      },
      defaultValue: 'primary',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: ButtonProps = {};

export default meta;

const Template: StoryFn<ButtonProps> = args => (
  <Canvas>
    <Title> Button default</Title>
    <Container>
      <Row>
        <ButtonComponent {...args}>Button</ButtonComponent>
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
