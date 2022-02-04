class SubTaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :task_index, :task_id, :checklist_id
end
