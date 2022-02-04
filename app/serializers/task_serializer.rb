class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :index, :checklist_id
  has_many :sub_tasks
end
