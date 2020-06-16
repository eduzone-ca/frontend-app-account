import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import { useNextPanelSlug } from '../routing-utilities';
import BasePanel from './BasePanel';
import ImageFileUpload from '../ImageFileUpload';
import ImagePreview from '../ImagePreview';
import Camera from '../Camera';
import CameraHelp from '../CameraHelp';
import { IdVerificationContext, MEDIA_ACCESS } from '../IdVerificationContext';

import messages from '../IdVerification.messages';

function TakePortraitPhotoPanel(props) {
  const panelSlug = 'take-portrait-photo';
  const nextPanelSlug = useNextPanelSlug(panelSlug);
  const { setFacePhotoFile, facePhotoFile, mediaAccess } = useContext(IdVerificationContext);
  const shouldUseCamera = mediaAccess === MEDIA_ACCESS.GRANTED;

  return (
    <BasePanel
      name={panelSlug}
      title={shouldUseCamera ? props.intl.formatMessage(messages['id.verification.portrait.photo.title.camera']) : props.intl.formatMessage(messages['id.verification.portrait.photo.title.upload'])}
    >
      <div>
        {facePhotoFile && !shouldUseCamera && <ImagePreview src={facePhotoFile} alt={props.intl.formatMessage(messages['id.verification.portrait.photo.preview.alt'])} />}

        {shouldUseCamera ? (
          <div>
            <p>
              {props.intl.formatMessage(messages['id.verification.portrait.photo.instructions.camera'])}
            </p>
            <Camera onImageCapture={setFacePhotoFile} />
          </div>
        ) : (
          <div>
            <p>
              {props.intl.formatMessage(messages['id.verification.portrait.photo.instructions.upload'])}
            </p>
            <ImageFileUpload onFileChange={setFacePhotoFile} />
          </div>
        )}
      </div>
      <div className="action-row" style={{ visibility: facePhotoFile ? 'unset' : 'hidden' }}>
        <Link to={nextPanelSlug} className="btn btn-primary">
          {props.intl.formatMessage(messages['id.verification.next'])}
        </Link>
      </div>
      {shouldUseCamera && <CameraHelp />}
    </BasePanel>
  );
}

TakePortraitPhotoPanel.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(TakePortraitPhotoPanel);
