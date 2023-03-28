class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :bio, :image_url
  has_many :pacts, serializer: UserPactSerializer
  
end
