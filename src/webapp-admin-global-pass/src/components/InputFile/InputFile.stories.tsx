import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { InputFile as InputFileComponent, InputFileProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/InputFile',
  component: InputFileComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: InputFileProps = {
  onChangeFile: () => {},
};

export default meta;

const Template: StoryFn<InputFileProps> = args => (
  <Canvas>
    <Title> InputFile default</Title>
    <Container>
      <Row>
        <InputFileComponent accept="image/png, image/gif, image/jpeg" {...args}>
          Adicionar foto
        </InputFileComponent>
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
