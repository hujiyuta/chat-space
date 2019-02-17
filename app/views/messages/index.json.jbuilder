if @new_message.present? # @new_messageに中身があれば
# 配列かつjson形式で@new_messageを返す。ここにbuildMessageHTMLで使うデータを変換するように記載
  json.array! @new_message do |message|
    json.user_name message.user.name
    json.created_at message.created_at
    json.text message.content
    json.id message.id
    json.image message.image.url
  end
end
