var eatList=document.getElementById('eatList');
var eatStatus=document.getElementById('eatStatus');
var cookStatus=document.getElementById('cookStatus');
var cookList=document.getElementById('cookList');
function createEatList(foodList){;
	console.log(foodList.length);
	console.log(foodList);
	var str='';	
	for(var i=0;i<foodList.length;i++){
		str+='<li>'+foodList[i].name+'<span class="time">('+foodList[i].time+'s)</span></li>';
			
	}
	eatList.innerHTML=str;
}
function showEatStatus(content){
	eatStatus.innerHTML=content;
}
function showCookStatus(content){
	cookStatus.innerHTML=content;
}

function createCookList(foodList){;
	console.log(foodList.length);
	console.log(foodList); 
	var str='';	
	for(var i=0;i<foodList.length;i++){
		str+='<li>'+foodList[i].name+'<span class="time">('+foodList[i].time+'s)</span></li>';
		
	}
	cookList.innerHTML=str;
}


