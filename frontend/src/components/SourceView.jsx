import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { usePostSourceMutation } from '../api/apiSlice';
import ModalButton from './modal/Modal';

const SourceView = ({sourceInfo}) => {
  const {sourceTitle, sourceName, sourceHaveAuthors, sourceHaveOptionals, sourceFields} = sourceInfo;
  const [authorsCount, setAuthorsCount] = useState('one_author');
  const [optionalFields, setOptionalFields] = useState({state: 'hide', buttonText: 'Показать необязательные элементы'});
  const navigate = useNavigate();
  const [postSource] = usePostSourceMutation();
  const authorsFields = [
      {
          name: 'one_author',
          title: 'Один автор',
          fields: []
      },
      {
          name: 'two_authors',
          title: 'Два автора',
          fields: ['second_surname', 'second_initials']
      },
      {
          name: 'three_authors',
          title: 'Три автора',
          fields: ['second_surname_2', 'second_initials_2', 'third_surname', 'third_initials']
      },
      {
          name: 'four_authors',
          title: 'Четыре автора',
          fields: ['second_surname_3', 'second_initials_3', 'third_surname_2', 'third_initials_2', 'fourth_surname', 'fourth_initials']
      },
      {
          name: 'five_and_more_authors',
          title: 'Пять и более авторов',
          fields: ['second_surname_4', 'second_initials_4', 'third_surname_3', 'third_initials_3']
      }
  ];

  const createReference = (data) => {
      postSource({type: sourceName, data}).unwrap();
      navigate('/spisok-literatury');
  };

  const toggleOptionalFields = () => {
    setOptionalFields(optionalFields.state === 'show' ? 
      {state: 'hide', buttonText: 'Показать необязательные элементы'} : 
      {state: 'show', buttonText: 'Скрыть необязательные элементы'}
    );
  };

  const renderAuthorsButtons = () => {
    const buttons = authorsFields.map((authorsField, i) => {
      return (
        <button key={i} className={authorsField.name === authorsCount ? 'active' : ''} onClick={() => setAuthorsCount(authorsField.name)}>{authorsField.title}</button>
      )
    });
    return (
        <div className="source__nav">
          {buttons}
        </div>
    )
  };

  const authorsButtons = sourceHaveAuthors ? renderAuthorsButtons() : null;
  const optionalFieldsButton = sourceHaveOptionals ? <button onClick={() => toggleOptionalFields()} className="source__optional">{optionalFields.buttonText}</button> : null;

  const modalSettings = {
    buttonSettings: {
        buttonClassName: 'source__info',
        text: '',
        icon: 'system-uicons:info-circle'
    },
    contentSettings: {
        title: 'Как заполнять информацию об источнике', 
        content: function Content() {
            return (
              <>
                <p>Заполните данные об источнике по образцу.</p>
                <p>Необязательные элементы — это библиографические
                сведения, необходимые для идентификации ресурса в отдельных случаях и 
                обеспечивающие дополнительную библиографическую характеристику ресурса.</p>
                <p>Заполните их, если для идентификации источника недостаточно обязательных элементов, 
                либо если они указаны как необходимые в списке литературы для вашей организации.</p>
              </>
            )    
        },
        buttons: []
    }
  };

  const initialValues = () => {
    let fields = {};
    for (let field of sourceFields) {
      fields = {...fields, [field.name]: ''};
    }
    return fields
  };

  const validation = () => {
    let fields = {};
    for (let field of sourceFields) { 
      const optionals = ['edit_info', 'isbn', 'issn', 'publication_date', 'volume_n'];
      if (field.isRequired === 'required' && !optionals.some((optionalField) => field.name === optionalField))  {
        fields = {...fields, [field.name]: Yup.string().required('Это обязательное поле')};
      }
    }
    return Yup.object(fields);
  };
  
  const renderInputs = sourceFields.map((field) => {
    let fieldStyle = field.isRequired === 'required' ? { 'display': 'flex' } : { 'display': 'none' };

    authorsFields.forEach((authorsField) => {
      if (authorsField.name === authorsCount && authorsField.fields.indexOf(field.name) !== -1) {
        fieldStyle = { 'display': 'flex' };
      }
    });

    if (optionalFields.state === 'show' && field.isRequired === 'optional') {
      fieldStyle = { 'display': 'flex' };
    }
    
    return (
      <div
        key={field.name} 
        className="source__field"
        style={fieldStyle}>
        <label htmlFor={field.name}>{field.title}</label>
        <Field
            type="text"
            className={field.isRequired}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            maxLength="300"
        />
        <ErrorMessage className='input-error' component="div" name={field.name}  />
      </div>
    );
  });

  return (
    <>
      <div className="source__title-wrapper">
          <h1 className="source__title">{sourceTitle}</h1>
          <ModalButton settings={modalSettings} />
      </div>
      <div className="source__buttons">
          {authorsButtons}
          {optionalFieldsButton}
      </div>
      <Formik
          initialValues={initialValues()}
          validationSchema={validation()}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={values => createReference(values)}>
          <Form className="source__form">
              {renderInputs}
              <button className="source__button" type="submit">
                Оформить ссылку
                <Icon icon="system-uicons:check" className="doc__icon" />
              </button>
          </Form>
      </Formik>
    </>
  )
};
export default SourceView;