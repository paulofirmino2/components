import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Canvas, Container, Row, Title } from '../../utils/StoriesComponents';
import { Button } from '../Button';

import { Dialog as DialogComponent, DialogProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Forms/Dialog',
  component: DialogComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: DialogProps = { open: false, setOpen: () => {} };

export default meta;

const Template: StoryFn<DialogProps> = args => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Canvas>
      <Title> Dialog default</Title>

      <Container>
        <Row>
          <Button sizevariant="sm" onClick={() => setOpenDialog(true)}>
            Open Dialog
          </Button>
          <DialogComponent
            {...args}
            title="Você deseja excluir o usuário?"
            open={openDialog}
            setOpen={setOpenDialog}
          >
            children
          </DialogComponent>
        </Row>
      </Container>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
