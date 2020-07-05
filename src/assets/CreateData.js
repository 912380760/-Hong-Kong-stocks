// 创建配售对象,处理配售信息
class CreateData {
    constructor(data) {
        let {name, 股价, 总股数, 公开发售配额, 公开发售超购倍数, 国际配售倍数} = data;
        this.name = name;
        this.股价 = 股价;
        this.总股数 = 总股数;
        this.公开发售配额 = 公开发售配额;
        this.公开发售超购倍数 = 公开发售超购倍数;
        this.国际配售倍数 = 国际配售倍数;

        let [甲组, 乙组, 甲组人数, 乙组人数, 每手股数] = this.中签数据格式化(data);
        this.甲组 = 甲组;
        this.乙组 = 乙组;
        this.甲组人数 = 甲组人数;
        this.乙组人数 = 乙组人数;
        this.每手股数 = 每手股数;

        this.甲组稳中 = this.计算甲组稳中(this);
        this.公开发售总手数 = parseInt(this.总股数 / this.每手股数 * this.公开发售配额);
        this.一手占比 = this.计算一手占比(this);
        this.一手申购人数占比 = this.甲组[0].申购人数 / this.甲组人数;

        let [甲组申购倍数, 乙组申购倍数] = this.计算甲乙组申购倍数(this);
        this.甲组申购倍数 = 甲组申购倍数;
        this.乙组申购倍数 = 乙组申购倍数;

        this.甲组平均每手中签率 =  (1 / this.甲组申购倍数).toFixed(4) - 0;
        this.公开发售总申购金额 = parseInt(this.公开发售超购倍数 * this.股价 * this.每手股数 * this.公开发售总手数);
        this.甲组总申购金额 = parseInt(this.甲组申购倍数 * this.股价 * this.每手股数 * this.公开发售总手数 / 2);
        this.乙组总申购金额 = parseInt(this.乙组申购倍数 * this.股价 * this.每手股数 * this.公开发售总手数 / 2);
    }

    中签数据格式化(data) {
        let 甲组 = [], 乙组 = [], 甲组人数 = 0, 乙组人数 = 0, 每手股数 = 0;
        data.甲组中签.forEach((item, index) => {
            const temp = item.split(' ');
            if (index === 0) {
                每手股数 = temp[0] - 0;
            }

            甲组.push({
                '手数': temp[0] / 每手股数,
                '申购人数': parseInt(temp[1]),
                '单手中签率': ((temp[2].split('%')[0] - 0) / 100).toFixed(4) - 0,
                '百分比中签率': temp[2],
                '总中签率': ((temp[0] / 每手股数) * ((temp[2].split('%')[0] - 0) / 100)).toFixed(4) - 0,
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
        return ((item.申购人数 * item.单手中签率) / data.公开发售总手数 * 2).toFixed(4) - 0;
    }

    计算甲乙组申购倍数(data) {
        let 甲组申购倍数 = 0, 乙组申购倍数 = 0;
        let num1 = 0, num2 = 0;
        data.甲组.forEach((item) => {
            num1 += (item.手数 * item.申购人数)
        });
        甲组申购倍数 = (num1 / (data.公开发售总手数 / 2)).toFixed(2) - 0;

        data.乙组.forEach((item) => {
            num2 += (item.手数 * item.申购人数)
        });
        乙组申购倍数 = (num2 / (data.公开发售总手数 / 2)).toFixed(2) - 0;

        return [甲组申购倍数, 乙组申购倍数];
    }

    计算甲组稳中(data) {
        for (let i = 0;i<data.甲组.length;i++) {
            let item = data.甲组[i];
            if (item.手数 * item.单手中签率 >= 1) {
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