class BoothsController < ApplicationController
  def show
    @booth = Booth.find_by(token: params[:token])

    render :not_found unless @booth
  end

  def new
    @booth = Booth.new
  end

  def create
    @booth = Booth.new(booth_params)

    respond_to do |format|
      if @booth.save
        format.html { redirect_to booth_url(token: @booth.token), notice: 'Booth was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  private

  def booth_params
    params.require(:booth).permit(:name)
  end
end
