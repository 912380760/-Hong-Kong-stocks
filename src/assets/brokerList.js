// 券商列表记录
let data = [
    {
        name: '老虎',
        // "余额": 121110.64,
        "余额": 0,
        "港股平台费": 15,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 5,
        "融资认购费": 100,
        "暗盘额外费用": function() {
            return 0;
        },
        "佣金": function(data) {
            return data * 0.00029;
        }
    },
    {
        name: '华泰',
        // "余额": 87818.67,
        "余额": 0,
        "港股平台费": 0,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 5,
        "融资认购费": 5,
        "暗盘额外费用": function() {
            return 0;
        },
        "佣金": function(data) {
            return 0;
        }
    },
    {
        name: '尊嘉',
        // "余额": 20178.91,
        "余额": 0,
        "港股平台费": 1,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 5,
        "融资认购费": 99.9,
        "暗盘额外费用": function(data) {
            return data * 0.0005 > 11.9 ? (data * 0.0005).toFixed(2) - 0 : 11.9;
        },
        "佣金": function(data) {
            return 0;
        }
    },
    {
        name: '富途',
        // "余额": 23127.82,
        "余额": 0,
        "港股平台费": 15,
        "港股免佣到期日": '2021/01/01', // 需要传入具体的日期
        "现金认购费": 50,
        "融资认购费": 100,
        "暗盘额外费用": function(data) {
            return 0;
        },
        "佣金": function(data) {
            return data * 0.0003 > 3 ? (data * 0.0003).toFixed(2) - 0 : 3;
        }
    },
    {
        name: '易昇',
        // "余额": 10000,
        "余额": 0,
        "港股平台费": 0,
        "港股免佣到期日": '2021/2/1', // 需要传入具体的日期
        "现金认购费": 0,
        "融资认购费": 0,
        "暗盘额外费用": function() {
            return 50;
        },
        "佣金": function(data) {
            return 50;
        }
    },
    {
        name: '友信',
        // "余额": 5638.1,
        "余额": 0,
        "港股平台费": 0,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 18,
        "融资认购费": 99,
        "暗盘额外费用": function(data) {
            return data * 0.0005 > 12 ? (data * 0.0005).toFixed(2) - 0 : 12;
        },
        "佣金": function(data) {
            return data * 0.0008 > 8 ? (data * 0.0008).toFixed(2) - 0 : 8;
        }
    },
    {
        name: '华盛通',
        // "余额": 10305.15,
        "余额": 0,
        "港股平台费": 15,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 50,
        "融资认购费": 100,
        "暗盘额外费用": function(data) {
            return data * 0.0003 > 3 ? (data * 0.0003).toFixed(2) - 0 : 3;
        },
        "佣金": function(data) {
            return data * 0.0003 > 3 ? (data * 0.0003).toFixed(2) - 0 : 3;
        }
    },
    {
        name: '东财',
        // "余额": 19733.78,
        "余额": 0,
        "港股平台费": 15,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 5,
        "融资认购费": 100,
        "暗盘额外费用": function(data) {
            return data * 0.00025 > 5 ? (data * 0.00025).toFixed(2) - 0 : 5;
        },
        "佣金": function(data) {
            return data * 0.00025 > 5 ? (data * 0.00025).toFixed(2) - 0 : 5;
        }
    },
    {
        name: '玖富',
        // "余额": 13668.72,
        "余额": 0,
        "港股平台费": 0,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 10,
        "融资认购费": 100,
        "暗盘额外费用": function(data) {
            return data * 0.0005 > 15 ? (data * 0.0005).toFixed(2) - 0 : 15;
        },
        "佣金": function(data) {
            return data * 0.00029 > 30 ? (data * 0.00025).toFixed(2) - 0 : 30;
        }
    },
    {
        name: '艾德',
        // "余额": 9826.15,
        "余额": 0,
        "港股平台费": 12,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 5,
        "融资认购费": 58,
        "暗盘额外费用": function() {
            return data * 0.0005 > 30 ? (data * 0.0005).toFixed(2) - 0 : 30;
        },
        "佣金": function(data) {
            return 0;
        }
    },
    {
        name: '耀才',
        "余额": 0,
        "港股平台费": 1,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 5,
        "融资认购费": 100,
        "暗盘额外费用": function(data) {
            return 0;
        },
        "佣金": function(data) {
            return 0;
        }
    },
    {
        name: '雪盈',
        // "余额": 15,
        "余额": 0,
        "港股平台费": 18,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 0,
        "融资认购费": 100,
        "暗盘额外费用": function(data) {
            return 0;
        },
        "佣金": function(data) {
            return 0;
        }
    },
    {
        name: '方德',
        "余额": 0,
        "港股平台费": 0,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 100,
        "融资认购费": 150,
        "暗盘额外费用": function(data) {
            return 100;
        },
        "佣金": function(data) {
            return 100;
        }
    },
    {
        name: '盈路', // 股票牛
        "余额": 0,
        "港股平台费": 0,
        "港股免佣到期日": '', // 需要传入具体的日期
        "现金认购费": 50,
        "融资认购费": 100,
        "暗盘额外费用": function(data) {
            return 50;
        },
        "佣金": function(data) {
            return 50;
        }
    },
]

export default data;