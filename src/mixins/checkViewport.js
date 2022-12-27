export default {
  data() {
    return {
      isXS: false,
      isSM: false,
      isMD: false,
      isLG: false,
      isXL: false,
    };
  },
  async mounted() {
    this.checkViewport();
  },
  methods: {
    checkViewport() {
      console.log("init Function");
      const app = this;
      if (window.innerWidth < 450) {
        app.isXS = true;
        app.isSM = false;
        app.isMD = false;
        app.isLG = false;
        app.isXL = false;
      } else if (window.innerWidth > 450 && window.innerWidth < 768) {
        app.isXS = true;
        app.isSM = true;
        app.isMS = false;
        app.isLG = false;
        app.isXL = false;
      } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
        app.isXS = false;
        app.isSM = false;
        app.isMD = true;
        app.isLG = false;
        app.isXL = false;
      } else if (window.innerWidth > 1024 && window.innerWidth < 1440) {
        app.isXS = false;
        app.isSM = false;
        app.isMD = false;
        app.isLG = true;
        app.isXL = false;
      } else if (window.innerWidth > 1440) {
        app.isXS = false;
        app.isSM = false;
        app.isMD = false;
        app.isLG = false;
        app.isXL = true;
      }

      window.addEventListener("resize", function () {
        if (window.innerWidth < 450) {
          app.isXS = true;
          app.isSM = false;
          app.isMD = false;
          app.isLG = false;
          app.isXL = false;
        } else if (window.innerWidth > 450 && window.innerWidth < 768) {
          app.isXS = false;
          app.isSM = true;
          app.isMS = false;
          app.isLG = false;
          app.isXL = false;
        } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
          app.isXS = false;
          app.isSM = false;
          app.isMD = true;
          app.isLG = false;
          app.isXL = false;
        } else if (window.innerWidth > 1024 && window.innerWidth < 1440) {
          app.isXS = false;
          app.isSM = false;
          app.isMD = false;
          app.isLG = true;
          app.isXL = false;
        } else if (window.innerWidth > 1440) {
          app.isXS = false;
          app.isSM = false;
          app.isMD = false;
          app.isLG = false;
          app.isXL = true;
        }
      });
    },
  },
};
