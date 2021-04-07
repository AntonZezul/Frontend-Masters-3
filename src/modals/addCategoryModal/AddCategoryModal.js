import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddCategoryModal.scss';

export default function AddCategoryModal() {
  const headers = {
    'Content-Type': 'application/json',
  };

  const formik = useFormik({
    initialValues: { categoryName: '' },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .max(20, 'Názov galérie nesmie presiahnuť 20 znakov.')
        .required('Názov galérie nemôže byť prázdny.')
        .matches(/^(?!.*\/).+$/, 'Názov galérie nemôže obsahovať znak "/".'),
    }),

    onSubmit: async (values) => {
      try {
        const response = await fetch('http://api.programator.sk/gallery', {
          method: 'POST',
          body: JSON.stringify({
            name: values.categoryName,
          }),
          headers: headers,
        });
        if (response.ok) {
          return response.json();
        }
        const error = await response.json();
        const e = new Error(
          'Post request on gallery is NOT okej. Response status is ' +
            response.status
        );
        e.data = error;
        throw e;
      } catch (err) {
        return console.info(err);
      }
    },
  });

  return (
    <div className='modal fade' id='add_category_modal' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <button
            type='button'
            className='close p-0'
            data-dismiss='modal'
            aria-label='Close'>
            <span aria-hidden='true'>
              <img
                src={'/icons/close-icon.svg'}
                alt={'close-icon'}
              />{' '}
              ZAVRIEŤ
            </span>
          </button>
          <div className='modal-content-without-close'>
            <div className='modal-header'>
              <h5 className='modal-title'>PRIDAŤ KATEGÓRIU</h5>
            </div>
            <div className='modal-footer'>
              <div className='col'>
                <div className='input-group'>
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      id='categoryInput'
                      name='categoryName'
                      type='text'
                      placeholder='ZADAJTE NÁZOV KATEGÓRIE'
                      className='form-control was-validated'
                      style={{ border: 'none' }}
                      value={formik.values.categoryName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <button type='submit' className='btn btn-success'>
                      <img
                        src={'/icons/add-icon.svg'}
                        alt={'add-icon'}
                      />
                      PRIDAŤ
                    </button>
                  </form>
                  {formik.touched.categoryName && formik.errors.categoryName ? (
                    <div className='invalid-feedback'>
                      {formik.errors.categoryName}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
