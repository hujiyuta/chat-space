$(function(){
  $('.chat-main__footer-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);//の名前のformの入力データの取得
    var url = $(this).attr('action')//formの送信先のURLを取得
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
})

