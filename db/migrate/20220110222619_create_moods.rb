class CreateMoods < ActiveRecord::Migration[6.1]
  def change
    create_table :moods do |t|
      t.integer :value
      t.belongs_to :recording, null: false, foreign_key: true

      t.timestamps
    end
  end
end
