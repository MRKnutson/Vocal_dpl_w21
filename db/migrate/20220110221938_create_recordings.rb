class CreateRecordings < ActiveRecord::Migration[6.1]
  def change
    create_table :recordings do |t|
      t.string :title
      t.string :pointer
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
