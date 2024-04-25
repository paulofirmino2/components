import { create, themes } from '@storybook/theming';
import logo from '../public/logo.svg';

export default create({
  base: themes.dark,

  colorPrimary: '#ffffff',
  colorSecondary: '#4379C1',

  brandTitle: 'GlobalPass - Design System',
  brandUrl: 'https://globalpass.com.br/',
  brandImage: logo,
});
