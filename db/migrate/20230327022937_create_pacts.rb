class CreatePacts < ActiveRecord::Migration[6.1]
  def change
    create_table :pacts do |t|
      t.date :start_date
      t.date :completion_date
      t.boolean :specific?
      t.integer :frequency
      t.string :frequency_scope
      t.belongs_to :resolution, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
