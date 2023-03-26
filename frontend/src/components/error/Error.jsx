import { Icon } from '@iconify/react';
import './error.scss';
const Error = () => {
    return (
        <div className="error">
            <Icon icon="system-uicons:warning-circle" />
            <h4>
                При загрузке данных произошла ошибка. Попробуйте перезагрузить страницу.
                Чтобы сообщить об ошибке, напишите на эту почту – <a href="mailto:info@mybibliography.ru">info@mybibliography.ru</a>
            </h4>
        </div>
    )
}
export default Error;