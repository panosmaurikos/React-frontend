import { StrictMode } from 'react';
import { IonApp } from '@ionic/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { routesSection } from './routes/sections';

// Create a root
const root = createRoot(document.getElementById('root')!);

// Render the app
root.render(
  <StrictMode>
    <IonApp>
      <BrowserRouter>
        <App>
          {routesSection}
        </App>
      </BrowserRouter>
    </IonApp>
  </StrictMode>
);