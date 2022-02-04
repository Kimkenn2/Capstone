class User < ApplicationRecord
has_many :checklists
    has_secure_password
end
