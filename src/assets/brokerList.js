// 券商记录
let data = [
    {
        name: '富途',
        "余额": 23127.82,
        "港股平台费": 15,
        "港股免佣到期日": '2021/01/01', // 需要传入具体的日期
        "现金认购费": 50,
        "融资认购费": 100,
        "佣金": function(data) {
            return data * 0.0003 > 3 ? (data * 0.0003).toFixed(2) - 0 : 3;
        }
    }
]

export default data;