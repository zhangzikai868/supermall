// 混入---回到顶部
// 回到顶部组件
import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    // 监听显示回到顶部按钮和回到顶部
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  },
  components: {
    BackTop
  }
};
