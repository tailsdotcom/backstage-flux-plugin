import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import Modal from './Modal';
import { Button } from '@material-ui/core';

export type Props = {
  onCloseModal: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setSuspendMessage: Dispatch<SetStateAction<string>>;
  suspend: () => Promise<void>;
  suspendMessage: string;
  className?: string;
};

const MessageTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 100%;
  border-radius: ${props => props.theme.spacing.xxs};
  resize: none;
  margin-bottom: ${props => props.theme.spacing.base};
  padding: ${props => props.theme.spacing.xs};
  &:focus {
    outline: ${props => props.theme.colors.primary} solid 2px;
  }
`;

function SuspendMessageModal({
  className,
  onCloseModal,
  open,
  setSuspendMessage,
  suspend,
  suspendMessage,
}: Props) {
  const closeHandler = () => {
    setSuspendMessage('');
    onCloseModal(false);
  };
  const suspendHandler = () => {
    setSuspendMessage(suspendMessage);
    suspend();
    setSuspendMessage('');
    onCloseModal(false);
  };

  const onClose = () => closeHandler();

  const content = (
    <>
      <MessageTextarea
        rows={5}
        value={suspendMessage}
        onChange={ev => setSuspendMessage(ev.target.value)}
      />
      <Flex wide end>
        <Button onClick={suspendHandler} color="inherit" variant="text">
          Suspend
        </Button>
      </Flex>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Suspend Reason"
      description="Add reason for suspending"
      children={content}
      className={className}
    />
  );
}

export default SuspendMessageModal;
