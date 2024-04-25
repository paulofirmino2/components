import { FC } from 'react';
import { Avatar } from '@mui/material';

import { MenuMobileItems } from '@/components/MenuMobileItems/MenuMobileItems';
import { useUser } from '@/hook/selectors/userHooks';

import { Typography } from '../Typography';

import * as Styled from './Menu.styled';

const Menu: FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const { data } = useUser();

  return (
    <Styled.Wrapper>
      <Styled.CloseButton onClick={handleClose}>
        <img alt="ícone com letra X" src="/close-icon.svg" />
      </Styled.CloseButton>
      <img className="logo" alt="logo globalpass" src="/logo.svg" />

      <Avatar
        alt={data?.extra_data?.name}
        src={data?.photo}
        sx={{ width: 80, height: 80 }}
      />
      {data && (
        <Typography variant="title" align="center" spacing="xs">
          {data?.extra_data?.name}
        </Typography>
      )}
      <MenuMobileItems handleClose={handleClose} />
    </Styled.Wrapper>
  );
};

export default Menu;
