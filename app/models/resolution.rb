class Resolution < ApplicationRecord
    validates_presence_of :goal_statement, :category
    validates :category, inclusion: {in: ['Physical', 'Mental', 'Social']}
    has_many :pacts
    has_many :progress_dates
    has_many :users, through: :pacts
end
