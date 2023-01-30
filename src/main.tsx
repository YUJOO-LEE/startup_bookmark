import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import initializeMockupWorker from '@/__mock__';
import GlobalStyles from './asset/globalStyles';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

initializeMockupWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Global styles={GlobalStyles} />
            <App />
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  );
});
