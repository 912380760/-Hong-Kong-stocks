// 股票打新记录
let 股票对象集合 = {
    康方生物: {
        name: '康方生物',
        每手股数: 1000,
        一手金额: 16180,
        打新日期: '2020/4/14',
        记息天数: 6,
        中签定价: 16.18,
        上市日期: '2020/4/24',
    },
    建业新生活: {
        name: '建业新生活',
        每手股数: 1000,
        一手金额: 7272.55,
        打新日期: '2020/5/8',
        记息天数: 6,
        中签定价: 6.85,
        上市日期: '2020/5/15',
    },
    沛佳医疗: {
        name: '沛佳医疗',
        每手股数: 1000,
        一手金额: 15360,
        打新日期: '2020/5/8',
        记息天数: 6,
        中签定价: 15.36,
        上市日期: '2020/5/15',
    },
    开拓药业: {
        name: '开拓药业',
        每手股数: 500,
        一手金额: 10176,
        打新日期: '2020/5/12',
        记息天数: 6,
        中签定价: 20.15,
        上市日期: '2020/5/22',
    },
    移卡: {
        name: '移卡',
        每手股数: 400,
        一手金额: 6723,
        打新日期: '2020/5/20',
        记息天数: 4,
        中签定价: 16.64,
        上市日期: '2020/6/1',
    },
    海纳智能: {
        name: '海纳智能',
        每手股数: 4000,
        一手金额: 6060,
        打新日期: '2020/5/20',
        记息天数: 8,
        中签定价: 1.38,
        上市日期: '2020/6/3',
    },
    网易: {
        name: '网易',
        每手股数: 100,
        一手金额: 12300,
        打新日期: '2020/6/2',
        记息天数: 5,
        中签定价: 123,
        上市日期: '2020/6/11',
    },
    京东: {
        name: '京东',
        每手股数: 50,
        一手金额: 11300,
        打新日期: '2020/6/8',
        记息天数: 6,
        中签定价: 226,
        上市日期: '2020/6/18',
    },
    康基医疗: {
        name: '康基医疗',
        每手股数: 500,
        一手金额: 6940,
        打新日期: '2020/6/16',
        记息天数: 7,
        中签定价: 13.88,
        上市日期: '2020/6/29',
    },
    海吉亚医疗: {
        name: '海吉亚医疗',
        每手股数: 200,
        一手金额: 3700,
        打新日期: '2020/6/16',
        记息天数: 7,
        中签定价: 18.5,
        上市日期: '2020/6/29',
    },
    金融街: {
        name: '金融街',
        每手股数: 1000,
        一手金额: 7560,
        打新日期: '2020/6/19',
        记息天数: 9,
        中签定价: 7.36,
        上市日期: '2020/7/6',
    },
    弘阳服务: {
        name: '弘阳服务',
        每手股数: 1000,
        一手金额: 4300,
        打新日期: '2020/6/24',
        记息天数: 6,
        中签定价: 0,
        上市日期: '2020/7/7',
    },
    欧康维视生物: {
        name: '欧康维视生物',
        每手股数: 500,
        一手金额: 7330,
        打新日期: '2020/6/29',
        记息天数: 6,
        中签定价: 0,
        上市日期: '2020/7/10',
    },
    思摩尔国际: {
        name: '思摩尔国际',
        每手股数: 1000,
        一手金额: 12400,
        打新日期: '2020/6/29',
        记息天数: 6,
        中签定价: 0,
        上市日期: '2020/7/10',
    },
    永泰生物: {
        name: '永泰生物',
        每手股数: 1000,
        一手金额: 11000,
        打新日期: '2020/6/29',
        记息天数: 6,
        中签定价: 0,
        上市日期: '2020/7/10',
    },
    正荣服务: {
        name: '正荣服务',
        每手股数: 1000,
        一手金额: 4700,
        打新日期: '2020/6/29',
        记息天数: 6,
        中签定价: 0,
        上市日期: '2020/7/10',
    },
    易和国际控股: {
        name: '易和国际控股',
        每手股数: 5000,
        一手金额: 3000,
        打新日期: '2020/6/30',
        记息天数: 4,
        中签定价: 0,
        上市日期: '2020/7/13',
    },
    祖龙娱乐: {
        name: '祖龙娱乐',
        每手股数: 1000,
        一手金额: 11600,
        打新日期: '2020/6/30',
        记息天数: 7,
        中签定价: 0,
        上市日期: '2020/7/15',
    },
    德合集团: {
        name: '德合集团',
        每手股数: 4000,
        一手金额: 3840,
        打新日期: '2020/6/30',
        记息天数: 10,
        中签定价: 0,
        上市日期: '2020/7/17',
    },
}

