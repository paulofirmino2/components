import { FC, ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { Menu } from '../Menu';
import { Sidebar } from '../Sidebar';

import * as Styled from './MainLayout.styled';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPathname, setCurrentPathname] = useState('');

  useEffect(() => {
    setCurrentPathname(pathname);
  }, []);

  useEffect(() => {
    if (currentPathname !== pathname) {
      setCurrentPathname(pathname);
      setMenuOpen(false);
    }
  }, [pathname]);

  const handleClickMenu = () => {
    setMenuOpen(true);
  };

  return (
    <Styled.Wrapper>
      <Styled.Header>
        <Styled.LogoWrapper>
          <img className="logo" alt="logo globalpass" src="/logo.svg" />
        </Styled.LogoWrapper>
        <Styled.MenuButton onClick={handleClickMenu}>
          <HamburgerMenuIcon />
        </Styled.MenuButton>
      </Styled.Header>
      <Styled.Container>
        <Sidebar />
        {menuOpen && <Menu handleClose={() => setMenuOpen(false)} />}

        <Styled.Content>{children}</Styled.Content>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default MainLayout;
