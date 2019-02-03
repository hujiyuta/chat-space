$(function(){
  function buildHTML(data){//formの入力データを引数dataとして処理
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
    var formData = new FormData(this);//の名前のformの入力データの取得
    // var formData = new FormData($(this).get(0));
    // console.log(formData)
    // var url = $('.group_id').attr('value');//group_idが取得できてない。
    var url = $(this).attr('action')//formの送信先のURLを取得

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){//ajaxの非同期通信が成功した後の処理
      var html = buildHTML(data);
      $('.chat-main__message').append(html)//JSONからhtmlを生成
      $('.chat-main__footer-body').val('')//formを空欄にする
      var page_height = $('.chat-main__body--messages-list').height()//メッセージ一覧の高さを取得
      $('.chat-main__body').animate({//:最新の投稿までスクロール
          scrollTop: page_height
        },1500);
    // .success(function(json){//ajax通信が出来ているかの確認
    //   console.log("success",json);
    // })
    })
    .fail(function(){//ajax通信に失敗時の処理
      alert('投稿に失敗しました。メッセージを入力してください。')
    })
    .always(function(){//railsのデフォ機能の2重送信防止機能を解除
      $(".form__submit").removeAttr("disabled");
    })
  })
});

