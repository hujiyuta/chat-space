class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader#uploadしたimageの格納場所の指定

end
