class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.new
    @follow.follower_id = current_user.id
    @follow.followee_id = params[:user_id]
    @author = User.find_by(id: @follow.followee_id)
    @posts = @author.posts

    @follow.save!
    render 'api/posts/index'
  end

  def destroy
    # @follow = current_user.followees.find_by(followee_id: params[:user_id])
    @follow = current_user.followees.find_by(followee_id: params[:followee_id])
    @author = User.find_by(id: @follow.followee_id)
    @posts = @author.posts

    @follow.destroy
    render 'api/posts/index'
  end

  private

  def follow_params
    params.require(:follow).permit(:followee_id, :follower_id)
  end
end
