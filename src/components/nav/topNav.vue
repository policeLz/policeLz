<template>
    <div id= "topNav">
        <div class="topLeft">
            <div class="topLeftFst"></div>
            <div class="topLogo"></div>
            <div class="topTitle">大数据情报指挥综合赋能服务平台</div>
        </div>
        <div class="btnGroup">
            <div class="btnItem" v-for="item in buttonArr"  :key="item.name">
                <div>
                    <img :src="item.imgSrc" alt="">
                </div>
                <div>{{item.name}}</div>
            </div>
        </div>
        <div class="topRight">
            123
        </div>
        <!-- <router-link to="/">Home</router-link> 
        <router-link to="/about">About</router-link>  -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            buttonArr:[
                {
                    name:"警情检测",
                    imgSrc:require('@/assets/image/jqjc.png'),
                    // handle:function(){
                    //     console.log(123)
                    // }
                },
                {
                    name:"赋能指挥",
                    imgSrc:require('@/assets/image/fnzh.png'),
                },
                {
                    name:"勤务监管",
                    imgSrc:require('@/assets/image/qwjg.png'),    
                },
                {
                    name:"情报研判",
                    imgSrc:require('@/assets/image/qbyp.png'),
                },
                {
                    name:"立体安防",
                    imgSrc:require('@/assets/image/ltaf.png'),
                },
                {
                    name:"学习强警",
                    imgSrc:require('@/assets/image/xxqj.png'),
                }
            ]
        }
    }
}

</script>
<style scoped lang="stylus">
    #topNav{
        height:80px
        line-height:80px
        width:100%
        background-image :url('../../assets/image/top.png')
        display :flex
        .topLeft{
            display :flex
            justify-items: center
            align-items center
            .topLeftFst{
                width:34px
                height:100%
                background-image :url('../../assets/image/top-left.png')
            }
            .topLogo{
                height:48px
                width:48px
                margin-left:10px
                background :url('../../assets/image/logo.png') no-repeat
            }
            .topTitle{
                height:48px
                line-height:48px
                font-size:28px
                font-weight:600
                color:#EFF6FF
                margin-left:10px
            }
        }
        .btnGroup{
            margin:0 auto
            display:flex
            .btnItem{
                padding: 5px 10px 5px 10px
                flex-direction :column
                div{
                    height:39px
                    line-height:39px
                    maring-top:5px;
                    display :flex
                    justify-content :center
                }
                div:nth-child(2){
                    height:30px
                    line-height:30px
                    font-size:14px
                    font weight 400
                    color:#EFF6FF
                }
            }
        }
        .topRight{
            width:200px
            float:right
        }
    }
</style>