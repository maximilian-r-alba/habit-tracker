class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :bio, :image_url
  has_many :pacts
  # has_many :resolutions, through: :pacts
  has_many :resolutions

  def resolutions
    self.object.resolutions.uniq
  end
end