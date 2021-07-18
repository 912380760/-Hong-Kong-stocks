import request from "./request";

/**
 * 计算申购成本和盈利
 * @param data
 * @return {{资金占用: *, 申购成本: *, 盈亏: number, 申购金额: *, 百分比收益: (number|number)}}
 */
export function 计算申购成本和盈利(申购股票, 申购对象, 券商对象) {
  const 中签费 = 0.010077;
  const {
    一手认购最低价,
    每手股数,
    记息天数,
    中签定价,
    name
  } = 申购股票;
  const {
    打新手数,
    融资比例,
    融资利率,
    打新手续费,
    打新类型,
    中签数,
    出售价格,
    出售日期,
    券商,
  } = 申购对象;
  const {
    现金认购费,
    融资认购费,
  } = 券商对象;

  // 计算融资成本
  let 融资成本 = 0;
  if (["老虎", "雪盈", "盈路", "长桥"].indexOf(券商) > -1) {
    // 盈透系券商为全额融资
    融资成本 = ((一手认购最低价 * 打新手数 * 融资利率) / 365) * (Number(记息天数) + 1);
  } else {
    融资成本 =
        ((一手认购最低价 * 打新手数 * 融资比例 * 融资利率) / 365) *
        记息天数;
  }

  // 计算认购手续费
  let 认购手续费 = 0;
  if (打新手续费 !== undefined) {
    认购手续费 = 打新手续费;
    融资成本 = 0;
  } else {
    认购手续费 = 打新类型 === "现金打新" ? 现金认购费 : 融资认购费;
  }
  let 申购成本 = 认购手续费 + 融资成本;


  // 计算盈利
  let 盈亏 = 0;
  if (中签数 > 0 && 出售价格 && 出售日期) {
    const 出售费用 = 港股出售费用计算({
      出售价格,
      中签数,
      出售日期,
      每手股数,
      券商对象,
    });
    const 股票盈利 = (出售价格 - 中签定价) * 每手股数 * 中签数;
    盈亏 = 股票盈利 - 申购成本 - 出售费用 - (中签定价 * 每手股数 * 中签费);

  } else {
    盈亏 = 0 - 申购成本;
  }

  const 资金占用 = 一手认购最低价 * 打新手数 * (1 - 融资比例) + 申购成本
  const 申购金额 = 一手认购最低价 * 打新手数 + 申购成本;

  let 百分比收益;
  if (资金占用 > 中签数 * 中签定价 * 每手股数) {
    百分比收益 = 盈亏 / 资金占用
  } else if (中签数 > 0) {
    百分比收益 = 盈亏 / (中签数 * 中签定价 * 每手股数)
  } else {
    百分比收益 = 0
  }

  return {
    申购成本,
    盈亏,
    资金占用,
    申购金额,
    百分比收益,
  }
}

function 港股出售费用计算(data) {
  let { 出售价格, 出售手数, 每手股数, 出售日期, 券商对象 } = data;
  let { 港股免佣到期日, 最低佣金, 佣金, 港股平台费 } = 券商对象;
  const 总交易额 = (出售价格 * 出售手数 * 每手股数).toFixed(2) - 0;
  const 代收费项目费用 = 港股代收费项目(总交易额);
  let 实际佣金 = 0;
  if (!港股免佣到期日 || new Date(港股免佣到期日) - new Date(出售日期) < 0) {
    实际佣金 = 总交易额 * 佣金 > 最低佣金 ? 总交易额 * 佣金 : 最低佣金;
  }
  return 代收费项目费用 + 实际佣金 + 港股平台费;
}

function 港股代收费项目(总交易额) {
  // 交收费
  const 交收费 = 总交易额 * 0.00002 > 2 ? 总交易额 * 0.00002 : 2;
  const 交易印花税 = 总交易额 * 0.001 > 1 ? 总交易额 * 0.00001 : 1;
  const 交易费 = 总交易额 * 0.00005 > 0.01 ? 总交易额 * 0.00005 : 0.01;
  const 交易证费 = 总交易额 * 0.000027 > 0.01 ? 总交易额 * 0.000027 : 0.01;
  const 交易系统使用费 = 0.5;

  return 交收费 + 交易印花税 + 交易费 + 交易证费 + 交易系统使用费;
}

/**
 * 合计
 * @param data
 * @return {{资金占用, 融资倍数: number, 申购成本, 盈亏, 手数, 中签数, 申购金额, 百分比收益: number}}
 */
export function 合计(data) {
  const { 每手股数, 一手认购最低价, 中签定价, list } = data;

  const totalObj = list.reduce((accumulator, currentValue) => {
    accumulator.盈亏 += currentValue.盈亏;
    accumulator.资金占用 += currentValue.资金占用;
    accumulator.手数 += currentValue.打新手数;
    accumulator.中签数 += currentValue.中签数;
    accumulator.申购成本 += currentValue.申购成本;
    accumulator.申购金额 += currentValue.申购金额;
    return accumulator;
  }, {
    盈亏: 0,
    资金占用: 0,
    手数: 0,
    中签数: 0,
    申购成本: 0,
    申购金额: 0,
  });

  const {
    盈亏,
    资金占用,
    手数,
    中签数,
    申购成本,
    申购金额,
  } = totalObj;
  let 百分比收益;
  if (资金占用 > 中签数 * 中签定价 * 每手股数 ) {
    百分比收益 = 盈亏 / 资金占用
  } else if (中签数 > 0) { // 如果申购白嫖中签,资金占用等于中签金额
    百分比收益 = 盈亏 / (中签数 * 中签定价 * 每手股数)
  } else {
    百分比收益 = 0
  }
  const 融资倍数 = (手数 * 一手认购最低价) / (资金占用 - 申购成本);

  return {
    盈亏,
    资金占用,
    手数,
    中签数,
    申购成本,
    申购金额,
    百分比收益,
    融资倍数,
  };
}

