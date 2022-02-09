class ChecklistFollow < ApplicationRecord
    belongs_to :user
    belongs_to :checklist
end
