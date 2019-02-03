$(function(){
  function buildMessageHTML(data){//formの入力データを引数dataとして処理
    var html =`<div class="chat-main__message-name">
                 ${data.user_name}
               </div>
               <div class="chat-main__message-time">
                 ${data.created_at}
               </div>
               <div class="chat-main__message-body">
                 ${data.text}
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
});

