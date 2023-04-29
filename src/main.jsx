import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// style sheet
import "./index.css";
import "./styles/itemdetails.css";
import "./styles/login.css";
import "./styles/navbar.css";
import "./styles/yourcart.css";
import "./styles/buystatus.css";
import { QueryClient, QueryClientProvider } from "react-query";

const root = document.getElementById("root");
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 4 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchInterval: true,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
