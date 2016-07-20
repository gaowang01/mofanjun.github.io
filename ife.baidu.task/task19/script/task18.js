//Queue对象
var NumberQueue = {
	queue:[],

	queueLeft:function(number){
		this.queue.unshift(number);
	},

	queueRight:function(number){
		this.queue.push(number);
	},

	dequeueLeft:function(){
		if (this.queue.length !== 0) {
			this.queue.splice(0,1);
		}
	},

	dequeueRight:function(){
		if (this.queue.length !== 0) {
			this.queue.pop();
		}
	},

	getQueue:function(){
		return this.queue;
	}
}

//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}


//监听事件
var input = null;
var leftQueueBtn = null;
var rightQueueBtn = null;
var leftDequeueBtn = null;
var rightDequeueBtn = null;

function displayQueue(){
	//清空输出框
	input.value = "";
	var queue = NumberQueue.getQueue();
	var container = document.getElementById("display_container");
	//清空
	while(container.hasChildNodes()){
    	container.removeChild(container.firstChild);
  	}
	var fragment = document.createDocumentFragment();
	for (var i = 0;i < queue.length;i++){
		var li = document.createElement("li");
		var text = document.createTextNode(queue[i]);
		li.appendChild(text);
		li.classList.add("display_number");
		fragment.appendChild(li);
	}
	container.appendChild(fragment);
}

function queueLeft(){
	NumberQueue.queueLeft(input.value);
	displayQueue();
}

function queueRight(){
	NumberQueue.queueRight(input.value);
	displayQueue();
}

function dequeueLeft(){
	NumberQueue.dequeueLeft();
	displayQueue();
}

function dequeueRight(){
	NumberQueue.dequeueRight();
	displayQueue();
}

function init(){
	input = document.getElementById("user_input");
	leftQueueBtn = document.getElementById("left_queue");
	rightQueueBtn = document.getElementById("right_queue");
	leftDequeueBtn =document.getElementById("left_dequeue");
	rightDequeueBtn = document.getElementById("right_dequeue");

	leftQueueBtn.addEventListener("click",queueLeft);
	rightQueueBtn.addEventListener("click",queueRight);
	leftDequeueBtn.addEventListener("click",dequeueLeft);
	rightDequeueBtn.addEventListener("click",dequeueRight);
}




