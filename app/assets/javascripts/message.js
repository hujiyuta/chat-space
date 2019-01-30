$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);//の名前のformの入力データの取得
    // console.log(formData)
    var url = $(this).attr('action')//formの送信先のURLを取得
    // console.log(formData)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .success(function(json){//ajax通信が出来ているかの確認
      console.log("success",json);
    });
  })
})

