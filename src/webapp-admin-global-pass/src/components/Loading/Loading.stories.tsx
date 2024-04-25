import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { Loading as LoadingComponent, LoadingProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Loading',
  component: LoadingComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: LoadingProps = {};

export default meta;

const Template: StoryFn<LoadingProps> = args => (
  <Canvas>
    <Title> Loading</Title>
    <Container>
      <Row>
        <LoadingComponent {...args} />
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
