/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
var label;
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 * 将aqiData里面的数据渲染出来
 */
function renderChart() {
  //清空所有list元素
  var list = document.getElementsByTagName("div")[0];
  while(list.hasChildNodes()){
    list.removeChild(list.firstChild);
  }
  var documentFragment = document.createDocumentFragment();
  var index = 0,width = 0;
  var colorArray = ["red","green","blue"];
  if (pageState.nowGraTime === "day") {
      width = Math.ceil(1280/90);
  }else if(pageState.nowGraTime === "week") {
      width = Math.ceil(1280/12);
  }else if(pageState.nowGraTime === "month"){
      width = Math.ceil(1280/3);
  }

  for(var key in chartData){
      var bar = document.createElement("span")
      bar.style.width = width;
      bar.style.height = chartData[key];
      bar.style.left = width * index;
      bar.style.background = colorArray[index%colorArray.length];
      //把自己的索引加入
      bar.id = index.toString()
      index++;
      //添加动画
      bar.classList.add("aqi-bar");
      //添加到容器内
      documentFragment.appendChild(bar);
  }
  list.appendChild(documentFragment);
  list.addEventListener("webkitAnimationEnd",barAnimationEnd,false);
}

function barAnimationEnd(){
  //remove listeren
  var list = document.getElementsByTagName("div")[0];
  list.removeEventListener("webkitAnimationEnd",barAnimationEnd);

  list.addEventListener("mouseover",showBarInfo,false);
  list.addEventListener("mouseout",hiddenBarInfo,false);
}

function showBarInfo(event){
   var node = event.target;
   var list = document.getElementsByTagName("div")[0];
   //device pointer 指向的是bar
   if (node.className && node.className === "aqi-bar") {
      //数据
      var desIndex = parseInt(node.id);
      var index = 0,displaytext=""
      for (var key in chartData) {
         if (desIndex === index) {
            displaytext = key + "aqi指数" + chartData[key];
         }
         index++;
      }
      //view
      label = document.createElement("label");
      var labelText = document.createTextNode(displaytext);
      label.appendChild(labelText);
      label.left = event.x;
      label.top = event.y;
      label.classList.add("aqi-bar-tip");

      node.appendChild(label);
   }
}

function hiddenBarInfo(event){
   node = event.target;
   //device pointer 指向的是bar
   if (node.className && node.className === "aqi-bar") {
      node.removeChild(label);
   }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化 
  var selectTime = event.target.value;
  if (selectTime !== pageState.nowGraTime) {
      // 设置对应数据
      pageState.nowGraTime = selectTime;
      initAqiChartData();
      // 调用图表渲染函数
      renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
  // 确定是否选项发生了变化 
  var selectedIndex = event.target.selectedIndex;
  if (selectedIndex !== pageState.nowSelectCity) {
      // 设置对应数据
      pageState.selectedIndex = selectedIndex;
      initAqiChartData();
      // 调用图表渲染函数
      renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTime = document.getElementById("form-gra-time");
  graTime.addEventListener('click',graTimeChange,false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener('change',citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 * charData[表签名] ＝ 对应的aqi数据
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = {};
  var nowTime = pageState.nowGraTime;
  var nowSelectCity = pageState.nowSelectCity;
  if (nowSelectCity < 1) {
      nowSelectCity = 1;
  }

  //获取城市名称 并且取出该城市3个月数据
  var citySelect = document.getElementById("city-select");
  var index = 0,cityName="",cityAqiData;
  for (var i = 0; i < citySelect.children.length; i++) {
      if (citySelect.children[i].nodeName === "OPTION") {
        index++;
        if (index == nowSelectCity) {
          cityName = citySelect.children[i].value;
        }
      }
  }
  //90天数据
  cityAqiData = aqiSourceData[cityName];
  //日
  if (nowTime === "day") {
    chartData = cityAqiData;
  }//周
  else if(nowTime === "week"){
    //Step1:先把周数据分成一个个数组
    const WEEK_DAY = 7;
    var incDay = 0,oneWeekArray = [],allWeekArray=[]; 
    for(var key in cityAqiData){
        incDay++;
        //重建对象
        var obj = {};
        obj.date = key;
        obj.aqidata = cityAqiData[key];
        oneWeekArray.push(obj);

        //满足7天的就归档
        if(incDay%WEEK_DAY === 0) {
          incDay = 0;
          allWeekArray.push(oneWeekArray);
          oneWeekArray = [];//重新分配内存
        }
    }
    //最后一组特殊处理
    if (oneWeekArray.length !== 0) {
      incDay = 0;
      allWeekArray.push(oneWeekArray);
      oneWeekArray = [];//重新分配内存
    }
    //Step2:用二维数组重组对象
    var monthKey,weekIndexKey = 1;
    for(var i = 0;i<allWeekArray.length;i++){
      //对每一周数据处理 充足 key－value
      var weekTotal = 0,weekAvg = 0;
      for (var j = 0;j < allWeekArray[i].length;j++) {
        weekTotal += allWeekArray[i][j].aqidata;
      }
      //key
      var firstDayMonth = new Date(allWeekArray[i][0].date).getMonth()+1;//.getMonth();
      var lastDayMonth = new Date(allWeekArray[i][allWeekArray[i].length -1].date).getMonth()+1;
      var key = firstDayMonth + "月第" + weekIndexKey + "周";
      //next week key
      if (firstDayMonth !== lastDayMonth) {
        weekIndexKey = 1;//当月第一周
      }else{
        weekIndexKey ++;
      }     
      //value
      var weekAvg = Math.floor(weekTotal / allWeekArray[i].length);
      //Obj
      chartData[key] = weekAvg;
    }
  }//月
  else if(nowTime === "month"){
    //构建月对象
    var monthData = {};
    for (var key in cityAqiData) {
      var month = new Date(key).getMonth()+1;
      if (!monthData[month.toString()]) {
        monthData[month.toString()] = [];  
      }
      monthData[month.toString()].push(cityAqiData[key]);
    }
    //重新输入到chartdata中
    for(var key in monthData){
      var monthAqiData = monthData[key];
      var total=0 ,avg = 0;
      for(var i= 0;i<monthAqiData.length;i++){
        total += monthAqiData[i];
      }
      avg = Math.floor(total / monthAqiData.length);
      //key
      var monthKey = key + "月数据";
      //value
      //
      chartData[monthKey] = avg;
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

/*
  触发函数
*/
function addEvent(func){
  var oldFunc = window.onload;
  if (typeof window.onload !== "function") {
    window.onload = func;
  }else{
    window.onload = function(){
      oldFunc();
      func();
    }
  }
}

addEvent(init);
addEvent(renderChart);