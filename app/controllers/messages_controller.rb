class MessagesController < ApplicationController
  before_action :set_group#処理実行前にグループ検索

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)#特定のグループidに適合したmessagesモデルのデータを取得
    respond_to do |format|
      format.html
      format.json { @new_message = @messages.where('id > ?', params[:message][:id]) }
       # json形式でアクセスがあった場合は、params[:message][:id]よりも大きいidがないかMessageから検索して、@new_messageに代入する
    end
  end

  def create
    @message = @group.messages.new(message_params)
    respond_to do |format|
      if @message.save
        format.html { redirect_to group_messages_path(@group), notice: "メッセージ送信成功" }
        format.json#TODO:1回目の投稿後に送信ボタンが押せない
      else#TODO:条件を詳細にする
        format.html{
           @messages = @group.messages.includes(:user)
           flash.now[:alert] = "メッセージを入力してください"
           render :index }
      end
    end
  end

  private

  def message_params#rquireでmessageインスタンスを生成する時に受け取るキーを設定
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group#
    @group = Group.find(params[:group_id])
  end

end
