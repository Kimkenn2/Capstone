class CreateCompletedSubtasks < ActiveRecord::Migration[6.1]
  def change
    create_table :completed_subtasks do |t|
      t.integer :sub_task_id
      t.integer :user_id

      t.timestamps
    end
  end
end
