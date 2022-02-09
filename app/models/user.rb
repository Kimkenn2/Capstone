class User < ApplicationRecord
has_many :checklists
has_many :completed_tasks
has_many :checklist_follows
has_many :followed_checklists, through: :checklist_follows, source: :checklist
#has_many :checklists, through: :checklist_follows
    has_secure_password
end
