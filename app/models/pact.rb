class Pact < ApplicationRecord
  belongs_to :resolution
  belongs_to :user
end
