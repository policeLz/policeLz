<template>
    <div>
        <ul style=" margin:10px;border:1px solid #dddddd;border-radius:5px;width:calc(100% - 20px);height:calc(100vh - 150px);overflow-y:auto">
            <li v-for="(caseItem,index) in caseList" :index="index" :key="index" style="padding:10px;text-align:left" @click="caseToMap(caseItem)">
               <div style="display:flex;height:30px;line-height:30px;">
                   <div style="height:8px;width:8px;margin-top:11px;margin-right:10px;border-radius:50%;background-color:#407BDD"></div>
                   <div style="width=80%;">2020-03-14 10:09</div>
                   <div style="margin-left:auto;height:20px;margin-top:5px;width:20px;">
                       <img src="../../assets/image/jqLogo.png" alt="">
                   </div>
               </div>
               <div style="color:#407BDD">【未签收】</div>
               <div style="padding:10px 0 20px 0;border-bottom:1px solid #dddddd">类型：机动车与非机动车，地点：G312，锡港路路口，电话：13961748000，出警：交通警察支队锡山大队</div>
            </li>
           
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            caseList:[
                {caseaId:1,lng:'120.3054566',lat:'31.570037'},
                {caseaId:2,lng:'120.3014566',lat:'31.570037'},
                {caseaId:3,lng:'120.3054566',lat:'31.570037'},
                {caseaId:4,lng:'120.3054566',lat:'31.570037'},
                {caseaId:5,lng:'120.3044566',lat:'31.570037'}
                ]
        }
    },
    methods:{
        caseToMap(caseItem){
            this.$emit('caseToMap',caseItem)
        }
    }
}
</script>
<style scoped>
::-webkit-scrollbar  
{  
    width: 5px;
    height: 5px; 
}  
::-webkit-scrollbar-track  
{  
    background: rgb(239, 239, 239);
    border-radius: 2px;
}  
::-webkit-scrollbar-thumb  
{  
    background: #bfbfbf;
    border-radius: 10px;
}  
</style>