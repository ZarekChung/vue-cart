<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="80">是否啟用</th>
        <th width="80">編輯</th>
      </thead>
      <tbody v-for="(item) in products" :key="item.id">
        <tr>
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
          <td><span v-if="item.is_enabled" class="text-success">啟用</span>
            <span>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        products: [],
      };
    },
    methods: {
      getProducts() {
        const api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/admin/products`;
        const vm = this;
        this.$http.get(api).then((response) => {
          console.log(response.data.products);
          this.products = response.data.products;
        })
      },
    },
    created() {
      this.getProducts();
    },
  }

</script>
