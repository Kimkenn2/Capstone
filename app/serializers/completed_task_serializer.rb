class CompletedTaskSerializer < ActiveModel::Serializer
  attributes :id, :task_id, :user_id, :completed
end
