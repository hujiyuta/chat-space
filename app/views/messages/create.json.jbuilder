# htmlで生成したい内容を記載
json.user_name @message.user.name
json.created_at @message.created_at
json.text @message.content
json.image @message.image
json.user_id @message.user.id#不要かも？
json.group_id @message.group.id#不要かも？

