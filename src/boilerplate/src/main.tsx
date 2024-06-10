import ReactDOM from 'react-dom/client';

import MyThemeProvider from './theme/MyThemeProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MyThemeProvider>
    <App />
  </MyThemeProvider>
);
