// src/components/CryptoTable.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCryptos } from '../features/crypto/cryptoSlice';
import MiniChart from './MiniChart';
import './CryptoTable.css';

const CryptoTable = () => {
  const cryptos = useSelector(selectAllCryptos);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };

  // Determine color class based on percentage
  const getPercentClass = (percent) => {
    if (percent > 0) return 'positive';
    if (percent < 0) return 'negative';
    return '';
  };

  // Format percentage with sign
  const formatPercent = (percent) => {
    const sign = percent > 0 ? '↑' : percent < 0 ? '↓' : '';
    return `${sign} ${Math.abs(percent).toFixed(2)}%`;
  };

  return (
    <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th className="hide-mobile">1h %</th>
            <th>24h %</th>
            <th className="hide-mobile">7d %</th>
            <th className="hide-mobile">Market Cap</th>
            <th className="hide-mobile">Volume(24h)</th>
            <th className="hide-mobile">Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.id}</td>
              <td>
                <div className="crypto-name">
                  <span className="crypto-logo">{crypto.logo}</span>
                  <span className="crypto-name-text">{crypto.name}</span>
                  <span className="crypto-symbol">{crypto.symbol}</span>
                </div>
              </td>
              <td>${crypto.price.toLocaleString()}</td>
              <td className={`hide-mobile ${getPercentClass(crypto.change1h)}`}>
                {formatPercent(crypto.change1h)}
              </td>
              <td className={getPercentClass(crypto.change24h)}>
                {formatPercent(crypto.change24h)}
              </td>
              <td className={`hide-mobile ${getPercentClass(crypto.change7d)}`}>
                {formatPercent(crypto.change7d)}
              </td>
              <td className="hide-mobile">{formatNumber(crypto.marketCap)}</td>
              <td className="hide-mobile">{formatNumber(crypto.volume24h)}</td>
              <td className="hide-mobile">
                {crypto.circulatingSupply.toFixed(2)}M {crypto.symbol}
              </td>
              <td>
                <MiniChart data={crypto.chartData} change7d={crypto.change7d} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
