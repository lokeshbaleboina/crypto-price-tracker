

// src/App.js
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import CryptoTable from './components/CryptoTable';
import { CryptoSocketService } from './services/cryptoSocketService';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize and connect the socket service
    const socketService = new CryptoSocketService(store);
    socketService.connect();
    
    // Cleanup on unmount
    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Crypto Price Tracker</h1>
        </header>
        <main>
          <CryptoTable />
        </main>
        <footer>
          <p>Data updates every 1.5 seconds (simulated WebSocket)</p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;