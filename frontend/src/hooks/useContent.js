import SmallSpinner from '../components/spinner/SmallSpinner';
import Error from '../components/error/Error';

/**
 * Хук рендеринга компонента, который зависит от приходящих с сервера данных.
 * Пока выполняется запрос на сервер, рендерится SmallSpinner, если происходит ошибка, рендерится Error.
 * Значения из объекта data возвращаются из запроса useQuery, выполняемого перед вызовом renderContent.
 */

export const useContent = () => {
    const renderContent = (data, Component) => {
        const {isSuccess, isFetching, isLoading, isError} = data;
        if (isFetching || isLoading) {
            return <SmallSpinner />;
        } else if (isError) {
            return <Error />;
        } else if (isSuccess) {
            return Component;
        } else {
            return null;
        }
    }
    return {renderContent}
};