//获取当前滑块的index
function bindchange(e) {
	const that = this;
	that.setData({
		_num: e.detail.current
	})
}
//点击切换，滑块index赋值
function checkCurrent(e) {
	const that = this;
	if (that.data._num === e.target.dataset.num) {
		return false;
	} else {
		that.setData({
			_num: e.target.dataset.num
		})
	}
}


module.exports = {
	bindchange: bindchange,
	checkCurrent: checkCurrent
}