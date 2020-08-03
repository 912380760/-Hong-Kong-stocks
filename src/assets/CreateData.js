// 创建配售对象,处理配售信息
class CreateData {
    constructor(data) {
        let {name, 股价, 总股数, 公开发售占比, 公开配售倍数, 国际配售倍数, 上限招股价, 上市日期, 股票代号, 创业板 } = data;
        this.name = name;
        this.股价 = 股价;
        this.上限招股价 = 上限招股价;
        this.总股数 = 总股数;
        this.公开发售占比 = 公开发售占比;
        this.公开配售倍数 = 公开配售倍数;
        this.国际配售倍数 = 国际配售倍数;
        this.上市日期 = 上市日期;
        this.股票代号 = 股票代号;
        this.创业板 = 创业板;


        let [甲组, 乙组, 甲组人数, 乙组人数, 每手股数] = this.中签数据格式化(data);
        this.甲组 = 甲组;
        this.乙组 = 乙组;
        this.甲组人数 = 甲组人数;
        this.乙组人数 = 乙组人数;
        this.总申购人数 = 甲组人数 + 乙组人数;
        this.每手股数 = 每手股数;
        this.一手金额 = (上限招股价 * 每手股数).toFixed(2) - 0;


        this.甲组稳中 = this.计算甲组稳中(this);
        this.稳中手数 = this.甲组稳中.手数;
        this.公开发售手数 = parseInt(this.总股数 / this.每手股数 * this.公开发售占比);
        this.一手中签率 = this.甲组[0].单手中签率;
        this.一手占比 = this.计算一手占比(this);
        this.一手人数占比 = (this.甲组[0].申购人数 / this.甲组人数).toFixed(4) - 0;

        let [甲组申购倍数, 乙组申购倍数] = this.计算甲乙组申购倍数(this);
        this.甲组申购倍数 = 甲组申购倍数;
        this.乙组申购倍数 = 乙组申购倍数;

        let 一手申购倍数 = this.甲组[0].申购人数 / this.公开发售手数;

        // this.甲组平均中签率 =  ((1 - this.一手占比) / (this.甲组申购倍数 - 一手申购倍数)).toFixed(4) - 0;
        this.甲组平均中签率 = this.计算甲组平均中签率(this);
        // 创业板没有乙组
        if(this.创业板) {
            this.乙组平均中签率 =  0;
        }else {
            if (this.乙组申购倍数 < 1) {
                this.乙组平均中签率 = 1;
            } else {
                this.乙组平均中签率 =  (1 / this.乙组申购倍数).toFixed(4) - 0;
            }
        }

        this.甲组申购金额 = parseInt(this.公开发售手数 / 2 * this.甲组申购倍数 * this.一手金额);
        this.乙组申购金额 = parseInt(this.公开发售手数 / 2 * this.乙组申购倍数 * this.一手金额);
        this.公开申购金额 = parseInt(this.甲组申购金额 + this.乙组申购金额);


    }

    中签数据格式化(data) {
        let 甲组 = [], 乙组 = [], 甲组人数 = 0, 乙组人数 = 0, 每手股数 = 0;
        data.甲组中签.forEach((item, index) => {
            const temp = item.split(' ');
            if (index === 0) {
                每手股数 = temp[0] - 0;
            }
            let 总中签率 = (temp[0] / 每手股数) * ((temp[2].split('%')[0] - 0) / 100),
                手数 = temp[0] / 每手股数;

            甲组.push({
                手数,
                '申购人数': parseInt(temp[1]),
                '单手中签率': ((temp[2].split('%')[0] - 0) / 100).toFixed(4) - 0,
                '百分比中签率': temp[2],
                '总中签率': 总中签率.toFixed(4) - 0,
                '理论中签手续费':  ((100 + data.上限招股价 * 手数 * 每手股数 / 365 * 7 * 0.04) / 总中签率).toFixed(2) - 0,
            });
            甲组人数 += parseInt(temp[1]);


        });

        data.乙组中签.forEach((item) => {
            const temp = item.split(' ');
            乙组.push({
                '手数': temp[0] / 每手股数,
                '申购人数': parseInt(temp[1]),
                '单手中签率': ((temp[2].split('%')[0] - 0) / 100).toFixed(4) - 0,
                '百分比中签率': temp[2],
                '总中签率': ((temp[0] / 每手股数) * ((temp[2].split('%')[0] - 0) / 100)).toFixed(4) - 0,
            });

            乙组人数 += parseInt(temp[1]);
        });

        return [甲组, 乙组, 甲组人数, 乙组人数, 每手股数];
    }

    计算一手占比(data) {
        let item = data.甲组[0];
        if(data.创业板) {
            return ((item.申购人数 * item.单手中签率) / data.公开发售手数).toFixed(4) - 0;
        } else {
            return ((item.申购人数 * item.单手中签率) / data.公开发售手数 * 2).toFixed(4) - 0;
        }
    }

    // 去掉前十手,因为前十手占比严重影响分配结果
    计算甲组平均中签率(data) {
        let 前十手申购数 = 0, 十手后申购数 = 0, 十手后中签数 = 0;
        data.甲组.forEach((ele, index) => {
            if(index < 10) {
                前十手申购数 += ele.手数 * ele.申购人数;
            } else {
                十手后申购数 += ele.手数 * ele.申购人数;
                十手后中签数 += ele.申购人数 * ele.总中签率;
            }
        });
        return (十手后中签数 / 十手后申购数).toFixed(4);
    }

    计算甲乙组申购倍数(data) {
        let 甲组申购倍数 = 0, 乙组申购倍数 = 0;
        let num1 = 0, num2 = 0;
        data.甲组.forEach((item) => {
            num1 += (item.手数 * item.申购人数)
        });
        甲组申购倍数 = (num1 / (data.公开发售手数 / 2)).toFixed(2) - 0;

        data.乙组.forEach((item) => {
            num2 += (item.手数 * item.申购人数)
        });
        乙组申购倍数 = (num2 / (data.公开发售手数 / 2)).toFixed(2) - 0;

        if(data.创业板) {
            甲组申购倍数 = (num1 / (data.公开发售手数)).toFixed(2) - 0;
            乙组申购倍数 = 0;
        }

        return [甲组申购倍数, 乙组申购倍数];
    }

    计算甲组稳中(data) {
        for (let i = 0;i<data.甲组.length;i++) {
            let item = data.甲组[i];
            if (item.手数 * item.单手中签率 >= 0.99) {
                return item;
            }
        }
    }

    甲组中签手数() {
        let temp = [];
        this.甲组.forEach((item) => {
            temp.push(item.总中签率)
        })
        return temp;
    }

    甲组总中签率() {
        let temp = [];
        this.甲组.forEach((item) => {
            temp.push(item.手数 + '手')
        })
        return temp;
    }
}

export default CreateData;