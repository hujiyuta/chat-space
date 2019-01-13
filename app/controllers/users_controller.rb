class UsersController < ApplicationController

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
