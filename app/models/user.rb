class User < ApplicationRecord
has_many :checklists
has_many :completed_tasks
    has_secure_password
end
