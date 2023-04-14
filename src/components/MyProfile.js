import { useSelector } from 'react-redux';
import UserInfo from './UserInfo';
import Loader from './Loader';

const MyProfile = () => {
  const userInfo = useSelector((state) => state.reducer.userInfo);
  return userInfo ? (
    <UserInfo title="Мій кабінет" user={userInfo} isAdmin={userInfo.admin} />
  ) : (
    <Loader />
  );
};

export default MyProfile;
