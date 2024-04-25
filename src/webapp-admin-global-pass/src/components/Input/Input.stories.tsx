import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { Input as InputComponent, InputProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Input',
  component: InputComponent,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: InputProps = {};

export default meta;

const Template: StoryFn<InputProps> = args => (
  <Canvas>
    <Title> Input default</Title>
    <Container>
      <Row>
        <InputComponent label="Cpf" fullWidth {...args} />
      </Row>
    </Container>
    <Container>
      <Row>
        <InputComponent sizevariant="sm" label="Cpf" {...args} />
      </Row>
    </Container>
    <Container>
      <Row>
        <InputComponent
          sizevariant="sm"
          placeholder="Digite o id ou nome do usuário"
          iconleft="search"
          {...args}
        />
      </Row>
    </Container>
    <Container>
      <Row>
        <InputComponent
          sizevariant="sm"
          placeholder="Digite o id ou nome do usuário"
          type="password"
          {...args}
        />
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
