<template>
    <div>
        <div>
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
                                      <i class="far fa-trash-alt"></i>
                                    </button>
                        </td>
                        <td>
                            {{item.product.title}}
                        </td>
                        <td>
                            {{item.qty}}/{{item.unit}}
                        </td>
                        <td>
                            {{item.total | currency}}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td>{{ CartList.final_total | currency}}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: ['CartList'],
        methods: {
            removeCartItem(id) {
                const api = `${process.env.API_PATH}/API/${process.env.CUSTOMER_PATH}/cart/${id}`;
                const vm = this;
                this.$http.delete(api).then(response => {
                    vm.$emit("reload-cart");
                });
            }
        },
        created() {
            console.log("CartList")
        }
    }
</script>

