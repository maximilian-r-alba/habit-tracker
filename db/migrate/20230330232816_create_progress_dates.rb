class CreateProgressDates < ActiveRecord::Migration[6.1]
  def change
    create_table :progress_dates do |t|
      t.belongs_to :pact, null: false, foreign_key: true
      t.belongs_to :resolution, null: false, foreign_key: true
      t.date :progressDate

      t.timestamps
    end
  end
end
