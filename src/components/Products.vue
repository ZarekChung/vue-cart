<template>
    <div>
     123
    </div>
</template>

<script>
export default {
    data() {
       return{
           products:[],
       };
   },
   methods: {
       getProducts(){
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