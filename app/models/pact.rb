class Pact < ApplicationRecord
  
  validates_presence_of :resolution_id, :goal_int
  validates :frequency_scope, inclusion: {in: ["Daily" , "Weekly", "Monthly"]}, unless: :isSpecific
  belongs_to :resolution
  belongs_to :user
  has_many :progress_dates, dependent: :destroy

end
