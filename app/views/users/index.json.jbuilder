json.array! @users do |user|
  json.user_name user.name
  json.user_id user.id
  #TODO:current_userを追加する？
  json.current_user_id current_user.id
  json.current_user_name current_user.name
end

