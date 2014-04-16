(function(){
  'use strict';

  $(document).ready(init);

  var currentUser = 0;
  var currentRoll = 3;
  var frozen;
  var numDice;

  function init(){
    $('#add').click(addPlayer);
    $('.arrow').click(arrow);
    $('body').keydown(move);
    $('#add-score').click(addScore);
    $('#roll').click(roll);
    $('.dice').click(freeze);
    numDice = $('.dice').length;
    frozen = $('.frozen').length;
  }

  function freeze(){
    $(this).toggleClass('frozen');
  }

  function roll(){
    var $dice = $('.dice:not(.frozen)');
    var count = $dice.length;

    for(var i = 0; i < count; i++){
      var num = Math.floor(Math.random() * 6) + 1;
      var dice = $dice[i];
      $(dice).attr('src','media/dice-' + num + '.png');
      console.log(num);

    }
  }

  function addScore(event){
    var score = $('#score').val();
    $('.horizontal .vertical').text(score);
    event.preventDefault();
    console.log(score);
  }

  function move(key){
    console.log(key.keyCode);

    switch(key.keyCode){
    case 38:
      currentUser--;
      paintRows();
      break;
    case 40:
      currentUser++;
      paintRows();
      break;
    case 37:
      currentRoll--;
      paintColumns();
      break;
    case 39:
      currentRoll++;
      paintColumns();
    }

    if (key.keyCode === 37 || key.keyCode === 38 || key.keyCode === 39 || key.keyCode === 40){
      key.preventDefault();

    }

  }

  function arrow(){
    switch(this.id){
      case 'up':
        currentUser--;
        paintRows();
        break;
      case 'down':
        currentUser++;
        paintRows();
        break;
      case 'left':
        currentRoll--;
        paintColumns();
        break;
      case 'right':
        currentRoll++;
        paintColumns();
    }

  }

  function paintRows(){
    $('.horizontal').removeClass();

    var $trs = $('#game > tbody > tr');
    var tr = $trs[currentUser];
    $(tr).addClass('horizontal');
  }

  function paintColumns(){
    $('.vertical').removeClass();
    $('#game > tbody > tr > td:nth-child(' + currentRoll + ')').addClass('vertical');
  }

  function addPlayer(event){
    var username = $('#username').val();
    var avatar = $('#avatar').val();
    createRow(username, avatar);
    event.preventDefault();
  }

  function createRow(username, avatar){
    var $tr = $('<tr>');
    var tds = [];

    for(var i = 0; i < 16; i++){
      tds.push('<td></td>');
    }

    $tr.append(tds);
    $('#game > tbody').append($tr);

    var count = $('#game > tbody > tr').length;

    if(count === 1){
      $tr.addClass('horizontal');
    }

    var $img = $('<img>');
    $img.attr('src', avatar);
    $img.addClass('avatar');

    $tr.children('td:nth-child(1)').append($img);
    $tr.children('td:nth-child(2)').text(username);
    $tr.children('td:nth-child(3)').addClass('vertical');
  }


})();
