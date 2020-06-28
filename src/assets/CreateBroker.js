// 处理券商
class CreateBroker {
    constructor(data) {
        let { name, 余额, 港股平台费, 港股免佣到期日, 现金认购费, 融资认购费, 佣金 } = data;
        this.name = name;
        this.余额 = 余额;
        this.港股平台费 = 港股平台费;
        this.港股免佣到期日 = 港股免佣到期日;
        this.现金认购费 = 现金认购费;
        this.融资认购费 = 融资认购费;
        this.中签费 = 0.010077;
        this.打新记录 = [];
        // 佣金需要传一个函数,接受总交易额,返回佣金
        this.佣金 = 佣金;
    }

    港股代收费项目(总交易额) {
        // 交收费
        const 交收费 = 总交易额 * 0.00002 > 2 ? 总交易额 * 0.00002 : 2;
        const 交易印花税 = 总交易额 * 0.001 > 1 ? 总交易额 * 0.00001 : 1;
        const 交易费 = 总交易额 * 0.00005 > 0.01 ? 总交易额 * 0.00005 : 0.01;
        const 交易证费 = 总交易额 * 0.000027 > 0.01 ? 总交易额 * 0.000027 : 0.01;
        const 交易系统使用费 = 0.5;

        return (交收费 + 交易印花税 + 交易费 + 交易证费 + 交易系统使用费).toFixed(2) - 0;
    }

    港股出售费用计算(data) {
        let { 出售价格, 出售手数, 每手股数, 出售日期 } = data;
        const 总交易额 = (出售价格 * 出售手数 * 每手股数).toFixed(2) - 0;
        const 代收费项目费用 = this.港股代收费项目(总交易额);
        let 佣金 = 0;
        if(new Date(this.港股免佣到期日) - new Date(出售日期) < 0) {
            佣金 = this.佣金(data.总交易额)
        }
        return (代收费项目费用 + 佣金 + this.港股平台费).toFixed(2) - 0;
    }

    添加港股打新记录(data) {
        let { name, 打新类型, 打新手数, 一手金额, 融资利率, 融资倍数, 每手股数, 记息天数, 打新日期 } = data;
        if (!融资倍数) {
            融资倍数 = 0;
        }

        let 打新费用 = 0, 资金占用;
        if(打新类型 === '现金打新') {
            打新费用 = this.现金认购费;
            资金占用 = (打新手数 * 一手金额).toFixed(2) - 0;
        } else {
            打新费用 = (打新手数 * 一手金额 / 融资倍数 * (融资倍数 - 1) * 融资利率 / 365 * 记息天数 + this.融资认购费).toFixed(2) - 0;
            资金占用 = (打新手数 * 一手金额 / 融资倍数).toFixed(2) - 0;
        }
        this.打新记录.push({
            name,
            打新类型,
            每手股数,
            打新手数,
            一手金额,
            融资利率,
            融资倍数,
            打新日期,
            打新费用,
            资金占用,
            总认购金额: (打新手数 * 一手金额).toFixed(2) - 0,
        });
        // 结算打新费用
        this.余额 -= 打新费用;
        this.余额 = this.余额.toFixed(2) - 0;

        // 链式调用
        return this;
    }

    港股中签(data) {
        this.打新记录.forEach((ele, index) => {
            if(data.name === ele.name) {
                let {中签定价, 中签手数} = data;
                this.打新记录[index].中签手数 = 中签手数;
                this.打新记录[index].中签定价 = 中签定价;
                this.打新记录[index].资金占用 = (中签手数 * 中签定价 * ele.每手股数).toFixed(2) - 0;
                this.打新记录[index].中签费用 = (中签手数 * 中签定价 * ele.每手股数 * this.中签费).toFixed(2) - 0;

                // 结算中签费
                this.余额 -= (中签手数 * 中签定价 * ele.每手股数 * this.中签费);
                this.余额 = this.余额.toFixed(2) - 0;
            }
        })

        // 链式调用
        return this;
    }

    出售中签股票(data) {
        this.打新记录.forEach((ele, index) => {
            if(data.name === ele.name) {
                let {出售价格, 出售手数, 出售日期} = data;
                // 结算出售费用
                const 出售费用 = this.港股出售费用计算({
                    出售价格,
                    出售手数,
                    出售日期,
                    每手股数: ele.每手股数,
                });
                this.余额 -= 出售费用;

                let 出售记录对象 = {
                    出售价格,
                    出售手数,
                    出售日期,
                    出售费用,
                }
                if (!this.打新记录[index].出售记录) {
                    this.打新记录[index].出售记录 = [];
                }
                let {中签定价, 每手股数} = ele;
                let {中签费用, 中签手数, 打新费用} = this.打新记录[index];
                let 利润 = (出售价格 - 中签定价) * 出售手数 * 每手股数;
                this.打新记录[index].出售记录.push(出售记录对象);
                if (this.打新记录[index].股票盈利 || this.打新记录[index].股票盈利 === 0) {
                    this.打新记录[index].股票盈利 += (利润.toFixed(2) - 0);
                    this.打新记录[index].已出售手数 += 出售手数;
                } else {
                    this.打新记录[index].股票盈利 = 利润.toFixed(2) - 0;
                    this.打新记录[index].已出售手数 = 出售手数;
                }

                let 已出售总费用 = 0;
                this.打新记录[index].出售记录.forEach((ele) => {
                    已出售总费用 += ele.出售费用;
                });
                this.打新记录[index].资金占用 -= (出售手数 * 中签定价 * 每手股数).toFixed(2) - 0;
                this.打新记录[index].净利润 = (
                    this.打新记录[index].股票盈利 - (打新费用 + 中签费用) / 中签手数 * this.打新记录[index].已出售手数
                    - 已出售总费用
                ).toFixed(2) - 0;
                this.余额 += 利润;
                this.余额 = this.余额.toFixed(2) - 0;
            }
        })

        // 链式调用
        return this;
    }
}

export default CreateBroker;