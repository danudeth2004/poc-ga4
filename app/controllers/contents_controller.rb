class ContentsController < ApplicationController
  def index
    @content = Content.first
  end
end
