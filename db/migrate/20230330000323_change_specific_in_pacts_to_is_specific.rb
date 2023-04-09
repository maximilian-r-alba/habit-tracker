class ChangeSpecificInPactsToIsSpecific < ActiveRecord::Migration[6.1]
  def change
    rename_column :pacts, :specific?, :isSpecific
  end
end
