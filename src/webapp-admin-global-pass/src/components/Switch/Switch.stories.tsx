import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { Switch as SwitchComponent, SwitchProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Switch',
  component: SwitchComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: SwitchProps = {};

export default meta;

const Template: StoryFn<SwitchProps> = args => (
  <Canvas>
    <Title> Switch default</Title>
    <Container>
      <Row>
        <SwitchComponent {...args} />
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
