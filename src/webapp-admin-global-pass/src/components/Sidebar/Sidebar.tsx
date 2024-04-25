import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { find, includes, uniqueId } from 'lodash';

import { useUser } from '@/hook/selectors/userHooks';
import { getColor, menuList } from '@/utils/services/menu';

import { UserInfoSidebar } from '../UserInfoSidebar';

import * as Styled from './Sidebar.styled';

const Sidebar: FC = () => {
  const { pathname } = useLocation();

  const { data: userData } = useUser();

  const [menuListSanitized, setMenuListSanitized] = useState(menuList);
  const [fillMenuRule, setFillMenuRule] = useState(false);
  const menuSelected = find(menuListSanitized, value =>
    includes(pathname, value.path)
  );

  useEffect(() => {
    if (!fillMenuRule) {
      if (userData?.is_superuser) {
        const newMenuList = [...menuList];
        newMenuList.push({
          id: 98,
          label: 'Empresa',
          path: '/empresa',
          icon: {
            alt: 'ícone de um prédio',
            src: '/building-icon.svg',
            srcSelected: '/building-icon-selected.svg',
          },
        });
        setMenuListSanitized(newMenuList);
        setFillMenuRule(true);
      } else {
        setMenuListSanitized(menuList);
      }
    }
  }, [userData, fillMenuRule]);
  return (
    <Styled.Wrapper>
      <Styled.LogoWrapper>
        <img className="logo" alt="logo globalpass" src="/logo.svg" />
      </Styled.LogoWrapper>
      <Styled.Navbar>
        <ul>
          {menuListSanitized.map(({ label, path, icon, id }) => (
            <li key={uniqueId()}>
              <Link
                to={path}
                style={{
                  color: getColor(id, (menuSelected && menuSelected.id) || 0),
                }}
              >
                <img
                  alt={icon.alt}
                  src={
                    icon[
                      menuSelected && menuSelected.id !== id
                        ? 'src'
                        : 'srcSelected'
                    ]
                  }
                />
                {label}
                {menuSelected && menuSelected.id === id && (
                  <img
                    style={{
                      color: getColor(id, menuSelected && menuSelected.id),
                    }}
                    id="right-arrow-icon"
                    alt="ícone de seta para direita"
                    src="/arrow-right-icon.svg"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Styled.Navbar>
      <Styled.UserInfoSidebarWrapper>
        <UserInfoSidebar />
      </Styled.UserInfoSidebarWrapper>
    </Styled.Wrapper>
  );
};

export default Sidebar;
