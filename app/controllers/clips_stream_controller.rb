class ClipsStreamController < ActionController::Base
  include ActionController::Live

  def index
    booth = Booth.find_by(token: params[:booth_id])
    return render head: :not_found unless booth

    response.headers['Content-Type'] = 'text/event-stream'
    response.stream.close
  end
end
