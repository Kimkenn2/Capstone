class Checklist < ApplicationRecord
    has_many :tasks
    has_many :sub_tasks, through: :tasks
    belongs_to :user

    accepts_nested_attributes_for :tasks, allow_destroy: true

    validates :title, presence: true
end
