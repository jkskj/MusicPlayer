// alert('THANKS FOR USING THIS MUSIC PLAYER   !   !   !');
var app =new Vue({
    el:".background",
    data:{
        query:"",
		playingMusic:{name:"花痕 -shirushi-",musicUrl:"Audio/花痕 -shirushi.flac",musicCover:"Ima/3.jfif",hotComments:[],artists:[{
			name:"河野万里奈 (河野マリナ)"}],album:"花痕 -shirushi- & 「花物語」劇伴音楽集 其ノ貳 & あとがたり"},
		artistsList:[],
		isPlaying:false,
		playingList:[{name:"花痕 -shirushi-",musicUrl:"Audio/花痕 -shirushi.flac",musicCover:"Ima/3.jfif",hotComments:[],artists:[{
			name:"河野万里奈 (河野マリナ)"}],album:"花痕 -shirushi- & 「花物語」劇伴音楽集 其ノ貳 & あとがたり"},
			{name:"Merry Christmas Mr. Lawrence",musicUrl:"Audio/Merry Christmas Mr. Lawrence-押尾光太郎.mp3"
			,musicCover:"Ima/3.jpg",hotComments:[],artists:[{
				name:"押尾光太郎 (押尾コータロー)"}],album:"STARTING POINT"},
			{name:"Rain",musicUrl:"Audio/Rain- 秦基博.flac"
			,musicCover:"Ima/5.jpg",hotComments:[],artists:[{
				name:"秦基博 (はたもとひろ)"}],album:"言ノ葉"},
			{name:"23：30",musicUrl:"Audio/23：30 - 曹思义.mp3"
			,musicCover:"Ima/7.jpg",hotComments:[],artists:[{
				name:"曹思义"}],album:"星河"},
			{name:"Distance",musicUrl:"Audio/Distance-伍伍慧.mp3"
			,musicCover:"Ima/8.jpg",hotComments:[],artists:[{
				name:"伍伍慧 (satoshi gogo)"}],album:"Bedtime Story"},
			],
		musicInput:{name:"花痕 -shirushi-",musicUrl:"Audio/花痕 -shirushi.flac",musicCover:"Ima/3.jfif",hotComments:[],artists:[{
			name:"河野万里奈 (河野マリナ)"}],album:"花痕 -shirushi- & 「花物語」劇伴音楽集 其ノ貳 & あとがたり"},
		searchList:{},
		mid:0,
		isSingle:false,
    },
    methods:{
		//歌曲搜索
        searchMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                console.log(response);
                that.searchList=response.data.result.songs;
            },function(err){})
        },
		//歌曲添加
		add:function(musicId,name,artists){
			var that = this;
			axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                console.log(response);
                that.musicInput.musicUrl=response.data.data[0].url;
				that.musicInput.name=name;
				that.musicInput.artists=artists;
            },function(err){})
			axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
			.then(function (response){
				console.log(response);
				that.musicInput.album=response.data.songs[0].al.name;
				that.musicInput.musicCover=response.data.songs[0].al.picUrl;
			},function(err){})
			axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
			.then(function (response){
				console.log(response);
				that.musicInput.hotComments=response.data.hotComments;
				that.playingList.push(JSON.parse(JSON.stringify(that.musicInput)));
			},function(err){})
		},
		play:function(){
			// console.log("play");
			// myAduio.addEventListener("ended",this.setMode,false);
			this.isPlaying=true;
			this.changeColor();
			setPlay(true);
		},
		pause:function(){
			// console.log("pause");
			this.isPlaying=false;
			setPlay(false);
		},
		// add:function(musicId,name,artists){
		// 	if (this.playingList.length>=10){
		// 		alert("NO!no!NO!不让你再加了呢ᕙ(`▿´)ᕗ");
		// 		return;
		// 	}
		// 	var that = this;
		// 	axios.get("https://autumnfish.cn/song/url?id="+musicId)
        //     .then(function(response){
		// 		console.log(response);
		// 		that.musicInputValue.musicUrl=response.data.data[0].url;
		// 		that.musicInputValue.name=name;
		// 		that.musicInputValue.artists=artists;
		// 	},function(err){})
		// 	axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
		// 	.then(function (response){
		// 		console.log(response);
		// 		that.musicInputValue.album=response.data.songs[0].al.name;
		// 		that.musicInputValue.musicCover=response.data.songs[0].al.picUrl;
		// 	},function(err){})
		// 	axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
		// 	.then(function (response){
		// 		console.log(response);
		// 		that.musicInputValue.hotComments=response.data.hotComments;
		// 		that.playingList.push(JSON.parse(JSON.stringify(that.musicInputValue)));
		// 	},function(err){})	
		// },
		playList:function(id){
			if (this.playingList.length>0){
				this.mid=id;
				this.playingMusic=JSON.parse(JSON.stringify(this.playingList[id]));
				setPlay(false);
				this.isPlaying=false;
				myAduio.src=this.playingMusic.musicUrl;
				myAduio.autoplay=true;
			}
			else{
				setPlay(false);
			}
		},
		next:function(){
			setPlay(false);
			this.isPlaying=false;
			if(this.playingList.length==0){
					alert("别点了，没歌了┭┮﹏┭┮");
				}
				else{
				if(this.mid+1>=this.playingList.length){
					this.playList(0);
				}
				else{
					this.playList(this.mid+1);
				}
			}
		},
		last:function(){
			setPlay(false);
			this.isPlaying=false;
			if(this.playingList.length==0){
				alert("别点了，没歌了┭┮﹏┭┮");
			}
			else{
				if(this.mid<=0){
					this.playList(this.playingList.length-1);
				}
				else{
					this.playList(this.mid-1);
				}
			}
		},
		changeMode:function(){
			this.isSingle=!this.isSingle;
			if(this.isSingle){
				mode.style.backgroundPositionX=-15+"px";
				mode.style.backgroundPositionY= -142+"px";
			}
			else{
				mode.style.backgroundPositionX=-15+"px";
				mode.style.backgroundPositionY= -172+"px";
			}
		},
		setMode:function(){
			if(this.isSingle){
				myAduio.play();
			}
			else{
				myAduio.loop=false;
				this.next();
			}
		},
		remove:function(index){
			this.playingList.splice(index,1);
			if(index==this.mid){
				if (index==this.playingList.length){
					this.mid=0
				}
				if(this.isPlaying){
					this.playList(this.mid);
				}
				else{
					this.playList(this.mid);
					setPlay(false);
				}
			}
			else if(index<this.mid){
				this.mid-=1;
			}
			if(this.playingList.length==0){
				this.playingMusic={name:"",musicUrl:"",musicCover:"",hotComments:[],artists:[],album:""};
			}
		},
		changeColor:function(){
			var i =0;
			for (;i<list.length;i++){
				if (i==this.mid){
					list[i].style.color="pink";
				}
				else{
					list[i].style.color="black";
				}
			}
		},
		clear:function(){
			setPlay(false);
			this.playingList=[];
			this.playingMusic={name:"",musicUrl:"",musicCover:"",hotComments:[],artists:[],album:""};
		},
    }
})
var myAduio = document.getElementsByTagName('audio')[0];
var progressTime = document.getElementsByClassName('time')[0];
var mode = document.getElementsByClassName('mode')[0];
var list=document.getElementsByClassName('play-list');
var nowLine = 0;
var playState = false;
var timeArray = new Array();
var timeInterval = new Array();
window.onload = function () {
	setMouseEvent();
	setTimeText();	
};
function setPlay(state) {
var play_pause = document.getElementsByClassName('play-pause')[0];
	if (state == null) {
		state = myAduio.paused;
	}
	if (state == true) {	
		if (app.playingList.length==0){
			alert("别点了，没歌了┭┮﹏┭┮");
		}
		else{
			myAduio.play();
			play_pause.style.backgroundPositionX=-138+"px";
        	play_pause.style.backgroundPositionY=-194+"px";
			playState = true;
			setTimeText();
			setProgress();
			// 开始播放后要重新将时间间距改回来，不然下次播放计时器会出错
			timeInterval[nowLine] = timeArray[nowLine + 1] - timeArray[nowLine];
		}
	} else {
		myAduio.pause();
		play_pause.style.backgroundPositionX=-137+"px";
        play_pause.style.backgroundPositionY=-113+"px";
		playState = false;
		timeInterval[nowLine] = timeArray[nowLine + 1] - myAduio.currentTime;
	}
}

