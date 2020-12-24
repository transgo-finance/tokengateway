import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const BigNumber = require("bignumber.js");
BigNumber.config({ DECIMAL_PLACES: 6 });

const formatLAMBValue = (value) => {
  if (!value) {
    return 0;
  }
  let val = parseFloat(value);
  let bigValue = new BigNumber(val);
  const returnVal = bigValue.div("1e6").toNumber();
  if (returnVal < 0.000001) {
    return "<0.000001";
  }
  return returnVal;
};


const formatTLAMBValue = (value) => {
  if (!value) {
    return 0;
  }
  let val = parseFloat(value);
  let bigValue = new BigNumber(val);
  const returnVal = bigValue.div("1e18").toNumber()
  if (returnVal < 0.000001) {
    return "<0.000001";
  }
  return returnVal;
};

const formatNormalValue = (value) => {
  if (!value) {
    return 0;
  }
  let val = parseFloat(value);
  let bigValue = new BigNumber(val);
  const returnVal = bigValue.div(1).toNumber();
  if (returnVal < 0.000001) {
    return "<0.000001";
  }
  return returnVal;
};




const formatDate = (value) => {
  if (value == "" || value == undefined) {
    return "";
  }
  if (value == "0001-01-01T00:00:00Z") {
    return "--";
  }

  return dayjs
    .utc(value)
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
};

const formatAmount = (value) => {
  if (value == "" || value == null) {
    return 0;
  }
  let letters;
  let val;

  if (value.indexOf(",") >= 0) {
    let letters1;
    let val1;
    let newValueList = [];
    let valueList = value.split(",");
    valueList.forEach((item) => {
      let originValue = item.match(/[0-9\.]+/g);
      let num = originValue[0].toString().length;

      // let originLetters = item.split(originValue)[1];
      let originLetters = item.slice(num);

      letters1 = originLetters.substr(1);
      let newval = new BigNumber(originValue[0]);
      val1 = newval.div("1e6").toNumber();

      letters1 = letters1.toUpperCase();
      let amount = `${val1} ${letters1}`;
      newValueList.push(amount);
    });
    return newValueList.join(",");
  } else {
    // console.log(value);
    let originValue = value.match(/[0-9\.]+/g);
    let num = originValue[0].toString().length;
    let originLetters = value.slice(num);
    letters = originLetters.slice(1);
    let newval = new BigNumber(originValue[0]);
    val = newval.div("1e6");
    letters = letters.toUpperCase();
    return `${val} ${letters}`;
  }
};

const formatToken = (value) => {
  if (!value) {
    return "";
  }
  let val;

  if (value.indexOf("u") >= 0) {
    val = value.slice(1);
  } else {
    val = value;
  }
  val = val.toUpperCase();
  return val;
};

export default {
  formatLAMBValue,
  formatTLAMBValue,
  formatDate,
  formatToken,
  formatAmount,
  formatNormalValue
};