let data = [
    {
        name: '康方生物',
        打新记录: [
            生成打新记录('老虎', '康方生物', 35, 15),
        ],
        中签记录: [
            生成中签记录('老虎', '康方生物', 1)
        ],
        出售记录: [
            生成出售记录('老虎', '康方生物', 24, 1,'2020/4/24'),
        ]
    },
    {
        name: '建业新生活',
        打新记录: [
            生成打新记录('老虎', '建业新生活', 30, 10),
            生成打新记录('富途', '建业新生活', 1, 1, 0),
            生成打新记录('友信', '建业新生活', 1, 1, 0),
        ],
        中签记录: [
            生成中签记录('老虎', '建业新生活', 1),
            生成中签记录('富途', '建业新生活', 0),
            生成中签记录('友信', '建业新生活', 0),
        ],
        出售记录: [
            生成出售记录('老虎', '建业新生活', 8.3, 1,'2020/5/15'),
        ]
    },
    {
        name: '沛佳医疗',
        打新记录: [
            生成打新记录('老虎', '沛佳医疗', 100, 15),
        ],
        中签记录: [
            生成中签记录('老虎', '沛佳医疗', 1),
        ],
        出售记录: [
            生成出售记录('老虎', '沛佳医疗', 26.75, 1,'2020/5/15'),
        ]
    },
    {
        name: '开拓药业',
        打新记录: [
            生成打新记录('老虎', '开拓药业', 90, 20),
            生成打新记录('富途', '开拓药业', 1, 1, 0),
            生成打新记录('友信', '开拓药业', 20, 15),
        ],
        中签记录: [
            生成中签记录('老虎', '开拓药业', 1),
            生成中签记录('富途', '开拓药业', 0),
            生成中签记录('友信', '开拓药业', 1),
        ],
        出售记录: [
            生成出售记录('老虎', '开拓药业', 20.9, 1,'2020/5/26'),
            生成出售记录('友信', '开拓药业', 22.95, 1,'2020/5/22'),
        ]
    },
    {
        name: '移卡',
        打新记录: [
            生成打新记录('尊嘉', '移卡', 1, 1, 0),
            生成打新记录('富途', '移卡', 1, 1, 0),
            生成打新记录('友信', '移卡', 1, 1, 0),
            生成打新记录('耀才', '移卡', 1, 1, 0),
            生成打新记录('东财', '移卡', 25, 10),
            生成打新记录('华盛通', '移卡', 1, 1, 0),
        ],
        中签记录: [
            生成中签记录('尊嘉', '移卡', 0),
            生成中签记录('富途', '移卡', 0),
            生成中签记录('友信', '移卡', 0),
            生成中签记录('耀才', '移卡', 0),
            生成中签记录('东财', '移卡', 1),
            生成中签记录('华盛通', '移卡', 0),
        ],
        出售记录: [
            生成出售记录('东财', '移卡', 14.6, 1,'2020/6/1'),
        ]
    },
    {
        name: '海纳智能',
        打新记录: [
            生成打新记录('尊嘉', '海纳智能', 1, 1, 0),
            生成打新记录('富途', '海纳智能', 1, 1, 0),
            生成打新记录('友信', '海纳智能', 1, 1, 0),
            生成打新记录('耀才', '海纳智能', 1, 1, 0),
            生成打新记录('华盛通', '海纳智能', 1, 1, 0),
        ],
        中签记录: [
            生成中签记录('尊嘉', '海纳智能', 0),
            生成中签记录('富途', '海纳智能', 0),
            生成中签记录('友信', '海纳智能', 0),
            生成中签记录('耀才', '海纳智能', 0),
            生成中签记录('华盛通', '海纳智能', 0),
        ],
        出售记录: []
    },
    {
        name: '网易',
        打新记录: [
            生成打新记录('老虎', '网易', 45, 20),
            生成打新记录('尊嘉', '网易', 1, 1, 0),
            生成打新记录('富途', '网易', 15, 10),
            生成打新记录('友信', '网易', 1, 1, 0),
            生成打新记录('耀才', '网易', 1, 1, 0),
            生成打新记录('东财', '网易', 1, 1, 0),
            生成打新记录('玖富', '网易', 1, 1, 0),
            生成打新记录('华盛通', '网易', 1, 1, 0),
            生成打新记录('雪盈', '网易', 15, 10),
            生成打新记录('方德', '网易', 5, 10),

        ],
        中签记录: [
            生成中签记录('老虎', '网易', 1),
            生成中签记录('尊嘉', '网易', 0),
            生成中签记录('富途', '网易', 0),
            生成中签记录('友信', '网易', 0),
            生成中签记录('耀才', '网易', 0),
            生成中签记录('东财', '网易', 0),
            生成中签记录('玖富', '网易', 0),
            生成中签记录('华盛通', '网易', 0),
            生成中签记录('雪盈', '网易', 0),
            生成中签记录('方德', '网易', 1),

        ],
        出售记录: [
            生成出售记录('老虎', '网易', 132.9, 1,'2020/6/11'),
            生成出售记录('方德', '网易', 132.9, 1,'2020/6/11'),
        ]
    },
    {
        name: '京东',
        打新记录: [
            生成打新记录('尊嘉', '京东', 1, 1, 0),
            生成打新记录('耀才', '京东', 1, 1, 0),

        ],
        中签记录: [
            生成中签记录('尊嘉', '京东', 0),
            生成中签记录('耀才', '京东', 1),

        ],
        出售记录: [
            生成出售记录('耀才', '京东', 239.4, 1,'2020/6/17'),
        ]
    },
    {
        name: '康基医疗',
        打新记录: [
            生成打新记录('老虎', '康基医疗', 200, 20),
            生成打新记录('尊嘉', '康基医疗', 20, 20),
            生成打新记录('富途', '康基医疗', 5, 10),
            生成打新记录('友信', '康基医疗', 2, 10),
            生成打新记录('东财', '康基医疗', 1, 10),
            生成打新记录('玖富', '康基医疗', 1, 10),
            生成打新记录('华盛通', '康基医疗', 1, 10),
            生成打新记录('华泰', '康基医疗', 120, 33),
            生成打新记录('艾德', '康基医疗', 3, 10),

        ],
        中签记录: [
            生成中签记录('老虎', '康基医疗', 2),
            生成中签记录('尊嘉', '康基医疗', 0),
            生成中签记录('富途', '康基医疗', 0),
            生成中签记录('友信', '康基医疗', 0),
            生成中签记录('东财', '康基医疗', 0),
            生成中签记录('玖富', '康基医疗', 1),
            生成中签记录('华盛通', '康基医疗', 1),
            生成中签记录('华泰', '康基医疗', 2),
            生成中签记录('艾德', '康基医疗', 0),

        ],
        出售记录: [
            生成出售记录('老虎', '康基医疗', 26.4, 1, '2020/6/29'),
            生成出售记录('玖富', '康基医疗', 24.95, 1, '2020/6/26'),
            生成出售记录('华盛通', '康基医疗', 24.95, 1, '2020/6/26'),
            生成出售记录('华泰', '康基医疗', 26.5, 2, '2020/6/29'),
        ]
    },
    {
        name: '海吉亚医疗',
        打新记录: [
            生成打新记录('老虎', '海吉亚医疗', 150, 20),
            生成打新记录('富途', '海吉亚医疗', 50, 10),
            生成打新记录('友信', '海吉亚医疗', 10, 10),
            生成打新记录('东财', '海吉亚医疗', 45, 10),
            生成打新记录('玖富', '海吉亚医疗', 15, 10),
            生成打新记录('华盛通', '海吉亚医疗', 10, 10),
            生成打新记录('华泰', '海吉亚医疗', 150, 33),
            生成打新记录('艾德', '海吉亚医疗', 20, 10),

        ],
        中签记录: [
            生成中签记录('老虎', '海吉亚医疗', 2),
            生成中签记录('富途', '海吉亚医疗', 1),
            生成中签记录('友信', '海吉亚医疗', 0),
            生成中签记录('东财', '海吉亚医疗', 1),
            生成中签记录('玖富', '海吉亚医疗', 1),
            生成中签记录('华盛通', '海吉亚医疗', 0),
            生成中签记录('华泰', '海吉亚医疗', 2),
            生成中签记录('艾德', '海吉亚医疗', 0),

        ],
        出售记录: [
            生成出售记录('老虎', '海吉亚医疗', 24.5, 1, '2020/6/29'),
            生成出售记录('富途', '海吉亚医疗', 23.9, 1, '2020/6/29'),
            生成出售记录('东财', '海吉亚医疗', 24.3, 1, '2020/6/26'),
            生成出售记录('玖富', '海吉亚医疗', 24.5, 1, '2020/6/26'),
            生成出售记录('华泰', '海吉亚医疗', 24.5, 2, '2020/6/29'),
        ]
    },
    {
        name: '金融街',
        打新记录: [
            生成打新记录('尊嘉', '金融街', 15, 10),
        ],
        中签记录: [
            生成中签记录('尊嘉', '金融街', 1),
        ],
        出售记录: []
    },
    {
        name: '弘阳服务',
        打新记录: [
            生成打新记录('富途', '弘阳服务', 5, 10),
            生成打新记录('友信', '弘阳服务', 1, 5),
        ],
        中签记录: [
            // 生成中签记录('富途', '弘阳服务', 0),
            // 生成中签记录('友信', '弘阳服务', 0),
        ],
        出售记录: []
    },
    {
        name: '欧康维视生物',
        打新记录: [
            生成打新记录('老虎', '欧康维视生物', 1, 2),
            生成打新记录('尊嘉', '欧康维视生物', 8, 10, 1, 0.0488),
            生成打新记录('东财', '欧康维视生物', 20, 10, 1, 0.0398),
            生成打新记录('玖富', '欧康维视生物', 1, 10),
            生成打新记录('华盛通', '欧康维视生物', 1, 10),
            生成打新记录('华泰', '欧康维视生物', 300, 33, 1, 0.033),
            生成打新记录('艾德', '欧康维视生物', 10, 10, 1, 0.0398),
            生成打新记录('易昇', '欧康维视生物', 20, 20),
        ],
        中签记录: [
            // 生成中签记录('老虎', '欧康维视生物', 0),
            // 生成中签记录('尊嘉', '欧康维视生物', 0),
            // 生成中签记录('东财', '欧康维视生物', 0),
            // 生成中签记录('玖富', '欧康维视生物', 0),
            // 生成中签记录('华盛通', '欧康维视生物', 0),
            // 生成中签记录('华泰', '欧康维视生物', 2),
            // 生成中签记录('艾德', '欧康维视生物', 0),
            // 生成中签记录('易昇', '欧康维视生物', 0)
        ],
        出售记录: [
            // 生成出售记录('华泰', '欧康维视生物', 24.5, 2, '2020/6/29'),
        ]
    },
    {
        name: '思摩尔国际',
        打新记录: [
            生成打新记录('老虎', '思摩尔国际', 1, 2),
            生成打新记录('尊嘉', '思摩尔国际', 1, 10),
            生成打新记录('富途', '思摩尔国际', 15, 10, 1, 0.0398),
            生成打新记录('友信', '思摩尔国际', 1, 5),
            生成打新记录('东财', '思摩尔国际', 2, 10),
            生成打新记录('玖富', '思摩尔国际', 8, 10, 1, 0.0288),
            生成打新记录('华盛通', '思摩尔国际', 6, 10, 1, 0.0398),
            生成打新记录('艾德', '思摩尔国际', 1, 10),
        ],
        中签记录: [
            // 生成中签记录('老虎', '思摩尔国际', 0),
            // 生成中签记录('尊嘉', '思摩尔国际', 0),
            // 生成中签记录('富途', '思摩尔国际', 0),
            // 生成中签记录('友信', '思摩尔国际', 0),
            // 生成中签记录('东财', '思摩尔国际', 0),
            // 生成中签记录('玖富', '思摩尔国际', 0),
            // 生成中签记录('华盛通', '思摩尔国际', 0),
            // 生成中签记录('艾德', '思摩尔国际', 0),
        ],
        出售记录: []
    },
    {
        name: '永泰生物',
        打新记录: [
            生成打新记录('老虎', '永泰生物', 1, 2),
            生成打新记录('富途', '永泰生物', 1, 10),
            生成打新记录('东财', '永泰生物', 1, 10),
            生成打新记录('玖富', '永泰生物', 1, 10),
            生成打新记录('华盛通', '永泰生物', 1, 10),
            生成打新记录('华泰', '永泰生物', 35, 20, 1, 0.033),
        ],
        中签记录: [
            // 生成中签记录('老虎', '永泰生物', 0),
            // 生成中签记录('富途', '永泰生物', 0),
            // 生成中签记录('东财', '永泰生物', 0),
            // 生成中签记录('玖富', '永泰生物', 0),
            // 生成中签记录('华盛通', '永泰生物', 0),
            // 生成中签记录('华泰', '永泰生物', 1),
        ],
        出售记录: []
    },
    {
        name: '正荣服务',
        打新记录: [
            生成打新记录('老虎', '正荣服务', 1, 2),
            生成打新记录('尊嘉', '正荣服务', 1, 10),
            生成打新记录('富途', '正荣服务', 1, 10),
            生成打新记录('玖富', '正荣服务', 1, 10),
        ],
        中签记录: [
            // 生成中签记录('老虎', '正荣服务', 0),
            // 生成中签记录('尊嘉', '正荣服务', 0),
            // 生成中签记录('富途', '正荣服务', 0),
            // 生成中签记录('玖富', '正荣服务', 0),
        ],
        出售记录: []
    },
    {
        name: '祖龙娱乐',
        打新记录: [
            生成打新记录('老虎', '祖龙娱乐', 25, 5, 1, 0.0298),
            生成打新记录('尊嘉', '祖龙娱乐', 1, 10),
            生成打新记录('友信', '祖龙娱乐', 20, 10, 1, 0.045),
            生成打新记录('东财', '祖龙娱乐', 10, 10, 1, 0.0398),
        ],
        中签记录: [
            // 生成中签记录('老虎', '祖龙娱乐', 0),
            // 生成中签记录('尊嘉', '祖龙娱乐', 0),
            // 生成中签记录('友信', '祖龙娱乐', 0),
            // 生成中签记录('东财', '祖龙娱乐', 0),
        ],
        出售记录: []
    },
    {
        name: '德合集团',
        打新记录: [
            生成打新记录('尊嘉', '德合集团', 5, 10, 1, 0.0428),
        ],
        中签记录: [
            // 生成中签记录('尊嘉', '德合集团', 0),
        ],
        出售记录: []
    },
    {
        name: '易和国际控股',
        打新记录: [
            生成打新记录('尊嘉', '易和国际控股', 5, 10, 1, 0.0428),
        ],
        中签记录: [
            // 生成中签记录('尊嘉', '易和国际控股', 0),
        ],
        出售记录: []
    },
];

function 生成打新记录(券商, 股票名称, 打新手数 = 1, 融资倍数= 10, 打新类型 = 1, 融资利率 = 0.035) {
    return {
        ...股票对象集合[股票名称],
        券商,
        打新类型: 打新类型 ? '融资打新' : '现金打新',
        打新手数,
        融资倍数,
        融资利率,
    }
}
function 生成中签记录(券商, 股票名称, 中签手数 = 1) {
    return {
        name: 股票名称,
        中签定价: 股票对象集合[股票名称].中签定价,
        券商,
        中签手数,
    }
}
function 生成出售记录(券商, 股票名称, 出售价格, 出售手数 = 1, 出售日期) {
    return {
        券商,
        name: 股票名称,
        出售价格,
        出售手数,
        出售日期,
    }
}

let temp = {
    stockList: data,
    股票对象集合
}

export default temp;