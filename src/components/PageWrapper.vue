<template>
  <div class="pagination">
    <a>上一页</a>
    <a
      href=""
      v-for="(item, index) in 8"
      class=""
      :class="index + 1 == current ? 'active' : 'unactive'"
      @click.prevent="tothispage(index + 1, $event)"
      >{{ index + 1 }}</a
    >
    <a>下一页</a>
    <a style="margin-left: 30px">共 11 条</a>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      pre_ellipsis: false,
      aft_ellipsis: false,
      current: 1,
    }
  },
  methods: {
    tothispage(index, e) {
      // Http请求
      // e.
      this.current = index
    },
  },
  // pageNo: 当前的页数，pageSize：每一页展示数据的量 total：总数 continues：连续的页数
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import '../assets/css/pagewrapper.scss';
</style>
