class User < ApplicationRecord
   validates_presence_of :username, :password, :name , on: :create
   validates :username, uniqueness: true
    has_secure_password
    has_many :pacts
    has_many :resolutions, through: :pacts
end
