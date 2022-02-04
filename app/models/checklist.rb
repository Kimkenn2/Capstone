class Checklist < ApplicationRecord
    has_many :tasks
    has_many :subtasks, through: :tasks

    validates :title, presence: true
end
