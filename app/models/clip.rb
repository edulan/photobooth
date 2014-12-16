class Clip < ActiveRecord::Base
  (1..4).each do |i|
    snapshot_sym = "snapshot#{i}".to_sym

    has_attached_file snapshot_sym,
      styles: { medium: "300x300>", thumb: "100x100>" },
      path: ":hash.:extension",
      default_url: ":style/missing.png",
      hash_secret: Rails.application.secrets.secret_key_base

    validates_attachment_content_type snapshot_sym,
      content_type: /\Aimage\/.*\Z/
  end

  (1..4).each do |i|
    snapshot_sym = "snapshot#{i}".to_sym

    process_in_background snapshot_sym,
      processing_image_url: ":style/processing.png"
  end

  def snapshots
    (1..4).map { |i| self.send("snapshot#{i}".to_sym) }
  end
end
