<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="text-right">
      <button type="button" class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th width="400">產品名稱</th>
        <th width="80">原價</th>
        <th width="80">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </thead>
      <tbody v-for="(item) in products" :key="item.id">
        <tr>
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{item.origin_price}}</td>
          <td>{{item.price}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-primary btn-sm" @click="deleteProduct(item.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <Detail ref="detail" @reloadProductList="getProducts"></Detail>
  </div>
</template>

<script>
  import $ from "jquery";
  import Detail from "./Detail";

  export default {
    data() {
      return {
        products: [],
        isNew: false,
        isLoading: false
      };
    },
    components: {
      Detail
    },
    methods: {
      getProducts() {
        const api = `${process.env.API_PATH}/API/${
          process.env.CUSTOMER_PATH
        }/admin/products`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then(response => {
          console.log(response.data.products);
          this.products = response.data.products;
          vm.isLoading = false;
        });
      },
      openModal(isNew, item) {
        this.$refs.detail.$refs.files.value = "";
        if (isNew) {
          (this.$refs.detail.tempProduct = {}), (this.$refs.detail.isNew = true);
        } else {
          (this.$refs.detail.tempProduct = Object.assign({}, item)),
          (this.$refs.detail.isNew = false);
        }
        $("#productModal").modal("show");
      },
      deleteProduct(product_id) {
        const api =
          `${process.env.API_PATH}/API/${
          process.env.CUSTOMER_PATH
        }/admin/product/${product_id}`;
        const vm = this;
        if (confirm('確定要刪除嗎?')) {
          this.$http.delete(api).then(response => {
            if (response.data.success) {

              this.getProducts();
            } else {
              alert("無法刪除");
            }
          });
        }
      }
    },
    created() {
      this.getProducts();
    }
  };

</script>
