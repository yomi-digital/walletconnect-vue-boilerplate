<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
</script>

<template>
  <div>
    <WelcomeItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Get in started</template>

      To use the new version of web3modal first you will need to create your Vue
      project using vite.<br /><br />
      Initialize your project using the npm terminal command<br />
      <code>npm create vue@3</code> or <code>npm create vue@2</code><br />
      You will be able to use Vue2 or Vue3 indifferently.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <ToolingIcon />
      </template>
      <template #heading>Add Packages</template>

      After creating your project you will need to install the components
      necessary for <code>web3modal</code> to work.<br /><br />
      run this command from the terminal:<br />
      <b-tabs position="is-left" class="block">
        <b-tab-item label="yarn">
          <code
            >yarn add @web3modal/ethereum @web3modal/html @wagmi/core
            ethers</code
          ></b-tab-item
        >
        <b-tab-item label="npm">
          <code
            >npm install @web3modal/ethereum @web3modal/html @wagmi/core
            ethers</code
          ></b-tab-item
        >
      </b-tabs>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <EcosystemIcon />
      </template>
      <template #heading>Import</template>

      a visit.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <CommunityIcon />
      </template>
      <template #heading>Community</template>

      Got stuck? Ask your question on
      <a target="_blank" href="https://chat.vuejs.org">Vue Land</a>, our
      official Discord server, or
      <a
        target="_blank"
        href="https://stackoverflow.com/questions/tagged/vue.js"
        >StackOverflow</a
      >. You should also subscribe to
      <a target="_blank" href="https://news.vuejs.org">our mailing list</a> and
      follow the official
      <a target="_blank" href="https://twitter.com/vuejs">@vuejs</a>
      twitter account for latest news in the Vue world.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <SupportIcon />
      </template>
      <template #heading>Support Vue</template>

      As an independent project, Vue relies on community backing for its
      sustainability. You can help us by
      <a target="_blank" href="https://vuejs.org/sponsor/">becoming a sponsor</a
      >.
      <div style="margin-top: 30px">
        <button @click="connect()" style="width: 100%; padding: 10px">
          Connect
        </button>
      </div>
    </WelcomeItem>
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