// 设置音量
function setVolume(volume) {
	myAduio.volume = volume;
}
// 设置进度文本
function setTimeText() {
	var nowTime = myAduio.currentTime;
	var allTime = myAduio.duration;
	// 计算时间，若为个位数，补0
	if (Math.floor(nowTime % 60) < 10) {
		nowTime = Math.floor(nowTime / 60) + ':0' + Math.floor(nowTime % 60);
	} else {
		nowTime = Math.floor(nowTime / 60) + ':' + Math.floor(nowTime % 60);
	}
	if (Math.floor(allTime % 60) < 10) {
		allTime = Math.floor(allTime / 60) + ':0' + Math.floor(allTime % 60);
	} else {
		allTime = Math.floor(allTime / 60) + ':' + Math.floor(allTime % 60);
	}
	progressTime.innerText = nowTime + '/' + allTime;
	// 每0.1秒执行一次
	if (myAduio.paused == false) {
		setTimeout(setTimeText, 100);
	}
}

// 设置进度条进度
function setProgress() {
	let progress_now = document.getElementsByClassName('progress-now')[0];
	let progress_bar = document.getElementsByClassName('progress-bar')[0];
	let progress = Math.floor(
		(myAduio.currentTime / myAduio.duration) * progress_bar.clientWidth
	);
	progress_now.style.width = progress + 'px';
	if (myAduio.paused == false) {
		setTimeout(setProgress, 100);
	}
}

