class ProgressDate < ApplicationRecord
  validates_presence_of :resolution_id, :pact_id, :progressDate
  belongs_to :pact
  belongs_to :resolution
  after_create :check_completion

  private

  def check_completion
    goal = self.pact.goal_int
    progress = self.pact.progress_dates.count
    if goal <= progress
      pact = self.pact
      pact.update(completion_date: DateTime.now) unless pact.isSpecific == false
    end
  end 
end
