class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
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
    # if @message.save
    #   redirect_to group_messages_path(@group), notice: "メッセージ送信成功"
    # else
    #   @messages = @group.messages.includes(:user)
    #   flash.now[:alert] = "メッセージを入力してください"
    #   render :index
    # end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
