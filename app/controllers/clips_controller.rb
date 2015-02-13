class ClipsController < ApplicationController
  respond_to :json

  before_action :set_clip, only: [:show, :upvote, :update, :destroy]

  # GET /clips.json
  def index
    { :message => "fuuuuuuuuuuu" }.each do |a|; puts a; end
    @clips = Clip.all.order(votes: :desc)
  end

  # GET /clips/1.json
  def show
  end

  # POST /clips.json
  def create
    @clip = Clip.new(clip_params)

    respond_to do |format|
      if @clip.save
        format.json { render :show, status: :created, location: @clip }
      else
        format.json { render json: @clip.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /clips/1.json
  def update
    respond_to do |format|
      # if @clip.update(clip_params)
        format.json { head :no_content }
      # else
        # format.json { render json: @clip.errors, status: :unprocessable_entity }
      # end
    end
  end

  # DELETE /clips/1.json
  def destroy
    @clip.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def upvote
    respond_to do |format|
      if @clip.increment!(:votes)
        format.json { head :no_content }
      else
        format.json { render json: @clip.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_clip
      @clip = Clip.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def clip_params
      params.require(:clip).permit(:snapshot1, :snapshot2, :snapshot3, :snapshot4)
    end
end
