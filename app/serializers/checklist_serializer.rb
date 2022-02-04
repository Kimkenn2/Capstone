class ChecklistSerializer < ActiveModel::Serializer
  attributes :id, :title, :creator_id
  has_many :tasks
end
