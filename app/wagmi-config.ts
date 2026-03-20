import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { Attribution } from "ox/erc8021";

const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ["bc_2l271qnd"],
});

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
  dataSuffix: DATA_SUFFIX,
});
