class ChecklistSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_id, :public
  has_many :tasks
  has_many :sub_tasks, through: :tasks

  # def tasks
  #   ActiveModel::SerializableResource.new(object.tasks,  each_serializer: TaskSerializer)
  # end
end
