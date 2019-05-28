const innerAudioContext = wx.createInnerAudioContext();
App({
	globalData: {
		isSongHidden: true,

		cdInfo: {},
		playFlag: true,
		isPlayHidden: true,
		index: 0,
		src: [
			'http://dl.stream.qqmusic.qq.com/C400000TQtDa3K6c3W.m4a?guid=9277888830&vkey=44C1F33A5ECB17D99E6D28F48248E39AFA5E34FC1F3561302C0EC0309AAB2BC997C97E414F8F21FA42B85445D1A1C4470E3E68601DEEB9F7&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400003rJSwm3TechU.m4a?guid=9277888830&vkey=C7D9ED9FF77D043884BBEBC9F02499B4C294F5D6777CF1967AADD57346634FD2F2EADC7016F50AA9D0C69CA8C377E844904850DF9A1287D4&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400000uzA4V1Z9S77.m4a?guid=9277888830&vkey=A18E65CD5C1F038A25B1721C393585A2FA8690BAA105CF438E28A0C9E66E844EAE02A4D180F4937A64F3F360D38D5DDD0054E700692EB61B&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400003dIBbN1b93ej.m4a?guid=9277888830&vkey=14D4BA94242FDA5DA53003316C853099218102DBFD952AC0312E15B30E2BB13E4A9C5D32E3A76E11E670CF453473087583643E4DD7094350&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400003EUhmv2Xsbxe.m4a?guid=9277888830&vkey=2F5A8C9360296BE204BC6C89C49EDC465786C3556A2F0C55C597D4617D8E19BB87B19E6AAC29FC3B675218B33A385498DFA5D8B3870720EE&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400002L7IiW4LxkpS.m4a?guid=9277888830&vkey=AEC16C16E1DD2364637D751C1779578C296CD348FFE973CADD5E7B6DA8E3DA41229656C5D2E2960F0DFCFB300105B30861123E4F724EBA54&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400001ffby03lKxbD.m4a?guid=9277888830&vkey=46F4AA62220DAC6005DA6A239C45FE8B79B8B1B47640396C33ADD91C6AB094055DA1B140D89C0555BCED6FC38858438708E8E4F62FBEEB45&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400003loVtv008KzX.m4a?guid=9277888830&vkey=650D0AE89BE6362F0D7A96C679AF1198D7FB771189553BA91A722962C5EA85534E926DCCF175187EBE9D0E41A47A3ED3363E0319D4E22FB1&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400001pMKUP1q1VjJ.m4a?guid=9277888830&vkey=8B775C71CC6D09EA6480FD1AC392B7ECD4EC29D3D0DD36209A8B7664BEEB408C91BA28013ED6A9A7587EDD702DCC33FD64077796911F3061&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400003MwvH92I1A3n.m4a?guid=9277888830&vkey=CA86AEC4285AE4B5F14C16637CEF00E509DEC2D0F36479965B049F53F9AFEA77D7EA9A4AF632F1E2F8E763212455011807E3878CF9B2B1DE&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400004IcEtu0K5ncp.m4a?guid=9277888830&vkey=A7745271E7144616E361C318321A2C5BDB3FB6097D21694380049C9B11F73336F8DBD756C37D20E02461804B474FF9AEBE3CF6F5F52C670C&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400003GDlzl249E0Z.m4a?guid=9277888830&vkey=BBD43C0676735C71D35E86CD4157F367C6FAD29CD4606DDDE3165039FC3C4399221B7BB51D21DD042A192FBFF054BCAF374018D88F50A75B&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400000XCqOI38IjKg.m4a?guid=9277888830&vkey=F64023BAEFCBC70241A34297C86F99F70BEE98F99BA463A3C0BBD6C9506EDC094E318B0EE0FF4E62F9ECDF6CD383F7F6B53E86DEC157A5BC&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400001ATYDd4Iooah.m4a?guid=9277888830&vkey=3440030BEBA662301460FBF0C8BA7AE407922AAECAE6F8D6212E984F342030CD35FCD0E17C669DB2A0F53A11667DD202E570A42B5939E5FB&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400001vsIPi0suAfK.m4a?guid=9277888830&vkey=4E270931FD553513637E6A7C6D3208081E740D34CCA42B66C521497DD083E98E62DA0A8A70FF2F198AB88975F64B49D1B966F133251C8D61&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400001SCYxs3aMWq9.m4a?guid=9277888830&vkey=37AA7057F9A460543D273EBE5C8291DB94EB07A9F2791E5B88C7F369B46FF4D8F372F1CC220741622CB82CBAAD14FF395483D80ECB3A23EE&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400002qUjdb3KjWDz.m4a?guid=9277888830&vkey=6D74E8D27ABA22036DB0B4ECAD5FCADD6CA0143F0C528A22C6C1D062AD42A0F700C571ED32610CFD3A35EC48BAA657CDAE483AA116A6CA3A&uin=0&fromtag=38',
			'http://dl.stream.qqmusic.qq.com/C400002rcVkm02WMyO.m4a?guid=9277888830&vkey=2F13B5508237FE7272B375C9727924B95A0F557D75E38CCFAF808224C3759133A4DC729144EA8C2C57DB71BCEC5639F7FDD8577DBBB1CD50&uin=0&fromtag=38'
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
