class Booth < ActiveRecord::Base
  before_create :generate_token

  has_many :clips

  validates :name, presence: true

  private

  def generate_token
    self.token = SecureRandom.urlsafe_base64 unless self.token?
  end
end
