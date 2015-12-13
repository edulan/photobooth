class Booth < ActiveRecord::Base
  before_create :generate_token

  has_many :clips

  private

  def generate_token
    self.token = SecureRandom.urlsafe_base64 unless self.token?
  end
end
