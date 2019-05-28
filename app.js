const innerAudioContext = wx.createInnerAudioContext();
App({
	globalData: {
		isSongHidden: true,

		cdInfo: {},
		playFlag: true,
		isPlayHidden: true,
		index: 0,
		src: [
			'http://dl.stream.qqmusic.qq.com/C400002HilIy2AltQQ.m4a?guid=2915909258&vkey=13587EA33C75D83F640428F1DE24ECAF1A32EC541BF5D6EF52E37E68918331273164992DF378409B100AC114641D04F946C0214DAB7AE18D&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C40000002Mth2UhMVQ.m4a?guid=6384049787&vkey=6DE76300558E26A957361932CEA1EDC8712C3EEE976BE3DBD1C3D5CC2D53B2B783437247CF3397F5393AF91AC44996CCA3497AA548B33B51&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400003ZGYYX2X3Wpj.m4a?guid=6384049787&vkey=DC3C7A6BFF564BA098940D10C8DD8BC696E7CF8283FBE96D509F7FD22E1F8E7B96865837039DDC14B417850B691DC9F48D79DF31C9C3F5A2&uin=0&fromtag=38'
		]
	},

	watch: function (method, param) {
		console.log('watch中的param值=>', param)
		var obj = this.globalData;
		Object.defineProperty(obj, param, {
			configurable: true,
			enumerable: true,
			set: function (value) {
				var temp = '_'.concat(param)
				temp === '_playFlag' ? this._playFlag = value : this._index = value
				method(value);
				console.log('set里的this值=>', this, 'set里的value值=>', value, temp)
			},
			get: function () {
				var temp = '_'.concat(param)
				return temp === '_playFlag' ? this._playFlag : this._index;
				console.log('get里的this值=>', this, temp)
			}
		})
	},

	audioPlay: function () {
		this.globalData.playFlag = !this.globalData.playFlag
		this.setAudioPlay()
	},

	previous: function () {
		if (this.globalData.index > 0 ) {
			this.globalData.index--
			this.globalData.playFlag = true
			this.setAudioPlay()
			console.log('上一曲=>', this.globalData.index)
		} else {
			this.globalData.index = this.globalData.src.length - 1
			this.globalData.playFlag = true
			this.setAudioPlay()
			console.log('上一曲=>', this.globalData.index)
		}
	},

	next: function () {
		if (this.globalData.index < this.globalData.src.length-1) {
			this.globalData.index++
			this.globalData.playFlag = true
			this.setAudioPlay()
			console.log('下一曲=>', this.globalData.index)
		} else {
			this.globalData.index = 0
			this.globalData.playFlag = true
			this.setAudioPlay()
			console.log('下一曲=>', this.globalData.index)
		}
	},
	
	setAudioPlay: function () {
		innerAudioContext.src = this.globalData.src[this.globalData.index]
		if (this.globalData.playFlag) {
			innerAudioContext.play();
		} else {
			innerAudioContext.pause();
		}
		console.log('设置歌曲播放信息=>', this.globalData.playFlag, innerAudioContext.src, )
	}
})
