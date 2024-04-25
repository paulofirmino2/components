import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';

import { DatePicker as DatePickerComponent, DatePickerProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/DatePicker',
  component: DatePickerComponent,
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

const argsProps: DatePickerProps = {
  value: new Date(),
  onChangeValue: () => {},
};

export default meta;

const Template: StoryFn<DatePickerProps> = args => (
  <Canvas>
    <Title> DatePicker default</Title>
    <Container>
      <Row>
        <DatePickerComponent {...args} />
      </Row>
    </Container>
  </Canvas>
);

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
