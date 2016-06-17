/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput,aqiInput,renderTable;

/*
	检查城市名字是否为纯中文或纯英文
*/
function checkCityName(cityName){
	if (typeof cityName != "string") {
		cityName = cityInput.value;
	}

	var reg1 = new RegExp("^[a-z]+$","gim");
	var reg2 = new RegExp("^[0-9\u4e00-\u9faf]+$","g");

	if (reg1.test(cityName) || reg2.test(cityName)) {
		return true;
	}else{
		alert("请您输入中文城市名或者英文城市名!");
		return false;
	}
}

/*
	录入数字是否为整数
*/	
function checkAQIData(aqiData){
	if (typeof aqiData!= "string") {
		aqiData = aqiInput.value;
	}

	var reg = new RegExp("^[0-9]*$","gi");
	if (!reg.test(aqiData)) {
		alert("请您输入数字");
		return false;
	}

	return true;
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */ 
function addAqiData() {

	if (!checkCityName(cityInput.value)) {
		return false;
	}

	if (!checkAQIData(aqiInput.value)) {
		return false;
	}

	aqiData[cityInput.value] = parseInt(aqiInput.value);
	return true;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	//清除当前所有节点
	renderTable.innerHTML = "";
	//显示所有节点
	var index = 0;
	for (var pro in aqiData) {
		//tr
		var tr = document.createElement("tr");
		//td--city
		var cityTD = document.createElement("td");
		var city = document.createTextNode(pro);
		cityTD.appendChild(city);
		tr.appendChild(cityTD);
		//td--aqi
		var aqiTD = document.createElement("td");
		var aqi = document.createTextNode(aqiData[pro]);
		aqiTD.appendChild(aqi);
		tr.appendChild(aqiTD);
		//td--button
		var btnTD = document.createElement("td");
		var delBtn = document.createElement("button");
		var delBtnName = document.createTextNode("删除");
		delBtn.appendChild(delBtnName);
		delBtn.setAttribute("id","del_"+index);
		btnTD.appendChild(delBtn);
		tr.appendChild(btnTD);
		//递增index
		++index;
		renderTable.appendChild(tr);				
	}

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  if (addAqiData()) {
  	renderAqiList();
  }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  var target_id = event.target.getAttribute("id");
  var index = parseInt(target_id.split("_")[1]);
  var matchIndex=0;
  for(var pro in aqiData){
 	 if (matchIndex === index) {
 	 	//aqiData[pro] = null;
 	 	delete aqiData[pro];
 	 	break;
 	 }
 	 ++matchIndex;
  }
  renderAqiList();
}

function init() {

  	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var aqiAddBtn = document.getElementById("add-btn");
  	aqiAddBtn.addEventListener("click",addBtnHandle,false);

  	// 为input添加监听blur事件
  	cityInput = document.getElementById("aqi-city-input");//城市名字
  	aqiInput = document.getElementById("aqi-value-input");//天气数据

  	cityInput.addEventListener("blur",checkCityName,false);
  	aqiInput.addEventListener("blur",checkAQIData,false);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
 	renderTable = document.getElementById("aqi-table");
  	renderTable.addEventListener("click",delBtnHandle,false);
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

addLoadEvent(init);
