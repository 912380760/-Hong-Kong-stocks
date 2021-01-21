import brokerList from "./brokerList";

// 创建券商,记录券商打新记录和收益
class CreateBroker {
  constructor(data) {
    this.打新记录 = data;
    this.打新记录.forEach((ele, index, arr) => {
      arr[index] = this.计算申购成本和盈利(ele);
    });
    console.log(this.打新记录);
    this.打新记录.forEach((ele, index, arr) => {
      arr[index] = this.合计(ele);
    });
    console.log(this.打新记录);
  }
  中签费 = 0.010077;
  brokerList = brokerList;

  计算申购成本和盈利(data) {
    const { 一手认购最低价, 每手股数, 记息天数, 中签定价 } = data;
    if (data.list) {
      data.list.forEach((ele, index) => {
        const {
          打新手数,
          融资比例,
          融资利率,
          打新手续费,
          打新类型,
          券商,
          中签数,
          出售价格,
          出售日期,
        } = ele;
        let 融资成本 = 0;

        if (["老虎", "雪盈", "赢路", "长桥"].indexOf(券商) > -1) {
          融资成本 = ((一手认购最低价 * 打新手数 * 融资利率) / 365) * 记息天数;
        } else {
          融资成本 =
            ((一手认购最低价 * 打新手数 * 融资比例 * 融资利率) / 365) *
            记息天数;
        }
        let 认购手续费;
        if (打新手续费 !== undefined) {
          认购手续费 = 打新手续费;
          融资成本 = 0;
        } else {
          if (打新类型 === "现金打新") {
            认购手续费 = this.brokerList[券商].现金认购费;
          } else {
            认购手续费 = this.brokerList[券商].融资认购费;
          }
        }
        // data.list[index].认购手续费 = 认购手续费;
        // data.list[index].融资成本 = 融资成本;
        data.list[index].申购成本 = 认购手续费 + 融资成本;

        // 计算盈利
        if (中签数 > 0 && 出售价格 && 出售日期) {
          const 出售费用 = this.港股出售费用计算({
            出售价格,
            中签数,
            出售日期,
            每手股数,
            券商对象: this.brokerList[券商],
          });
          const 股票盈利 = (出售价格 - 中签定价) * 每手股数 * 中签数;
          data.list[index].盈亏 =
            股票盈利 -
            data.list[index].申购成本 -
            出售费用 -
            中签定价 * 每手股数 * this.中签费;
        } else {
          data.list[index].盈亏 = 0 - data.list[index].申购成本;
        }

        // 计算资金占用
        data.list[index].资金占用 =
          一手认购最低价 * 打新手数 * (1 - 融资比例) +
          data.list[index].申购成本;

        data.list[index].申购金额 =
          一手认购最低价 * 打新手数 + data.list[index].申购成本;

        // 百分比收益
        if (data.list[index].资金占用 > 0) {
          data.list[index].百分比收益 =
            data.list[index].盈亏 / data.list[index].资金占用;
        } else {
          data.list[index].百分比收益 = 0;
        }
      });
    }

    return data;
  }

  港股代收费项目(总交易额) {
    // 交收费
    const 交收费 = 总交易额 * 0.00002 > 2 ? 总交易额 * 0.00002 : 2;
    const 交易印花税 = 总交易额 * 0.001 > 1 ? 总交易额 * 0.00001 : 1;
    const 交易费 = 总交易额 * 0.00005 > 0.01 ? 总交易额 * 0.00005 : 0.01;
    const 交易证费 = 总交易额 * 0.000027 > 0.01 ? 总交易额 * 0.000027 : 0.01;
    const 交易系统使用费 = 0.5;

    return (
      (交收费 + 交易印花税 + 交易费 + 交易证费 + 交易系统使用费).toFixed(2) - 0
    );
  }

  港股出售费用计算(data) {
    let { 出售价格, 出售手数, 每手股数, 出售日期, 券商对象 } = data;
    let { 港股免佣到期日, 最低佣金, 佣金, 港股平台费 } = 券商对象;
    const 总交易额 = (出售价格 * 出售手数 * 每手股数).toFixed(2) - 0;
    const 代收费项目费用 = this.港股代收费项目(总交易额);
    let 实际佣金 = 0;
    if (!港股免佣到期日 || new Date(港股免佣到期日) - new Date(出售日期) < 0) {
      实际佣金 = 总交易额 * 佣金 > 最低佣金 ? 总交易额 * 佣金 : 最低佣金;
    }
    return 代收费项目费用 + 实际佣金 + 港股平台费;
  }

  合计(data) {
    const { 每手股数, 一手认购最低价 } = data;
    let 盈亏 = 0,
      资金占用 = 0,
      手数 = 0,
      中签数 = 0,
      申购成本 = 0,
      申购金额 = 0,
      百分比收益;
    data.list.forEach((ele) => {
      盈亏 += ele.盈亏;
      资金占用 += ele.资金占用;
      手数 += ele.打新手数;
      中签数 += ele.中签数;
      申购成本 += ele.申购成本;
      申购金额 += ele.申购金额;
    });
    data.盈亏 = 盈亏;
    data.资金占用 = 资金占用;
    data.手数 = 手数;
    data.中签数 = 中签数;
    data.申购成本 = 申购成本;
    data.百分比收益 = 盈亏 / 资金占用;
    data.融资倍数 = (手数 * 一手认购最低价) / (资金占用 - 申购成本);
    data.申购金额 = 申购金额;
    return data;
  }

  总盈亏() {}
}

export default CreateBroker;
