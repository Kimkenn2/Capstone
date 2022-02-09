class CreateChecklistFollows < ActiveRecord::Migration[6.1]
  def change
    create_table :checklist_follows do |t|
      t.integer :checklist_id
      t.integer :user_id

      t.timestamps
    end
  end
end
