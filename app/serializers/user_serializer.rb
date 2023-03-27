class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :bio, :image_url
end
