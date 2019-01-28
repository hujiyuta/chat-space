# htmlで生成したい内容を記載
json.text @message.content
json.image @message.image
json.user_id @message.user.id
json.group_id @message.group.id
json.user_name @message.user.name
json.created_at @message.created_at

