import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  avalanche,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { openTransactionModal } from "@xswap-link/sdk";

// RainbowKit config
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, avalanche],
  ssr: false,
});
const queryClient = new QueryClient();

// XPay logic
export const XPay = () => {
  // Wagmi hook to execute transactions

  // XPay configuration responsible for opening modal and building the transactions
  const openXPay = async () => {
    const integratorId = import.meta.env.VITE_INTEGRATOR_ID;
    if (!integratorId) {
      throw new Error("INTEGRATOR_ID is not set in the .env file");
    }

    await openTransactionModal({
      integratorId, // integrator Id from .env
      dstChain: "8453", // Base
      dstToken: "0x8fe815417913a93ea99049fc0718ee1647a2a07c", // XSWAP Token
    });
  };

  // Minimal UI
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">XSwap Demo App</div>
        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <main className="main-content">
        <img
          src="https://xswap.link/assets/og_image.jpg"
          className="header-image"
          alt="XSwap"
        />
        <div className="content">
          <ConnectButton />
          <button className="xpay-button" onClick={openXPay}>
            Buy $XSwap
          </button>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 XSwap. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <XPay />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
