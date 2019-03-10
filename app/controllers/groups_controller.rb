class GroupsController < ApplicationController
   before_action :set_group, only: [:edit, :update]#アクション実行前にset_groupを読み込み

   def index
   end

   def new
      @group = Group.new
      # @group.users << current_user#ログインユーザーを配列要素に初期設定で追加
   end

   def create
      @group = Group.new(group_params)
      @group.users << current_user#ログインユーザーは初期設定で参加させる
      if @group.save
         redirect_to root_path, notice: "グループを作成しました"
      else
         render :new
      end
   end

   def edit
      #todo:ここにレスポンス分けて記載
   end

   def update
      if @group.update(group_params)#TODO:group_paramsの設定で追加したユーザを配列追加にする。今は代入になっているため既存のユーザが上書きされている？
         redirect_to group_messages_path(@group), notice: "グループを編集しました"
      else
         render :edit
      end
   end

   private
   def group_params
      params.require(:group).permit(:name, user_ids: [] )
      # params.permit(:name, user_ids: [] )
   end

   def set_group
      @group = Group.find(params[:id])
   end
end
