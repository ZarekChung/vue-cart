<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <CreateCoupons @reload-coupons="getCoupons"></CreateCoupons>
    <table class="table mt-4">
      <thead>
        <th width="200">優惠券名稱</th>
        <th width="200">code</th>
        <th width="120">折扣</th>
        <th width="80">到期日</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </thead>
      <tbody v-for="(item) in coupons" :key="item.id">
        <tr>
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.percent}}</td>
          <td>{{customFormatter(item.due_date)}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-primary btn-sm" @click="deleteCoupons(item.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <Pagination ref="pages"></Pagination> -->
  </div>
</template>

<script>
  import CreateCoupons from "./CreateCoupons";
  import $ from "jquery";
  import moment from "moment";
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
          console.log(response.data);
          this.coupons = response.data.coupons;
          vm.isLoading = false;
          //this.$refs.pages.pagination = response.data.pagination;
        });
      },
      deleteCoupons(coupon_id) {
        const api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/admin/coupon/${coupon_id}`;
        const vm = this;
        if (confirm("確定要刪除嗎?")) {
          this.$http.delete(api).then(response => {
            if (response.data.success) {
              this.getCoupons();
              this.$bus.$emit("message:push", response.data.message, "success");
            } else {
              this.$bus.$emit("message:push", response.data.message, "danger");
            }
          });
        }
      },
      customFormatter(date) {
                var newDate = moment(date).format('YYYY-MM-DD');
                return newDate;
            }
    },
    created() {
      this.getCoupons();
    }
  }
</script>
