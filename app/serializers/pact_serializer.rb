class PactSerializer < ActiveModel::Serializer
  attributes :id, :completion_date, :isSpecific, :goal_int, :frequency_scope, :user_id
  belongs_to :resolution
  has_many :progress_dates
  
end
