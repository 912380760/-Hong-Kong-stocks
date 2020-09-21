// 新股配售数据 2020年
import data2020 from "./配售数据2020";
// import data2019 from "./配售数据2019";
// import data2018 from "./配售数据2018";
// import data2017 from "./配售数据2017";
const data = [...data2020];

function 中签数据格式化(data) {
  let 甲组 = [],
    乙组 = [],
    甲组人数 = 0,
    乙组人数 = 0,
    每手股数 = 0,
    招股股数 = 0;
  data.中签.forEach((item, index) => {
    // ["2000", "5024", null, "0.5000", "5024名申请人中2512名获发2000股股份", "0"]
    // 申购股数 申购人数 中签数 中签率 描述 甲组0/乙组1
    if (index === 0) {
      每手股数 = item[0] - 0;
    }
    let 总中签率 = (item[0] / 每手股数) * (item[3] - 0),
      手数 = item[0] / 每手股数;

    if (item[5] === "0" || item[5] === null) {
      甲组.push({
        手数,
        申购人数: parseInt(item[1]),
        单手中签率: (item[3] - 0).toFixed(4) - 0,
        百分比中签率: (item[3] * 100).toFixed(2) + "%",
        总中签率: 总中签率.toFixed(4) - 0,
        理论中签手续费:
          (
            (100 + ((data.上限招股价 * 手数 * 每手股数) / 365) * 7 * 0.04) /
            总中签率
          ).toFixed(2) - 0,
      });
      甲组人数 += parseInt(item[1]);
    } else {
      乙组.push({
        手数,
        申购人数: parseInt(item[1]),
        单手中签率: (item[3] - 0).toFixed(4) - 0,
        百分比中签率: (item[3] * 100).toFixed(2) + "%",
        总中签率: 总中签率.toFixed(4) - 0,
        理论中签手续费:
          (
            (100 + ((data.上限招股价 * 手数 * 每手股数) / 365) * 7 * 0.04) /
            总中签率
          ).toFixed(2) - 0,
      });
      乙组人数 += parseInt(item[1]);
    }
    招股股数 += (总中签率 * parseInt(item[1]) * 每手股数) / data.公开发售占比;
  });

  return [甲组, 乙组, 甲组人数, 乙组人数, 每手股数, 招股股数];
}

function 计算甲组稳中(data) {
  for (let i = 0; i < data.甲组.length; i++) {
    let item = data.甲组[i];
    if (item.手数 * item.单手中签率 >= 0.99) {
      return item;
    }
  }
  return {};
}

function 计算一手占比(data) {
  let item = data.甲组[0];
  if (data.创业板) {
    return (
      ((item.申购人数 * item.单手中签率) / data.公开发售手数).toFixed(4) - 0
    );
  } else {
    return (
      (((item.申购人数 * item.单手中签率) / data.公开发售手数) * 2).toFixed(4) -
      0
    );
  }
}

function 计算甲乙组申购倍数(data) {
  let 甲组申购倍数 = 0,
    乙组申购倍数 = 0;
  let num1 = 0,
    num2 = 0;
  data.甲组.forEach((item) => {
    num1 += item.手数 * item.申购人数;
  });
  甲组申购倍数 = num1 / (data.公开发售手数 / 2);

  data.乙组.forEach((item) => {
    num2 += item.手数 * item.申购人数;
  });
  乙组申购倍数 = num2 / (data.公开发售手数 / 2);

  if (data.创业板) {
    甲组申购倍数 = num1 / data.公开发售手数;
    乙组申购倍数 = 0;
  }

  return [甲组申购倍数, 乙组申购倍数];
}

// 去掉前十手,因为前十手占比严重影响分配结果
function 计算甲组平均中签率(data) {
  let 前十手申购数 = 0,
    十手后申购数 = 0,
    十手后中签数 = 0;
  data.甲组.forEach((ele, index) => {
    if (index < 10) {
      前十手申购数 += ele.手数 * ele.申购人数;
    } else {
      十手后申购数 += ele.手数 * ele.申购人数;
      十手后中签数 += ele.申购人数 * ele.总中签率;
    }
  });
  return 十手后中签数 / 十手后申购数;
}

data.forEach((ele, index, arr) => {
  let [甲组, 乙组, 甲组人数, 乙组人数, 每手股数, 招股股数] = 中签数据格式化(
    ele
  );
  ele.甲组 = 甲组;
  ele.乙组 = 乙组;
  ele.甲组人数 = 甲组人数;
  ele.乙组人数 = 乙组人数;
  ele.总申购人数 = 甲组人数 + 乙组人数;
  ele.每手股数 = 每手股数;
  ele.招股股数 = 招股股数;
  ele.一手金额 = ele.上限招股价 * 每手股数;

  ele.甲组稳中 = 计算甲组稳中(ele);
  ele.一手中签率 = ele.甲组[0].单手中签率;
  ele.稳中手数 = ele.甲组稳中.手数;

  ele.公开发售手数 = parseInt((ele.招股股数 / ele.每手股数) * ele.公开发售占比);

  ele.一手占比 = 计算一手占比(ele);
  ele.一手人数占比 = ele.甲组[0].申购人数 / ele.甲组人数;

  let [甲组申购倍数, 乙组申购倍数] = 计算甲乙组申购倍数(ele);
  ele.甲组申购倍数 = 甲组申购倍数;
  ele.乙组申购倍数 = 乙组申购倍数;

  let 一手申购倍数 = ele.甲组[0].申购人数 / ele.公开发售手数;

  // ele.甲组平均中签率 =  ((1 - ele.一手占比) / (ele.甲组申购倍数 - 一手申购倍数)).toFixed(4) - 0;
  ele.甲组平均中签率 = 计算甲组平均中签率(ele);
  // 创业板没有乙组
  if (ele.创业板) {
    ele.乙组平均中签率 = 0;
  } else {
    if (ele.乙组申购倍数 < 1) {
      ele.乙组平均中签率 = 1;
    } else {
      ele.乙组平均中签率 = 1 / ele.乙组申购倍数;
    }
  }

  ele.甲组申购金额 = parseInt(
    (ele.公开发售手数 / 2) * ele.甲组申购倍数 * ele.一手金额
  );
  ele.乙组申购金额 = parseInt(
    (ele.公开发售手数 / 2) * ele.乙组申购倍数 * ele.一手金额
  );
  ele.公开申购金额 = parseInt(ele.甲组申购金额 + ele.乙组申购金额);
  ele.募资金额 = 招股股数 * ele.上限招股价;
  ele.公开募资金额 = ele.募资金额 * ele.公开发售占比;

  arr[index] = ele;
});

export default data;
