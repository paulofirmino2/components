import { FC } from 'react';

import { useUser } from '@/hook/selectors/userHooks';
import { logout } from '@/utils/services/auth';

import { Avatar } from '../Avatar';

import * as Styled from './UserInfoSidebar.styled';

const UserInfoSidebar: FC = () => {
  const { data } = useUser();
  const handleClickLogout = () => {
    logout();
  };
  return (
    <Styled.Wrapper>
      <Styled.UserInfoWrapper>
        <Avatar name={data?.extra_data?.name} src={data?.photo} />
        <Styled.UserInfo>
          <p>
            <strong>{data?.extra_data?.name}</strong>
          </p>
        </Styled.UserInfo>
      </Styled.UserInfoWrapper>
      <Styled.LogoutButton onClick={handleClickLogout}>
        <img alt="ícone de uma porta aberta" src="/logout-icon.svg" />
      </Styled.LogoutButton>
    </Styled.Wrapper>
  );
};

export default UserInfoSidebar;
