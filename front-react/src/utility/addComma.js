const comma = (num) => {
  var len, point, str;

  num = num + '';
  point = num.length % 3;
  len = num.length;

  str = num.substring(0, point);
  while (point < len) {
    if (str != '') str += ',';
    str += num.substring(point, point + 3);
    point += 3;
  }
  return str;
};

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ',');
}

export default addComma;
