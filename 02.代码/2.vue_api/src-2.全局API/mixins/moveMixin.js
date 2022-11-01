export default {
  data() {
    return {
      pageX: 0,
      pageY: 0,
    };
  },
  methods: {
    handler(event) {
      //   console.log(event);
      this.pageX = event.clientX;
      this.pageY = event.clientY;
    },
    a() {
      console.log("我是局部的a");
    },
  },
  mounted() {
    document.onmousemove = this.handler;
    console.log("局部的mixin");
  },
  beforeDestroy() {
    document.onmousemove = null;
  },
};
