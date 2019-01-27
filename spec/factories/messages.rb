FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/IMG_0996.jpg")
    # image File.open("#{Rails.root}/public/uploads/message/image/10/995871_454010658040881_1134590715_n.jpg")
    user
    group
  end
end
