class CreateCompletedTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :completed_tasks do |t|
      t.integer :task_id
      t.integer :user_id
      t.boolean :completed

      t.timestamps
    end
  end
end
