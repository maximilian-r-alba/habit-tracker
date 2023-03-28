class ChangeFrequencyInPactsToGoalInt < ActiveRecord::Migration[6.1]
  def change
    rename_column :pacts, :frequency, :goal_int
  end
end
