class ClipsController < ApplicationController
  before_action :set_booth, only: [:index, :create]
  before_action :set_clip, only: [:show, :destroy]

  # GET /clips.json
  def index
    @clips = @booth.clips.order(votes: :desc)
  end

  # GET /clips/1.json
  def show
  end

  # POST /clips.json
  def create
    @clip = @booth.clips.build(clip_params)

    respond_to do |format|
      if @clip.save
        format.json { render :show, status: :created, location: @clip }
      else
        format.json { render json: @clip.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clips/1.json
  def destroy
    @clip.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def set_booth
    @booth = Booth.find_by!(token: params[:booth_id])
  end

  def set_clip
    @clip = Clip.find(params[:id])
  end

  def clip_params
    params.require(:clip).permit(:snapshot1, :snapshot2, :snapshot3, :snapshot4)
  end
end
