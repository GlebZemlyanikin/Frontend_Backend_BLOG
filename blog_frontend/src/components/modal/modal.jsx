import styled from 'styled-components';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import { selectModalIsOpen } from '../../selectors/select-modal-is-open';
import { selectModalText } from '../../selectors/select-modal-text';
import { selectModalOnCancel } from '../../selectors/select-modal-on-cancel';
import { selectModalOnConfirm } from '../../selectors/select-modal-on-confirm';

const ModalContainer = ({ className }) => {
    const isOpen = useSelector(selectModalIsOpen);
    const text = useSelector(selectModalText);
    const onCancel = useSelector(selectModalOnCancel);
    const onConfirm = useSelector(selectModalOnConfirm);

    if (!isOpen) return null;

    return (
        <div className={className}>
            <div className="overlay"></div>
            <div className="box">
                <h3>{text}</h3>
                <div className="buttons">
                    <Button width="120px" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button width="120px" onClick={onConfirm}>
                        Ок
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const Modal = styled(ModalContainer)`
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    & .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 420px;
        background-color: #fff;
        padding: 24px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
    }

    & .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(17, 24, 39, 0.6);
    }

    & .buttons {
        display: flex;
        justify-content: space-evenly;
        margin-top: 40px;
        gap: 16px;
    }
`;
