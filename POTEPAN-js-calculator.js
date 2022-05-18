// データ取得
var result = "";
// =で計算できるかどうか
var is_calc = false;

// 最初の表示
window.onload = function () {
  result = document.getElementById('result');
};

// ACキー反応
function ac_click(){
  result.value = "0";
  is_calc = false;
}

// 数字キー反応※デバック推奨
function num_click(val){
  if(is_calc)  result.value = "0";
  is_calc = false;  

  if(result.value =="0" && val == "0"){
    result.value = "0";
  }else if(result.value == "0" && val == "."){
    result.value = "0.";
  }else if(result.value == "0"){
    result.value = val;
  }else{
    result.value += val;
  }
}

// 演算子キー反応※連続で表示されないよう
function ope_click(val){
  if(is_calc)  is_calc = false;
  
  if(is_ope_last()){
    result.value = result.value.slice(0, -1) + val;
  } else {
    result.value += val;
  }
}

// イコールキー
function equal_click(){
  if(is_ope_last())  result.value = result.value.slice(0, -1);

  var temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))();
  if(temp == Infinity || Number.isNaN(temp)){
    result.value = "Error";
  }else{
    result.value = temp;
    is_calc = true;
  }
}

// きちんと四則演算として入力されているか確認
function is_ope_last(){
  return ["+","-","×","÷"].includes(result.value.toString().slice(-1));
}