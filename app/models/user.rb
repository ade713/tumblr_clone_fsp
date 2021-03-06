# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  username            :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class User < ApplicationRecord
  validates :username,
            :password_digest,
            :session_token,
            presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token!

  has_many :posts,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: "Post"

  has_many :likes,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "Like"

  has_many :followers,
    primary_key: :id,
    foreign_key: :followee_id,
    class_name: "Follow"

  has_many :followees,
    primary_key: :id,
    foreign_key: :follower_id,
    class_name: "Follow"

  has_many :followee_users,
    through: :followees,
    source: :followee

  has_many :followed_posts,
    through: :followee_users,
    source: :posts

  def recommended_follows
    
  end

  has_attached_file :avatar,
                    styles: { thumb: "64x64>" },
                    default_url: "https://s3.us-east-2.amazonaws.com/picmes-dev/dev-seeds/b-a-w_happy_avatar-icon.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/
  validates_attachment_size :avatar, in: 0..2.megabyte



  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token!
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end
end
