const MIN_INSTANCE = 50
const DEALY_TIME = 60
const scroll = {
  data(){
    return {
      isLoading:false,
      component:null
    }
  },
  created(){
    let fn = throttle(()=>{
      let isOver = (getScrollHeight() +  getWindowHeight()) >=  (getDocumentTop()- MIN_INSTANCE)
      // 判断loading组件是否已经存在，不存在就创建一个
      console.log('component',this.component);
       // 触底时进行load组件显示
      if(isOver){
        if(!this.component){
          this.component = extendComponents()
          console.log('sdf');
          
        }
        // 创建加载组件
        this.loadMore&&this.loadMore()
        // 判断当前状态来控制loading的组件显示与否
        if(!this.isLoading){
          this.component.$el.remove()
          // 将loading组件置为空
          this.component = null
        }
      }
    },DEALY_TIME)
    window.addEventListener('scroll',fn)
  },
  watch:{
    isLoading(val) {
      // 如果不是 请求中卸载加载更多数据的提示
      if(!val){
        
        this.component.$el.remove()
        // 将loading组件置为空
        this.component = null
      }
    }
  }
}
new Vue({
  el:'#app',
  mixins:[scroll],
  data(){
    return {
      list:[]
    }
   },
   created(){
    this.list =  Array.from(Array(10),(item,index)=>index)
    },
    methods:{
     async loadMore(){
      let arr = await this.findDataList()
      if(arr&&arr.length>0&&!this.isLoading){
          this.list.push(...arr)
          this.isLoading = false
        }
      },
     findDataList(){
      // 判断是否在请求状态，如果是则中断请求
      if(this.isLoading)return
      this.isLoading = true
      let list = this.list
      let last = list[list.length-1]
      // 拿到服务端传递的数据
      return new Promise((resolve)=>{
      // 模拟服务端数据
      let newList = Array.from(Array(10),(item,index)=>index+last+1)
        setTimeout(() => {
          this.isLoading = false
          resolve(newList)
        }, 1000);
      })
    }}
})



function throttle (fn,delay=100) {
  let time = ()=>new Date().getTime()
  let old = time()
  return (...rest)=>{
    
    if((time() - old) > delay){
      fn(...rest)
      old = time()
    }
  }
} 
//文档高度
function getDocumentTop() {
  return document.documentElement.offsetHeight;
}

//可视窗口高度
function getWindowHeight() {
  return document.documentElement.clientHeight;
}

//滚动条滚动高度
function getScrollHeight() {
  return Math.max(document.documentElement.scrollTop,window.pageYOffset||0)
}


//文档高度
function getDocumentTop() {
  return document.documentElement.offsetHeight;
}

//可视窗口高度
function getWindowHeight() {
  return document.documentElement.clientHeight;
}

//滚动条滚动高度
function getScrollHeight() {
  return Math.max(document.documentElement.scrollTop,window.pageYOffset||0)
}


//文档高度
function getDocumentTop() {
  return document.documentElement.offsetHeight;
}

//可视窗口高度
function getWindowHeight() {
  return document.documentElement.clientHeight;
}

//滚动条滚动高度
function getScrollHeight() {
  return Math.max(document.documentElement.scrollTop,window.pageYOffset||0)
}


// 全局
function extendComponents(callback){
  const hasInsert = document.getElementById('$-loading-alert')
  // 判断dom中是否已经存在 loading 标志
  if(hasInsert)return 
  const Action = Vue.extend({
    template :`
      <div id="loading-alert">
      <i class="el-icon-loading"></i>
      <span>{{ message }}</span>
    </div>
    `,
    props:{
      message:{
        type:String,
        default:'正在加载更多数据'
      }
    }
  })
  const div = document.createElement('div')
  document.body.appendChild(div)
  const ele = new Action({
    propsData:{
      close:()=>{
        ele.$el.remove()
        callback&&callback()
      }
    }
  }).$mount(div)
  return ele
}
