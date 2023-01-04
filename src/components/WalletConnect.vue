<template>
  <div class="greetings">
    <h1 class="green mt-5">Wallet Connect Guide</h1>
    <h3 class="mt-4">
      This is a guide to integrating WalletConnect into a Vue JS project.
    </h3>
    <h3 class="mt-3">
      Try the new wallet connect by clicking on the button below.
    </h3>

    <div class="mt-5">
      <b-button
        class="is-primary"
        @click="openModal()"
        v-if="!account"
        style="width: 100%; padding: 10px"
      >
        Connect
      </b-button>
      <div
        v-if="account !== undefined && account"
        class="has-text-left box-account mt-6"
      >
        <div class="is-flex is-align-items-center">
          <h4 class="mr-2">
            <i class="color-success fa-sharp fa-solid fa-circle-check"></i>
          </h4>
          <h4 class="color-dark">CONNECTED</h4>
        </div>
        <h4 class="color-dark mt-3">
          {{ account }}
        </h4>
      </div>
    </div>
    <div class="has-text-centered">
      <p class="mt-6">
        Developed with ♥︎ by
        <a href="https://yomi.digital" target="blank">YOMI</a>
      </p>
      <p>
        Wallet Connect -
        <a href="https://docs.walletconnect.com/2.0/" target="blank">docs</a>
      </p>
      <div class="mt-4 is-flex is-align-items-center is-justify-content-center">
        <a
          href="https://github.com/yomi-digital/walletconnect-vue-boilerplate"
          target="_blank"
          class="mr-3"
          ><i class="fa-brands fa-github"></i
        ></a>
        <a href="https://twitter.com/YOMI_WEB3" target="_blank" class="mr-3"
          ><i class="fa-brands fa-twitter"></i
        ></a>
        <a href="https://discord.gg/w54Jbd4Qhz" target="_blank" class="mr-3"
          ><i class="fa-brands fa-discord"></i
        ></a>
        <a
          href="https://www.linkedin.com/company/yomidigitalhub/"
          target="_blank"
          class="mr-3"
          ><i class="fa-brands fa-linkedin"></i
        ></a>
        <a href="https://www.instagram.com/yomi_web3/" target="_blank"
          ><i class="fa-brands fa-instagram"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  configureChains,
  createClient,
  watchAccount,
  getProvider,
} from "@wagmi/core";
import { goerli, mainnet } from "@wagmi/core/chains";
import { Web3Modal } from "@web3modal/html";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

export default {
  name: "wallet-connect",
  data() {
    return {
      web3modal: {},
      web3client: {},
      account: "",
      balance: 0,
    };
  },
  mounted() {
    const app = this;
    const chains = [mainnet, goerli];
    // Wagmi Core Client
    const { provider } = configureChains(chains, [
      walletConnectProvider({
        projectId: "b93437f2799c397d5341d029cc7bbc48",
      }),
    ]);
    const wagmiClient = createClient({
      autoConnect: true,
      connectors: modalConnectors({ appName: "web3Modal", chains }),
      provider,
    });
    // Web3Modal and Ethereum Client
    app.web3client = new EthereumClient(wagmiClient, chains);
    app.web3modal = new Web3Modal(
      { projectId: "b93437f2799c397d5341d029cc7bbc48" },
      app.web3client
    );
    app.connect();
  },
  methods: {
    async openModal() {
      const app = this;
      app.web3modal.openModal();
    },
    async readState() {
      const app = this;
      const account = app.web3client.getAccount();
      app.account = account.address;
      const provider = getProvider();
      console.log("Provider:", provider);
      const signer = provider.getSigner();
      console.log("Signer:", signer);
      const balance = await provider.getBalance(app.account);
      app.balance = balance;
      console.log("Balance:", balance.toString());
    },
    async connect() {
      const app = this;
      console.log("Try background connection");
      app.readState();
      watchAccount((connected) => {
        app.readState();
      });
    },
  },
};
</script>