import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const JobApplicationForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const watchPosition = watch('position', '');
  const watchSkills = watch('skills', []);
  const watchPreferredInterviewTime = watch('preferredInterviewTime', '');

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div className="form-container">
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            {...register('fullName', { required: 'Full Name is required' })}
          />
          {errors.fullName && <p className="error">{errors.fullName.message}</p>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phoneNumber', {
              required: 'Phone Number is required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Phone Number must be a valid number',
              },
            })}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
        </div>

        <div className="form-group">
          <select {...register('position', { required: 'Position is required' })}>
            <option value="">Applying for Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && <p className="error">{errors.position.message}</p>}
        </div>

        {(watchPosition === 'Developer' || watchPosition === 'Designer') && (
          <div className="form-group">
            <input
              type="number"
              placeholder="Relevant Experience (years)"
              {...register('relevantExperience', {
                required: 'Relevant Experience is required',
                min: { value: 1, message: 'Experience must be greater than 0' },
              })}
            />
            {errors.relevantExperience && <p className="error">{errors.relevantExperience.message}</p>}
          </div>
        )}

        {watchPosition === 'Designer' && (
          <div className="form-group">
            <input
              type="url"
              placeholder="Portfolio URL"
              {...register('portfolioURL', {
                required: 'Portfolio URL is required',
                pattern: {
                  value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                  message: 'Invalid URL format',
                },
              })}
            />
            {errors.portfolioURL && <p className="error">{errors.portfolioURL.message}</p>}
          </div>
        )}

        {watchPosition === 'Manager' && (
          <div className="form-group">
            <textarea
              placeholder="Management Experience"
              {...register('managementExperience', { required: 'Management Experience is required' })}
            />
            {errors.managementExperience && <p className="error">{errors.managementExperience.message}</p>}
          </div>
        )}

        <div className="form-group">
          <label>Additional Skills:</label>
          <div>
            <label>
              <input type="checkbox" value="JavaScript" {...register('skills', { validate: value => value.length > 0 || 'At least one skill must be selected' })} />
              JavaScript
            </label>
            <label>
              <input type="checkbox" value="CSS" {...register('skills')} />
              CSS
            </label>
            <label>
              <input type="checkbox" value="Python" {...register('skills')} />
              Python
            </label>
          
          </div>
          {errors.skills && <p className="error">{errors.skills.message}</p>}
        </div>

        <div className="form-group">
          <input
            type="datetime-local"
            placeholder="Preferred Interview Time"
            {...register('preferredInterviewTime', { required: 'Preferred Interview Time is required' })}
          />
          {errors.preferredInterviewTime && <p className="error">{errors.preferredInterviewTime.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="form-summary">
          <h2>Form Submitted Successfully!</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
