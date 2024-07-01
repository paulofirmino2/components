import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { Checkbox as CheckboxComponent, CheckboxProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Checkbox',
  component: CheckboxComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: CheckboxProps = {};

export default meta;

const Template: StoryFn<CheckboxProps> = args => (
  <Canvas>
    <Title> Checkbox default</Title>
    <Container>
      <Row>
        <CheckboxComponent {...args}>Texto checkbox</CheckboxComponent>
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
