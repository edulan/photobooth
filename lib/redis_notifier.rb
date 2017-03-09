class RedisNotifier
  attr_writer :redis

  def initialize(channels)
    @channels = channels
  end

  def subscribe(&block)
    redis.subscribe(*@channels) do |on|
      on.subscribe do |channel, subscriptions|
        Rails.logger.info "[RedisNotifier ##{object_id}] Subscribed to ##{channel} (#{subscriptions} subscriptions)"
      end

      on.message do |_, message|
        block.call(message)
      end

      on.unsubscribe do |channel, subscriptions|
        Rails.logger.info "[RedisNotifier ##{object_id}] Unsubscribed from ##{channel} (#{subscriptions} subscriptions)"
      end
    end
  rescue Redis::BaseConnectionError => error
    Rails.logger.info "[RedisNotifier ##{object_id}] #{error}, retrying in 1s"
    sleep 1
    retry
  end

  def unsubscribe
    redis.unsubscribe(@channels)
  end

  def redis
    @redis ||= REDIS
  end
end
