class Heartbeat
  FREQUENCY = 30 # in seconds

  def self.on_beat(frequency: FREQUENCY)
    loop do
      sleep frequency
      yield(data: 'ping', event: 'ping')
    end
  end
end
