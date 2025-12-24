class ContentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @content = Content.first
  end
end
