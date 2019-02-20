<template>
    <div class="row justify-content-center">
        <div class="my-4 row justify-content-center">
            <div class="form-group  ">
                <table class="table">
                    <thead>
                        <th width="120"></th>
                        <th width="200">品名</th>
                        <th width="120">數量</th>
                        <th width="120">單價</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in CartList.carts" :key="item.id">
                            <td>
                                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                                                                         <i class="far fa-trash-alt"></i></button>
                            </td>
                            <td>{{item.product.title}}
                                <div class="text-success" v-if="item.coupon">
                                    已套用優惠券
                                </div>
                            </td>
                            <td>{{item.qty}}/{{item.unit}}</td>
                            <td>{{item.total | currency}}</td>
                        </tr>
                    </tbody>
                    <tfoot v-if="CartList.carts[0]">
                        <tr>
                            <td colspan="3" class="text-right">總計</td>
                            <td>{{ CartList.total | currency}}</td>
                        </tr>
                        <tr v-if="CartList.final_total !== CartList.total">
                            <td colspan="3" class="text-right text-success">折扣價</td>
                            <td class="text-success">{{ CartList.final_total | currency }}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="input-group mb-3 input-group-sm"  v-if="CartList.carts[0]">
                    <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                                                套用優惠碼</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                coupon_code: '',
            }
        },
        props: ['CartList'],
        methods: {
            removeCartItem(id) {
                const api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/cart/${id}`;
                const vm = this;
                this.$http.delete(api).then(response => {
                    vm.$emit("reload-cart");
                });
            },
            addCouponCode() {
                const api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/coupon`;
                const vm = this;
                const coupon = {
                    code: vm.coupon_code,
                };
                this.$http.post(api, {
                    data: coupon
                }).then(response => {
                    if (!response.data.success) {
                        this.$bus.$emit("message:push", response.data.message, "danger");
                    } else {
                        this.$bus.$emit("message:push", response.data.message, "success");
                    }
                      vm.$emit("reload-cart");
                });
            },
        }
    }
</script>

