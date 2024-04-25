import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { Typography as TypographyComponent, TypographyProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Typography',
  component: TypographyComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: TypographyProps = {};

export default meta;

const Template: StoryFn<TypographyProps> = args => (
  <Canvas>
    <Title> Typography</Title>
    <Container>
      <Row>
        <TypographyComponent variant="title" {...args}>
          Entrar
        </TypographyComponent>
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
