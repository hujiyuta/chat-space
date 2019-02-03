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
    // var url = '/groups/' + group_id + '/messages.json'
    // console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message').append(html)
      $('.chat-main__footer-body').val('')
    })
    // .success(function(json){//ajax通信が出来ているかの確認
    //   console.log("success",json);
    // })
  })
});

