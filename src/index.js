import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundaryWithRouter } from './components';

Sentry.init({
  dsn: "https://fc2400a639f64961be0888ef06fb9196@o1128064.ingest.sentry.io/6170372",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundaryWithRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundaryWithRouter>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
