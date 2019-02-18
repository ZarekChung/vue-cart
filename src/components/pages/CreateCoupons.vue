<template>
    <div>
        <!-- <loading :active.sync="isLoading"></loading> -->
        <form>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputName">優惠券名稱</label>
                    <input type="text" class="form-control" id="inputName" v-model="tempCoupons.title">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputPercent">折扣</label>
                    <input type="text" class="form-control" id="inputPercent" placeholder="100" v-model="tempCoupons.percent">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputDueDate">到期日</label>
                    <input type="text" class="form-control" id="inputDueDate" v-model="tempCoupons.due_date">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-2">
                    <label for="inputcode">code</label>
                    <input type="text" class="form-control" id="inputcode" v-model="tempCoupons.code">
                </div>
                <div class="form-inline">
                    <div class="col-auto my-1">
                        <div class="custom-control custom-checkbox mr-sm-2">
                            <input type="checkbox" class="custom-control-input" id="isEnabled" v-model="tempCoupons.is_enabled">
                            <label class="custom-control-label" for="isEnabled">是否啟用</label>
                        </div>
                    </div>
                    <div class="col-auto my-1">
                        <button type="submit" class="btn btn-primary" @click="updateCoupons">新增</button>
                    </div>
                </div>
            </div>
            <div class="form-group">
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tempCoupons: {},
                isNew: false,
            };
        },
        methods: {
            updateCoupons() {
                let api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/admin/coupon`;
                let httpMethod = "post";
                const vm = this;
                // if (!vm.isNew) {
                //     api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/admin/coupon/${vm.tempProduct.id}`;
                //     httpMethod = "put";
                // }
                this.$http[httpMethod](api, {
                    data: vm.tempCoupons
                }).then(response => {
                    if (!response.data.success) {
                        this.$bus.$emit("message:push", response.data.message, "danger");
                    } else {
                        this.$bus.$emit("message:push", response.data.message, "success");
                    }
                     vm.$emit("reload-coupons");
                });
               
            },
        }
    }
</script>

