<template>
    <div>
        <div class="container">
            <h1 class="text">HIHIHI</h1>
            <div class="row">
                <div class="col-6">
                    <input v-model="product_Id" type="text" placeholder="Nhap ID product">
                    <button @click="ShowProduct" class="btn btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return  {
                product_Id: '1'
            }
        },
        methods: {
            ShowProduct() {
                this.$router.push('/product/'+ this.product_Id);
            }
        }
    }
</script>