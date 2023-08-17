//cookie只能存放键值对
var operator = "=";
//window.document.cookie可以拿到cookie所有的key=value;形式的字符串。所以从cookie拿值，遍历cookie的所有key，直到key等于keyStr，
//就可以拿到对应的值，例如我们要拿名为token的key，调用方法getCookieValue(token)就可以拿到key为token的值(value)
export function getCookieValue(keyStr) {
    var value = null;
    var s = window.document.cookie;
    var arr = s.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        var k = str.split(operator)[0];
        var v = str.split(operator)[1];
        if (k == keyStr) {
            value = v;
            break;
        }
    }
    return value;
}