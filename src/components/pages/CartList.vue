<template>
    <div class="my-5 row justify-content-center">
        <div class="my-5 row justify-content-center">
            <div class="col-md-12 ">
                <table class="table">
                    <thead>
                        <th></th>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
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
                    <tfoot>
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
                <div class="input-group mb-3 input-group-sm">
                    <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                                                套用優惠碼</button>
                    </div>
                </div>
            </div>
            <div class="col-md-12 my-5 ">
                <form @submit.prevent="createOrder">
                    <div class="form-group">
                        <label for="useremail">Email</label>
                        <input type="email" v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}" class="form-control" name="email" id="useremail" v-model="form.user.email" placeholder="請輸入 Email">
                        <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
                    </div>
                    <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input type="text" class="form-control" :class="{'is-invalid': errors.has('name')}" v-validate="'required'" name="name" id="username" v-model="form.user.name" placeholder="輸入姓名">
                        <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                    </div>
                    <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" v-validate="'required|numeric'" name="tel" :class="{'is-invalid': errors.has('tel')}" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                        <span class="text-danger" v-if="errors.has('tel')">{{errors.first('tel')}}</span>
                    </div>
                    <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="address" v-validate="'required'" class="form-control" name="address" :class="{'is-invalid': errors.has('address')}" id="useraddress" v-model="form.user.address" placeholder="請輸入地址">
                        <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                    </div>
                    <div class="form-group">
                        <label for="useraddress">留言</label>
                        <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                    <div class="text-right">
                        <button class="btn btn-danger">送出訂單</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                coupon_code: '',
                form: {
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: '',
                    }
                }
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
                });
            },
            createOrder() {
                let api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/order`;
                const vm = this;
                const order = vm.form;
                this.$validator.validate().then(result => {
                    if (!result) {
                        this.$bus.$emit("message:push", "欄位不完整", "danger");
                    } else {
                        this.$http.post(api, {
                            data: order
                        }).then(response => {
                            if (!response.data.success) {
                                this.$bus.$emit("message:push", response.data.message, "danger");
                            } else {
                                this.$bus.$emit("message:push", response.data.message, "success");
                            }
                             vm.$emit("reload-cart");
                            // vm.$set(vm.form, "user", {
                            //     name: '',
                            //     email: '',
                            //     tel: '',
                            //     address: '',
                            // });
                        });
                    }
                });
            }
        }
    }
</script>

