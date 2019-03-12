<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table mt-4">
            <thead>
                <th width="120">訂單編號</th>
                <th width="150">訂購人姓名</th>
                <th width="80">總金額</th>
                <th width="80">付款狀態</th>
                <th width="80">詳細資料</th>
            </thead>
            <tbody v-for="(item) in orders" :key="item.id">
                <tr>
                    <td>
                        {{item.id}}
                    </td>
                    <td> {{item.user.name}}</td>
                    <td>{{item.total | currency}}</td>
                    <td>{{item.is_paid}}</td>
                    <td>
                        <button class="btn btn-square btn-info" data-toggle="collapse" :data-target="`#${item.id}`">
                                   Info
                                </button>
                    </td>
                </tr>
                <tr>
                    <td colspan="5" style="border-top: none;">
                        <div :id="item.id" class="collapse" data-parent="#accordion">
                            <div id="accordion">
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="disabledTextInput">地址</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :placeholder="item.user.address" disabled>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="disabledTextInput">Email</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :placeholder="item.user.email" disabled>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="disabledTextInput">tel</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :placeholder="item.user.tel" disabled>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="disabledTextInput">留言</label>
                                        <textarea name="" id="" class="form-control" cols="30" rows="3" v-model="item.message" disabled></textarea>
                                    </div>
                                </div>
                                <table class="table table-bordered  ">
                                    <thead>
                                        <th width="150">品名</th>
                                        <th width="100">數量</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in item.products" :key="product.id">
                                            <td class="align-middle">{{ product.product_id }}</td>
                                            <td class="align-middle">{{ product.qty }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import $ from "jquery";
    export default {
        data() {
            return {
                orders: [],
                isLoading: false
            };
        },
        methods: {
            getOrderList(page = 1) {
                const api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/admin/orders?page=${page}`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then(response => {
                    console.log(response.data.orders);
                    vm.orders = response.data.orders;
                    vm.isLoading = false;
                });
            }
        },
        created() {
            this.getOrderList();
        }
    }
</script>

