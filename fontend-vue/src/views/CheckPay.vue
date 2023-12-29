<template>
    <div>
        qq
    </div>
</template>

<script>
    import {queryOrder} from "../network/base";

    export default {
        name: "CheckPay",
        data(){
            return{
                num:0
            }
        },
        created() {
            let data = {
                out_trade_no:this.$route.query.out_trade_no,
                trade_no:this.$route.query.trade_no
            };
            queryOrder(data).then(res => {
                console.log(res)
            })
        }
    }
</script>

<style scoped>

</style>
