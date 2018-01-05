Page({
  data:{
  
  },
  toWorkbench(){
    wx.navigateTo({
      url: '/pages/bmem/workbench/index',
    })
  },
  toMyAccount(){
	    wx.navigateTo({
	      url: '/pages/cmem/account/index',
	    })
	  },
    toMoreCard(){
      wx.navigateTo({
        url: '/pages/bmem/comp/more/index',
      })
    }

})