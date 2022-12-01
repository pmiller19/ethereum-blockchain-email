import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import ComposeEmail from "./pages/composeEmail";
import Dashboard from "./pages/dashboard";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const App = () => {
  const { chains, provider } = configureChains(
    [
      chain.goerli,
      chain.mainnet,
      chain.polygon,
      chain.optimism,
      chain.arbitrum,
    ],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Ethereum Blockchain Email App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <div className='my-10 mx-10'>
          <Router>
            <div>
              <Header />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/compose' element={<ComposeEmail />} />
              </Routes>
            </div>
          </Router>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
