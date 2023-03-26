import { useState } from "react"
import { Icon } from '@iconify/react';
import './search-result.scss';

const SearchResult = ({result}) => { 
    const [activeItem, setActiveItem] = useState();
    const onCopy = (item) => {
        navigator.clipboard.writeText(item.reference);
        setActiveItem(item.id);
    }
    const renderResult = (result) => {
        if (result.length === 0) {
            return (
                <p className="search-result__notfound">
                    Ничего не найдено. Попробуйте сократить или
                    переформулировать запрос.
                </p>
            )
        }
        const renderItems = result.map((item) => {
            return (
            <div key={item.id} className="search-result__item">
                <li className="search-result__li">
                    {item.reference}
                </li>
                <button className="search__copy" onClick={() => onCopy(item)}>
                    {activeItem === item.id ? (
                        <>
                            Скопировано
                            <Icon icon="system-uicons:check" />
                        </>
                    ) : (
                        <>
                            Скопировать
                            <Icon icon="ep:copy-document" />
                        </>
                    )}
                </button>
            </div>
            )
        });
        return (
            <ol className="search__list">
                {renderItems}
            </ol>
        )
    }

    return (
        <div className="search__result search-result">
            <hr className="search__line" />
            <h6 id="search__result-title">Результаты поиска:</h6>
            {renderResult(result)}
        </div>
    )
}

export default SearchResult;