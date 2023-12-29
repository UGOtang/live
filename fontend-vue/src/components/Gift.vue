<template>
    <div class="gift-back">
        <div v-for="item in gifts" class="gift-item">
            <a-popover placement="bottom">
                <img style="height: 60px;width: 60px" :src="item.icon" alt="">
                <div class="gift-info">
                    <p style="font-weight: bolder;">{{item.name}}</p>
                </div>
                <template slot="content" style="display: flex">
                    <a-input v-model="giftMuch" style="width: 50px"/>
                    <a-button type="primary">
                        赠送
                    </a-button>
                </template>
            </a-popover>
        </div>
    </div>
</template>

<script>
    import {getAllGift} from "../network/base";

    export default {
        name: "Gift",
        data(){
            return{
                gifts:[],
                giftMuch:1
            }
        },
        mounted(){
            getAllGift().then(res => {
                console.log(res);
                this.gifts.push(...res.result)
            })
        }
    }
</script>

<style scoped>
    .gift-back{
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: row;
    }
    .gift-info{
        text-align: center;
    }
    .gift-item:hover{
        cursor: pointer;
    }
</style>
