<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table mt-4">
            <thead>
                <th width="100">訂單編號</th>
                <th width="80">總金額</th>
                <th width="80">付款狀態</th>
                <th width="80">詳細資料</th>
            </thead>
            <tbody v-for="(item) in orders" :key="item.id">
                <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.total | currency}}</td>
                    <td>{{item.is_paid}}</td>
                    <td>
                        <button class="btn btn-square btn-info" data-toggle="collapse" :data-target="`#${item.id}`">
                        info</button>
                    </td>
                </tr>
                <tr>
                    <td colspan="5" style="border-top: none;">
                        <div :id="item.id" class="collapse" data-parent="#accordion">
                            <div id="accordion">
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="disabledTextInput">訂購人姓名</label>
                                        <label class="form-control">{{item.user.name}}</label>
                                    </div>
                                    <div class="form-group col-md-5">
                                        <label for="disabledTextInput">地址</label>
                                        <label class="form-control">{{item.user.address}}</label>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="disabledTextInput">Email</label>
                                        <label class="form-control">{{item.user.email}}</label>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="disabledTextInput">tel</label>
                                        <label class="form-control">{{item.user.tel}}</label>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="disabledTextInput">留言</label>
                                        <textarea name="" id="" class="form-control" cols="30" rows="3" v-model="item.message"></textarea>
                                    </div>
                                </div>
                                <form class="form-inline float-right">
                                    <div class="form-group mb-2">
                                        <label for="staticEmail2">總金額</label>
                                    </div>
                                    <div class="form-group mx-sm-3 mb-2">
                                        <!-- <input type="text" id="staticEmail2" class="form-control" v-model="item.total" disabled> -->
                                         <label class="form-control">{{item.total}}</label>
                                         
                                    </div>
                                     <button class="btn btn-square btn-dark  mb-2">Edit</button>
                                  
                                </form>
                                <table class="table table-bordered  ">
                                    <thead>
                                        <th width="150">品名</th>
                                        <th width="100">數量</th>
                                        <th width="100">單價</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in item.products" :key="item.id">
                                            <td class="align-middle">{{ item.product.title }}</td>
                                            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                                            <td class="align-middle">{{ item.product.price | currency}}</td>
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

