class ChangeDateTypesToStrings < ActiveRecord::Migration[6.1]
  def change
    change_column :pacts, :completion_date, :string
    change_column :progress_dates, :progressDate, :string
  end
end
