class PagesController < ApplicationController
  before_action :require_login, only: [:new]
  def new
  end
  def index
  end
end