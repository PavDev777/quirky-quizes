import s from './error.module.scss'

export const Error = () => (
  <div className={s.error}>
    <span>Unfortunately an error has occurred, please try again</span>
    <div className={s.errorImg}>
      <img
        src='https://cdn.dribbble.com/users/406903/screenshots/5810886/error-404-monochrome-dribbble_4x.png'
        alt=''
      />
    </div>
  </div>
)
