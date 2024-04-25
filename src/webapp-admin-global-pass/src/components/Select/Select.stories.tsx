import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { Select as SelectComponent, SelectProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Select',
  component: SelectComponent,
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

const argsProps: SelectProps = {};

export default meta;

const Template: StoryFn<SelectProps> = args => (
  <Canvas>
    <Title> Select default</Title>
    <Container>
      <Row>
        <SelectComponent
          label="Cpf"
          placeholder="Selecione..."
          {...args}
          options={[
            { label: 'Teste 1', value: 'teste1' },
            { label: 'Teste 2', value: 'teste2' },
          ]}
        />
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
