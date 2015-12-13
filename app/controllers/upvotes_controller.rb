class UpvotesController < ApplicationController
  # POST /upvotes.json
  def create
    clip = Clip.find(params[:clip_id])

    respond_to do |format|
      if clip.increment!(:votes)
        format.json { head :see_other, location: clip_url(clip) }
      else
        format.json { render json: clip.errors, status: :unprocessable_entity }
      end
    end
  end
end
