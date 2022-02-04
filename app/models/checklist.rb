class Checklist < ApplicationRecord
    has_many :tasks
    has_many :subtasks, through: :tasks
    belongs_to :user

    validates :title, presence: true
end
