import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { find, orderBy } from 'lodash';

import { useUser } from '@/hook/selectors/userHooks';
import { logout } from '@/utils/services/auth';
import { getColor, menuList } from '@/utils/services/menu';

import * as Styled from './MenuMobileItems.styled';

const menuListWithExitOption = [
  ...menuList,
  ...[
    {
      id: 99,
      label: 'Sair',
      path: '/sair',
      icon: {
        alt: 'ícone de smartphone',
        src: '/logout-icon.svg',
        srcSelected: '/logout-icon.svg',
      },
    },
  ],
];

export const MenuMobileItems: FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: userData } = useUser();

  const [menuListSanitized, setMenuListSanitized] = useState(
    menuListWithExitOption
  );
  const [fillMenuRule, setFillMenuRule] = useState(false);

  const menuSelected = find(menuListSanitized, ['path', pathname]);

  useEffect(() => {
    if (!fillMenuRule) {
      if (userData?.is_superuser) {
        const newMenuList = [...menuListWithExitOption];
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

  const handleLogout = () => {
    logout();
  };

  const menuAction = (path: string) => {
    if (path === '/sair') {
      handleLogout();
    } else {
      navigate(path);
    }
    handleClose();
  };

  return (
    <List>
      {orderBy(menuListSanitized, ['id'], ['asc']).map(item => (
        <ListItem disablePadding key={item.id}>
          <ListItemButton onClick={() => menuAction(item.path)}>
            <ListItemIcon
              style={{
                color: getColor(
                  item.id,
                  (menuSelected && menuSelected.id) || 0
                ),
                minWidth: 40,
              }}
            >
              <img
                alt={item.icon.alt}
                src={
                  item.icon[
                    menuSelected && menuSelected.id !== item.id
                      ? 'src'
                      : 'srcSelected'
                  ]
                }
              />
            </ListItemIcon>
            <Styled.WrapperText>
              <ListItemText
                primary={item.label}
                style={{
                  color: getColor(
                    item.id,
                    (menuSelected && menuSelected.id) || 0
                  ),
                }}
              />
            </Styled.WrapperText>
            {menuSelected && menuSelected.id === item.id && (
              <ListItemIcon
                style={{
                  color: getColor(item.id, menuSelected.id),
                  minWidth: 0,
                }}
              >
                <img
                  style={{ color: getColor(item.id, menuSelected.id) }}
                  id="right-arrow-icon"
                  alt="ícone de seta para direita"
                  src="/arrow-right-icon.svg"
                />
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
