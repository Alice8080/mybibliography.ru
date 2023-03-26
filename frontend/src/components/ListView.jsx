import { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import DownloadListService from '../services/DownloadListService';
import { usePostListMutation } from "../api/apiSlice";
import ModalButton from './modal/Modal';

const ListView = ({list}) => {
    const [listItems, setListItems] = useState([]);
    const [listSortType, setListSortType] = useState('creation_time');
    const [copyButton, setCopyButton] = useState({text: 'Скопировать', icon: 'clipboard-copy'});
    const [listReferences, setListReferences] = useState();
    const [postList] = usePostListMutation();
    const {downloadList} = DownloadListService();

    useEffect(() => {
        const sortedList = [...list].sort((a, b) => a[listSortType].localeCompare(b[listSortType]));
        setListItems(sortedList.map((item) => <li key={item.id}>{item.reference}</li>));
        setListReferences(sortedList.map(item => item.reference));
    }, [listSortType])

    const onCopy = ()  => {
        if (list.length === 0) {
            setCopyButton({text: 'Нечего копировать', icon: 'warning-circle'});
        } else {
            navigator.clipboard.writeText(listReferences.join('\n'));
            setCopyButton({text: 'Скопировано', icon: 'check'});
        }
    };

    const onDownload = useCallback(()  => {
        downloadList(listReferences);
    }, [listReferences]);
    
    const onDelete = useCallback(()  => {
        setListItems([]);
        postList().unwrap();
    }, []);

    const onAlphabetSort = useCallback(()  => {
        setListSortType('reference');
    }, []);
    
    const onTimeSort = useCallback(()  => {
        setListSortType('creation_time');
    }, []);

    const modalSettings = {
        buttonSettings: {
            buttonClassName: 'list__button',
            text: 'Очистить',
            icon: 'system-uicons:cross-circle'
        },
        contentSettings: {
            title: 'Подтвердите удаление списка', 
            content: function Content() {
                return <>
                    <p>Вы уверены, что хотите очистить список?</p>
                    <p>Все созданные списки литературы можно посмотреть в <Link to='/account'>Личном кабинете</Link></p>
                </>
            },
            buttons: [
                {
                    text: 'Да, очистить',
                    action: () => onDelete()
                }
            ]
        }
    };

    return (
        <>
            <div className="list__result">
                {listItems.length === 0 ? (
                    <p className="list__empty">Ваш список пока пуст</p>
                ) : (
                    <div>
                        <ol id="list__items" className="list__items">
                            {listItems}
                        </ol>
                    </div>)}
            </div>
            <div className="list__buttons-wrapper">
                <div className="list__buttons">
                    <button onClick={onCopy} className="list__button">
                        {copyButton.text}
                        <Icon icon={`system-uicons:${copyButton.icon}`} />
                    </button>
                    <button onClick={onDownload} className="list__button">
                        Сохранить в формате .docx
                        <Icon icon="system-uicons:download" />
                    </button>
                    <ModalButton settings={modalSettings} />
                </div>
                <div className="list__buttons">
                    <button onClick={onAlphabetSort} className="list__button">
                        Сортировать по алфавиту
                        <Icon icon="system-uicons:sort" />
                    </button>

                    <button onClick={onTimeSort} className="list__button">
                        Сортировать по добавлению
                        <Icon icon="system-uicons:clock" />
                    </button>
                </div>
            </div>
            <Link to='/tip-dokumenta' className="list__link">
                Добавить
                <Icon icon="system-uicons:plus-circle" />
            </Link>
        </>
    )
}


export default ListView;