require 'redis_notifier'

class ClipsSubscriber
  def initialize(booth_id)
    @redis_notifier = RedisNotifier.new("clips_#{booth_id}")
  end

  def on_save
    @redis_notifier.subscribe do |data|
      clip_id = data
      clip = Clip.find_by(id: clip_id)

      next unless clip

      yield(data: serialize_clip(clip), event: serialize_event(clip))
    end
  end

  def unsubscribe
    @redis_notifier.unsubscribe
  end

  private

  def serialize_event(clip)
    (clip.updated_at - clip.created_at) > 3.seconds ? 'change' : 'add'
  end

  def serialize_clip(clip)
    {
      id: clip.id,
      votes: clip.votes,
      created_at: clip.created_at,
      updated_at: clip.updated_at,
      snapshots: clip.snapshots.map do |snapshot|
        {
          thumb_url: snapshot.url(:thumb),
          medium_url: snapshot.url(:medium),
          is_processing: false
        }
      end
    }
  end
end
