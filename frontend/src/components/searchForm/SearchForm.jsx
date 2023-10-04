import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import { querySent } from './searchSlice';
import './search-form.scss';

const SearchForm = ({ onSearchClick }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { query } = useSelector(state => state.search);
    const initial = location.pathname === '/' ? '' : query;
    return (
        <Formik
            initialValues={{ query: initial }}
            validationSchema={Yup.object({
                query: Yup.string()
                    .min(3, 'Запрос должен содержать как миниум 3 символа')
                    .required('Заполните поле запроса')
            })}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={({ query }) => {
                dispatch(querySent(query));
                onSearchClick(query);
            }}>
            <Form className="search-form">
                <div className="search-form__field">
                    <Field
                        id="query"
                        name="query"
                        type="search"
                        placeholder="Введите тему, фамилию автора или название  "
                        autoComplete="off"
                        autoFocus />
                    <IconButton aria-label="Искать" type="submit" title="Искать" className="search-form__button">
                        <Icon className="search-form__icon" icon="fluent:search-32-regular" />
                    </IconButton>
                    <ErrorMessage className='search-form__error' component="div" name="query" />

                </div>
            </Form>
        </Formik>
    )
}

export default SearchForm;