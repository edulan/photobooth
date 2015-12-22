require 'thread'
require 'heartbeat'
require 'clips_subscriber'

class ClipsStreamController < ActionController::Base
  include ActionController::Live

  def index
    booth = Booth.find_by(token: params[:booth_id])
    return render head: :not_found unless booth

    response.headers['Content-Type'] = 'text/event-stream'

    event_sources = []
    queue = Queue.new

    Thread.abort_on_exception = true

    event_sources << Thread.new do
      Heartbeat.on_beat(frequency: 15) do |notification|
        Rails.logger.info "[ClipsStreamController] Ping..."
        queue.push(notification)
      end
    end
    event_sources << Thread.new do
      # TODO: Extract channel name to a class???
      ClipsSubscriber.new(booth.id).on_save do |notification|
        Rails.logger.info "[ClipsStreamController] Notified #{notification[:data][:id]}"
        queue.push(notification)
      end
    end

    sse = SSE.new(response.stream)
    while (notification = queue.pop)
      sse.write(notification[:data], event: notification[:event])
    end
  rescue IOError => error
    Rails.logger.info "[ClipsStreamController] #{error}, disconnecting..."
    event_sources.each(&:exit)
  ensure
    Rails.logger.info "[ClipsStreamController] closing stream..."
    sse.close
  end
end
