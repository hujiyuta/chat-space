$(document).on('turbolinks:load',function() {
  $("#user-search-field").on("keyup", function() {//フォームが入力される度に検索
    function buildUserHTML(user) {//検索結果(ヒットがある場合)を生成するHTML
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">
                      ${user.user_name}
                    </p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
                  </div>`
      return html;
    }
    function buildNoUserHTML(){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">
                      該当するユーザーはいません！
                    </p>
                  </div>`
      return html;
    }
    function addUserHTML(user){//検索結果からユーザを追加するHMTL
       var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.user_id}'>
                    <input name='group[user_ids][]' type='hidden' value='${user.user_id}'>
                    <p class='chat-group-user__name'>${user.user_name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                   </div>`
       return html;
    }
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',//URI通りに記載（users#index）
      data: ('keyword=' + input),//idexアクションのparamsのkeywordに引数inputを渡す?
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(users){//成功した場合の処理。引数はdata
      $("#user-search-result").empty();//指定したDOM要素の削除。前回の検索結果削除
      if (users.length !== 0) {//検索結果の配列が０でない場合
        users.forEach(function(user){//与えられた配列データの数だけ処理
          if (user.user_id === user.current_user_id ){//ログインユーザの場合は次のループに移行
            return;
          }
          else{
            var html = buildUserHTML(user);//TODO:以下にログインユーザは非表示
            $('#user-search-result').append(html)
            //以下ではajaxで追加した要素にイベントを追加する
            //クリックされた時にajaxでユーザーを追加
            $('.chat-group-user').on('click', '.user-search-add.chat-group-user__btn.chat-group-user__btn--add', function(){//userを引数にすると該当するユーザーを全ての該当ユーザー情報が入っているため処理分ける
              var add_user_info = {//追加ユーザ情報のhashを生成
                user_id: $(this).attr('data-user-id'),
                user_name: $(this).attr('data-user-name')
              };
              var html = addUserHTML(add_user_info);
              $('#chat-group-users').append(html)//TODO:追加する場所が間違っているため、既に登録されているユーザが削除されてしまう。追加したユーザをチャットメンバーに追加する処理
              $(this).parent().remove();//追加したユーザー結果を削除
              $('.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn').on('click', function(){//
                $(this).parent().remove();//間違えて登録したユーザーを削除
              });
            });
          }
        });
      }
      else{//検索結果がない場合のhtmlを生成
        var html = buildNoUserHTML();//該当ユーザがないHTML生成
        $('#user-search-result').append(html)
      }
    })
    .fail(function(){//ajax通信に失敗時の処理
      alert('ユーザー検索に失敗しました。')
    })
  });
  $('.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn').on('click', function(){//
    $(this).parent().remove();//間違えて登録したユーザーを削除
  });
});
