class Clip < ActiveRecord::Base
  belongs_to :booth

  after_commit :notify_save

  (1..4).each do |i|
    snapshot_sym = "snapshot#{i}".to_sym

    has_attached_file snapshot_sym,
                      default_url: 'assets/:style/missing.png',
                      size: { in: 0..250.kilobytes },
                      styles: {
                        medium: ['300x300>', :jpg],
                        thumb: ['100x100>', :jpg]
                      },
                      preserve_files: true,
                      hash_secret: Rails.application.secrets.secret_key_base

    validates_attachment_content_type snapshot_sym,
                                      content_type: %r{\Aimage\/.*\Z}
  end

  def snapshots
    (1..4).map { |i| send("snapshot#{i}".to_sym) }
  end

  private

  def notify_save
    REDIS.publish("clips_#{booth_id}", id.to_s)
  end
end
