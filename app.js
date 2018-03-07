function noticeGarbageDay() {
  var accessToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; 

  var date = new Date();
  date.setDate(date.getDate() + 1);
  var comment = [];
  
  var is_the_what_weekly = Math.floor((date.getDate() - 1) / 7) + 1;

  switch(date.getDay()) {
      case 1:
      comment.push('一般ごみ')
      break;
      case 2:
      comment.push('ダンボール・リサイクルごみ')
      break;
      case 3:
      comment.push('プラスチックごみ')
      break;
      case 4:
      comment.push('一般ごみ')
      break;
      case 5:
      comment.push('びん・缶ごみ')
      if (is_the_what_weekly === 2 || is_the_what_weekly === 4) {
          comment.push('小型複雑ごみ')
      }
      break;
  }
  
  if (comment.length < 1) return;
  
  var text = '\n明日は' + comment.join('、') + ' の日ですからね!\n忘れちゃだめですよご主人様!!' ;
  
  var message = text;
  var options = {
    'method' : 'post',
    'headers': {
      'Authorization': 'Bearer ' + accessToken
    },
    'payload' : {
      'message': message
    }
  };
  var response = UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
  Logger.log(response);
}
