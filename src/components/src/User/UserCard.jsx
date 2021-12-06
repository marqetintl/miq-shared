import { Avatar } from './Avatar';

export const UserCard = ({ user, ...props }) => {
  return (
    <div className="d-flex align-items-center">
      <Avatar {...user.img_data} />

      <div className="ms-1">
        <div className="">{user.name}</div>
        <div className="text-sm text-muted">@{user.username}</div>
      </div>
    </div>
  );
};
