import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import styles from './preview-modal.css';
import catIcon from './happy-cat.png';

const messages = defineMessages({
    label: {
        id: 'gui.previewInfo.label',
        defaultMessage: 'Try Scratch 3.0',
        description: 'Scratch 3.0 modal label - for accessibility'
    }
});

const PreviewModal = ({intl, ...props}) => (
    <ReactModal
        isOpen
        className={styles.modalContent}
        contentLabel={intl.formatMessage({...messages.label})}
        overlayClassName={styles.modalOverlay}
        onRequestClose={props.onTryIt}
    >
        {/*<Box className={styles.illustration} /> 
        */}
        <Box className={styles.body}>
            <h2>
                <FormattedMessage
                    defaultMessage="Welcome to the OGPC Kiosk!"
                    description="Header for Preview Info Modal"
                    id="gui.previewInfo.welcome"
                />
            </h2>
            <iframe width="360" height="180" src="https://www.youtube.com/embed/VIpmkeqJhmQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <p>
                <FormattedMessage
                    defaultMessage="Drag, drop, and connect blocks in the play area to create fun games and animations!"
                    description="Invitation to try 3.0 preview"
                    id="gui.previewInfo.invitation"
                />
            </p>

            <Box className={styles.buttonRow}>
            {/*}
                <button
                    className={styles.noButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Not Now"
                        description="Label for button to back out of trying Scratch 3.0 preview"
                        id="gui.previewInfo.notnow"
                    />
                </button>
            */}
                <button
                    className={styles.okButton}
                    title="tryit"
                    onClick={props.onTryIt}
                >
                    <FormattedMessage
                        defaultMessage="Try It! {caticon}"
                        description="Label for button to try Scratch 3.0 preview"
                        id="gui.previewModal.tryit"
                        values={{
                            caticon: (
                                <img
                                    className={styles.catIcon}
                                    src={catIcon}
                                />
                            )
                        }}
                    />
                </button>
            </Box>
            <Box className={styles.faqLinkText}>
                <FormattedMessage
                    defaultMessage="To learn more about OGPC, go to the {previewFaqLink}."
                    description="Invitation to try 3.0 preview"
                    id="gui.previewInfo.previewfaq"
                    values={{
                        previewFaqLink: (
                            <a
                                className={styles.faqLink}
                                href="https://www.ogpc.info/"
                            >
                                <FormattedMessage
                                    defaultMessage="OGPC website"
                                    description="link to Scratch 3.0 preview FAQ page"
                                    id="gui.previewInfo.previewfaqlink"
                                />
                            </a>
                        )
                    }}
                />
            </Box>
        </Box>
    </ReactModal>
);

PreviewModal.propTypes = {
    intl: intlShape.isRequired,
    onCancel: PropTypes.func.isRequired,
    onTryIt: PropTypes.func.isRequired
};

export default injectIntl(PreviewModal);
