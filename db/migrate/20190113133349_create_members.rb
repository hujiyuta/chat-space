class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true#reference型の外部キーの設定
      t.timestamps
    end
  end
end
