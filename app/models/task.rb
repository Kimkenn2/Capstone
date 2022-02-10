class Task < ApplicationRecord
    has_many :sub_tasks, dependent: :destroy
    belongs_to :checklist

    # def sub_tasks
    #     ActiveModel::SerializableResource.new(object.sub_tasks,  each_serializer: Sub_TaskSerializer)
    #   end
end
