//Queue对象
const QMAX = 60;
const MIN_RANDOM = 10;
const MAX_RANDOM = 100;

var NumberQueue = {
	queue:[],
	animationQueue:[],

	queueLeft:function(number){
		if (this.queue.length >= QMAX) {
			return false;
		}else{
			this.queue.unshift(number);
			return true;
		}
		
	},

	queueRight:function(number){
		if (this.queue.length >= QMAX) {
			return false;
		}else{
			this.queue.push(number);
			return true;
		}
		
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
	},

 	getRandomQueue:function(count) {
 		this.queue = [];
 		for(var i = 0; i < count; i++){
 			var time = (new Date()).getMilliseconds()/1000;
 			var random = Math.floor(Math.random() * time * (MAX_RANDOM - MIN_RANDOM + 1)) + MIN_RANDOM;
 			this.queue.push(random);
 		}
  		return this.queue;
  	},

  	//从小到大排序
  	bubbleQueue:function(){
  		this.animationQueue = [];
  		for (var i = 0; i < this.queue.length -1; i++) {
  			for (var j = 0; j < this.queue.length - 1 - i; j++) {
  				if (this.queue[j] > this.queue[j+1]) {
  					var swap = this.queue[j];
  					this.queue[j] = this.queue[j+1];
  					this.queue[j+1] = swap; 
  				}	
  			}
  			this.animationQueue.push(this._cloneArray(this.queue));
  		}
  	},

  	_cloneArray:function(srcArray){
  		var cloneArray = [].concat(srcArray);
  		return cloneArray;
  	},

  	getAnimationQueue:function(){
  		return this.animationQueue;
  	}

}

/*
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
*/

//监听事件
var input = null;
var leftQueueBtn = null;
var rightQueueBtn = null;
var leftDequeueBtn = null;
var rightDequeueBtn = null;
var ramdomQueue = null;

function displayQueue(){
	//清空输出框
	input.value = "";
	var queue = NumberQueue.getQueue();
	//NumberQueue.bubbleQueue();
	//var animationQueue = NumberQueue.getAnimationQueue();	
	//清空
	var container = document.getElementById("display_container");
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

function randomQueue(){
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