/**
 * 获取IPO历史数据与本地历史数据合并
 * @param ipoHistory 本地历史数据
 * @return {Promise<*[]>}
 */
export async function 获取IPO数据(ipoHistory) {
  const requestData = await request({
    url: '/fm/ipo/history',
    method: 'post',
    data: {
      page: 1,
      size: 100,
      header: 1,
      paginate: 1,
    },
  });

  const ipoHistoryNameList = ipoHistory.map(ele => ele.name);
  const otherIpoData = requestData.history.filter(ele => {
    if (ipoHistoryNameList.indexOf(ele) === -1) {
      return ele;
    }
  });
  const ipoData = [...otherIpoData, ...ipoHistory];
  // download('data.json', JSON.stringify(ipoData))
  // console.log(JSON.stringify(ipoData))
  return ipoData
}

/**
 * 将ipo数据跟打新记录结合
 * @param ipoData
 * @return {*}
 */
export function 合并IPO数据(ipoData, data) {
  let copyData = _.cloneDeep(data);

  const dataNameList = copyData.map(ele => ele.name);
  const selectIpoList = ipoData.reduce((first, second) => {
    if (dataNameList.indexOf(second.name) > -1) {
      first[second.name] = second;
    }
    return first;
  }, {});
  let 打新记录 = copyData.map(ele => {
    if (selectIpoList[ele.name]) {
      let {
        share_per_lot,
        margin_day,
        listing_date,
        issue_price,
        admission_fee,
      } = selectIpoList[ele.name];

      return Object.assign({
        每手股数: share_per_lot,
        上市日期: listing_date,
        记息天数: margin_day,
        中签定价: issue_price,
        一手认购最低价: admission_fee,
        indexKey: true,
      }, ele);
    }
    return ele
  });

  // 查找出未找到的股票
  打新记录.forEach((ele) => {
    if (!ele.indexKey) {
      console.log(`未找到"${ele.name}"`);
    }
  });

  return 打新记录;
}

/**
 * 计算打新记录,返回计算好后的打新记录数组
 * @param recording
 * @param brokerList
 * @return {*}
 */
export function 计算打新记录(recording, brokerList) {
  return recording.reduce((old, ele) => {
    // 计算单个申购盈利
    const newList = ele.list.reduce((old2, ele2) => {
      const 成本和盈利计算结果 = 计算申购成本和盈利(ele, ele2, brokerList[ele2.券商])
      old2.push({
        ...ele2,
        ...成本和盈利计算结果
      });
      return old2;
    }, []);

    // 计算个股总盈利
    const temp = {
      ...ele,
      list: newList,
    }
    const 合计计算结果 = 合计(temp);
    old.push({
      ...temp,
      ...合计计算结果,
    });
    return old
  }, []);
}

/**
 * 历史收益曲线 目前打新利润 = 中签后已经出售的股票,如果股票未出售不计算,因为利润并未确定,不包含打未公布的新股费用
 * @param 打新记录
 * @return {{收益日期: *[], 收益利润: *[]}}
 */
export function 历史收益曲线计算(打新记录) {
  // todo 每个股票打新费用 总中签率和实际中签率 资金占用
  let 收益对象 = {};
  打新记录.forEach((element) => {
    element.list.forEach((ele) => {
      const {中签数, 出售日期} = ele;
      let 结算日;
      if (中签数 === 0) {
        try {
          let dateTime = new Date(element.上市日期);
          // 未中签暗盘结算
          if(dateTime.getDay() === 0) {
            dateTime.setDate(dateTime.getDate() - 3)
          } else {
            dateTime.setDate(dateTime.getDate() - 1)
          }
          结算日 = `${dateTime.getFullYear()}/${dateTime.getMonth() + 1}/${dateTime.getDate()}`;
        } catch(e) {
          console.log(e)
        }

      } else if(出售日期) {
        结算日 = ele.出售日期;
      }
      if(中签数 === 0 || 出售日期) {
        if (!收益对象[结算日]) {
          收益对象[结算日] = ele.盈亏;
        } else {
          收益对象[结算日] += ele.盈亏;
        }
      }
    });
  });

  let 收益日期 = [], 收益利润 = [], 收益数组对象 = [], 总收益 = 0;
  // 排序
  for (const key in 收益对象) {
    收益数组对象.push({
      日期: key,
      利润: 收益对象[key],
    })
  }
  // 第一次申购新股
  收益数组对象.unshift({
    日期: '2020/4/14',
    利润: 0,
  });
  // 冒泡排序
  bubbleSort(收益数组对象);

  收益数组对象.forEach((ele) => {
    收益日期.push(ele.日期);
    收益利润.push((总收益 += ele.利润).toFixed(2) - 0);
  });
  return {
    收益日期,
    收益利润,
  }
}

/**
 * 根据日期冒泡排序
 * @param arr
 * @return {*}
 */
function bubbleSort (arr) {
  let max = arr.length - 1;
  for (let j = 0; j < max; j++) {
    // 声明一个变量，作为标志位
    let done = true;
    for (let i = 0; i < max - j; i++) {
      if (new Date(arr[i].日期) > new Date(arr[i + 1].日期)) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        done = false;
      }
    }
    if (done) {
      break;
    }
  }
  return arr;
}
