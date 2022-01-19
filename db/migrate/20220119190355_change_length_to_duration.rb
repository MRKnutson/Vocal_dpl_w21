class ChangeLengthToDuration < ActiveRecord::Migration[6.1]
  def change
    rename_column :recordings, :length, :duration
  end
end
