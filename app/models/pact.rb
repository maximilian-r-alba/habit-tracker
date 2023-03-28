class Pact < ApplicationRecord
  validates_presence_of :specific?, :resolution_id, :user_id
  validates :frequency_scope, inclusion: {in: ["Daily" , "Weekly", "Monthly"]}
  belongs_to :resolution
  belongs_to :user


end
