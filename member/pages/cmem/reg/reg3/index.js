Page({
  data:{
  
  },
  regCompany(){
    wx.navigateTo({
      url: '/pages/bmem/comp/reg/index',
    })
  },
  toMyAccount(){
	    wx.navigateTo({
	      url: '/pages/cmem/account/index',
	    })
	  }

})