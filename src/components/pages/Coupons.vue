<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <CreateCoupons @reload-coupons="getCoupons"></CreateCoupons>
    <table class="table mt-4">
      <thead>
        <th width="200">優惠券名稱</th>
        <th width="120">折扣</th>
        <th width="80">到期日</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </thead>
      <tbody v-for="(item) in coupons" :key="item.id">
        <tr>
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-primary btn-sm">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <Pagination ref="pages"></Pagination> -->
  </div>
</template>

<script>
  import CreateCoupons from "./CreateCoupons";
  export default {
    data() {
      return {
        coupons: [],
        isLoading: false
      }
    },
    components: {
      CreateCoupons
    },
    methods: {
      getCoupons(page = 1) {
        const api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/admin/coupons?page=${page}`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then(response => {
          console.log(response.data.products);
          this.coupons = response.data.coupons;
          vm.isLoading = false;
          //this.$refs.pages.pagination = response.data.pagination;
        });
      },
    },
    created() {
      this.getCoupons();
    }
  }
</script>
