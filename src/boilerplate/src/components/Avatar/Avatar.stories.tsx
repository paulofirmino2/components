import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { Avatar as AvatarComponent, AvatarProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Avatar',
  component: AvatarComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: AvatarProps = {};

export default meta;

const Template: StoryFn<AvatarProps> = args => (
  <Canvas>
    <Title> Avatar</Title>
    <Container>
      <Row>
        <AvatarComponent {...args} /> <div style={{ marginLeft: 20 }} />
        <AvatarComponent {...args} name="Charles Lee" />
        <div style={{ marginLeft: 20 }} />
        <AvatarComponent
          {...args}
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        />
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
