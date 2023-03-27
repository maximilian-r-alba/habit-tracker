class PactSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :completion_date, :specific?, :frequency, :frequency_scope
  has_one :resolution
  has_one :user
end
