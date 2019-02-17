$(function(){
  function buildMessageHTML(data){//formの入力データを引数dataとして処理
    var html =`<div class="message" data-id ="${data.id}">
                 <div class="chat-main__message-name">
                   ${data.user_name}
                 </div>
                 <div class="chat-main__message-time">
                   ${data.created_at}
                 </div>
                 <div class="chat-main__message-body">
                   ${data.text}
                   <img class="lower-message__image" src="${data.image}">
                 </div>
               </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);//formの入力データの取得
    var url = $(this).attr('action')//formの送信先のURLを取得
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(formData){//ajaxの非同期通信が成功した後の処理
      var html = buildMessageHTML(formData);
      $('.chat-main__message').append(html)//JSONからhtmlを生成
      $('.chat-main__footer-body').val('')//formを空欄にする
      var page_height = $('.chat-main__body--messages-list').height()//メッセージ一覧の高さを取得
      $('.chat-main__body').animate({//:最新の投稿までスクロール
          scrollTop: page_height
        },1500);
    })
    .fail(function(){//ajax通信に失敗時の処理
      alert('投稿に失敗しました。メッセージを入力してください。')
    })
    .always(function(){//railsのデフォ機能の2重送信防止機能を解除
      $(".form__submit").removeAttr("disabled");
    })
  })
  $(function(){//以下から自動更新機能を記載
    setInterval(update, 15000);
    //10000ミリ秒ごとにupdateという関数を実行する
  });
  function update(){ //この関数では以下のことを行う
    // var message_id = $('.message:last').data('id');//html要素（message）の最後のkeyとvalueを取得
    if($('.message')[0]){ //もし'messages'というクラスがあったら
      var message_id = $('.message:last').data('id'); //html要素（message）の最後のkeyとvalueを取得
    } else { //ない場合は
      var message_id = 0 //0を代入
    }
    $.ajax({ //ajax通信で以下のことを行う
      url: location.href, //urlは現在のページを指定
      type: 'GET', //メソッドを指定
      data: { //railsに引き渡すデータは
        message: { id: message_id } //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
      },
      dataType: 'json' //データはjson形式
    })
    .always(function(data){ //通信したら、成功しようがしまいが受け取ったデータ（@new_message)を引数にとって以下のことを行う
      $.each(data, function(i, data){ //'data'を'data'に代入してeachで回す
       var html = buildMessageHTML(data); //新しいメッセージ分(@new_messageの配列の個数)だけbuildMESSAGEを呼び出す
       $('.chat-main__message').append(html)
      });
    });
  }
});

