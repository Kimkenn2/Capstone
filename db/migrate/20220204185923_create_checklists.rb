class CreateChecklists < ActiveRecord::Migration[6.1]
  def change
    create_table :checklists do |t|
      t.string :title
      t.integer :user_id

      t.timestamps
    end
  end
end
