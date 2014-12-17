class ClipsController < ApplicationController
  respond_to :json

  before_action :set_clip, only: [:show, :update, :destroy]

  # GET /clips.json
  def index
    @clips = Clip.all
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
      if @clip.update(clip_params)
        format.json { render :show, status: :ok, location: @clip }
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
    # Use callbacks to share common setup or constraints between actions.
    def set_clip
      @clip = Clip.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def clip_params
      params.require(:clip).permit(:snapshot1, :snapshot2, :snapshot3, :snapshot4)
    end
end
