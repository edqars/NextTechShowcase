import classnames from 'classnames/bind';
import { UserForm } from '../components/UserForm/UserForm.tsx';
import SmallHeader from '../components/SmallHeader/SmallHeader.tsx';
import styles from '../styles/Profile.module.scss';
import { useProfile } from '../hooks/api/profile';
import Loader from '../components/Loader/Loader';

const cx = classnames.bind(styles);

export default function Profile() {
  const { isLoading, data } = useProfile(1);
  if (isLoading) return <Loader />;

  return (
    <main className={cx('profile-page')}>
      <SmallHeader title="Страница пользователя" />
      <UserForm user={data} />
    </main>
  );
}
