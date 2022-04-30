class List {
    constructor() {
        //  给属性赋值
        this.getData();

        //将加入购物车,使用事件委托
        this.$('.sk_bd ul').addEventListener('click',this.addCartFn.bind(this))//默认是指向ul,改变this指向当前实例化对象

    }

    // 获取数据的方法  
    //获取大量的数据,渲染到页面中去,需要async await
    async getData() {
        // 等待promise对象解析完成
        let { data, status } = await axios.get('http://localhost:8888/goods/list?current=1')  //返回的是一个promise对象
        // console.log(data,status);

        //判断返回值的状态,追加数据
        if (status == 200) {
            // console.log(data);

            let html = '';
            //遍历list数据
            data.list.forEach(goods => {
                // console.log(goods);  //遍历出每一条商品信息
                html += ` <li class="sk_goods" data_id="${goods.goods_id}">  
                <a href="detail.html"><img src="
                ${goods.img_big_logo}" alt=""></a>
                <h5 class="sk_goods_title">${goods.title}</h5>
                <p class="sk_goods_price"><em>${goods.current_price}</em> <del>￥${goods.price}</del></p>
                <div class="sk_goods_progress">
                    已售<i>${goods.sale_type}</i>
                    <div class="bar">
                        <div class="bar_in"></div>
                    </div>
                    剩余<em>${goods.goods_number}</em>件
                </div>
               
                <a href="#none"  class="sk_goods_buy">立即抢购</a>
            </li>`;
            });
             // <a href="detail.html" class="sk_goods_buy">立即抢购</a> 
            this.$('.sk_bd ul').innerHTML=html;
        }

    }

    //加入购物车的方法
    addCartFn(eve){
        // console.log(this);//获取当前的实例化
        //根据eve 获取事件源
        // console.log(eve.target); //点击 立即抢购 获取到a标签
        //给每条li标签的商品  添加商品id   goods_id

        //用户登录才有id  所以需要判断是否用户登录
        
    }

    //都要获取节点,封装一个函数
    $(tag) {
        let res = document.querySelectorAll(tag);
        return res.length == 1 ? res[0] : res;
    }
}
new List  