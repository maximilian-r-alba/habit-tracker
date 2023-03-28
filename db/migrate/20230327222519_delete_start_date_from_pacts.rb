class DeleteStartDateFromPacts < ActiveRecord::Migration[6.1]
  def change
    remove_column :pacts, :start_date
  end
end
