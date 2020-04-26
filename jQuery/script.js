$(document).ready(function(){
  var difference = null;
  var correct = 0;
  var incorrect = 0;
  $('.btn-start').click(function(event) {
    console.log(rand(11));
    var minuend = rand(11);
    var subtrahend = rand(11);
    $('.txt-minuend').val(minuend);
    $('.txt-subtrahend').val(subtrahend);

    difference = minuend - subtrahend;
  });

  $('.btn-number').click(function(event) {
    if (difference==null){
      alert('Ex1: Please press button "Start Subtraction" first!');
      return;
    }
    var answer = $(this).val();
    console.log(answer);
    console.log(difference);

    if (answer==difference){
      correct++;
      $('.txt-result').val('Correct');
    } else{
      incorrect++;
      $('.txt-result').val('Incorrect');
    }

    $('.txt-correct').val(correct);
    $('.txt-incorrect').val(incorrect);
    $('.txt-percent').val(String(correct*100/(correct+incorrect)));
  });
  function rand(n)
  {
    return Math.floor(Math.random()*n );
  }

  // Ex 2
  // 
  $('#btn-calculate').click(function(event) {
    var value = $('.txt-input').val();
    var unit1 = $('#slt-unit1 option').filter(':selected').val();
    var unit2 = $('#slt-unit2 option').filter(':selected').val();
    console.log('unit 2: ' + unit1);
    console.log('unit 2: ' + unit2);
    console.log('value: ' + value);
    var float_value = parseFloat(value);
    if (isNaN(float_value)){
      alert('Ex2: Input incorrect!');
      $('.ex2-result').text(0);
      return;
    }
    console.log('fvalue: ' + float_value);
    console.log(convert(float_value, unit1, unit2));
    $('.ex2-result').text(convert(float_value, unit1, unit2));
  });

  function convert(value, unit1, unit2){
    var pound2kq = 0.45359237;
    if (unit1==unit2)
      return value;
    else if (unit1=='lb'){
      return value*pound2kq;
    } else
      return value/pound2kq;
  }
  // Ex 3
  // 
  $('#btn-Ex3-calculate').click(function(event) {
    var value = $('.txt-Ex3-input').val();
    var unit1 = $('#slt-Ex3-unit1 option').filter(':selected').val();
    var unit2 = $('#slt-Ex3-unit2 option').filter(':selected').val();
    console.log('unit 2: ' + unit1);
    console.log('unit 2: ' + unit2);
    console.log('value: ' + value);
    var float_value = parseFloat(value);
    if (isNaN(float_value)){
      alert('Ex3: Input incorrect!');
      $('.ex3-result').text(0);
      return;
    }
    console.log('fvalue: ' + float_value);
    console.log(convertEx3(float_value, unit1, unit2));
    $('.ex3-result').text(convertEx3(float_value, unit1, unit2));
  });

  function convertEx3(value, unit1, unit2){
    var pound2kq = 0.45359237;
    if (unit1==unit2)
      return value;
    else if (unit1=='C'){
      return value*1.8+32;
    } else
      return (value-32)/1.8;
  }
});