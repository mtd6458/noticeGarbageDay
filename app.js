function noticeGarbageDay() {
  var accessToken     = 'xxxxxxxxxxxxxxxxx'; 
  var comment         = [];
  var date            = new Date();
  // date.setDate(date.getDate()+2); // debug
  var weeklyNumber    = Math.floor((date.getDate() - 1) / 7) + 1;
  var secondMonday    = 2;
  var fourthMonday    = 4;

  switch(date.getDay()) {
    case 0: // 日曜日
      comment.push('燃えるごみ');
      break;      
    case 1: // 月曜日
      // 第二月曜日
      if (weeklyNumber === secondMonday) {
        comment.push('月1回の空きびん・ペットボトル');
      }
      // 第四月曜日
      if (weeklyNumber === fourthMonday) {
        comment.push('月1回の燃えないごみ\n ・空き缶\n ・ガラス類\n ・金属類(鍋、やかん、フライパン、針金製ハンガー)\n ・傘\n ・蛍光管\n ・小型家電類(オーブントースター、炊飯器とかとか)\n');
      }
      break;
    case 3: // 水曜日
      comment.push('燃えるごみ');
      break;
    case 2: // 火曜日
    case 4: // 木曜日
    case 5: // 金曜日
    case 6: // 土曜日
      break;
  }
  
  // 月は0を基点としている為、＋１する
  var month = date.getMonth() + 1;
  var date  = date.getDate();
  if (comment.length < 1) {
    Logger.log('%s月%s日 通知なし', month.toString(), date.toString());
    return
  }
  
  var message = '\n今日は' + comment.join('、') + 'を捨てる日だよ。\nえっへん！';
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
