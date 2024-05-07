import Link from 'next/link'
import styles from './Register.module.scss'
import { useRouter } from 'next/router';
import { FormEvent, use, useState } from 'react';

const RegisterView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {push} = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const form = event.target as HTMLFormElement;
        const data = {
            email: form.email.value,
            fullname: form.fullname.value,
            phone: form.phone.value,
            password: form.password.value
        };

        const result = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (result.status === 200) {
            form.reset();
            setIsLoading(false);
            push('/auth/login');
        } else {
            setIsLoading(false);
            setError('Email is already in registered');
        }
    };

    return (
        <div className= {styles.register}>
            <h1 className= {styles.register__title}>Register</h1>
            {error && <p className= {styles.register__error}>{error}</p>}
            <div className= {styles.register__form}>
                <form onSubmit={handleSubmit}>
                    <div className= {styles.register__form__item}>
                        <label htmlFor="email">Email</label>
                        <input 
                        name="email" 
                        id="email" 
                        type="email" 
                        className={styles.register__form__item__input} 
                        />
                    </div>
                    <div className= {styles.register__form__item}>
                        <label htmlFor="fullname">Fullname</label>
                        <input 
                        name="fullname" 
                        id="fullname" 
                        type="text" 
                        className={styles.register__form__item__input} 
                        />
                    </div>
                    <div className= {styles.register__form__item}>
                        <label htmlFor="phone">Phone</label>
                        <input 
                        name="phone" 
                        id="phone" 
                        type="number" 
                        className={styles.register__form__item__input} 
                        />
                    </div>
                    <div className= {styles.register__form__item}>
                        <label htmlFor="password">Password</label>
                        <input 
                        name="password" 
                        id="password" 
                        type="password" 
                        className={styles.register__form__item__input} 
                        />
                    </div>
                    <button type="submit" className={styles.register__form__button}>
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                </form>
            </div>
            <p className={styles.register__link}>
                Have an account? Sign in <Link href="/auth/login">here</Link>
            </p>
        </div>
    )
}

export default RegisterView