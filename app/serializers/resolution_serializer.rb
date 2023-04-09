class ResolutionSerializer < ActiveModel::Serializer
  attributes :id, :goal_statement, :category
  has_many :unique_users, serializer: ResolutionUserSerializer
  
  def unique_users
    self.object.users.uniq
  end
end
