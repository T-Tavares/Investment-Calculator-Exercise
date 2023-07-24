import style from './Credits.module.css';
export default function Credits() {
    return (
        <div className={style.credits}>
            <div className={style['course-link']}>
                <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="Udemy Logo" />
            </div>
            <div className={style['credits-info']}>
                <h3>
                    This Project is a result of an exercise from the Udemy Course of{' '}
                    <a href="https://www.udemy.com/user/maximilian-schwarzmuller/">Maximilian Schwarzmüller</a>{' '}
                    <a href="https://www.udemy.com/course/react-the-complete-guide-incl-redux/" target="#">
                        {' '}
                        [ Course Link ]
                    </a>
                </h3>
                <h4>
                    On my Github you can check the first commit for the code given to me. And the last for the code I
                    did myself.{' '}
                    <a href="https://github.com/T-Tavares/Investment-Calculator-Exercise" target="#">
                        {' '}
                        [ My GitHub Repository Link]
                    </a>
                </h4>
            </div>
            <div className={style['course-link']}>
                <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="Udemy Logo" />
            </div>
        </div>
    );
}
