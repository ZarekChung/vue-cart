<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="(item) in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">{{item.origin_price | currency}}</del>
              <div class="h5">{{item.price | currency}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  查看更多
                </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
                  加到購物車
                </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <CustomerDetail ref="customerDetail"></CustomerDetail>
  </div>
</template>

<script>
  import $ from "jquery";
  import CustomerDetail from "./CustomerDetail";
  export default {
    data() {
      return {
        products: [],
        product: {},
        isLoading: false,
        status: {
          loadingItem: ''
        }
      };
    },
    components: {
      CustomerDetail
    },
    methods: {
      getProducts(page = 1) {
        const api = `${process.env.API_PATH}/API/${
                                process.env.CUSTOMER_PATH
                              }/products?page=${page}`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then(response => {
          console.log(response.data.products);
          this.products = response.data.products;
          vm.isLoading = false;
        });
      },
      getProduct(id) {
        const api = `${process.env.API_PATH}/API/${
                                process.env.CUSTOMER_PATH
                              }/product/${id}`;
        const vm = this;
        vm.status.loadingItem = id;
        this.$http.get(api).then(response => {
          this.$refs.customerDetail.product = response.data.product;
          vm.status.loadingItem = '';
          $("#productModal").modal("show");
        });
      }
    },
    created() {
      this.getProducts();
    }
  }
</script>

<style>

</style>
