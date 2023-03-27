class CreateResolutions < ActiveRecord::Migration[6.1]
  def change
    create_table :resolutions do |t|
      t.string :goal_statement
      t.string :category

      t.timestamps
    end
  end
end
