const ipo = {
  科利实业控股: {
    SCTYCode: 1455,
    OrderPrice: 0.6,
    OrderQty: 5000,
  },
};

/**
 * 认购新股
 * @param ipo 认购股票集合
 * @param name 股票名称
 * @param shoushu 认购手数
 * @param OrderSide 认购方式 认购方式 1:现金认购 3:白嫖 5:20倍 7:10倍
 */
function rengou(ipo, name, shoushu, OrderSide = 3) {
  let 中签费率 = 0.010077;
  let temp = ipo[name];
  let { SCTYCode, OrderPrice, OrderQty } = temp;

  let adminFee;
  let 认购股数 = shoushu * OrderQty;
  let 认购金额 = 认购股数 * 0.6 * (1 + 中签费率);
  if (认购金额 < 10000) {
    adminFee = 0;
  } else if (认购金额 < 50000) {
    adminFee = 38;
  } else if (认购金额 < 100000) {
    adminFee = 68;
  } else {
    adminFee = 100;
  }
  let BQty = 认购股数 + "," + (Math.round(认购金额 * 100) / 100).toFixed(2);

  /**
   * 请求参数
   * @param SCTYCode 新股编号 前面如果有0需要去掉
   * @param OrderPrice 认购价格
   * @param adminFee 管理费
   * @param OrderQty 每手股数
   * @param BQty 认购股数,认购金额 例如: 5000,3030.23
   * @param OrderSide 认购方式 1:现金认购 3:白嫖 7:10倍
   * @param ExchangeProduct_Point 交换产品点
   * @param ExchangeProduct_Price 交换产品价格
   */
  // 认购
  fetch(
    "https://trading.poems.com.hk/POEMS2/ProductPlatform/LStock/IPO_New/InputIPOAction.asp",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-fetch-dest": "iframe",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrer:
        "https://trading.poems.com.hk/POEMS2/ProductPlatform/LStock/IPO_New/InputIpo.asp?SCTYCode=" +
        SCTYCode +
        "&WebSite=&Popup=N",
      referrerPolicy: "no-referrer-when-downgrade",
      body: `func=Insert&WebSite=&Popup=N&SCTYCode=${SCTYCode}&OrderPrice=${OrderPrice}&adminFee=${adminFee}&OrderQty=${OrderQty}&BQty=${BQty}&OrderSide=${OrderSide}&ExchangeProduct_Point=1500&ExchangeProduct_Price=100`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  ).then((e) => {
    e.json().then((ele) => {
      console.log(ele);
    });
  });
}
rengou(ipo, "科利实业控股", 1);

// 更改
fetch(
  "https://trading.poems.com.hk/Poems2/ProductPlatform/LStock/IPO_New/InputIPOAction.asp",
  {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "iframe",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrer:
      "https://trading.poems.com.hk/Poems2/ProductPlatform/LStock/IPO_New/InputIPO.asp?Popup=N&SCTYCode=1455",
    referrerPolicy: "no-referrer-when-downgrade",
    body:
      "func=Modify&WebSite=&Popup=N&SCTYCode=1455&OrderPrice=0.6&adminFee=0&OrderQty=10000&BQty=10000%2C6060.46&OrderSide=3&ExchangeProduct_Point=1500&ExchangeProduct_Price=100",
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
);

// 取消
fetch(
  "https://trading.poems.com.hk/Poems2/ProductPlatform/LStock/IPO_New/InputIPOAction.asp",
  {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "iframe",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrer:
      "https://trading.poems.com.hk/Poems2/ProductPlatform/LStock/IPO_New/InputIPO.asp?Popup=N&SCTYCode=1455",
    referrerPolicy: "no-referrer-when-downgrade",
    body:
      "func=Cancel&WebSite=&Popup=N&SCTYCode=1455&OrderPrice=0.6&adminFee=&OrderQty=1&BQty=&ExchangeProduct_Point=1500&ExchangeProduct_Price=100",
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
);

// 获取套餐认购信息 IPO: 股票编号 sid: 随机数
fetch(
  "https://trading.poems.com.hk/POEMS2/getVal/IPO_new/getIPODetail.asp?lang=ZH&IPO=1455&sid=0.4901778470911642",
  {
    headers: {
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer:
      "https://trading.poems.com.hk/POEMS2/ProductPlatform/LStock/IPO_New/InputIpo.asp?SCTYCode=1455&WebSite=&Popup=N",
    referrerPolicy: "no-referrer-when-downgrade",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  }
);

// 获取认购列表 sid: 随机数
fetch(
  "https://trading.poems.com.hk/POEMS2/getVal/IPO_new/getIPOList.asp?lang=ZH&sid=0.8029335742902322",
  {
    headers: {
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer:
      "https://trading.poems.com.hk/POEMS2/ProductPlatform/LStock/IPO_New/ListIPO.asp?WebSite=&Popup=N",
    referrerPolicy: "no-referrer-when-downgrade",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  }
);
