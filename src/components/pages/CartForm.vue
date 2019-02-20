<template>
    <div class="row justify-content-center">
        <div class="col-md-8" v-if="CartList.carts[0]" >
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
</template>
<script>
export default {
     data() {
            return {
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
