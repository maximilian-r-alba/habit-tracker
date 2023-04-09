class User < ApplicationRecord
   validates_presence_of :username,  :name
   validates :password, :password_confirmation, presence: true, on: :create
  
   validates :username, uniqueness: true
    has_secure_password
    has_many :pacts , dependent: :destroy
    has_many :resolutions, through: :pacts

end