// 设置事件
function setMouseEvent() {

	// 音量控制
	let volume_now = document.getElementsByClassName('volume-now')[0];
	let volume_back = document.getElementsByClassName('volume-back')[0];
	let volume_text = document.getElementsByClassName('volume-text')[0];
	let volume_a = document.getElementsByClassName('volume')[0];
	volume_back.onmousedown = function (e) {
		volume_now.style.width = e.offsetX + 'px';
		myAduio.volume = e.offsetX / 100;
		volume_text.innerText = volume_now.clientWidth;
		volume_back.onmousemove = function (ev) {
			let volume = ev.offsetX;
			if (volume > 100) {
				volume = 100;
			}
			volume_now.style.width = volume + 'px';
			myAduio.volume = volume / 100;
			volume_text.innerText = volume_now.clientWidth;
		};
		document.onmouseup = function () {
			if (myAduio.volume == 0) {
				volume_a.style.background = 'url(Ima/icon.png) no-repeat -309px -129px';
			} else {
				volume_a.style.background = 'url(Ima/icon.png) no-repeat -263px -113px';
			}
			volume_back.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};

	// 进度控制
	let progress_now = document.getElementsByClassName('progress-now')[0];
	let progress_bar = document.getElementsByClassName('progress-bar')[0];
	progress_bar.onmousedown = function (e) {
		progress_now.style.width = e.offsetX + 'px';
		myAduio.pause();
		myAduio.currentTime =
			(e.offsetX * myAduio.duration) / progress_bar.clientWidth;
		setTimeText();
		progress_bar.onmousemove = function (ev) {
			let progress = ev.offsetX;
			if (progress > progress_bar.clientWidth) {
				progress = progress_bar.clientWidth;
			}
			progress_now.style.width = progress + 'px';
			myAduio.currentTime =
				(progress * myAduio.duration) / progress_bar.clientWidth;
			setTimeText();
		};
		document.onmouseup = function () {
			myAduio.play();
			for (var i = 0; i < timeArray.length; i++) {
				if (myAduio.currentTime < timeArray[i]) {
					nowLine = i - 1;
					timeInterval[nowLine] =
						timeArray[nowLine + 1] - myAduio.currentTime;
					setPlay(true);
					break;
				}
			}
			progress_bar.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};
}
// 设置静音
function setMuted() {
	let volume_now = document.getElementsByClassName('volume-now')[0];
	let volume_text = document.getElementsByClassName('volume-text')[0];
	let volume_a = document.getElementsByClassName('volume')[0];
	if (myAduio.muted == true) {
		myAduio.muted = false;
		volume_a.style.background = 'url(Ima/icon.png) no-repeat -263px -113px';
		volume_now.style.width = myAduio.volume * 100 + 'px';
		volume_text.innerText = myAduio.volume * 100;
	} else {
		myAduio.muted = true;
		volume_a.style.background = 'url(Ima/icon.png) no-repeat -309px -129px';
		volume_now.style.width = '0';
		volume_text.innerText = '0';
	}
}