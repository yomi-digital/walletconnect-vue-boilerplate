<template>
  <div class="greetings">
    <h1 class="green mt-5">Wallet Connect Guide</h1>
    <h3 class="mt-4">
      This is a guide to integrating WalletConnect into a Vue JS project.
    </h3>
    <h3 class="mt-3">
      Try the new wallet connect by clicking on the button below
    </h3>

    <div class="mt-5">
      <b-button
        class="is-primary"
        @click="connect()"
        style="width: 100%; padding: 10px"
      >
        Connect
      </b-button>
    </div>
    <div class="has-text-centered">
      <p class="mt-6">
        Developed with ♥︎ by
        <a href="https://yomi.digital" target="blank">YOMI</a>
      </p>
      <div class="mt-4 is-flex is-align-items-center is-justify-content-center">
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
import { configureChains, createClient } from "@wagmi/core";
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
    const ethereumClient = new EthereumClient(wagmiClient, chains);
    app.web3modal = new Web3Modal(
      { projectId: "b93437f2799c397d5341d029cc7bbc48" },
      ethereumClient
    );
  },
  methods: {
    async connect() {
      const app = this;
      console.log("try init connect");
      app.web3modal.openModal();
      console.log("iter finish");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 1;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    display: block;
    text-align: left;
  }
}

a {
  i {
    font-size: 1.5rem;
  }
}
</style>
