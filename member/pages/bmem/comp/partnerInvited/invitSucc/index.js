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
	  }

})