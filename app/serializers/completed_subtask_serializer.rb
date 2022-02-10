class CompletedSubtaskSerializer < ActiveModel::Serializer
  attributes :id, :sub_task_id, :user_id
end
