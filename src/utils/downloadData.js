import ajax from "axios";

/**
 * 获取弗利莫尔ipo历史数据
 * @param year 年份
 * @return {Promise<*>}
 */
export async function 获取弗利莫尔ipo历史数据(year) {
    const requestData =  await ajax({
        url: 'https://h5stockserver.huanshoulv.com/aimapp/hkstock/newStockSearch',
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-CN,zh;q=0.9",
        },
        params: {
            page_count: 1000,
            sort_field_name: 'issue_date',
            issue_year: `${year},${year}`,
            page: 1,
            sort_type: -1,
        },
        "referrer": "https://www.jesselivermore.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "get",
        "mode": "cors",
        "credentials": "omit"
    });
    console.log(requestData)
    return requestData
}

/**
 * 下载弗利莫尔IPO数据
 * @param year 年份
 * @return {Promise<{}>}
 */
async function 下载弗利莫尔IPO数据(year) {
    const ipoData = await 获取弗利莫尔ipo历史数据(year);
    const res = ipoData.data.data;

    const { fields, list } = res;
    let dataList = {};
    list.forEach(ele => {
        const temp = {}
        dataList[ele[0]] = temp;

        fields.forEach((ele2, index2) => {
            temp[ele2] = ele[index2]
        })
    });
    // download(`弗利莫尔${year}IPO数据.json`, dataList);
    console.log(dataList);
    return dataList;
}

export async function 获取具体个股中签数据(params, concatData) {
    const requestData =  await ajax({
        url: 'https://jybdata.iqdii.com/jybapp/IPOService/GetPlacingResult',
        "headers": {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        params: {
            v: Math.random()
        },
        data: {
            code: `E${params}`,
            count: '-1'
        },
        "referrer": "https://www.aipo.org/Home/AipoDetail?stockCode=" + params,
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": `{"code": "E${params}", "count": "-1" }`,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    }).then(res => {
        if (res.data.data) {
            return {
                ...res.data.data,
                ...concatData,
            }
        } else {
            return null
        }
    })
    console.log(requestData)
    return requestData
}

/**
 * 自动下载数据
 * @param filename 文件名
 * @param text 文件内容
 */
function download(filename, text) {
    const fileData = JSON.stringify(text);
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileData));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

/**
 * 暂停N秒,默认两秒
 * @param second 秒数
 * @return {Promise<unknown>}
 */
function delay(second = 2) {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve();
        }, second * 1000);
    }))
}

async function 下载IPO详情数据(year) {
    // 回拨比例 claw_back: "28.0000"
    // 一手中签率 codes_rate: "20.0000"
    // group: "1" // 0创业板 1主板
    // 顶头槌 head_hammer: "3"
    // 定价 ipo_pricing: "17.5800"
    // 配售结果 list: [["500", "177266", null, "0.2000", "177266名申请人中有35454名获发500股股份", "0", "9232.1100"],…]
    // 每手股数 lot: "500"
    // 股票名称 name: "联易融科技－Ｗ"
    // 申购人数 num: "279784"
    // 上限定价 price_ceiling: "18.2800"
    // 下限定价 price_floor: "16.2800"
    // ? rate: "20/1"
    // 配售结果中文链接 rlink: "https://staticpdf.iqdii.com/stockdata/notice/09959/2021/9709263/2021040800103_c.pdf"
    // 配售结果英文链接 slink: "https://staticpdf.iqdii.com/stockdata/notice/09959/2021/9709263/2021040800105_c.pdf"
    // 认购倍数 subscribed: "98.4600"
    // 一手价格 sz: "8790.0000"
    // whiteForm: "https://staticpdf.iqdii.com/stockdata/notice/09959/2021/9709263/2021040800104_c.pdf"
    // yellowForm: ""

    // 22 px_close_rate 首日收盘涨幅
    // 39 green_shoe 绿鞋机制
    // 9 issue_date 上市时间
    // 47 expiration_date 申购结束时间
    // 8 create_at 开始申购时间

    const data = await 下载弗利莫尔IPO数据(year);

    const promiseAllList = [];
    let i = 0;
    for (const tempKey in data) {
        i += 1;
        const {
            px_close_rate,
            green_shoe,
            issue_date,
            expiration_date,
            create_at,
            stock_code,
        } = data[tempKey];
        const concatData = {
            px_close_rate,
            green_shoe,
            issue_date,
            expiration_date,
            create_at,
            stock_code,
        };
        if(i % 10 === 0 && i > 0) {
            await delay()
            promiseAllList.push(获取具体个股中签数据(tempKey, concatData))
        } else {
            promiseAllList.push(获取具体个股中签数据(tempKey, concatData))
        }
    }
    const requestDataList = await Promise.all(promiseAllList)
    const dataList = requestDataList.filter(ele => {
        if(ele) {
            return ele;
        }
    });

    download(`${year}IPO中签详情.json`, dataList);
    console.log(dataList)
    // console.log(temp)
}
// 下载IPO详情数据(2021)
// 下载弗利莫尔IPO数据(2018)

/**
 * 获取基金历史净值
 * @param code 基金代码
 * @param size 日期数量
 * @return {Promise<AxiosResponse<any>>}
 */
async function 获取基金历史净值(code, size) {
    return await ajax({
        url: '/djapi/fund/nav/history/' + code,
        method: 'get',
        params: {
            size,
            page: 1,
        }
    }).then(res => res.data.data.items);
}

// 获取多个基金历史净值并下载
export async function 获取多个基金历史净值并下载(list) {
    const dataMap = {};
    for (let i = 0; i < list.length; i++) {
        const ele = list[i];
        const {code, size} = ele;
        const dataItem = await 获取基金历史净值(code, size);
        dataMap[name] = dataItem;
        if(i % 5 === 0 & i > 0) {
            await delay()
        }
    }
    download('螺丝钉组合基金历史净值.json', dataMap);
}

async function 获取基金分红历史记录(code) {
    return await ajax({
        url: '/djapi/fund/divs/' + code,
        method: 'get',
        params: {
            size: 20,
            page: 1,
        }
    }).then(res => res.data.data.items);
}

// 获取多个基金历史净值并下载
export async function 获取基金分红历史记录并下载(list) {
    const dataMap = {};
    for (let i = 0; i < list.length; i++) {
        const ele = list[i];
        const {name, code} = ele;
        const dataItem = await 获取基金分红历史记录(code);
        dataMap[name] = dataItem;
        if(i % 5 === 0 & i > 0) {
            await delay()
        }
    }
    download('螺丝钉组合基金历史分红.json', dataMap);
}


async function 获取螺丝钉组合历史调仓() {
    ajax({
        url: '/djapi/plan/CSI666/trade_history',
        method: 'get',
        params: {
            size: 300,
            page: 1,
        }
    }).then(res => {
        console.log(res)
    })
}

// 获取基金分红历史记录
// https://danjuanapp.com/djapi/fund/divs/006060?size=20&page=1
