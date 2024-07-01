import { create, themes } from '@storybook/theming';
import logo from '../public/logoasset.png';

export default create({
  base: themes.dark,

  colorPrimary: '#ffffff',
  colorSecondary: '#4379C1',

  brandTitle: 'PortoAsset - Design System',
  brandUrl: 'https://www.portoseguro.com.br/fundos-de-investimento',
  brandImage: logo,
});
