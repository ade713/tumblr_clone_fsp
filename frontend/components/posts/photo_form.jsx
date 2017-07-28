import React from 'react';
import Modal from 'react-modal';

import formStyles from './modal_style';


class PhotoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      title: '',
      body: '',
      url: '',
      post_type: 'photo',
      image: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMedia = this.handleMedia.bind(this);
  }

  update(property) {
    return e => this.setState({
      [property]: e.currentTarget.value
    });
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      title: '',
      body: '',
      url: '',
      imageFile: null,
      imageUrl: null
    });
  }

  handleMedia(e) {
    let reader = new FileReader();
    let file = e.currentTarget.files[0];
    reader.onloadend = function() {
      this.setState({
        imageUrl: reader.result,
        imageFile: file
      });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    let formData = new FormData();
    formData.append('post[url]', this.state.url);
    formData.append('post[title]', this.state.title);
    formData.append('post[post_type]', 'photo');
    formData.append('post[body]', this.state.body);
    formData.append('post[image]', this.state.imageFile);
    this.props.createMediaPost(formData)
      .then(this.closeModal());
  }

  render() {
    return (
      <div className="post-bar-content">
        <button className="post-bar-button" onClick={ this.openModal }>
          <label className="bar-button">
            <div className="button-icon">
              <i className="fa fa-camera fa-3x" aria-hidden="true"></i>
            </div>
            <span className="new-post-label">
              Photo
            </span>
          </label>
        </button>

        <Modal isOpen={ this.state.showModal }
               contentLabel="Example Modal"
               style={ formStyles }
               shouldCloseOnOverlayClick={ false }
               onRequestClose={ this.closeModal } >
               <div className="photo-post-form">
                 <div className="post-form">
                   <div className="media-field">
                     <span className="post-author">
                       { this.props.currentUser.username }
                     </span>

                     <input className="media-input"
                            type="file"
                            accept="image/*"
                            onChange={ this.handleMedia } />
                   </div>

                   <div className="title-field">
                     <textarea className="title-input"
                               type="text"
                               placeholder="Add caption here"
                               value={ this.state.title }
                               onChange={ this.update('title') } />
                   </div>

                   <img src={ this.state.imageUrl } />

                   <div className="submit-form">
                     <div className="modal-button">
                       <button className="form-button"
                               onClick={ this.closeModal }>
                               Close
                       </button>
                       <button className="post-submit-button"
                               onClick={ this.handleSubmit }
                               disabled={ !this.state.imageFile && !this.state.title } >
                         Post
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
        </Modal>
      </div>
    );
  }
}

export default PhotoForm;
