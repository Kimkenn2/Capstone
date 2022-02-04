class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.integer :index
      t.integer :checklist_id

      t.timestamps
    end
  end
end
