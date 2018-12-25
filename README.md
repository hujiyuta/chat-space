#DB設計

## 必要な機能
・ユーザ管理機能
・グループ管理機能
・メッセージ機能

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false add_index: true|
|email|text|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :groups, through::members
- has_many :members
- has_many :messages

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|created_at|integer|timestamp|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :users,throgh: :members
- has_many :members
- has_many :messages

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

