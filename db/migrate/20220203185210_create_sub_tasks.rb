class CreateSubTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :sub_tasks do |t|
      t.string :title
      t.integer :task_index
      t.integer :task_id
      t.integer :checklist_id

      t.timestamps
    end
  end
end
