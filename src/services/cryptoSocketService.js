// src/services/cryptoSocketService.js
export class CryptoSocketService {
    constructor(store) {
      this.store = store;
      this.interval = null;
    }
  
    connect() {
      // Simulate WebSocket connection
      this.interval = setInterval(() => {
        // Get current state
        const state = this.store.getState();
        const cryptos = state.crypto.cryptos;
        
        // Update each crypto with random price changes
        cryptos.forEach(crypto => {
          // Generate random price changes within reasonable ranges
          const priceChange = crypto.price * (Math.random() * 0.02 - 0.01); // -1% to +1%
          const newPrice = +(crypto.price + priceChange).toFixed(2);
          
          // Generate random percentage changes
          const newChange1h = +(crypto.change1h + (Math.random() * 0.1 - 0.05)).toFixed(2);
          const newChange24h = +(crypto.change24h + (Math.random() * 0.2 - 0.1)).toFixed(2);
          const newChange7d = +(crypto.change7d + (Math.random() * 0.3 - 0.15)).toFixed(2);
          
          // Generate random volume change
          const volumeChange = crypto.volume24h * (Math.random() * 0.05 - 0.025); // -2.5% to +2.5%
          const newVolume = Math.floor(crypto.volume24h + volumeChange);
          
          // Dispatch update action
          this.store.dispatch({
            type: 'crypto/updateCryptoPrice',
            payload: {
              id: crypto.id,
              price: newPrice,
              change1h: newChange1h,
              change24h: newChange24h,
              change7d: newChange7d,
              volume24h: newVolume
            }
          });
        });
      }, 1500); // Update every 1.5 seconds
    }
  
    disconnect() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }