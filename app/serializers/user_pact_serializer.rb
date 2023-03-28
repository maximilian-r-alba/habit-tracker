class UserPactSerializer < ActiveModel::Serializer
  attributes :id, :completion_date, :specific?, :goal_int, :frequency_scope
  belongs_to :resolution
end
