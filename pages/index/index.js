const navbar = require('../../utils/navMain.js')
const server = require('../../utils/requestUtils.js')
const app = getApp()

Page({
  data: {
		// tab栏索引
    _num: 0,
		// 轮播图配置
    mode: "scaleToFill",
		indicatorDots: true,
		autoplay: true,
		interval: 2000,
		duration: 1000,
		// 轮播图信息
    sliderList: [],
		// 歌单信息
    discList: [],
		// 歌手信息
		singerList: [],
		// 排行榜信息
		rankList: [],
		// 热门搜索信息
		hotkeyList: [],
		// 播放信息
		cdInfo: app.globalData.cdInfo,
		// 是否播放
		playFlag: app.globalData.playFlag,
		// 是否隐藏播放器
		isPlayHidden: app.globalData.isPlayHidden,
		// 播放器歌曲信息
		cdList: [],
		// 是否隐藏歌曲页面
		isSongHidden: app.globalData.isSongHidden,
		// 搜索信息
		searchInfo: '',
		// 是否隐藏热门搜索
		isHotKeyHidden: false,
		// 搜索到的数据列表
		searchList: [
			{ name: '人来人往', id: 0 },
			{ name: '喜帖街', id: 1 },
			{ name: '成全', id: 2 },
			{ name: 'Dont cry Don cry', id: 3 },
			{ name: '可惜我是水瓶座', id: 4 },
			{ name: '他不准我哭', id: 5 },
			{ name: '够钟', id: 6 },
			{ name: '谎话情歌', id: 7 },
			{ name: '爱与诚', id: 8 },
			{ name: '爱笑的眼睛', id: 9 },
			{ name: '频率', id: 10 },
			{ name: '还你门匙', id: 11 },
			{ name: '爱情', id: 12 },
			{ name: '我真的受伤了', id: 13 },
			{ name: '与我常在', id: 14 },
			{ name: '断点', id: 15 },
			{ name: '痛爱', id: 16 },
			{ name: '好心分手', id:17}
			]
  },
	// 获取tab信息
	bindchange: navbar.bindchange,
	// 切换tab
	checkCurrent: navbar.checkCurrent,
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this
    // 获取推荐-轮播图数据
    server.goGet('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', 
      {
        _: 1558842203474,
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1
        }, 
        function (res) {
          that.setData({ sliderList: res.data.slider })
       })

    // 获取推荐-热门歌单数据
    server.goGet('https://www.easy-mock.com/mock/5ccffdd2a23c8433d2c42da9/api/getDiscList',
      {},
      function (res) {
        that.setData({ discList: res.data.list })
      })

		// 获取歌手-歌手数据
		server.goGet('https://www.easy-mock.com/mock/5ccffdd2a23c8433d2c42da9/api/getSingerList',
			{},
			function (res) {
				that.setData({ singerList: that._normalizeSinger(res.data.list) })
			})

		// 获取排行-排行数据
		server.goGet('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
			{
				_: 1558842203474,
				g_tk: 5381,
				uin: 0,
				format: 'json',
				inCharset: 'utf-8',
				outCharset: 'utf-8',
				notice: 0,
				platform: 'h5',
				needNewCode: 1
			},
			function (res) {
				that.setData({ rankList: res.data.topList })
			})

		// 获取搜索-热门搜索
		server.goGet('https://www.easy-mock.com/mock/5ccffdd2a23c8433d2c42da9/api/gethotkey',
			{},
			function (res) {
				var temp = []
				for (var i = 0; i < 10; i++) {
					temp.push(res.data.hotkey[i])
				}
				that.setData({ hotkeyList: temp })
			})			
		// 获取推荐-热门歌单跳转的歌曲数据
		server.goGet('https://www.easy-mock.com/mock/5ccffdd2a23c8433d2c42da9/api/getCdInfo',
			{},
			function (res) {
				that.setData({ cdList: res.cdlist })
			})
		// 监听播放状态
		app.watch(that.watchPlayFlag, 'playFlag'),
		// 监听歌曲索引
		app.watch(that.watchIndex, 'index')
	},
  // 生命周期函数--监听页面显示
	onShow: function () {
		this.setData({
			cdInfo: app.globalData.cdInfo,
			isPlayHidden: app.globalData.isPlayHidden,
			isSongHidden: app.globalData.isSongHidden
		})
	},
	// 显示歌曲页面
	getDiscDetail: function () {
		this.setData({ isSongHidden: false})
		app.globalData.isSongHidden = false
	},
	// 调用歌曲暂停、播放方法
	audioPlay: app.audioPlay,
	// 调用歌曲前一首方法
	previous: app.previous,
	// 调用歌曲下一首方法
	next: app.next,
	// 监听播放状态的回调函数
	watchPlayFlag: function (playFlag) {
		this.setData({ playFlag: playFlag })
		console.log('playFlag回调=>' + playFlag)
	},
	// 监听播放歌曲索引的回调函数
	watchIndex: function (index) {
		this.setData({ cdInfo: this.data.cdList[0].songlist[app.globalData.index] })
		console.log('index回调=>' + index)
	},
	// 返回前一页
	goback: function () {
		this.setData({ isSongHidden: true })
		app.globalData.isSongHidden = true
	},
	// 点击歌曲播放
	songPlay: function (e) {
		var songIndex = e.currentTarget.dataset.songindex || 0
		app.globalData.isPlayHidden = false
		app.globalData.cdInfo = this.data.cdList[0].songlist[songIndex]
		app.globalData.playFlag = true
		app.globalData.index = songIndex
		this.data.isPlayHidden = false
		this.setData({ isPlayHidden: this.data.isPlayHidden, cdInfo: this.data.cdList[0].songlist[songIndex] })
		app.setAudioPlay()
		console.log('点击歌曲，data数据为=>', this.data, '全局app数据为=>', app, 'e的数据=>', e)
	},
	// 搜索功能
	search: function(e) {
		this.setData({ searchInfo: e.detail.value})
		if (this.data.searchInfo.length > 0) {
			this.setData({ isHotKeyHidden: true})
		} else {
			this.setData({ isHotKeyHidden: false })
		}
		var _searchList = this.data.searchList.filter(item => {
			return item.name.indexOf(this.data.searchInfo) > -1
		})
		this.setData({searchList: _searchList})
		console.log('查询列表=>', this.data.searchInfo, typeof this.data.searchInfo, _searchList)
	},
	clearSearch: function (e) {
		this.setData({ searchInfo: '' })
		this.setData({ isHotKeyHidden: false })
	},
	searchPlay: function (e) {
		this.songPlay(e)
		console.log(e.currentTarget.dataset.songindex)
	},

	// 歌手-歌手数据处理
	_normalizeSinger: function (list) {
		let map = {
			hot: {
				title: '热门',
				items: []
			}
		}
		class Singer {
			constructor(id, name) {
				this.id = id
				this.name = name
			}
		}
		list.forEach((item, index) => {
			if (index < 10) {
				map.hot.items.push(new Singer({
					name: item.Fsinger_name,
					id: item.Fsinger_mid
				}))
			}
			const key = item.Findex
			if (!map[key]) {
				map[key] = {
					title: key,
					items: []
				}
			}
			map[key].items.push(new Singer({
				name: item.Fsinger_name,
				id: item.Fsinger_mid
			}))
		})
		// 为了得到有序列表，我们需要处理 map
		let ret = []
		let hot = []
		for (let key in map) {
			let val = map[key]
			if (val.title.match(/[a-zA-Z]/)) {
				ret.push(val)
			} else if (val.title === '热门') {
				hot.push(val)
			}
		}
		ret.sort((a, b) => {
			return a.title.charCodeAt(0) - b.title.charCodeAt(0)
		})
		return hot.concat(ret)
	}
})