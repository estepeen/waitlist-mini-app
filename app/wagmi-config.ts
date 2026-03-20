import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({ appName: "Skadi", preference: "all" }),
    injected(),
  ],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
