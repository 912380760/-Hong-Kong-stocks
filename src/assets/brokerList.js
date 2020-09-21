// 券商列表记录
let data = {
  老虎: {
    开户链接:
      "https://www-web.itiger.com/accounts?region=CHN&reg_source=invite&invite=MDTNCN&lang=zh_CN&share=Wechat&next=%2Factivity%2Fforapp%2Finvitation%2Fsignup-success.html",
    软件下载: "https://www.itiger.com/download?lang=zh_CN",
    融资倍数: "2-20倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 0, // 0不支持 1支持
    暗盘: 0, // 0不支持 1支持
    卖出资金可用: "T+0",

    港股平台费: 15,
    现金认购费: -1,
    融资认购费: 100,
    最低佣金: 0,
    佣金: 0.00029,
  },
  华泰: {
    开户链接:
      "https://gb.zhangle.com/views/new-customer-gift/index.htm?ciphertext=108f983228adc5d3adaefd352ea87bd957d52459a02e93fd6eb9b8f0ecab2d21a3ce63377b73bac5b9ba0e1ff5195219cfba363cbc909651bf4659f79f260241",
    软件下载: "https://www.htsc.com.hk/zh-Hans/our-business-navigation-81",
    融资倍数: "10-33倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 0, // 0不支持 1支持
    暗盘: 0, // 0不支持 1支持
    佣金说明: "免费,需开通会员8/月",

    港股平台费: 0,
    现金认购费: 0,
    融资认购费: 0,
    最低佣金: 0,
    佣金: 0,
  },
  尊嘉: {
    开户链接:
      "http://opt.investassistant.com/miningopt/roulette/index?channelopen=ZPWDAPP&hmsr=wechat&hmpl=710eb40042507168&hmcu=miningopt&hmkw=&hmci=&share=363977&miningfrom=wechat&trader=mining_p",
    软件下载: "http://apph5.investassistant.com/mining_fe/zjDownLoad",
    融资倍数: "10-20倍",
    融资额度: 0, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "免费",
    卖出资金可用: "T+0",

    港股平台费: 1,
    现金认购费: 5,
    融资认购费: 99.9,
    最低佣金: 0,
    佣金: 0,
    最低暗盘佣金: 11.9,
    暗盘佣金: 0.0005,
  },
  富途: {
    港股免佣到期日: "2021/01/01", // 需要传入具体的日期
    开户链接:
      "https://growth1.futunn.com/common-invite/temp/64?code=fcbe411c1f9d1b36ab6de4f8cccc968b&channel=535&subchannel=10001&fx=23",
    软件下载: "https://www.futunn.com/download/android?lang=zh-CN",
    融资倍数: "10倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万3最低3",
    卖出资金可用: "T+0",

    港股平台费: 15,
    现金认购费: 50,
    融资认购费: 100,
    最低佣金: 3,
    佣金: 0.0003,
    最低暗盘佣金: 3,
    暗盘佣金: 0.0003,
  },
  易昇: {
    开户链接:
      "http://h5.lc913.com/web//Invitation/registerNew.html?customerId=532228147874377728",
    软件下载: "http://www.easy913.com/down.html",
    融资倍数: "10-20倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 0, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万5最低50",
    卖出资金可用: "T+0",

    港股平台费: 0,
    现金认购费: 0,
    融资认购费: 100,
    最低佣金: 50,
    佣金: 0.0005,
    最低暗盘佣金: 50,
    暗盘佣金: 0.0005,
  },
  友信: {
    开户链接:
      "https://m.yxzq.com/webapp/marketing/new-ch-outerv2.html?ICode=d7ex&id=1002&n=Lucien&bizId=1002&shareId=promotion#/index",
    软件下载:
      "https://android.myapp.com/myapp/detail.htm?apkName=com.yxzq.stock&ADTAG=mobile",
    融资倍数: "10-15倍",
    融资额度: 1, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万8最低8",
    卖出资金可用: "T+0",

    港股平台费: 0,
    现金认购费: 18,
    融资认购费: 99,
    最低佣金: 12,
    佣金: 0.0005,
    最低暗盘佣金: 12,
    暗盘佣金: 0.0005,
  },
  华盛通: {
    开户链接: "https://hd.hstong.com/invite/2020/accept?invite=GACYT",
    软件下载: "https://www.hstong.com/download",
    融资倍数: "10倍",
    融资额度: 1, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万3最低3",
    卖出资金可用: "T+0",

    港股平台费: 15,
    现金认购费: 50,
    融资认购费: 100,
    最低佣金: 3,
    佣金: 0.0003,
    最低暗盘佣金: 3,
    暗盘佣金: 0.0003,
  },
  东财: {
    开户链接:
      "https://hkkhapp.eastmoney.com/Registnew/Step1?versionmodel=H5&returl=hkreturl&channelname=12&ad_id=zwtg_kh_act_xct_03_02_04_0",
    软件下载: "https://emsec.eastmoney.com/download.html",
    融资倍数: "10-20倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 0, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万3最低3",
    卖出资金可用: "T+0",

    港股平台费: 15,
    现金认购费: 5,
    融资认购费: 100,
    最低佣金: 5,
    佣金: 0.00025,
    最低暗盘佣金: 5,
    暗盘佣金: 0.00025,
  },
  玖富: {
    开户链接:
      "https://sns.9fstock.com/sunline/active/2019/official-friends-invite/?channelId=666&utm_source=Web&utm_medium=haoyouyaoqing&invUserId=639922&hashPath=invite/",
    软件下载: "https://www.9fstock.com/download.html",
    融资倍数: "10-20倍",
    融资额度: 1, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万5最低15",
    卖出资金可用: "T+2",

    港股平台费: 0,
    现金认购费: 10,
    融资认购费: 100,
    最低佣金: 30,
    佣金: 0.00029,
    最低暗盘佣金: 15,
    暗盘佣金: 0.0005,
  },
  艾德: {
    开户链接: "https://aosh5.eddidapp.com/?rf=V1RISzEyNzpFREFB",
    软件下载: "https://www.eddid.com.hk/zh-hans/download/",
    融资倍数: "10倍",
    融资额度: 0, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万5最低30",
    卖出资金可用: "T+0",

    港股平台费: 12,
    现金认购费: 5,
    融资认购费: 100,
    最低佣金: 0,
    佣金: 0,
    最低暗盘佣金: 30,
    暗盘佣金: 0.0005,
  },
  耀才: {
    开户链接: "https://mp.weixin.qq.com/s/JTZsPgoenw5AQKxkZpxf2g",
    软件下载: "https://chinaweb1.bsgroup.com.hk/mobiletrading/sec/allapp//",
    融资倍数: "10倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 0, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万1最低5",
    卖出资金可用: "T+0",

    港股平台费: 1,
    现金认购费: 5,
    融资认购费: 100,
    最低佣金: 0,
    佣金: 0,
    最低暗盘佣金: 0,
    暗盘佣金: 0,
  },
  雪盈: {
    开户链接:
      "https://www.snowballsecurities.com/activity/deposit-guide-q3?r=BMAA2&activity_code=R200609&utm_medium=code&utm_source=R200609",
    软件下载: "https://www.snowballsecurities.com/download",
    融资倍数: "10倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 0, // 0不支持 1支持
    暗盘: 0, // 0不支持 1支持
    佣金说明: "万3最低6",
    卖出资金可用: "T+0",

    余额: 0,
    港股平台费: 18,
    现金认购费: -1,
    融资认购费: 100,
    最低佣金: 0,
    佣金: 0,
  },
  方德: {
    开户链接:
      "https://mobile.fdzq.com/app-h5/module/my_invite_share.html?broker=FDHongKong&invite_code=B1AET&activity_id=1009",
    软件下载: "https://www.fdzq.com/app/download.html",
    融资倍数: "10-20倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "千2最低100",
    卖出资金可用: "T+0",

    港股平台费: 0,
    现金认购费: 100,
    融资认购费: 150,
    最低佣金: 100,
    佣金: 0.002,
    最低暗盘佣金: 100,
    暗盘佣金: 0.002,
  },
  盈路: {
    开户链接:
      "https://s2.huanyingzq.com/invite-friends-new/share?u=0244126EADAE0744F919A36359F5E374&utm_source=inviteFriendsNew",
    软件下载:
      "https://android.myapp.com/myapp/detail.htm?apkName=com.hyhk.stock&ADTAG=mobile",
    融资倍数: "10-20倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 0, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "千2最低50",
    卖出资金可用: "T+0",

    港股平台费: 0,
    现金认购费: 50,
    融资认购费: 100,
    最低佣金: 50,
    佣金: 0.002,
    最低暗盘佣金: 50,
    暗盘佣金: 0.002,
  },
  利弗莫尔: {
    开户链接:
      "https://vip.jesselivermore.com/index.html?genius=user-dbb12518c64f49a989f39573d049a5c3",
    软件下载: "https://www.jesselivermore.com/download.html",
    融资倍数: "10倍",
    融资额度: 1, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万2.5最低5",
    卖出资金可用: "T+0",

    港股平台费: 7.26,
    现金认购费: 50,
    融资认购费: 100,
    最低佣金: 5,
    佣金: 0.00025,
    最低暗盘佣金: 5,
    暗盘佣金: 0.00025,
  },
  青石: {
    开户链接:
      "http://enstatine.bluestonehk.com/createAccount/?invite=90655&pack=8234",
    软件下载: "http://www.bluestonehk.com/download",
    融资倍数: "10倍",
    融资额度: 0, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万5最低40",
    卖出资金可用: "T+2",

    港股平台费: 0,
    现金认购费: 0,
    融资认购费: 100,
    最低佣金: 40,
    佣金: 0.0005,
    最低暗盘佣金: 40,
    暗盘佣金: 0.0005,
  },
  有鱼: {
    开户链接:
      "https://mservice.xincaitong.com/hkOpenApi/api/broker/920d6df175181b6cffb9e80deb3f65c7#/",
    软件下载:
      "https://android.myapp.com/myapp/detail.htm?apkName=com.ruifusoft.finance.app&ADTAG=mobile",
    融资倍数: "10倍",
    融资额度: 0, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "千1最低50",
    卖出资金可用: "T+2",

    港股平台费: 0,
    现金认购费: 0,
    融资认购费: 0,
    最低佣金: 50,
    佣金: 0.001,
    最低暗盘佣金: 50,
    暗盘佣金: 0.001,
  },
  佳兆业: {
    开户链接: "https://kgl.jt00000.com/open-account/#/login?channel=ZL&YYM=01",
    软件下载: "https://www.kaisasecurities.com/Download/",
    融资倍数: "10倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "15",
    卖出资金可用: "T+0",

    港股平台费: 0,
    现金认购费: 50,
    融资认购费: 80,
    最低佣金: 15,
    佣金: 0.001,
    最低暗盘佣金: 120,
    暗盘佣金: 0.001,
  },
  华赢: {
    开户链接: "https://www.hyzq.com.hk/apis/invite_invite?code=11",
    软件下载: "http://www.hyzq.com.hk/apis/download_download",
    融资倍数: "10-20倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "千1最低60",
    卖出资金可用: "T+0",

    港股平台费: 0,
    现金认购费: 0,
    融资认购费: 120,
    最低佣金: 60,
    佣金: 0.001,
    最低暗盘佣金: 60,
    暗盘佣金: 0.001,
  },
  第一上海: {
    开户链接: "https://www.mystockhk.com/category.aspx?NodeID=188",
    软件下载: "https://www.mystockhk.com/category.aspx?NodeID=188",
    融资倍数: "10-20倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 0, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "千3最低79",
    卖出资金可用: "T+2",

    港股平台费: 0,
    现金认购费: 0,
    融资认购费: 100,
    最低佣金: 79,
    佣金: 0.003,
    最低暗盘佣金: 79,
    暗盘佣金: 0.003,
  },
  长桥: {
    开户链接:
      "https://activity.lbkrs.com/zh-CN/invite-friend/invite?type=share&invite-code=915934&channel=HM000001",
    软件下载: "https://longbridge.global/download?channel=WO000002",
    融资倍数: "10-20倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "15",
    卖出资金可用: "T+2",

    港股平台费: 0,
    现金认购费: 49,
    融资认购费: 99,
    最低佣金: 15,
    佣金: 0.001,
    最低暗盘佣金: 15,
    暗盘佣金: 0.001,
  },
  阿尔法: {
    开户链接:
      "https://mservice.xincaitong.com/hkOpenApi/api/broker/1ee70c8d208a70a85f3808a812edd85c#/",
    软件下载: "https://www.alphahk.com/download.php",
    融资倍数: "10倍",
    融资额度: 1, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "万五最低3",
    卖出资金可用: "T+2",

    港股平台费: 0,
    现金认购费: 0,
    融资认购费: 100,
    最低佣金: 3,
    佣金: 0.0005,
    最低暗盘佣金: 50,
    暗盘佣金: 0.0005,
  },
  辉立: {
    开户链接: "",
    软件下载:
      "http://www.poems.com.hk/zh-cn/phillip-apps/download/mobile-apps/",
    融资倍数: "20倍",
    融资额度: 2, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "千2最低75",
    卖出资金可用: "T+0",

    港股平台费: 0,
    现金认购费: 0,
    融资认购费: 100,
    最低佣金: 75,
    佣金: 0.002,
    最低暗盘佣金: 75,
    暗盘佣金: 0.002,
  },
  富昌: {
    开户链接: "",
    软件下载: "http://fb.ffg.com.hk/Desktop/zh-HK/Post/Detail/28763?cid=202",
    融资倍数: "20倍",
    融资额度: 1, // 0少 1一般 2充足
    融资一手: 1, // 0不支持 1支持
    暗盘: 1, // 0不支持 1支持
    佣金说明: "千1.5最低75",
    卖出资金可用: "T+0",

    港股平台费: 0,
    现金认购费: 0,
    融资认购费: 100,
    最低佣金: 75,
    佣金: 0.0015,
    最低暗盘佣金: 75,
    暗盘佣金: 0.0015,
  },
};

export default data;
