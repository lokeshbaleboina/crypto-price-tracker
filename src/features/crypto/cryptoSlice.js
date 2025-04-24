// src/features/crypto/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state with sample crypto data based on the provided image
const initialState = {
  cryptos: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '₿',
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21,
      chartData: [65, 70, 68, 67, 75, 82, 90]
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'Ξ',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      chartData: [60, 62, 65, 64, 68, 75, 85]
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: '₮',
      price: 1.00,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      chartData: [1, 1, 1, 1, 1, 1, 1]
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: 'Ⓧ',
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      chartData: [1.95, 2.00, 2.02, 2.10, 2.15, 2.18, 2.22]
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      logo: 'Ⓑ',
      price: 606.65,
      change1h: 0.09,
      change24h: -1.20,
      change7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89,
      maxSupply: 200,
      chartData: [570, 580, 590, 610, 600, 595, 607]
    }
  ],
  status: 'idle',
  error: null
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { id, price, change1h, change24h, change7d, volume24h } = action.payload;
      const cryptoIndex = state.cryptos.findIndex(crypto => crypto.id === id);
      
      if (cryptoIndex !== -1) {
        state.cryptos[cryptoIndex] = {
          ...state.cryptos[cryptoIndex],
          price,
          change1h,
          change24h,
          change7d,
          volume24h,
          // Update the last value in chartData with new price trend
          chartData: [...state.cryptos[cryptoIndex].chartData.slice(1), 
                      state.cryptos[cryptoIndex].chartData[6] * (1 + (Math.random() * 0.05 - 0.025))]
        };
      }
    }
  }
});

export const { updateCryptoPrice } = cryptoSlice.actions;

// Selectors
export const selectAllCryptos = state => state.crypto.cryptos;
export const selectCryptoById = (state, cryptoId) => state.crypto.cryptos.find(crypto => crypto.id === cryptoId);

export default cryptoSlice.reducer;