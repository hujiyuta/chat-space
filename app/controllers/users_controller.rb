class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%") #paramsとして送られてきたkeyword（入力された語句）で、Userモデルのnameカラムを検索し、その結果を@usersに代入する
    respond_to do |format|
      # format.html
      # format.json
      format.json { render 'index', handlers: 'jbuilder' }
      # format.json { render 'index', json: @users }#json形式で受け取ったら、@usersをデータとして返す
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path, notice: "ユーザー情報を更新しました"#更新できれば、root 'messages#index' にリダイレクト
    else
      render :edit#更新失敗なら、edit actionテンプレートを読み込み
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
