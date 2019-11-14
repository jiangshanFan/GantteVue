<template>
  <div class="ganteview-content">
    <div v-for="(item,index) in gante_data" :key="item.gunter_id" class="ganteview-ones">
      <div class=" ganteview-content-one" v-if="item.level === 2" >
        <div style="position: relative;">

          <div
            @mousemove="showToast"  
            @mouseleave="hideToast" 
            :data-toast="index" 
            :style="{
              width:item.width?item.width+'px':0,
              left:item.left?item.left+'px':0,
              background:item.bg_color?item.bg_color:'#00b0ff',
            }" 
            class="ganteview-item"
          >
          </div>
        </div>
        <div style="position: relative;">

          <div
            @mousemove="showToast"  
            @mouseleave="hideToast" 
            :data-toast="index" 
            :style="{
              width:item.width1?item.width1+'px':0,
              left:item.left1?item.left1+'px':0,
              top: '18px',
              background:item.bg_color1?item.bg_color1:'#00b0ff',
              lineHeight: '30px',
            }" 
            class="ganteview-item"
          >
          </div>
        </div>
      </div>
      <!-- <div class="ganteview-content-one">
        <div 
          @mousemove="showToast" 
          @mouseleave="hideToast"  
          :data-toast="index" 
          :style="{width:item.width?item.width+'px':0,left:item.left?item.left+'px':0,background:item.bg_color?item.bg_color:'#00b0ff'}" 
          class="ganteview-item has-child">
          <span :style="{borderLeftColor:item.bg_color?item.bg_color:'#00b0ff'}" class="sanjiao-left"></span>
          <span :style="{borderRightColor:item.bg_color?item.bg_color:'#00b0ff'}" class="sanjiao-right"></span>
        </div>
      </div> -->
      <!--  v-show="item.open" -->
      <ganteview-item v-if="item.children" :th_data="th_data" :gante_data="item.children"></ganteview-item>
    </div>
    <!-- slot of ganteView_column -->
    <slot></slot>
  </div>
</template>
<script>
  export default{
    name:'ganteview-item',
    data(){
      return{
      }
    },
    props:{
      gante_data:Array,
      th_data:Object,
    },
    mounted() {
      console.log(this.gante_data)
    },
    updated() {
      console.log('gante-gc-item.vue updated')
    },
    methods:{
      showToast(e){
        let target = e.target
        if(e.target.nodeName == 'SPAN'){
          target = e.target.parentNode
        }
        let data = this.gante_data[target.dataset.toast],x = e.clientX+15,y = e.clientY+15
        if(data.params){
          let toast = document.createElement('div'),add_toast = true
          toast.setAttribute('class','gante-toast-liu')
          if(document.getElementsByClassName('gante-toast-liu')[0]){
            toast = document.getElementsByClassName('gante-toast-liu')[0]
            toast.style.display = 'block'
            add_toast = false
          }
          let list = ''
          for(let i in this.th_data){
            if(data.params[i] != undefined && this.th_data[i].showToast){
              list+='<p>'+this.th_data[i].value+'：'+data.params[i]+'</p>'
            }
          }
          toast.innerHTML = list
          toast.style.left = x + 'px'
          toast.style.top = y + 'px'
          if(add_toast){
            document.getElementsByTagName('body')[0].appendChild(toast)
          }
        }
      },
      hideToast(){
        if(document.getElementsByClassName('gante-toast-liu')){
          document.getElementsByClassName('gante-toast-liu')[0].style.display = 'none'
        }
      },
    }
  }
</script>
<style scoped>
  .ganteview-content{
    position: relative;
  }
  .ganteview-content-one{
    /* 每一条时间跨度的容器高度 */
    height: 45px;
    box-sizing: border-box;
    line-height: 44px;
    border-bottom: 1px solid #ebeef5;;
  }
  .ganteview-item{
    position: absolute;
    /* 每一条进度的高度值 */
    height: 10px;
    border-radius: 5px;
    background: #00b0ff;
    margin-top: 8px;
    cursor: pointer;
  }
  .ganteview-item.has-child{
    height: 15px;
  }
  .sanjiao-left{
    position: absolute;
    display: block;
    left: 0;
    top:0;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 12px solid #00b0ff;
    border-bottom: 20px solid transparent;
  }
  .sanjiao-right{
    position: absolute;
    display: block;
    right: 0;
    top:0;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 12px solid #00b0ff;
    border-bottom: 20px solid transparent;
  }
</style>
