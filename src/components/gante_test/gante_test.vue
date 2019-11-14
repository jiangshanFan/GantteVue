<template>
  <div class="gante">
    <gante ref="gante" />
  </div>
</template>
<script>
/*
 import gante from './components/gante_test/gante'
  	Vue.use(gante)
  	1.全局调用方法:
      	this.$gante({
        	container:'.gante',
        	ganteData:data,
        	start_time:new Date('2018/12/15').getTime(),
        	end_time:new Date('2019/2/4').getTime(),
        	open:true,
        	height:400,
        	time_mode:1,
        	th_data:th_data,
        	onEdit(data){
        	console.log(data)
        	},
        	onClick(data){
        	console.log(data)
        	},
      	})
  	其中
      	container: 要加载到哪个元素下面(默认为body)
      	ganteData: 要加在的数据(必须要设置)
      	start_time: 最小的开始时间(必须要设置,时间戳格式)
      	end_time: 最大的结束时间(必须要设置,时间戳格式)
        tabe_width: 表格的宽度(默认是甘特图的一半) 支持calc()写法或百分比写法,在没有具体宽度的情况下很有用
  	    open: 子任务是否打开的状态(默认为true)
      	height: 甘特图的高度(默认是300)支持calc()写法或百分比写法,在没有具体高度的情况下很有用
      	time_mode: 显示的刻度(时间刻度 1:日,2周,3月,4季,5年,默认是1)
      	th_data: 表格头部的属性值(必须要设置)
      	onEdit: 编辑过了所触发的事件
      	onClick: 点击了listen_click设为true的th所触发的事件(只有listen_click设为true才能触发)
  	 
  	2.th_data示例{
      	title:{value:'任务名称',width:80,showToast:false,listen_click:true},
      	startTime:{value:'开始时间',width:150,showToast:true,chooseTime:true,time_mode:1},
      	endTime:{value:'结束时间',width:150,showToast:true,chooseTime:true,time_mode:2},
      	charge:{value:'内容',width:450,shrink:true,showToast:true,edit:true}
     	}
  	其中
      	value:th的名称,
      	width:th的宽度(默认是80), 不支持calc()写法或百分比写法
      	showToast:鼠标悬浮到右侧图例上时显示的toast里是否显示该属性值,
      	time_mode:1(是开始时间),2(结束时间)*注:(必须要有开始时间和结束时间标示)
      	edit: 该内容是否可编辑,
      	chooseTime: 是否启动选择时间控件 ,
      	shrink: 该项显示收缩的图例(只用设置其中某一项)
      	listen_click: 是否监听点击事件
  	 
  	   th_data里的属性必须要和ganteData里params里的属性相对应,属性名要一样
  	3.ganteData示例[
      	{
        	gunter_id:1,
        	params:{title:'项目制作任务',startTime:'2018-12-19',endTime:'2019-1-3',charge:'这是任务标题内容'},
        	start_time:new Date(2018,11,19).getTime(),
        	end_time:new Date(2019,0,3).getTime(),
        	level:1,
        	children:[
          	{
            	gunter_id:2,
            	params:{title:'子任务',startTime:'2018-12-17',endTime:'2019-1-1',charge:'这是第一级子任务内容'},
            	start_time:new Date(2018,11,17).getTime(),
            	end_time:new Date(2019,0,1).getTime(),
            	bg_color:'yellow',
            	level:2
          	}
        	]
      	}
      	gunter_id: 每个任务的标示id(不能有重复的id,可以是字符串和数字)
      	params: 表格要显示的内容,其中属性名要和th_data一致
      	start_time: 该任务的开始时间(必须要设置,时间戳格式)
      	end_time: 该任务的结束时间(必须要设置,时间戳格式)
      	bg_color: 图例的颜色(默认为#00b0ff)
      	level: 任务的层级(1代表第一层,2代表第二层)
      	children: 子任务数据
 */

  import gante from './gante.vue'
  export default{
    name: 'gante_test',
    components: {
      gante
    },
    mounted(){
      // params: 渲染表格的数据
      // start_time, end_time, 渲染图表的数据
      let data= this.sourceData,
      th_data = this.th_data;
      this.$refs.gante.init({
        container:'.gante',
        ganteData:data,
        start_time:new Date('2018/11/01').getTime(),
        end_time:new Date('2029/1/4').getTime(),
        tabe_width:'30%',
        open:true,
        height:'300px',
        time_mode:1,
        th_data:th_data,
        onEdit(data){
          console.log(data)
        },
        onClick(data){
          console.log(data)
        }
      });
    },
    updated() {
      console.log('gante-test.vue updated')
      this.$refs.gante.init({
        container:'.gante',
        ganteData:JSON.parse(JSON.stringify(this.sourceData)),
        start_time:new Date('2018/11/01').getTime(),
        end_time:new Date('2029/1/4').getTime(),
        tabe_width:'30%',
        open:true,
        height:'300px',
        time_mode:1,
        th_data: JSON.parse(JSON.stringify(this.th_data)),
        onEdit(data){
          console.log(data)
        },
        onClick(data){
          console.log(data)
        }
      });
      // this.$gante({
      //   container:'.gante',
      //   ganteData:data,
      //   start_time:new Date('2018/11/01').getTime(),
      //   end_time:new Date('2019/2/4').getTime(),
      //   tabe_width:'30%',
      //   open:true,
      //   height:'300px',
      //   time_mode:1,
      //   th_data:th_data,
      //   onEdit(data){
        //     console.log(data)
      //   },
      //   onClick(data){
        //     console.log(data)
      //   }
      // });
    },
    data () {
      // 此处时间轴的月份比start_time的月份多一个月,所有在处理顶部时间时必须使用new Date获取到月份减少1
      return {
        th_data: {
          title:{value:'任务',width:80,showToast:false,listen_click:true},
          startTime:{value:'计划开始时间',width:150,showToast:true,chooseTime:true,time_mode:1},
          endTime:{value:'计划结束时间',width:150,showToast:true,chooseTime:true,time_mode:2},
          actual_startTime:{value:'实际开始时间',width:150,showToast:true,chooseTime:true,time_mode:1},
          actual_endTime:{value:'实际结束时间',width:150,showToast:true,chooseTime:true,time_mode:2},
          charge:{value:'负责人',width:150,shrink:true,showToast:true,edit:true},
        },
        sourceData: [
          {
            gunter_id:1,
            params:{subProject:'项目启动会议',startTime:'2018-11-3',endTime:'2018-11-6',charge:'余贝'},
            // start_time:new Date(2018,10,2).getTime(),
            // end_time:new Date(2018,10,10).getTime(),
            level:1,
           	children:[
             	{
               	gunter_id:4,
               	params:{
                  subProject:'项目启动会议',
                  title:'子任务1',
                  startTime:'2018-11-2',
                  endTime:'2018-11-10',
                  actual_startTime:'2018-11-6',
                  actual_endTime:'2018-11-12',
                  charge:'这是第1个子任务内容',
                  sub: 1,  // 判断是否需要渲染子项目名称
                  parentId: 1,  // 当点击子项目名称时，需要传递父级标识ID
                },
               	start_time:new Date(2018,11 - 1,2).getTime(),
               	end_time:new Date(2028,11 - 1,10).getTime(),
                actual_start_time:new Date(2018,10,6).getTime(),
               	actual_end_time:new Date(2018,10,12).getTime(),
               	bg_color:'#00b0ff',
                bg_color1:'red',
               	level:2,
                status: 1,
             	},
              {
               	gunter_id:10,
               	params:{subProject:'项目启动会议',title:'子任务2',startTime:'2018-11-1',endTime:'2018-11-3',charge:'这是2个级子任务内容'},
               	start_time:new Date(2018,10,12).getTime(),
               	end_time:new Date(2018,10,18).getTime(),
                actual_start_time:new Date(2018,10,14).getTime(),
               	actual_end_time:new Date(2018,10,18).getTime(),
               	bg_color:'#00b0ff',
                bg_color1:'red',
               	level:2,
             	},
              {
               	gunter_id:17,
               	params:{subProject:'项目启动会议',title:'子任务3',startTime:'2018-11-1',endTime:'2018-11-3',charge:'这是第3个子任务内容'},
               	start_time:new Date(2018,10,18).getTime(),
               	end_time:new Date(2018,10,25).getTime(),
                actual_start_time:new Date(2018,10,16).getTime(),
               	actual_end_time:new Date(2018,10,23).getTime(),
               	bg_color:'#00b0ff',
                bg_color1:'red',
               	level:2,
             	},
              {
               	gunter_id:101,
               	params:{subProject:'项目启动会议',title:'子任务31',startTime:'2018-11-1',endTime:'2018-11-3',charge:'这是第4个子任务内容'},
               	start_time:new Date(2018,10,18).getTime(),
               	end_time:new Date(2018,10,25).getTime(),
                actual_start_time:new Date(2018,10,16).getTime(),
               	actual_end_time:new Date(2018,10,23).getTime(),
               	bg_color:'#00b0ff',
                bg_color1:'red',
               	level:2,
                // 当有这个条件时表示此 gante-td 单元格的 border-bottom 需要设置，其他不需要设置
                border: 0,
             	}
           	]
          },
          {
            gunter_id:2,
            params:{subProject:'MD设计',startTime:'2018-11-1',endTime:'2018-11-3',charge:'王生'},
            // start_time:new Date(2018,11,30).getTime(),
            // end_time:new Date(2018,11,30).getTime(),
            level:1,
            children:[
             	{
               	gunter_id:5,
               	params:{
                  subProject:'MD设计',
                  title:'子任务4',
                  startTime:'2018-11-1',
                  endTime:'2018-11-3',
                  charge:'王生任务1',
                  sub: 1,
                  parentId: 2,  // 当点击子项目名称时，需要传递父级标识ID
                },
               	start_time:new Date(2018,10,10).getTime(),
               	end_time:new Date(2018,10,15).getTime(),
                actual_start_time:new Date(2018,10,12).getTime(),
               	actual_end_time:new Date(2018,10,20).getTime(),
                bg_color1:'red',
               	bg_color:'#00b0ff',
               	level:2,
             	},
              {
               	gunter_id:18,
               	params:{subProject:'MD设计',title:'子任务5',startTime:'2018-11-1',endTime:'2018-11-3',charge:'王生任务2'},
               	start_time:new Date(2018,10,18).getTime(),
               	end_time:new Date(2018,10,25).getTime(),
                actual_start_time:new Date(2018,10,16).getTime(),
               	actual_end_time:new Date(2018,10,23).getTime(),
               	bg_color:'#00b0ff',
                bg_color1:'red',
               	level:2,
                border: 0,
             	}
           	]
          },
          {
            gunter_id:3,
            params:{subProject:'MD设计2',startTime:'2018-11-1',endTime:'2018-11-3',charge:'李生'},
            level:1,
            children:[
             	{
               	gunter_id:6,
               	params:{
                  subProject:'MD设计2',
                  title:'子任务6',
                  startTime:'2018-11-1',
                  endTime:'2018-11-3',
                  charge:'李生任务1',
                  sub: 1,
                  parentId: 3,  // 当点击子项目名称时，需要传递父级标识ID
                },
               	start_time:new Date(2018,10,10).getTime(),
               	end_time:new Date(2018,10,15).getTime(),
                actual_start_time:new Date(2018,10,12).getTime(),
               	actual_end_time:new Date(2018,10,21).getTime(),
               	bg_color:'#00b0ff',
                bg_color1:'red',
               	level:2,
             	},
              {
               	gunter_id:19,
               	params:{subProject:'MD设计2',title:'子任务7',startTime:'2018-11-1',endTime:'2018-11-3',charge:'李生任务2'},
               	start_time:new Date(2018,10,18).getTime(),
               	end_time:new Date(2018,10,25).getTime(),
                actual_start_time:new Date(2018,10,16).getTime(),
               	actual_end_time:new Date(2018,10,23).getTime(),
               	bg_color:'#00b0ff',
                bg_color1:'red',
               	level:2,
                border: 0,
             	}
           	]
          },
        ],
      }
    }
  }
</script>
<style>
</style>
